const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs} = request.body;
  const repo = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };
  repositories.push(repo);
  response.send(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  const { title, url, techs } = request.body;
  
  if (repoIndex < 0) {
    return response.status(400).json({error:"Repository not found"});
  }

  const { likes } = repositories[repoIndex];
  const repo = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: likes
  }
  repositories[repoIndex] = repo;
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).json({error:"Repository not found"});
  }

  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  
  if (repoIndex < 0) {
    return response.status(400).json({error:"Repository not found"});
  }

  const { title, url, techs, likes } = repositories[repoIndex];
  const repo = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: likes+1
  }
  repositories[repoIndex] = repo;
  return response.json(repo);
});


module.exports = app;
