const express = require('express');
const router = express.Router();
const books = require('../Models/Books');

router.get('/', async(req,res)=>{
    try{

        const getBooks = await books.find({});
        if(!getBooks){
            res.status(404).json({message:'No books are found'});
        }
        else{
            res.json({message:'Available books', books:getBooks});
        }
    }catch(err){
        console.error('Error while fetching the books', err);
        return res.status(500).json({message:'Something went wrong, while searching for the books'})
    }
})

router.post('/add-book',async(req,res)=>{
    try{
        const {title, author, ISBN, publicationDate} = req.body;
        
        const findBook = await books.findOne({title, author, ISBN, publicationDate})
        if(!findBook){
            const addBook = await books.create({title,author,ISBN,publicationDate});
            res.json({message:'Successfully added the book to the database', Book:addBook});
        }
        else{
            res.json({message:'Book already exists in the database'});
        }
    }catch(err){
        console.error('Error while adding the book',err);
        return res.status(500).json({message:'Something went wrong, while adding the book'})
    }
})

router.patch('/update-book', async (req, res) => {
    try {
        const { title, author, ISBN, publicationDate } = req.body;
        const updateBook = await books.findOneAndUpdate(
            { ISBN: req.body.ISBN }, 
            { title, author, ISBN, publicationDate },
            { new: true } 
        );

        if (!updateBook) {
            return res.status(404).json({ message: 'Couldnt find the book' });
        } else {
            return res.status(200).json({ message: 'Book updated successfully', Book: updateBook });
        }
    } catch (err) {
        console.error('Error updating the book:', err);
        return res.status(500).json({ message: 'Something went wrong while updating the book' });
    }
});

router.delete('/delete-book',async(req,res)=>{
    try {
        const {title, ISBN} = req.body;
        const delBook = await books.findOneAndDelete({title,ISBN});
        if(!delBook){
            res.status(404).json({message:'Book is not found in the database'});
        }
        else{
            res.json({message:'Book is deleted successully',deletedBook: delBook})
        }
    } catch (err) {
        console.error('Error while deleting the book');
        return res.status(500).json('Something went wrong while deleting the book');
    }
})

module.exports = router;