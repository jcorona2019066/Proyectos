//Inicio de nuestra aplicacion es decir el cerebro ya que es quien nos corre la aplicacion 
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./keys');

// Inicializadores
const app = express();
require('./lib/passport');

// Herramientas
app.set('puerto', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
})) 
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'UsuarioCreado',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Variables globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// rutas
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/usuarios', require('./routes/estados'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Inicio y quien nos indica por que puerto esta conectada nuestro proyecto
app.listen(app.get('puerto'), () => {
  console.log('Servidor activo en el puerto', app.get('puerto'));
});
