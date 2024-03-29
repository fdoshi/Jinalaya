if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const ExpressError = require('./utils/expressError');
const methodOverride = require('method-override');
const passport = require('passport');
const pLocal = require('passport-local');
const User = require('./models/user');

//restructuring routes
const bhaktidhamRoutes = require('./routes/bhaktidhams');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');


//DB connetion setup
// 'mongodb://127.0.0.1:27017/jinalaya'
//onst dbUrl = process.env.db;
mongoose.connect('mongodb://127.0.0.1:27017/jinalaya', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.set('strictQuery', false);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

//Configuration for app
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
//sanitize data
app.use(mongoSanitize());

//Session setup for storing data on a browser
const sessionConfig = {
    secret: 'mysecret',
    resave: false,
    saveUninitialize: true,
    // store: new MongoStore({url: secret.db, autoReconnect: true}),
    cookie: {
        // httpOnly: true,
        // secure: true
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

//Flash setup for popup alerts while moving to different page
app.use(flash());

//Passport setup for user authentication (app.use(session()) needs to be befor passport session)
app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
passport.use( new pLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    //console.log(req.session)
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/bhaktidhams', bhaktidhamRoutes);
app.use('/bhaktidhams/:id/reviews', reviewRoutes );
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})