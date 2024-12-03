import { Router } from "express";
import StudentModel from "../models/student.js";

const router = Router();


router.get('/', (req, res) => res.redirect('/students'));

router.get('/students', async (req, res) => {
    try {
       // const students = await StudentModel.getStudents()
    
        res.render('students/index')
    } catch (error) {
        res.send(error)
    }
})




export default router

