const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const readerData = await Category.findAll({
      // Add Book as a second model to JOIN with
      include: [{ model: Product}]
    });
    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const readerData = await Category.findByPk(req.params.id, {
      // Add Book as a second model to JOIN with
      include: [{ model: Product }]
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

router.post('/', async(req, res) => {
  // create a new category
  try {
    const readerData = await Category.create(req.body);
    res.status(200).json(readerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const readerData = await Category.update(req.body,{
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

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const readerData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!readerData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
