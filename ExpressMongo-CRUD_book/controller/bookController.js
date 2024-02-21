const express = require("express");
const 




// b) "/books" Endpoint: Action: Retrieve the list of all books in the bookstore. Response: Display the list of books in a structured format.

app.get("/books",  (req, res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.send(data.books)
});

// c) "/books/add" Endpoint: Action: Add a new book to the bookstore. Request: Include the book details (e.g., title, author, ISBN) in the request body. Have a middleware called as "validator" which checks if the request body is having all the book details, if any book detail is missing, it should send relevant response and not add the book to the books. Response: Return a success message indicating that the book has been added.

function validator(req, res, next){
    const {id, title, author, genre, price, in_stock} = req.body;

    if(!id || !title || !author || !genre || !price || !in_stock){
        res.status(400).json({ message: 'Please provide all book details' });
    }else{
        next()
    }
}

app.post("/books/add", validator , (req, res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    data.books.push(req.body);
    let newBook = JSON.stringify(data);
    fs.writeFileSync("./db.json", newBook)
    res.json({message: "Book added successfully"})
})

// d) "/books/search" Endpoint: Action: Search for books based on a given query parameter (e.g., title, author). Request: Include the search query in the request query parameters. Response: Return the list of books matching the search query.


// e) "/books/update/:id" Endpoint: Action: Update the details of a specific book. Request: Include the book ID in the URL parameter and the updated details in the request body. Response: Return a success message indicating that the book details have been updated.


// f) "/books/delete/:id" Endpoint: Action: Delete a specific book from the bookstore. Request: Include the book ID in the URL parameter. Response: Return a success message indicating that the book has been deleted.


// g) Handle Invalid Endpoints: Response: Display an appropriate message for invalid endpoints.
