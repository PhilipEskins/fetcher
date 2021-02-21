const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', 'views') // second option is the folder name
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000)