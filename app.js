const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
const headerSCP = require('./headerSCP');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//#region GLOBAL MIDDLEWARES

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set securityHTTP headers
app.use(helmet.contentSecurityPolicy(headerSCP.helmetConfig));

//Configuration for Cross-Origin Resource Sharing
app.use(
  cors({
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
); // Use this after the variable declaration

//Use Morgan for development login.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//100 limit requests from the same IP in 1 hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

//Limit request from same IP
app.use('/api', limiter);

//Data sanitization against NoSQLquery injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//create property for time requests at
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log('Cookie:', req.cookies);
  next();
});
//#endregion

//#region MOUNTING ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//#endregion

//#region ERROR HANDLING
app.use(globalErrorHandler);
//#endregion

module.exports = app;
