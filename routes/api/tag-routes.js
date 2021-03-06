const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const readerData = await Tag.findAll({
      // Add Book as a second model to JOIN with
      include: [{ model: Product,through:ProductTag}]
    });
    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const readerData = await Tag.findByPk(req.params.id,{
      // Add Book as a second model to JOIN with
      include: [{ model: Product,through:ProductTag}]
    });
    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const readerData = await Tag.create(req.body);
    res.status(200).json(readerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const readerData = await Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    });

    if (!readerData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const readerData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!readerData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
