import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.listen(process.env.PORT, () =>
    console.log(`example app listening on port ${process.env.PORT}`)
)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
