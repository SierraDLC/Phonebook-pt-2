const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())


morgan.token('add',(req) => { 
    if (req.method ==='POST')
{ return JSON.stringify(req.body)}

else {return null}

})

app.use(morgan(':method, :url :status :res[content-length] - :response-time ms:add'))

let persons = [
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
      },
      { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
      },
      { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
      },
      { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
      }
]
    app.get('/', (request, response) => {
     response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    let entries = persons.length;
    
    response.send(`Phonebook has info for ${entries} people <br /><br /> ${new Date()}`);
})
  
app.get('/api/persons/:id', morgan("combined"), (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
 
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  
})

app.post('/api/persons',  (request, response) => {
   
    const randoId = Math.floor(Math.random() * 735555556);
   
    const create= request.body;
   
    create.id = randoId;
   
    let createName = create.name;
   
    let whoopsName = persons.find(person => person.name === createName);
   
    let whoopsNum = persons.find(person => person.number === randoId.number);
  
    
    if (whoopsName) {
      return response.status(400).json({ 
        error:" name is not available"  
      })
    }
  
    if (whoopsNum) {
      return response.status(400).json({ 
        error: "number is not available" 
      })
    }

 })

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

