const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'Apoorva Gupta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About me',
        'name': 'Apoorva Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help Desk',
        'message': 'This is a help message, I am learning express.js and its quite interesting.',
        'name': 'Apoorva Gupta'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
           
        forecast( latitude, longitude  , (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
            
        })
    })
    
   
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        'title': 'Page Not Found',
        'name': 'Apoorva Gupta',
        'message': 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('pagenotfound', {
        'title': 'Page Not Found',
        'name': 'Apoorva Gupta',
        'message': 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})