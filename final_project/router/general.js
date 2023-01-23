const express = require('express');
const axios = require('axios');
var books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}
//Task: 10
const axiosBooks = axios.get('http://localhost:5000/');
axiosBooks.then(resp => {
  console.log(JSON.stringify(resp.data,null))
})
.catch(err => {
  console.log(err.toString())
});
//Task: 11
const axiosIsbn = axios.get('http://localhost:5000/isbn/3');

axiosIsbn.then(resp => {
  
  console.log(JSON.stringify(resp.data,null))
  console.log('\n');
})
.catch(err => {
  console.log(err.toString())
});
//Task: 12
const axiosAuthor = axios.get('http://localhost:5000/author/Unknown');

axiosAuthor.then(resp => {
  
  console.log(JSON.stringify(resp.data,null))
  console.log('\n');
})
.catch(err => {
  console.log(err.toString())
});
//Task: 13
const axiosTitle = axios.get('http://localhost:5000/title/The Epic Of Gilgamesh');

axiosTitle.then(resp => {
  
  console.log(JSON.stringify(resp.data,null))
  console.log('\n');
})
.catch(err => {
  console.log(err.toString())
});




public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
 
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books,null))
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn];
  res.send(JSON.stringify(book));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const keys = Object.keys(books);
  console.log(keys[0]);
  const author = req.params.author;
  let filteredKeys =[]
  
  keys.forEach(element => {
    
    if(books[element].author === author){
      filteredKeys.push(element);
    }
  });

  console.log(filteredKeys);
  const filteredBooks = []
  filteredKeys.forEach(element => {
    filteredBooks.push(books[element])
  });
  console.log(filteredBooks);
  res.send(JSON.stringify(filteredBooks));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const keys = Object.keys(books);
  console.log(keys[0]);
  const title = req.params.title;
  let filteredKeys =[]
  
  keys.forEach(element => {
    
    if(books[element].title === title){
      filteredKeys.push(element);
    }
  });
  console.log(filteredKeys);
  const filteredBooks = []
  filteredKeys.forEach(element => {
    filteredBooks.push(books[element])
  });
  console.log(filteredBooks);
  res.send(JSON.stringify(filteredBooks));
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  console.log(book.reviews)
  res.send('Reviews\n'+JSON.stringify(book.reviews))
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
