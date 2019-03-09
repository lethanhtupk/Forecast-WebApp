const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000
//defined the path for express
const staticFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials')
// setup for handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(staticFolder));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Thanh Tu"
    })
})





app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    }
    geocode(req.query.address, (error, {Latitude, Longitude, Location} = {}) => {
        if(error){
            return res.send({error});
        }
            forecast(Latitude, Longitude, (error, forecastData) => {
                if(error){
                    return console.log({error});
                }
                res.send({
                    forecast: forecastData,
                    Location,
                    address: req.query.address
                })
            })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 error",
        errorMessage: "This help article not found",
        name: "Thanh Tu"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 error",
        errorMessage: "Page nout found",
        name: "Thanh Tu"
    })
})


app.listen(port, () => {
    console.log("Server are running and wait in port" + port);
})
