const express= require('express');
const app= express();
require('dotenv').config();
const mongoose= require('mongoose');
const userRoute= require('./routes/user.route')
const indexRoute= require('./routes/index.route')
const PORT= process.env.PORT;
const session= require('express-session')
const DB_URL= process.env.DB_URL;
const passport= require('passport');
require('./config/passport')(passport);


// mongoose.connect(DB_URL,{
//     useUnifiedTopology:true, useNewUrlParser:true
// });

mongoose.connect(DB_URL,{useNewUrlParser:true, useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Database Connection Error"));
db.once('open',()=>{
    console.log("Database Connected Successfully");
});

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(session({
    secret: 'keyd cat',
    resave: false,
    saveUninitialized: true,
  }))

app.use(passport.initialize());
app.use(passport.session());



app.use('/auth', userRoute);

app.use('/', indexRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});


