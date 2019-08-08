const router = require('express').Router();

router.post('/superusuario', function(req, res, next) {
    let { id_persona, pass, id_rol } = req.body;
    let clave = req.encriptar(id_persona, pass);
    req.con.query('INSERT INTO superusuario VALUES(0,?,?,?)', [id_persona, clave, id_rol], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
})

router.put('/superusuario/:id', function(req, res, next) {
    let { id } = req.params;
    let { id_persona, pass } = req.body;
    req.body.pass = req.encriptar(id_persona, pass);
    req.con.query('UPDATE superusuario SET ? WHERE id=?', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/superusuario', function(req, res, next) {
    req.con.query('SELECT * FROM superusuario', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/superusuario/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM superusuario WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/superusuario/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM superusuario WHERE id=?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, message: "Eliminado satisfactoriamente" });
    })
})

router.get('/administrador', function(req, res, next) {
    req.con.query('SELECT per.id as id_persona,sup.id_rol,sup.id as id_usuario,per.nombres,per.apePaterno,per.apeMaterno FROM superusuario sup inner join persona per on sup.id_persona = per.id', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

// Exportar estas rutas
module.exports = router;