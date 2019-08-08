const router = require('express').Router();


router.post('/rol', function (req, res, next) {
    req.con.query('INSERT INTO rol SET ?',[req.body],(err,data)=>{
        if (err) res.json(err);
        else res.json({code:200,messge:"Insertado satisfactoriamente"});
    })
})

router.put('/rol/:id', function (req, res, next) {
    const {id} = req.params;
    req.con.query('UPDATE rol SET ? WHERE id = ? ',[req.body,id],(err,data)=>{
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/rol', function (req, res, next) {
    req.con.query('SELECT * FROM rol', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/rol/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM rol WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/rol/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM rol where id = ?', [id], (err, data) =>{
        if (err) res.json(err);
        else res.json({code:200,messge:"Eliminado satisfactoriamente"});
    })
})

// Exportar estas rutas
module.exports = router;