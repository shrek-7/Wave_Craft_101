import express from "express";

const app = express()
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { getPromptsFromOpenAI, getHashTagsFromOpenAI } from './scriptOpenAI.js';

app.get('/get_tags', async (req, res) => {
  const { summary, count } = req.body;
  let resp = await getHashTagsFromOpenAI(summary, count);
  res.send(resp);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})