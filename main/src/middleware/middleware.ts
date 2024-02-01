import { NextFunction, Request, Response } from "express";
import responseData from "../data/response.json"
import formateJSON from "../data/format.json"
import quizJSON from "../data/quiz.json"

export const QuizMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let Point: number = 0

    const { FormateId } = req.body;

    responseData.map((data): void => {
        if (data.section_type == "Quiz") {

            //@ts-ignore
            let id: number[] = (data.content).map((data): String => data.id);


            for (let i = 0; i < id.length; i++) {

                quizJSON.map((data) => {
                    if (data.id == id[i]) {
                        Point = Point + 100
                    }
                })
            }

            for (let i = 0; i < FormateId.length; i++) {

                formateJSON.map((data) => {
                    if (data.id == FormateId[i]) {
                        if (data.title == "Playing" || data.title == "Self-practicing") {
                            console.log("val");
                            Point = Point + 10
                        }
                    }
                })
            }

        }
    })


    if (Point) {
        //@ts-ignore
        req.point = Point
        next();
    }

}


export const NewsMachMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { TopicId, FormateId } = req.body

    let TotalPoint: number = 0;

    responseData.map((data) => {
        if (data.section_type == "news") {
            (data.content).map((contentData: any) => {
                // console.log(contentData.topic_id);

                for (let i = 0; i < TopicId.length; i++) {

                    if (contentData.topic_id == TopicId[i]) {
                        TotalPoint = TotalPoint + 100
                    }
                }
            })

            for (let i = 0; i < FormateId.length; i++) {

                formateJSON.map((dataFormat) => {
                    if (dataFormat.id == FormateId[i] && dataFormat.title === "Reading") {
                        TotalPoint = TotalPoint + 10
                    }
                })

            }
        }
    })

    // console.log(`News total point = ${TotalPoint}`);
    if (TotalPoint) {
        //@ts-ignore
        req.point = TotalPoint;
        next();
    }

}

export const GamesMatchMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { FormateId } = req.body

    let TotalPoint: number = 0

    responseData.map((data): void => {

        if (data.section_type == "games") {

            for (let i = 0; i < FormateId.length; i++) {

                formateJSON.map(data => {
                    if (data.id == FormateId[i] && data.title == "Playing") {
                        TotalPoint = TotalPoint + 10
                    }
                })
            }
        }

    })


    //@ts-ignore
    req.point = TotalPoint;
    next();

}