require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

//connect to mongodb
mongoose.connect(process.env.dbURI)
.then((result) => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// ** Moved port configuration outside**
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));

//register view engine
app.set('view engine','ejs');

//middle ware & static files
app.use((express.static('public')));

app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});


// blog routes
app.use('/blogs',blogRoutes);

//404
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});
