"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesMatchMiddleware = exports.NewsMachMiddleware = exports.QuizMiddleware = void 0;
const response_json_1 = __importDefault(require("../data/response.json"));
const format_json_1 = __importDefault(require("../data/format.json"));
const quiz_json_1 = __importDefault(require("../data/quiz.json"));
const QuizMiddleware = (req, res, next) => {
    let Point = 0;
    const { FormateId } = req.body;
    response_json_1.default.map((data) => {
        if (data.section_type == "Quiz") {
            //@ts-ignore
            let id = (data.content).map((data) => data.id);
            for (let i = 0; i < id.length; i++) {
                quiz_json_1.default.map((data) => {
                    if (data.id == id[i]) {
                        Point = Point + 100;
                    }
                });
            }
            for (let i = 0; i < FormateId.length; i++) {
                format_json_1.default.map((data) => {
                    if (data.id == FormateId[i]) {
                        if (data.title == "Playing" || data.title == "Self-practicing") {
                            console.log("val");
                            Point = Point + 10;
                        }
                    }
                });
            }
        }
    });
    if (Point) {
        //@ts-ignore
        req.point = Point;
        next();
    }
};
exports.QuizMiddleware = QuizMiddleware;
const NewsMachMiddleware = (req, res, next) => {
    const { TopicId, FormateId } = req.body;
    let TotalPoint = 0;
    response_json_1.default.map((data) => {
        if (data.section_type == "news") {
            (data.content).map((contentData) => {
                // console.log(contentData.topic_id);
                for (let i = 0; i < TopicId.length; i++) {
                    if (contentData.topic_id == TopicId[i]) {
                        TotalPoint = TotalPoint + 100;
                    }
                }
            });
            for (let i = 0; i < FormateId.length; i++) {
                format_json_1.default.map((dataFormat) => {
                    if (dataFormat.id == FormateId[i] && dataFormat.title === "Reading") {
                        TotalPoint = TotalPoint + 10;
                    }
                });
            }
        }
    });
    // console.log(`News total point = ${TotalPoint}`);
    if (TotalPoint) {
        //@ts-ignore
        req.point = TotalPoint;
        next();
    }
};
exports.NewsMachMiddleware = NewsMachMiddleware;
const GamesMatchMiddleware = (req, res, next) => {
    const { FormateId } = req.body;
    let TotalPoint = 0;
    response_json_1.default.map((data) => {
        if (data.section_type == "games") {
            for (let i = 0; i < FormateId.length; i++) {
                format_json_1.default.map(data => {
                    if (data.id == FormateId[i] && data.title == "Playing") {
                        TotalPoint = TotalPoint + 10;
                    }
                });
            }
        }
    });
    //@ts-ignore
    req.point = TotalPoint;
    next();
};
exports.GamesMatchMiddleware = GamesMatchMiddleware;
