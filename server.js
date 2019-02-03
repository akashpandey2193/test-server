const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
//sets view engine and res.render(component, paramas)
hbs.registerHelper('getCurrentYear', () => {
    return  new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs')


app.use((req,res, next)=> {
    const now = new Date().toString();

    const log = `${now} ${req.url} ${req.method}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to log');
        }
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// })

app.use(express.static(__dirname+'/public'));

app.get('/', (req,res)=> {
    // res.send('<h1>I was Hit express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Aboutss Page',
        welcomeMessage: ' Welcome',
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});


app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Bad Request'
    })
})

app.listen(`${port}`,() => {
    console.log('Server running on '+ port);
});