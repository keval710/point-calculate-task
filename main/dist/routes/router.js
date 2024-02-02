"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QuizMatch_1 = require("../controller/QuizMatch");
const middleware_1 = require("../middleware/middleware");
require("../middleware/middleware");
const route = express_1.default.Router();
route.get("/", middleware_1.MainFunction, QuizMatch_1.QuizMatch);
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
exports.default = route;
