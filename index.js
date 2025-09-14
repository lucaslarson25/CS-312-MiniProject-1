const express = require('express');
const app = express();

app.use(express.json());

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))

posts = [{title: 'First Post!', author: 'Lucas Larson', text: 'Check out this new post I made! Try to make your own too!', timestamp: Date.now()}]

app.get('/', (req, res) => {
    res.render("index.ejs", {posts})
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})
