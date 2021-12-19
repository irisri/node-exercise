import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import * as routes from "./routes";

const PORT = 9000;
const app = express();

const router = express.Router();
for (let k in routes) {
	routes[k](router);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5500" }));

app.use("/api", router);
app.all("*", (req, res) =>
	res.status(404).json({ error: `URL [${req.url}] not found` })
);

const server = http.createServer(app);

server.listen(PORT, (err) => {
	if (err) {
		return console.error("Server error: ", err);
	}
	console.log(`Server is listening on ${PORT}`);
});
