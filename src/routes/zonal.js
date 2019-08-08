const router = require('express').Router();


router.post('/zonal', function (req, res, next) {
    req.con.query('INSERT INTO zonal SET ?', [req.body], (err, data) => {
        if(err) res.json(err);
        else res.json(data);
    });
})

router.put('/zonal/:id', function (req, res, next) {
    const { id} =req.params;
    req.con.query('UPDATE zonal SET ? WHERE id=?', [req.body, id], (err, data) => {
        if(err) res.json(err);
        else res.json(data);  
    })
})

router.get('/zonal', function (req, res, next) {
    req.con.query('SELECT * FROM zonal', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/zonal/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM zonal WHERE id = ', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/zonal/:id', function (req, res, next) {
    const{ id } =req.params;
    req.con.query('DELETE FROM zonal WHERE id=?', [id], (err, data) => {
        if(err) res.json(err);
        else res.json({code:200,message:"Eliminado satisfactoriamente"});
    })
})


// Exportar estas rutas
module.exports = router;