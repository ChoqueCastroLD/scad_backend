const router = require('express').Router();


router.post('/persona', function(req, res, next) {
    req.con.query('INSERT INTO persona SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
})

router.put('/persona/:id', function(req, res, next) {
    const { id } = req.params;
    const datos = req.body;
    let id_carrera;
    try {
        id_carrera = req.body.id_carrera;
        delete req.body.id_carrera;
    } catch (error) {}
    req.con.query('UPDATE persona SET ? WHERE id = ?', [req.body, id], (err, data) => {
        req.con.query('UPDATE instructor SET id_carrera = ? WHERE id_persona = ?', [id_carrera, id], (err2, data2) => {
            if (err || err2) res.json(err);
            else res.json({ data1: data, data2: data2, datos: datos, carrera: id_carrera });
        })
    })
})

router.get('/persona', function(req, res, next) {
    req.con.query('SELECT * FROM vista_persona', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})


router.get('/persona/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM vista_persona WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/persona/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM persona WHERE id=?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, message: "Eliminado satisfactoriamente" });
    })
})

router.delete('/persona/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM persona WHERE id=?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, message: "Eliminado satisfactoriamente" });
    })
})

// Exportar estas rutas
module.exports = router;