"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QuizMatch_1 = require("../controller/QuizMatch");
const middleware_1 = require("../middleware/middleware");
const NewsMatch_1 = require("../controller/NewsMatch");
const GamesMatch_1 = require("../controller/GamesMatch");
const route = express_1.default.Router();
route.get("/:type", (req, res, next) => {
    if (req.params.type === "quiz") {
        (0, middleware_1.QuizMiddleware)(req, res, next);
        (0, QuizMatch_1.QuizMatch)(req, res);
    }
    else if (req.params.type === "news") {
        (0, middleware_1.NewsMachMiddleware)(req, res, next);
        (0, NewsMatch_1.NewsMach)(req, res);
    }
    else if (req.params.type === "games") {
        (0, middleware_1.GamesMatchMiddleware)(req, res, next);
        (0, GamesMatch_1.GamesMatch)(req, res);
    }
});
// route.get("/quiz", QuizMiddleware, QuizMatch)
// route.get("/news", NewsMachMiddleware, NewsMach)
// route.get("/games", GamesMatchMiddleware, GamesMatch)
exports.default = route;
