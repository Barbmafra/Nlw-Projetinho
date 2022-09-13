import express from 'express'

const app = express()

//localhost:1456/ads

app.get('/ads', (request, response) => {
    return response.json([
        { id: 1, name: 'Anúncionho 1'},
        { id: 2, name: 'Anúncionho 2'},
        { id: 3, name: 'Anúncionho 3'},
        { id: 4, name: 'Anúncionho 5'},
    ])
})

app.listen(2222)
