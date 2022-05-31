/*
    - Query params => meusite.com/user?nome=raquel&age=32 // filtros
    - Route params => /user/2 // buscar, deletar ou atualizar algo específico
    - Request Body => {"name":"raquel", "age:" 32}

    - GET           => Buscar informação no back-end
    - POST          => Criar informação no back-end
    - PUT / PATCH   => Alterar/Aualizar informação no back-end
    - DELETE        => Deletar informação no back-end

*/


const express = require('express')
const uuid = require('uuid')

const port = 3001
const app = express()
app.use(express.json())



const users = [] // cria um array

//MIDDLEWARES
const checkUserId = (request, response, next) => {
    
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    
    if(index < 0){
        return response.status(404).json({error: "User not found"})
    }
    request.userIndex = index
    request.userId = id

    next()
}

// rota get para acessar os dados do array
app.get('/Users/sales/OneDrive/Documentos/code-club-projects/first-project-node',
    (request, response) => {
        return response.json(users)
    })


// rota post para add um usuário
app.post('/Users/sales/OneDrive/Documentos/code-club-projects/first-project-node',
    (request, response) => {
        const { name, age } = request.body // informações chegando pelo body do insominia

        const user = { id: uuid.v4(), name, age } // cria um obj p add um usuário no array users
        // uuid v4 é uma biblioteca q cria uma id...
        // tem q instalar pelo terminal "npm i uuid"
        // dai cria uma variavel pra armazenar, lá em cima ^^^^

        users.push(user) // push add o usuário

        return response.status(201).json(user)
        // retorna o usuário que criei 
        // status 201 p aparecer msg de criado no insominia
    })
//ROTA PARA ATUALIZAR
app.put('/Users/sales/OneDrive/Documentos/code-club-projects/first-project-node/:id',
    checkUserId, (request, response) => {
       
        const { name, age } = request.body // pega os dados digitados no body
        
        const index = request.userIndex
        const id = request.userId

        const updateUser = {id, name, age}

        users[index] = updateUser //add as atualizações no array user na posição atual

        return response.json(updateUser)

    })
 //ROTA PARA DELETAR
 app.delete('/Users/sales/OneDrive/Documentos/code-club-projects/first-project-node/:id',
 checkUserId, (request, response) => {
     
     const index = request.userIndex

     users.splice(index, 1)
     return response.status(204).json()
 })

app.listen(port, () => {
    console.log('Server ok ', port)
})
