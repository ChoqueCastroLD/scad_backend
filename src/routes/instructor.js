const router = require('express').Router();


router.post('/instructor', function(req, res, next) {
    req.con.query('INSERT INTO instructor SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.put('/instructor/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('UPDATE instructor SET ? WHERE id = ? ', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/instructor', function(req, res, next) {
    req.con.query('SELECT * FROM instructor', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/instructor/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM instructor WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/instructor/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM instructor WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, messge: "Eliminado satisfactoriamente" });
    })
})

// Exportar estas rutas
module.exports = router;