const router = require('express').Router();


router.post('/motivos', function(req, res, next) {
    req.con.query('INSERT INTO motivos SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.put('/motivos/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('UPDATE motivos SET ? WHERE id = ? ', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/motivos', function(req, res, next) {
    req.con.query('SELECT * FROM motivos', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/motivos/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM motivos WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/motivos/:id', function(req, res, next) {
        const { id } = req.params;
        req.con.query('DELETE FROM motivos where id = ?', [id], (err, data) => {
            if (err) res.json(err);
            else res.json({ code: 200, messge: "Eliminado satisfactoriamente" });
        })
    })
    //inner joins aparte
router.get('/docentes', (req, res, next) => {
    req.con.query('SELECT inst.id,inst.id_persona,per.nombres,per.apePaterno,per.apeMaterno,car.nombre,inst.id_carrera,per.dni,per.cod_planilla,per.carnetExtranjeria FROM instructor inst INNER JOIN persona per ON per.id = inst.id_persona INNER JOIN carrera car ON car.id = inst.id_carrera', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/docentes/:id_persona', (req, res, next) => {
    const { id_persona } = req.params;
    req.con.query('SELECT inst.id,inst.id_persona,per.nombres,per.apePaterno,per.apeMaterno,car.nombre,inst.id_carrera,per.dni,per.cod_planilla,per.carnetExtranjeria FROM instructor inst INNER JOIN persona per ON per.id = inst.id_persona INNER JOIN carrera car ON car.id = inst.id_carrera WHERE inst.id_persona = ?', [id_persona], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

//superusuario

router.get('/administradores', (req, res, next) => {
    req.con.query('SELECT per.id,per.nombres,per.apePaterno,per.apeMaterno FROM superusuario super INNER JOIN persona per ON per.id = super.id_persona', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

//fin inner joins

// Exportar estas rutas
module.exports = router;