
const express = require('express')

const {uuid, isUuid} = require('uuidv4')

const app = express()

app.use(express.json())

const projects = []

function logRequests(req,res,next){
    const {method,url} = req

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

function validateProjectId(req,res,next){
    const {id} = req.params

    if(!isUuid(id)){
        return res.status(400).json({error: 'Invalid Project ID'})
    }

    return next()
}

function contaLikes(req,res,next){
    const {likes} = req.body
    const contador = 0
    var i;
    for(i = 0; i++; i = 1 ){
        contador =  contador + 1
    }

    likes = contador;
    
    return next()
}

app.use(logRequests)
app.use('/projects/:id',validateProjectId)

app.get('/projects',(req, res) => {
    const {projetcs} = req.query
    return res.json(projects)
})

app.post('/projects',(req,res) => {
    
    const {title,url,techs,likes} = req.body
    
    const project = {id:uuid(),title,url,techs,likes}
   
    projects.push(project)

    return res.json(project)
})

app.put('/projects/:id',contaLikes,(req,res) => {
    const {id} = req.params
    
    const {title, url, techs, likes} = req.body

    const projectIndex = projects.findIndex(project=>project.id == id)

    if(projectIndex < 0){
        return res.status(400).json({error:'Not Found'})
    }


    const project = {
        id,
        title,
        url,
        techs,
        likes
    }

    projects[projectIndex] = project

    return res.json(project)

})

app.delete('/projects/:id',(req,res) => {
    const {id} = req.params
    
    const projectIndex = projects.findIndex(project=>project.id == id)

    if(projectIndex < 0){
        return res.status(400).json({error:'Not Found'})
    }

    projects.splice(projectIndex,1)

    return res.status(204).send()
})

app.put("/projects/:id/like",(req,res) =>{
    const {id} = req.params

    const projectIndex = projects.findIndex(project=>project.id == id)

    if(projectIndex == -1){
        return res.status(400).json({error:'Not Found'})
    }

    projects[projectIndex].likes += 1

    return res.json(projects[projectIndex])

})

app.listen(3333, () => {
    console.log("O servidor iniciou......")
})