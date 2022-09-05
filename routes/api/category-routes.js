const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categorySearch = await Category.findAll(
      {
      include:[{ model: Product, as:"products" }]
    }
    );
    return res.json(categorySearch);
  } catch(error){
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const searchedTag = await Category.findOne({
      where: {id: req.params.id},
      include:[{ model: Product, as: 'products'}]
    });
    if(!searchedTag){
      res.status(500).json({ message: 'This is not in the table' });
      return;
    }

    return res.json(searchedTag);
  } catch (error){
    console.log(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then((newTag)=>{
    return res.json(newTag)
  })
  .catch((error)=>{
    return res.json(error);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id:req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
