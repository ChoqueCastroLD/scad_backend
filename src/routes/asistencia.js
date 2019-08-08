const router = require('express').Router();

// router.get('/asis', function (req, res, next) {
//     req.con.query('SELECT id FROM horarioFijoDetalles', (err, data) => {
//         ret = "";
//         for(let d of data){
//             var date = new Date("February 11, 2019");
//             var endDate = new Date("June 16, 2019");
//             while (date <= endDate)
//             {
//                 if(date.getDay() != 0){
//                     let hora;
//                     if(Math.random()*100 < 90){
//                         hora = 7;
//                     } else {
//                         hora = 6+Math.floor((Math.random() * 2) + 1);
//                     }
//                     let min;
//                     if(Math.random()*100 < 90){
//                         min = Math.floor((Math.random() * 45) + 1);
//                     } else {
//                         min = 40+Math.floor((Math.random() * 15) + 1);
//                     }
//                     let fecha = `2019-${date.getMonth()+1}-${date.getDate()} ${hora}:${min}:00`;
//                     ret += `INSERT INTO asistencia VALUES(0, '${d.id}', '${fecha}', DEFAULT);\n`;
//                 }
//                 date.setDate(date.getDate() + 1);
//             }
//         }

//         res.end(ret);
//     })
// })

router.post('/asistencia', function (req, res, next) {
    req.params.idyfecha = 'DEFAULT';
    req.con.query('INSERT INTO asistencia SET ?', [req.body], (err, data) => {
        if(err) res.json(err);
        else res.json(data);
    });
})

router.put('/asistencia/:id', function (req, res, next) {
    const { id } =req.params;
    req.params.idyfecha = 'DEFAULT';
    req.con.query('UPDATE asistencia SET ? WHERE id=?', [req.body, id], (err, data) => {
        if(err) res.json(err);
        else res.json(data);  
    })
})

router.get('/asistencia', function (req, res, next) {
    req.con.query('SELECT * FROM asistencia', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/asistencia/:id', function (req, res, next) {
    const { id } = req.params;
    req.params.idyfecha = 'DEFAULT';
    req.con.query('SELECT * FROM asistencia WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/asistencia/:id', function (req, res, next) {
    const{ id } =req.params;
    req.params.idyfecha = 'DEFAULT';
    req.con.query('DELETE FROM asistencia WHERE id=?', [id], (err, data) => {
        if(err) res.json(err);
        else res.json({code:200,message:"Eliminado satisfactoriamente"});
    })
})

router.get('/asistencia/instructor/:id_persona/dia/:dia', function (req, res, next) {
    let hora = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    let { id_persona, dia } = req.params;
    req.con.query("SELECT p.id, IF(TIME(?) < hfd.horaEntrada, 'Temprano', IF(TIME(?) < hfd.horaSalida,'Tarde', 'Falta')) as 'Control', hfd.id as 'id_horarioFijoDetalles', hfd.horaEntrada, hfd.horaSalida, hfd.dia FROM horarioFijoDetalles hfd INNER JOIN horarioFijo hf ON hf.id = hfd.id_horarioFijo INNER JOIN instructor i ON i.id = hf.id_instructor INNER JOIN persona p ON p.id = i.id_persona WHERE p.id = ? AND dia = ?", [hora, hora, id_persona, dia], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})


router.get('/asistencia/check/:id', function (req, res, next) {
    let dt = new Date();
    let fecha = dt.getFullYear() + '-' + (dt.getMonth()+1).toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0');
    let { id } = req.params;

    let idyfecha = id+''+fecha;

    req.con.query("select * from asistencia where idyfecha = ?", [idyfecha], (err, data) => {
        if (err) res.json(err);
        else res.json({ esValido: (data.length > 0), idyfecha });
    })
})

// Exportar estas rutas
module.exports = router;