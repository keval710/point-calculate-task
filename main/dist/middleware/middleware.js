"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainFunction = void 0;
const response_json_1 = __importDefault(require("../../../data/response.json"));
const format_json_1 = __importDefault(require("../../../data/format.json"));
const quiz_json_1 = __importDefault(require("../../../data/quiz.json"));
const custom_items_json_1 = __importDefault(require("../../../data/custom-items.json"));
const MainFunction = (req, res, next) => {
    const { TopicId, FormateId, SourceId } = req.body;
    const QuizMiddleware = (topicId, formateId) => {
        let Point = 0;
        response_json_1.default.map((data) => {
            if (data.section_type == "Quiz") {
                //@ts-ignore
                let id = (data.content).map((data) => data.id);
                for (let i = 0; i < topicId.length; i++) {
                    quiz_json_1.default.map((data) => {
                        if (data.id == id[i]) {
                            topicId.find((val) => {
                                if (data.topic_id == val) {
                                    Point += 100;
                                }
                            });
                        }
                    });
                }
                for (let i = 0; i < formateId.length; i++) {
                    format_json_1.default.map((data) => {
                        if (data.id == formateId[i]) {
                            if (data.title == "Playing" || data.title == "Self-practicing") {
                                Point += 10;
                            }
                        }
                    });
                }
            }
        });
        return Point;
    };
    const NewsMachMiddleware = (topicId, formateId) => {
        let Point = 0;
        response_json_1.default.map((data) => {
            if (data.section_type == "news") {
                (data.content).map((contentData) => {
                    for (let i = 0; i < topicId.length; i++) {
                        if (contentData.topic_id == topicId[i]) {
                            Point += 100;
                        }
                    }
                });
                for (let i = 0; i < formateId.length; i++) {
                    format_json_1.default.map((dataFormat) => {
                        if (dataFormat.id == formateId[i] && dataFormat.title === "Reading") {
                            Point += 10;
                        }
                    });
                }
            }
        });
        return Point;
    };
    const GamesMatchMiddleware = (formateId) => {
        let Point = 0;
        response_json_1.default.map((data) => {
            if (data.section_type == "games") {
                for (let i = 0; i < formateId.length; i++) {
                    format_json_1.default.map(data => {
                        if (data.id == formateId[i] && data.title == "Playing") {
                            Point += 10;
                        }
                    });
                }
            }
        });
        return Point;
    };
    const SectionMiddleware = (topicId, formateId, SourceId) => {
        let firstPoint = 0;
        let secondPoint = 0;
        let thirdPoint = 0;
        let forthPoint = 0;
        let arr = [];
        custom_items_json_1.default.forEach((data) => {
            // console.log(data.id);
        });
    };
    let quizPoint = QuizMiddleware(TopicId, FormateId);
    let newsPoint = NewsMachMiddleware(TopicId, FormateId);
    let gamePoint = GamesMatchMiddleware(FormateId);
    let sectionPoint = SectionMiddleware(TopicId, FormateId, SourceId);
    //@ts-ignore
    req.QuizPoint = quizPoint;
    //@ts-ignore
    req.NewsPoint = newsPoint;
    //@ts-ignore
    req.GamesPoint = gamePoint;
    next();
};
exports.MainFunction = MainFunction;
