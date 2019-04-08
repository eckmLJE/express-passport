import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import passportLocal from 'passport-local'

const app = express()

const database = {
  users: [],
}

const sampleUsers = [
  { username: 'eckm', password: '12345' },
  { username: 'cbrue', password: 'bubbelz' },
]

let userId = 0

function createUser(user) {
  userId++
  database.users.push({
    id: userId,
    username: user.username,
    password: user.password,
  })
}

sampleUsers.forEach(user => {
  createUser(user)
})

const LocalStrategy = passportLocal.Strategy

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  })
)

app.use(cors())

app.listen(process.env.PORT, () =>
  console.log(`example app listening on port ${process.env.PORT}`)
)

app.get('/', (req, res) => {
  const user = req.user
  return res.send(`${user ? user : 'not'} authenticated`)
})

app.get('/users', (req, res) => {
  return res.send(database.users)
})

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false,
  })
)
