const router = require('express').Router();

const formatoHorarioFijo = (data) => {
    let ret = data;
    let newData = [];

    ret.forEach(r => {

        if (newData.filter(d => (d.id === r.id)).length == 0) {
            let tmp = {};

            tmp.id = r.id;
            tmp.id_semestre = r.id_semestre;
            tmp.semestre = r.semestre;
            tmp.id_cfp = r.id_cfp;
            tmp.cfp = r.cfp;
            tmp.id_persona = r.id_persona;
            tmp.id_instructor = r.id_instructor;
            tmp.instructor = r.instructor;

            const id = r.id_horarioFijoDetalles;
            const horaIn = r.horaEntrada;
            const horaOut = r.horaSalida;
            const dia = r.dia;

            if (!tmp.lunes) tmp.lunes = [];
            if (!tmp.martes) tmp.martes = [];
            if (!tmp.miercoles) tmp.miercoles = [];
            if (!tmp.jueves) tmp.jueves = [];
            if (!tmp.viernes) tmp.viernes = [];
            if (!tmp.sabado) tmp.sabado = [];
            if (!tmp.domingo) tmp.domingo = [];
            if (dia == 1) {
                tmp.lunes.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 2) {
                tmp.martes.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 3) {
                tmp.miercoles.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 4) {
                tmp.jueves.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 5) {
                tmp.viernes.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 6) {
                tmp.sabado.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 7) {
                tmp.domingo.push({ id: id, in: horaIn, out: horaOut });
            }

            newData.push(tmp);
        } else {
            let tmp = newData.filter(d => (d.id === r.id))[0];


            const id = r.id_horarioFijoDetalles;
            const horaIn = r.horaEntrada;
            const horaOut = r.horaSalida;
            const dia = r.dia;

            if (dia == 1) {
                tmp.lunes.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 2) {
                tmp.martes.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 3) {
                tmp.miercoles.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 4) {
                tmp.jueves.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 5) {
                tmp.viernes.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 6) {
                tmp.sabado.push({ id: id, in: horaIn, out: horaOut });
            }
            if (dia == 7) {
                tmp.domingo.push({ id: id, in: horaIn, out: horaOut });
            }

        }

    });
    return newData;
}

router.post('/horarioFijo', function(req, res, next) {
    req.con.query('INSERT INTO horarioFijo SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
})

router.put('/horarioFijo/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('UPDATE horarioFijo SET ? WHERE id=?', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.delete('/horarioFijo/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('DELETE FROM horarioFijo WHERE id=?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json({ code: 200, message: "Eliminado satisfactoriamente" });
    })
})

router.get('/horarioFijo', function(req, res, next) {
    req.con.query('select * from vista_horario', (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    });
})

router.get('/horarioFijo/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/dia/:dia', function(req, res, next) {
    const { dia } = req.params;
    req.con.query('SELECT * FROM vista_horario WHERE dia = ?', [dia], (err, data) => {
        console.info(data);
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/dia/:dia/instructor/:id_instructor', function(req, res, next) {
    const { dia, id_instructor } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE dia = ? AND id_instructor = ?', [dia, id_instructor], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/instructor/:id_instructor/dia/:dia', function(req, res, next) {
    const { dia, id_instructor } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE dia = ? AND id_instructor = ?', [dia, id_instructor], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/cfp/:cfp', function(req, res, next) {
    const { cfp } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE id_cfp = ?', [cfp], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/cfp/:cfp/instructor/:id_instructor', function(req, res, next) {
    const { cfp, id_instructor } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE id_cfp = ? AND id_instructor = ?', [cfp, id_instructor], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/instructor/:id_instructor', function(req, res, next) {
    const { id_instructor } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE id_instructor = ?', [id_instructor], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horarioFijo/instructor/:id_instructor/cfp/:cfp', function(req, res, next) {
    const { id_instructor, cfp } = req.params;
    req.con.query('SELECT * FROM  vista_horario WHERE id_cfp = ? AND id_instructor = ?', [cfp, id_instructor], (err, data) => {
        if (err) res.json(err);
        else res.json(formatoHorarioFijo(data));
    })
})

router.get('/horario/instructor/:id_instructor', function(req, res, next) {
    const { id_instructor } = req.params;
    req.con.query('SELECT * FROM  horarioFijo where id_instructor = ?', [id_instructor], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

// asistencia recuperacion

router.get('/asistenciaReq', function(req, res, next) {
    req.con.query('SELECT * FROM  asistenciaRecuperacion', (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/asistenciaReq/horD/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM  asistenciaRecuperacion where id_horarioFijoDetalles = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/asistenciaReq/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('SELECT * FROM  asistenciaRecuperacion where id = ?', [id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

router.get('/asistenciaReq/fecha/:fecha?', function(req, res, next) {
    if (req.params.fecha) {
        const {
            fecha
        } = req.params;
        req.con.query(`
        SELECT * FROM asistenciaRecuperacion asisReq inner join horarioFijoDetalles horD ON horD.id = asisReq.id_horarioFijoDetalles WHERE horD.dia = ?
        `, [fecha], (err, data) => {
            if (err) res.json(err);
            else res.json(data);
        })
    } else {
        const dia = new Date().getDay();
        req.con.query(`
        SELECT * FROM asistenciaRecuperacion asisReq inner join horarioFijoDetalles horD ON horD.id = asisReq.id_horarioFijoDetalles WHERE horD.dia = ?
        `, [dia], (err, data) => {
            if (err) res.json(err);
            else res.json(data);
        })
    }
})

router.post('/asistenciaReq', function(req, res, next) {
    req.con.query('INSERT INTO asistenciaRecuperacion SET ?', [req.body], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    });
})

router.put('/asistenciaReq/:id', function(req, res, next) {
    const { id } = req.params;
    req.con.query('UPDATE asistenciaRecuperacion SET ? WHERE id=?', [req.body, id], (err, data) => {
        if (err) res.json(err);
        else res.json(data);
    })
})

// Exportar estas rutas
module.exports = router;