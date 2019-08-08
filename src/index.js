// Modulos
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
// Importe del modelo de Conexion a la Base de Datos

const conexion = require('./model/conn.js'); 

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')));

// Mensajes de Debug

app.use(morgan('dev'));
//manera local funcionar
app.use(cors({
  origin: '*'
}));
//fin manera local

// Parseo de json's

var jsonParser = bodyParser.json();

app.use('*', jsonParser, (req, res, next)=>{
  // Conexion a Base de datos a Express
  req.con = conexion;
  
  if(req.body.id_persona) req.body.id_persona = req.body.id_persona.padStart(9, '0');

  /** Funcion para Encriptar Contraseñas */
  req.encriptar = (id, pass) => crypto.createHmac('sha256', ""+id).update(""+pass).digest('hex');

  next();
})


app.post('/login', function (req, res) {
    let { id_persona, pass } = req.body;
    let clave = req.encriptar(id_persona, pass);
    req.con.query('SELECT id_persona,pass,id_rol FROM superusuario WHERE id_persona = ? AND pass = ?',[id_persona,clave], (err, data) => {
      if (err) return res.json({esValido: false});
      else
        if (data.length > 0)
          return res.json({esValido: true,id_persona: data[0].id_persona, pass: data[0].pass, id_rol: data[0].id_rol});
        else
          return res.json({esValido: false});
    });
})


// Importe de Rutas

fs.readdirSync(path.join(__dirname,'routes')).forEach(name => {
  app.use('/', require(path.join(__dirname,`/routes/${name}`)));
});


// Vista en caso de error

app.use('*', (req, res) => {
  res.status(404).json({code: 404, message: 'Not found'});
})


// Iniciar en el puerto especificado

const server = require('http').createServer(app);
const port = config.app.port || process.env.PORT || 3000;

server.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`) );