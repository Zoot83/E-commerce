# Ecommerce

In this project I created all the server side routes and the models for the database.
I was able to create the links between the moduls without explicitly stating the foreign keys by utilizing the way that sequalize handles relatioonships by default. This allowed me to access information from other models and tables so that I could provide all the information for the specific tag, category, or product that was searched for. By using the routers that express give to you I was able to keep the files clean but grouping the ones that shared a similar path rather then having them all in one file.

## Authors

- [@marshallrizzuto](https://github.com/Zoot83)

Website: https://zoot83.github.io/E-commerce/

## Features

- Node
- Query
- MySQL
- Promises
- Packages
- Npm
- Databases
- Express
- Routers
- Sequalize

## Demo

<img src="assets\Demo.gif" width="550" height="450" />

## Usage/Examples

In this example I am showing how I was able to query for a specific tag with a specified id from the url search. I show that byt using a async I was able
to do an addition query and wait for it to be done before moving on. I also show how i used try catch blocks in case there was a error and I needed to abort.
In the query I used a where clause for what I wanted to find and also an include so it would show all the inforamtion that was for the specified id.

     router.get('/:id', async (req, res) => {
        // find a single tag by its `id`
        // be sure to include its associated Product data

        try{
            const searchedTag = await Tag.findOne({
            where: {id: req.params.id},
            include:[{

            model: Product,
            through: ProductTag,
            as: 'products',
         }]
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
