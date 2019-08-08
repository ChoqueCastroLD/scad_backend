const router = require('express').Router();


router.get('/vista/:tabla', function (req, res, next) {
    let { tabla } = req.params;
    req.con.query('SELECT * FROM vista_'+tabla, (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})


// Exportar estas rutas
module.exports = router;