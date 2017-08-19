const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



hbs.registerHelper('getYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

// app.use((req,res,next)=>{
//     res.render('maintain.hbs');
// });

app.use(express.static(__dirname + "/public"));

app.use((req,res,next)=>{

    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFileSync('server.log',log + '\n')
    next();

});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        welcomePage: 'Welcome to this Page',
        pageTitle: 'About Page'
    })
});

app.get('/about', (req,res)=>{
    // res.send('This is about page');
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        Error: 'There is some error',
        ErrorMessage: ['many errors comes up',
    'You are not the error'],
    requestOtherPage: 'Thanks for choosing this'
    });
});
app.listen(port, ()=>{
    console.log(`The server is up on ${port}`);
});

