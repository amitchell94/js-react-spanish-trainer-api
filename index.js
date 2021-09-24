const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
// app.use(requestLogger);

let words = [
  { enInfinitive: "to walk", esInfinitive: "caminar" },
  { enInfinitive: "to fly", esInfinitive: "volar" },
];

app.get("/api/words", (request, response) => {
  response.json(words);
});

app.post("/api/words", (request, response) => {
    const body = request.body
    const newWord = {
        enInfinitive: body.enInfinitive,
        esInfinitive: body.esInfinitive,
    }
    words = words.concat(newWord)
    response.status(200);
  });
  

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
