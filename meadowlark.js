const express = require('express')
const app = express()
const { create } = require('express-handlebars')

const hbs = create({
    defaultLayout: 'main',
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

const fortune = require('./lib/fortune')

const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
]

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: fortune.getFortune })
})
// 404 handler
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
