const router = require('express').Router();


router.post('/permisos', function(req, res, next) {
    req.con.query('INSERT INTO permisos SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
})

router.put('/permisos/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('UPDATE permisos SET ? WHERE id=?', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/permisos', function(req, res, next) {
    req.con.query('SELECT * FROM permisos', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/permisos/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM permisos WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/permisos/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM permisos WHERE id_permiso=?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, message: "Eliminado satisfactoriamente" });
    })
})

// Exportar estas rutas
module.exports = router;