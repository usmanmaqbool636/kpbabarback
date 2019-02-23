const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/usermodel');
const Comment = require('./models/comments');
const cors = require('cors');
// 'mongodb://localhost:27017/kpbabar',
mongoose.connect(
    'mongodb://usman:usman123@ds349175.mlab.com:49175/kpbabar',
    () => {
        console.log('database is connected');
    })


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))  //change false to true if not working
app.use(bodyParser.json())
app.post('/api/register', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((doc) => res.status(200).json(doc))
        .catch(err => res.json(err));
});
app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'working'
    })
})
app.get('/api/comments', (req, res) => {
    Comment.find({}).sort({ createdAt: -1 })
        .then(cmnts => res.status(200).json(cmnts))
        .catch(err => res.json(err))
})
app.post('/api/comment', (req, res) => {
    const comment = new Comment(req.body);
    comment.save()
        .then((doc) => {
            console.log(comment)
            res.status(200).json({ msg: 'Thanks for your Feedback' });
        })
        .catch(err => {
            console.log(err);
            res.send({ err })
        });
    console.log('out of save');
})


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})