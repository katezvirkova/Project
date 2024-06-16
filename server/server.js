const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const questions = [
  {
    question: "Яка квітка відома як королева квітів?",
    answers: [
      { text: "Тюльпан", correct: false },
      { text: "Нарцис", correct: false },
      { text: "Троянда", correct: true },
      { text: "Лілія", correct: false }
    ]
  },
  {
    question: "Яка квітка символізує мир?",
    answers: [
      { text: "Соняшник", correct: false },
      { text: "Лілія", correct: true },
      { text: "Орхідея", correct: false },
      { text: "Жасмин", correct: false }
    ]
  }
];

const flowers = [
  { id: 1, name: "Троянда", icon: "https://shop.camellia.ua/upload/kamelia_flora/photos/0f/74/1200x1200/37e9832_5cf0f5cfc687a.JPG", description: "Троянда - королева квітів." },
  { id: 2, name: "Лілія", icon: "https://upload.wikimedia.org/wikipedia/commons/5/54/01-Lilium_candidum_madonna_lily.jpg", description: "Лілія - символ чистоти і невинності." },
  { id: 3, name: "Соняшник", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/A_sunflower.jpg", description: "Соняшник символізує мир і гармонію." }
];

app.get('/questions', (req, res) => {
  res.json(questions);
});

app.get('/flowers', (req, res) => {
  res.json(flowers);
});

app.get('/flowers/:id', (req, res) => {
  const flower = flowers.find(f => f.id === parseInt(req.params.id));
  if (flower) {
    res.json(flower);
  } else {
    res.status(404).send('Flower not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
