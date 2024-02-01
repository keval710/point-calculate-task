import express from "express";
import { QuizMatch } from "../controller/QuizMatch";
import { GamesMatchMiddleware, NewsMachMiddleware, QuizMiddleware } from "../middleware/middleware";
import { NewsMach } from "../controller/NewsMatch";
import { GamesMatch } from "../controller/GamesMatch";


const route = express.Router();

route.get("/:type", (req, res, next) => {

    if (req.params.type === "quiz") {
        QuizMiddleware(req, res, next);
        QuizMatch(req, res)
    }
    else if (req.params.type === "news") {
        NewsMachMiddleware(req, res, next);
        NewsMach(req, res)
    }
    else if (req.params.type === "games") {
        GamesMatchMiddleware(req, res, next);
        GamesMatch(req, res)
    }

})

// route.get("/quiz", QuizMiddleware, QuizMatch)
// route.get("/news", NewsMachMiddleware, NewsMach)
// route.get("/games", GamesMatchMiddleware, GamesMatch)


export default route;