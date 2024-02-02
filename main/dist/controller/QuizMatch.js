"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizMatch = void 0;
const response_json_1 = __importDefault(require("../../../data/response.json"));
const QuizMatch = (req, res) => {
    //@ts-ignore
    let quizPoint = req.QuizPoint;
    //@ts-ignore
    let newsPoint = req.NewsPoint;
    //@ts-ignore
    let gamesPoint = req.GamesPoint;
    response_json_1.default.find((val) => {
        if (val.section_type == "Quiz") {
            //@ts-ignore
            val["Point"] = quizPoint;
        }
        else if (val.section_type == "news") {
            //@ts-ignore
            val["Point"] = newsPoint;
        }
        else if (val.section_type == "games") {
            //@ts-ignore
            val["Point"] = gamesPoint;
        }
    });
    return res.json(response_json_1.default);
};
exports.QuizMatch = QuizMatch;
