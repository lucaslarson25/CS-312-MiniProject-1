const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))

posts = []
postIndex = 0

app.get('/', (req, res) => {
    res.render("index.ejs", {posts})
});

app.post('/posts', (req, res) => {
    const { title, author, text } = req.body;
    postIndex++;
    posts.push({ id: postIndex, title, author, text, timestamp: Date.now() });
    res.redirect('/');
  });

app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    posts = posts.filter(post => post.id != id);
    res.status(200).json({ success: true });
});

app.post('/posts/edit/:id', (req, res) => {
    const id = req.params.id;
    const text = req.body.text;

    const post = posts.find(p => p.id == id);
    if(post) {
        post.text = text;
        post.timestamp = Date.now();
    }

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})
