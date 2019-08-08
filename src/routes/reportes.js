const router = require('express').Router();
const fs = require('fs');
// const client = require("jsreport-client")("http://207.148.28.114:5488/");


const Handlebars = require('handlebars');
var source = fs.readFileSync("./reportes.hbs").toString();
const pdfFrom = require("pdf-from");

/** Devuelve un HTML String */
function generarReporte(json) {
    var template = Handlebars.compile(source);

    let data = json;
    let fecha = new Date();
    data.fecha = fecha.getFullYear()+'-'+(fecha.getMonth()+1).toString().padStart(2,'0')+'-'+fecha.getDate().toString().padStart(2,'0');
    var resultado = template(data);
    
    return resultado;
}
async function generarPDF(data, res) {
    const applicationPdf = await pdfFrom.html(generarReporte(data));
    if (applicationPdf && Buffer.isBuffer(applicationPdf)) {
        res.type("application/pdf");
        res.send(applicationPdf);
    } else {
        res.status(404).send("PDF not found");
    }
}

router.get('/reportes/asistencia/:pdf?', function (req, res, next) {
    let {pdf} = req.params;
    req.con.query(`select id_persona as "ID SENATI", fecha as "Fecha", DATE_FORMAT(horaEntrada, "%h:%i") as "Hora Entrada", DATE_FORMAT(horaSalida, "%h:%i") as "Hora Termino", DATE_FORMAT(hora, "%h:%i") as "Hora de Ingreso", logica as "Control" from vista_asistencia`, (err, datos, campos) => {
        let data = { datos, campos };
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})

router.get('/reportes/asistencia/desde/:desde/hasta/:hasta/:pdf?', function (req, res, next) {
    let {pdf} = req.params;
    const{ desde,hasta } =req.params;
    req.con.query(`select id_persona as "ID SENATI", fecha as "Fecha", DATE_FORMAT(horaEntrada, "%h:%i") as "Hora Entrada", DATE_FORMAT(horaSalida, "%h:%i") as "Hora Termino", DATE_FORMAT(hora, "%h:%i") as "Hora de Ingreso", logica as "Control" from vista_asistencia where Fecha >= ? and Fecha <= ?`,[desde,hasta], (err, datos, campos) => {
        let data = { datos, campos }; 
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})
router.get('/reportes/asistencia/desde/:desde/hasta/:hasta/control/:control/:pdf?', function (req, res, next) {
    let {pdf} = req.params;
    const{ desde,hasta,control } =req.params;
    req.con.query(`select id_persona as "ID SENATI", fecha as "Fecha", DATE_FORMAT(horaEntrada, "%h:%i") as "Hora Entrada", DATE_FORMAT(horaSalida, "%h:%i") as "Hora Termino", DATE_FORMAT(hora, "%h:%i") as "Hora de Ingreso", logica as "Control" from vista_asistencia where Fecha >= ? and Fecha <= ? and Logica = ?`,[desde,hasta,control], (err, datos, campos) => {
        let data = { datos, campos };
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})
router.get('/reportes/asistencia/control/:control/:pdf?', function (req, res, next) {
    let {pdf} = req.params;
    const{ control } = req.params;
    req.con.query(`select id_persona as "ID SENATI", fecha as "Fecha", DATE_FORMAT(horaEntrada, "%h:%i") as "Hora Entrada", DATE_FORMAT(horaSalida, "%h:%i") as "Hora Termino", DATE_FORMAT(hora, "%h:%i") as "Hora de Ingreso", logica as "Control" from vista_asistencia where Logica = ?`,[control], (err, datos, campos) => {
        let data = { datos, campos };
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})

//prueba falta inner /falta probar :´v
router.get('/reportes/aula/id/:id/:pdf?',function(req,res,next){
    let {pdf} = req.params;
    const{id}=req.params;
    req.con.query(`SELECT pre.id as "Numero Orden", pre.id_persona as "Numero de personal", pre.texto as "Ubicacion" FROM presente pre inner join persona per ON pre.id_persona=per.id WHERE id_persona=?`,[id],(err,datos,campos)=>{
        let data={datos,campos};  
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
    
})
// prueba dos choque no me pegues pe :,v
router.get('/reportes/aula/.pdf?',function(req,res,next){
    let {pdf} = req.params;
    req.con.query(`SELECT id as "Numero Orden",id_persona as "Numero de personal",texto as "Ubicacion" FROM presente `,(err,datos,campos)=>{
        let data={datos,campos};
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
    
})
//prueba 3 falta inner /falta probar :´v 
router.get('/reportes/permisos/:pdf?', function(req,res,next){
    const {pdf} = req.params;
    req.con.query(`SELECT * from vista_reportepermiso`,(err,datos,campos)=>{
        let data={datos,campos};
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });        
})

//prueba 4 falta inner /falta probar :´v
router.get('/reportes/permisos/entregado/:id/:pdf?',function(req,res,next){
    let {pdf} = req.params;
    const{id}=req.params;
    req.con.query(`select * from vista_reportepermiso WHERE id_entregado=?`,[id],(err,datos,campos)=>{
        let data={datos,campos};
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})
router.get('/reportes/permisos/otorgado/:id/:pdf?',function(req,res,next){
    let {pdf} = req.params;
    const{id}=req.params;
    req.con.query(`select * from vista_reportepermiso WHERE id_otorgado=?`,[id],(err,datos,campos)=>{
        let data={datos,campos};
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})

//recuperacion
router.get('/reportes/recuperacion/:pdf?',function(req,res,next){
    let {pdf} = req.params;
    req.con.query(`SELECT id as "Numero de recuperacion", fecha as "Fecha de recuperacion" , horaIngreso as "Ingreso" , horaSalida as "Salida" from asistenciaRecuperacion`,(err,datos,campos)=>{
        let data={datos,campos};
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})

router.get('/reportes/recuperacion/id/:id/:pdf?',function(req,res,next){
    let {pdf} = req.params;
    const {id}=req.params;
    req.con.query(`SELECT id as "Numero de recuperacion", fecha as "Fecha de recuperacion" , horaIngreso as "Ingreso" , horaSalida as "Salida" from asistenciaRecuperacion WHERE id=? `,[id],(err,datos,campos)=>{
        let data={datos,campos};
        new Promise((resolve, reject) => {
            if(pdf) generarPDF(data, res);
            else res.send(generarReporte(data));
        }).finally(()=>res.end())
    });
})





// Exportar estas rutas
module.exports = router;