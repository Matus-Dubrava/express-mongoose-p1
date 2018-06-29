const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Post = require('./models.js');

const app = express();
mongoose.connect('mongodb://localhost/27017');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/add-post', (req, res) => {
  res.render('add-post');
});

app.get('/posts', (req, res) => {
  Post.find()
    .then(doc => {
      res.render('posts', { posts: doc });
    });
});

app.post('/add-post', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date()
  });

  post.save();
  res.redirect('/posts');
});

app.listen(app.get('port'), () => {
  console.log(`Server started at port ${app.get('port')}...`);
});
