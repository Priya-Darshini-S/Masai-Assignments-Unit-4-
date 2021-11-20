const express = require("express");
const books = require("./books.json")

const app =express();
app.use(express.json())

//middleware---------------------------------------------------------

const middleware = (req, res, next) => {
console.log("before")
next();
console.log("after")
}
app.get("/book/",middleware, (req, res) => {
    const add_name = {
        api_requested_by:"Priya",
        book: books,
    }
    res.send(add_name);
});

// const authorise = () => {
//     return (req, res, next) => {
//       const originalSendFunc = res.send.bind(res);
//       res.send = function (body) {
//         body.name = "Nrupul Dev";
//         console.log(body); // do whatever here
//         return originalSendFunc(body);
//       };
//       next();
//     };
//   };
  

//middleware--------------------------------------------------------

app.get("/", (req, res) => {
    res.send({books});
});
app.get("/books/:id", (req, res) => {
    const single_book = books.filter((each) => each.id === +req.params.id)
    res.send({single_book});
});
app.delete("/books/:id", (req, res) => {
    const single_book = books.filter((each) => each.id !== +req.params.id)
    res.send({single_book});
});

app.patch("/books/:id/:name/:bookname", (req, res) => {
    const single_book = books.map((each) =>{
    if(+req.params.id === each.id){
    each.author = req.params.name;
    each.book = req.params.bookname;
    }
    })
    
    res.send(books);
});

app.post("/books", (req, res) => {
    const nbook = [...books, req.body]
    res.send(nbook);
});


app.listen(2001, function() {
    console.log("listening on port 2001")
});

