import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.listen(process.env.PORT, () =>
  console.log(`example app listening on port ${process.env.PORT}`)
)

app.get('/users', (req, res) => {
  return res.send(database.users)
})

app.get('/users/:userId', (req, res) => {
  const user = database.users.find(user => user.id == req.params.userId)
  return res.send(user)
})

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method')
})

app.post('/users/newuser', (req, res) => {
  console.log('Received a new user post request')
  return res.send('Received a new user post request')
})

const database = {
  users: [],
}

const sampleUserNames = ['eckm', 'cbrue']
let userId = 0

sampleUserNames.forEach(userName => {
  userId++
  database.users.push({ id: userId, name: userName })
})
