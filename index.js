const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

// Local imports
const db = require('./database/db.js');
const rout = require('./routes/router.js');
const app = express();

// Use helmet middleware with adjusted Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
            scriptSrc: ["'self'", 'https://js.stripe.com', 'https://www.youtube.com'],
            frameSrc: ["'self'", 'https://js.stripe.com', 'https://maps.google.com/', 'https://www.google.com/', 'https://www.youtube.com'],
            imgSrc: ["'self'", 'https://hamart-shop.vercel.app', 'data:', 'https://lh3.googleusercontent.com', 'http://localhost:4000', 'http://13.51.207.9'],
    },
  })
);


const server = http.createServer(app);
const io = socketIo(server);

// Attach io to the app
app.io = io;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({
  origin: "*", // Replace with your client's origin
  credentials: true, // Enable cookies and other credentials
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10mb' }));

db()
  .then((result) => console.log('Connected to MongoDB !!'))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: true,
    cookie: {
      sameSite: 'None',
      secure: true,
    },
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  req.app.io = io;
  next();
});

// Set template engine
app.set('view engine');

// Base Route
app.use(rout);

// Utilization of environment variables
console.log('Stripe Secret Key: ' + process.env.STRIPE_SECRET_KEY);
console.log('Admin email: ' + process.env.REACT_APP_ADMIN_EMAIL);

// Handle CORS preflight requests
app.options('*', cors());

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  socket.on('notification', (data) => {
    console.log('Received notification:', data);
    io.emit('notification', data);
  });
});

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, '/client/build');

  app.use(express.static(staticPath, {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.set('Content-Type', 'application/javascript');
      }
    },
  }));

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
} else {
  app.get("/",(req,res) => {
    res.send("Api running");
  });
}

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
