const router = require('express').Router();


router.post('/carrera', (req, res, next)=>{	
    req.con.query('INSERT INTO carrera SET ? ',[req.body],(err,data)=>{
        if (err) res.json(err);
        else res.json(data);
    })
})

router.put('/carrera/:id', function (req, res, next) {
    const {id} = req.params;
    req.con.query('UPDATE carrera SET ? WHERE id = ? ',[req.body,id],(err,data)=>{
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/carrera', function (req, res, next) {
    req.con.query('SELECT * from carrera', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/carrera/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM carrera WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/carrera/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM carrera WHERE id = ?', [id], (err, data) =>{
    if (err) res.json(err);
        else res.json({code:200,messge:"Eliminado satisfactoriamente"});
    })
})

// Exportar estas rutas
module.exports = router;
