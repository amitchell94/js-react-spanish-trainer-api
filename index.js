const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
// app.use(requestLogger);

let words = [
  { id: 1, enInfinitive: "to walk", esInfinitive: "caminar" },
  { id: 2, enInfinitive: "to fly", esInfinitive: "volar" },
];

app.get("/api/words", (request, response) => {
  response.json(words);
});

app.post("/api/words", (request, response) => {
  const body = request.body;
  const newWord = {
      id: Number(words.length + 1),
    enInfinitive: body.enInfinitive,
    esInfinitive: body.esInfinitive,
  };
  console.log(newWord)
  words = words.concat(newWord);
  response.status(200);
});

app.delete("/api/words/:id", (request, response) => {
  console.log(request.params.id)
    words = words.filter(w => w.id !== Number(request.params.id))
    console.log(words)
    response.status(200)
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
