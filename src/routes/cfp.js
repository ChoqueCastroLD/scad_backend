const router = require('express').Router();


router.post('/cfp', function (req, res, next) {
    req.con.query('INSERT INTO cfp SET ?',[req.body],(err,data)=>{
        if (err) res.json(err);
        else res.json(data);
    })
})

router.put('/cfp/:id', function (req, res, next) {
    const {id} = req.params;
    req.con.query('UPDATE cfp SET ? WHERE id = ? ',[req.body,id],(err,data)=>{
        if (err) res.json(err);
        else res.json(data); 
    })
})

router.get('/cfp', function (req, res, next) {
    req.con.query('SELECT * FROM cfp', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/cfp/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM cfp WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/cfp/:id', function (req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM cfp WHERE id = ?', [id], (err, data) =>{
        if (err) res.json(err);
        else res.json({code:200,messge:"Eliminado satisfactoriamente"});
    })
})

// Exportar estas rutas
module.exports = router;