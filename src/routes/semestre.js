const router = require('express').Router();


router.post('/semestre', function (req, res, next) {
    req.con.query('INSERT INTO semestre SET ?', [req.body], (err, data) => {
        if(err) res.json(err);
        else res.json(data);
    });
})

router.put('/semestre/:id', function (req, res, next) {
    const { id} =req.params;
    req.con.query('UPDATE semestre SET ? WHERE id=?', [req.body, id], (err, data) => {
        if(err) res.json(err);
        else res.json(data);  
    })
})

router.get('/semestre', function (req, res, next) {
    req.con.query('SELECT * FROM semestre', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/semestre/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM semestre WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/semestre/:id', function (req, res, next) {
    const{ id } =req.params;
    req.con.query('DELETE FROM semestre WHERE id=?', [id], (err, data) => {
        if(err) res.json(err);
        else res.json({code:200,message:"Eliminado satisfactoriamente"});
    })
})


// Exportar estas rutas
module.exports = router;