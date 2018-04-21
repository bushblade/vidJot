const express = require('express'),
  app = express(),
  exphbs = require('express-handlebars'),
  mongoose = require('mongoose')

//map global promise to remove warning
mongoose.Promise = global.Promise
//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev,', {
    useMongoClient: true
  })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))
//load idea model
require('./models/idea')
const Idea = mongoose.model('ideas')

//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title: title
  })
})

app.get('/about', (req, res) => res.render('about'))

const port = 5000
app.listen(port, () => console.log(`app is listening on port ${port}`))