import express, { Express } from "express"
import responseJSON from "./data/response.json";
import formateJSON from "./data/format.json"
import quizJSON from "./data/quiz.json"
import { QuizMatch } from "./controller/QuizMatch";
import { NewsMach } from "./controller/NewsMatch";
import { GamesMatch } from "./controller/GamesMatch";
import Route from "./routes/router";

const app: Express = express();

app.use(express.json());
app.use(Route);



// //*called GamesMatch function
// await GamesMatch(responseJSON, formateJSON, FormateId)




app.listen(5000, () => console.log(`server is running on port 5000`))