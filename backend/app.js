const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1029',
  database : 'blogorwiki'
});


let ls = [];

app.use(function (error, req, res, next) {
  if (error.status === 400) {
    log.info(error.body);
    return res.send(400);
  }

  console.log(error);

});


app.use(express.json());
var cors = require('cors');
const { type } = require('os');
app.use(cors());
connection.connect();



app.use(morgan("combined"));

app.post('/api/signin',(req, res)=>{
  let recUserinfo = req.body.name
  connection.query(`SELECT * FROM users WHERE username='${recUserinfo.username}'`, (error, rows) => {
    if (error) throw error;
    ls = rows;
    if (ls.length === 0) {
      res.send("username is wrong");
    } else {
      if (ls[0].password === recUserinfo.password) {
        res.send(ls[0]);
      } else {
        res.send('password is wrong')
      }
    }
  });
});


let upls=[];

app.post('/api/signup',(req, res) => {
  let recUserinfo = req.body.name

  connection.query(`SELECT * FROM users WHERE username='${recUserinfo.username}'`, (error, rows) =>{
    if (error) throw error;
    upls = rows;
  if (upls.length === 0) {
    let userinfo = ({
      "username" : recUserinfo.username,
      "password" : recUserinfo.password,
      "class" : "user"
    });
    res.send("sign up complete")
    connection.query(`INSERT INTO users VALUES ('${recUserinfo.username}','${recUserinfo.password}', 'user')`, (error) => {
      if (error) throw error;
    });
  } else {
    res.send("someone is using this username")
  }
  });
  
});

app.post('/api/getdocuments',(req, res) => {
  let id = req.body.id;
  connection.query(`SELECT * from documents where title='${id}'`, (error, rows) => {
    if(error) throw error;
    res.send(rows);
  });
  
});
docls = [];

app.post('/api/documents/upload',(req, res)=>{
  let recUserinfo = req.body.value
  connection.query(`SELECT * FROM documents WHERE title='${recUserinfo.title}'`, (error, rows) => {
    if (error) throw error;
    docls = rows;
    if (docls.length === 0) {
      connection.query(`INSERT INTO documents (title, author, time, content, type) VALUES ('${recUserinfo.title}', '${recUserinfo.author}', '${recUserinfo.time}', '${recUserinfo.content}','${recUserinfo.type}')`, (error, rows) => {
        if (error) throw error;
      })
      res.send(true);
    }  else {
      res.send("title another title")
    }
  });
  
});

app.post('/api/documents/edit',(req, res)=>{
  let recinfo = req.body.value
  connection.query(`UPDATE documents SET time='${recinfo.time}', content='${recinfo.content}', type='${recinfo.type}' WHERE title='${recinfo.title}'`, (error, rows) => {
    if(error) throw error;
    res.send(true);
  });
  
});

app.get('/api/documents/showall',(req, res) => {
  connection.query(`SELECT * from documents`, (error, rows) => {
    if(error) throw error;
    res.send(rows);
  });
  
});


app.post('/api/comments/get',(req, res)=>{
  console.log(req.body)
  let recinfo = req.body.id
  connection.query(`SELECT * FROM comments WHERE document='${recinfo}'`, (error, rows) => {
    if (error) throw error;
    res.send(rows)
  });
  
});

app.post('/api/comments/upload',(req, res)=>{
  console.log(req.body.commentInfo)
  let recinfo = req.body.commentInfo
  connection.query(`INSERT INTO comments (author, time, content, document) VALUE ('${recinfo.author}', '${recinfo.time}', '${recinfo.content}', '${recinfo.document}')`, (error) => {
    if (error) throw error;
    res.send(true)
  });
  
});

/*
app.listen(3000, function () {
  console.log('listening on 3000')
}); 
*/

app.listen(3000, '0.0.0.0');

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

//이건 맨 아래에 놓을 것
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});