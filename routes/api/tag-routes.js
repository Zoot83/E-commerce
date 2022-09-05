const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const searchedTags = await Tag.findAll({
      include:[{ model: Product, through: ProductTag, as: 'products'}]
    });
    if(!searchedTags){
      res.status(500).json({ message: 'There is nothing in the table' });
      return;
    }

    return res.json(searchedTags);
  } catch (error){
    console.log(error);
  }
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const searchedTag = await Tag.findOne({
      include:[{ model: Product, through: ProductTag, as: 'products'}]
    },{where: {id: req.params.id}});
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
  // create a new tag
  
    Tag.create({
      tag_name: req.body.tag_name,
    })
    .then((newTag)=>{
      return res.json(newTag)
    })
    .catch((error)=>{
      return res.json(error);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where:{
        id: req.params.id
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id:req.params.id,
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
