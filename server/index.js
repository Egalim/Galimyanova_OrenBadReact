import express from "express"
import { router } from "./routes/OrenBad.routes.js"
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})