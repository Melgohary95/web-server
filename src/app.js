const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode')
const temp = require('./utils/temp')

const app = express()

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mahmoud Elgohary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mahmoud Elgohary'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Mahmoud Elgohary'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            res.send({
                error
            })
        } else {
            temp(latitude, longitude, (error, {temperature, summary, chance} = {}) => {
                if(error){
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        temperature,
                        summary,
                        chance,
                        location
                    })
                }
            })
        }
    })
    // res.send({
    //     location: 'Giza',
    //     forecast: 'Its rainy today',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mahmoud Elgohary',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mahmoud Elgohary',
        errorMsg: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})