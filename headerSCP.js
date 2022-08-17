const scriptSrcUrls = [
  'https://api.tiles.mapbox.com/',
  'https://api.mapbox.com/',
  'https://cdnjs.cloudflare.com/',
  'https://js.stripe.com/v3',
  'https://js.stripe.com/v3/',
];
const styleSrcUrls = [
  'https://api.mapbox.com/',
  'https://api.tiles.mapbox.com/',
  'https://fonts.googleapis.com/',
];
const connectSrcUrls = [
  'https://api.mapbox.com/',
  'https://a.tiles.mapbox.com/',
  'https://b.tiles.mapbox.com/',
  'https://events.mapbox.com/',
  'ws://127.0.0.1:50435/',
  'http://127.0.0.1:8000/api/v1/users/login',
];
const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const defaultSrcUrls = ['https://js.stripe.com/'];

exports.helmetConfig = {
  directives: {
    defaultSrc: ["'self'", ...defaultSrcUrls],
    connectSrc: ["'self'", ...connectSrcUrls],
    scriptSrc: ["'self'", ...scriptSrcUrls],
    styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
    workerSrc: ["'self'", 'blob:'],
    objectSrc: [],
    imgSrc: ["'self'", 'blob:', 'data:'],
    fontSrc: ["'self'", ...fontSrcUrls],
  },
};
