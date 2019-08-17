const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request=require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port=process.env.PORT || 3000

//Define paths for express config
const directoryPath = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')

//Setup handlebar view engine into hbs and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)

//Setup static directory to use
app.use(express.static(directoryPath))

hbs.registerPartials(partialDir)



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman Maharjan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Aman Maharjan',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'If you want to get Weather details of some place. Pleace just insert the address of the place',
        title: 'Help',
        name: 'Aman Maharjan'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    

    








app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide the address'
        })
    }
    res.send({ productName: [] })
})


app.get('/help/*', (req, res) => {
    res.render('wrong', {
        title: 'Error',
        name: 'Aman Maharjan',
        errorMessage: 'help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('wrong', {
        title: 'Error',
        name: 'Aman Maharjan',
        errorMessage: 'Page not found!!!'

    })
})
app.listen(port, () => {
    console.log('server started on port '+port)
})


