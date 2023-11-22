// src/index.ts
const express = require('express')
const { nodeGetRequest, nodePostRequest } = require('./helpers')

const app = express()
const port = 8000

app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const result = await nodeGetRequest('/getinfo')

    return res.json(result)
  } catch (error) {
    return res.json(error)
  }
})

app.post('/invoice/add', async (req, res) => {
  try {
    const { value, memo } = req.body

    const result = await nodePostRequest({ value, memo }, `/invoices`)

    return res.json(result)
  } catch (error) {
    return res.json(error)
  }
})

app.post('/invoice/read', async (req, res) => {
  try {
    const { invoice } = req.body

    const result = await nodeGetRequest(`/payreq/${invoice}`)

    return res.json(result)
  } catch (error) {
    return res.json(error)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
