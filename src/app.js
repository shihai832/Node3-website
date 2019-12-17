const request = require('request')
 const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

//define path Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup statics dir to server
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'shihai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'shihai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        titleText: 'this is a help page',
        title: 'Help',
        name: 'shihai'
    })
})



app.get('/weather', (req, res) => {

    if (!req.query.address) {

        res.send(
            {
                error: 'you must provide an address'
            }
        )
    } else {

        let address = req.query.address

        geocode(address, (error, {latitude,longitude} ={})=>{

            if (error) {
                return  res.send({error})
            }
        
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return  res.send({Error})
                } else {

                res.send(
                    {
                      address: address,  
                      forecast: forecast,
                      data : data
                    }
                )
            }
 
        
        })
    })

    } 
})


app.get('/product', (req, res) => {
    if (!req.query.search) {

        res.send(
            {
                error: 'you must provide a search term'
            }
        )
    } else {
        
        res.send(
            {
                products: []
            }
        )
    }

}) 

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'shihai',
        errorMessage: 'Help artical not found'
    })
  })

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'shihai',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})


