import express from "express";
import cors from "cors";
import router from "./router.js";
import bodyParser from "body-parser";
import ip from "ip";

const app = express();
const ipAdress = ip.address();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://${ipAdress}:${port}`);
});

export default app;