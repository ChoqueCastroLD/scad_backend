const router = require('express').Router();


router.post('/horarioFijoDetalles', function(req, res, next) {
    req.con.query('INSERT INTO horarioFijoDetalles SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.put('/horarioFijoDetalles/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('UPDATE horarioFijoDetalles SET ? WHERE id = ? ', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/horarioFijoDetalles', function(req, res, next) {
    req.con.query('SELECT * FROM horarioFijoDetalles', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/horarioFijoDetalles/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM horarioFijoDetalles WHERE id = ?', [id], (err, data) => {

        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/horarioFijoDetalles/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM horarioFijoDetalles WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, messge: "Eliminado satisfactoriamente" });
    })
})

router.get('/horarioFijoDetalles/horarioFijo/:id/dia/:dia', function(req, res, next) {
    const { id, dia } = req.params;
    req.con.query('SELECT * FROM horarioFijoDetalles WHERE id_horarioFijo = ? AND dia = ? ', [id, dia], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})
router.get('/horarioFijoDetalles/dia/:dia/horarioFijo/:id', function(req, res, next) {
    const { id, dia } = req.params;
    req.con.query('SELECT * FROM horarioFijoDetalles WHERE id_horarioFijo = ? AND dia = ? ', [id, dia], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

// Exportar estas rutas
module.exports = router;