const express = require('express');
const next = require('next');
const port = process.env.SERVER_PORT || 3001;
const dev = process.env.NODE_ENV != 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const mongoose = require("mongoose");

app.prepare().then(async() => {
  const server = express();

  server.use(express.json());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }).then(() => console.log(`[SERVER] Successfully Connected to MongoDB.`))
   .catch((err) => console.log(err));

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`[SERVER] Server has started on port ${process.env.SERVER_PORT || 3001}.`)
  })
})