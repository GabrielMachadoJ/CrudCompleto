import express from 'express';

const PORT = 3333

const app = express();

app.use(express.json())

app.get('/clients', (req, res) => {
  return res.json({
    "name": "Gabriel Machado",
    "birthday": "15/03/1999",
    "uf": "SC",
    "city": "Tubarão"
})
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))