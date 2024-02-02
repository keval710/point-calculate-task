import express from "express";
import { QuizMatch } from "../controller/QuizMatch";
import { MainFunction } from "../middleware/middleware";
import "../middleware/middleware"


const route = express.Router();


route.get("/", MainFunction, QuizMatch)

// route.get("/point", (req, res, next) => {

//     if (req.params.type === "quiz") {
//         QuizMiddleware(req, res, next);
//         QuizMatch(req, res);
//         // Responses(req, res)
//     }
//     else if (req.params.type === "news") {
//         NewsMachMiddleware(req, res, next);
//         QuizMatch(req, res);
//     }
//     else if (req.params.type === "games") {
//         GamesMatchMiddleware(req, res, next);
//         QuizMatch(req, res);
//     }
//     // else if (req.params.type === "sections") {
//     //     SectionMiddleware(req, res, next);
//     //     SectionMatch(req, res);
//     // }
//     else {
//         return res.status(404).send({ err: "path not found" })
//     }
// })

// route.get("/quiz", QuizMiddleware, QuizMatch)
// route.get("/news", NewsMachMiddleware, NewsMach)
// route.get("/games", GamesMatchMiddleware, GamesMatch)


export default route;