import { NextFunction, Request, Response } from "express";
import responseData from "../../../data/response.json";
import formateJSON from "../../../data/format.json";
import quizJSON from "../../../data/quiz.json";
import customJSON from "../../../data/custom-items.json"



export const MainFunction = (req: Request, res: Response, next: NextFunction) => {

    const { TopicId, FormateId, SourceId } = req.body;


    const QuizMiddleware = (topicId: any[], formateId: string | any[]) => {

        let Point: number = 0

        responseData.map((data): void => {
            if (data.section_type == "Quiz") {

                //@ts-ignore
                let id: number[] = (data.content).map((data): String => data.id);

                for (let i = 0; i < topicId.length; i++) {
                    quizJSON.map((data) => {
                        if (data.id == id[i]) {
                            topicId.find((val: number) => {
                                if (data.topic_id == val) {
                                    Point += 100
                                }
                            })
                        }
                    })
                }

                for (let i = 0; i < formateId.length; i++) {
                    formateJSON.map((data) => {
                        if (data.id == formateId[i]) {
                            if (data.title == "Playing" || data.title == "Self-practicing") {
                                Point += 10
                            }
                        }
                    })
                }
            }
        })

        return Point


    }

    const NewsMachMiddleware = (topicId: any[], formateId: string | any[]) => {

        let Point: number = 0;

        responseData.map((data) => {
            if (data.section_type == "news") {
                (data.content).map((contentData: any) => {
                    for (let i = 0; i < topicId.length; i++) {
                        if (contentData.topic_id == topicId[i]) {
                            Point += 100
                        }
                    }
                })

                for (let i = 0; i < formateId.length; i++) {
                    formateJSON.map((dataFormat) => {
                        if (dataFormat.id == formateId[i] && dataFormat.title === "Reading") {
                            Point += 10
                        }
                    })
                }
            }
        })

        return Point

    }

    const GamesMatchMiddleware = (formateId: string | any[]) => {

        let Point: number = 0

        responseData.map((data): void => {

            if (data.section_type == "games") {
                for (let i = 0; i < formateId.length; i++) {
                    formateJSON.map(data => {
                        if (data.id == formateId[i] && data.title == "Playing") {
                            Point += 10
                        }
                    })
                }
            }
        })

        return Point

    }

    const SectionMiddleware = (topicId: any[], formateId: string | any[], SourceId: number[]) => {

        let firstPoint = 0
        let secondPoint = 0
        let thirdPoint = 0
        let forthPoint = 0
        let arr: [] = [];




        customJSON.forEach((data) => {

            
            // console.log(data.id);

        })





    }

    let quizPoint = QuizMiddleware(TopicId, FormateId)
    let newsPoint = NewsMachMiddleware(TopicId, FormateId)
    let gamePoint = GamesMatchMiddleware(FormateId)
    let sectionPoint = SectionMiddleware(TopicId, FormateId, SourceId)

    //@ts-ignore
    req.QuizPoint = quizPoint;
    //@ts-ignore
    req.NewsPoint = newsPoint;
    //@ts-ignore
    req.GamesPoint = gamePoint;
    next()
}