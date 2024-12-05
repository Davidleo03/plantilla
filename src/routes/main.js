import { Router } from "express";
//import StudentModel from "../models/student.js";
//import  { getStudents } from '../models/student.js'
import db from "../database/main.js";

const router = Router();


router.get('/', (req, res) => res.redirect('/students'));

router.get('/students',(req, res) => {
    db.all('SELECT * FROM Students', (err, rows) => {
        if(err) {
            throw new Error("Ha ocurrido un error: " + err);  
        }
        res.render('students/index', {students: rows});
        
    })  
})



router.get('/student/crear', (req, res) => {
    res.render('students/create')
})


router.post('/editar/student', (req, res) => {
    const { id, nombre, apellido, cedula } = req.body;
    db.run('UPDATE Students SET firstName = ?, lastName = ?,  DNI = ? WHERE id = ?', [nombre, apellido, cedula, id], (err) => {
        if(err) {
            throw err;
        }
        res.redirect('/students')
    })
})

router.get('/student/:id', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM Students WHERE id = ?', [id], (err, rows) => {
        if(err) {
            throw err;
        }
        res.render('students/edit', { student : rows[0]})
    })
}) 

router.post('/crear/student', (req, res) => {
    const { nombre, apellido, cedula } = req.body;
    
    db.run('INSERT INTO Students (firstName, lastName, DNI) VALUES(?, ?, ?)', [nombre, apellido, cedula], (err) => {
        if(err) {
            throw new Error('Error: ' + err)
        }
        res.redirect('/students')
    })
})

router.get('/student/eliminar/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Students WHERE id = ?', [id], (err) => {
        if(err) throw new Error('Error:' + err);
        res.redirect('/students')
    })
})





export default router

