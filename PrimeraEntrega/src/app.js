import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import router from "./api/routes.js";

app.use("/api", router);



const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});

server.on("error", (err) => console.log(err));