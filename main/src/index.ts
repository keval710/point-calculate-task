import express, { Express } from "express"
import Route from "./routes/router";

const app: Express = express();

app.use(express.json());
app.use(Route);


app.listen(5000, () => console.log(`server is running on port 5000`))