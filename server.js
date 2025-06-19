import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send('Answer Users! (POST)')
})

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.json(req.body)
})

app.delete('/users/:id', async (req,res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado com Sucesso!'})
})

app.get('/users', async (req, res) =>{
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else{
        
    }

    res.json(users)
})

app.listen(3000)