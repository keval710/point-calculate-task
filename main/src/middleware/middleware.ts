import { NextFunction, Request, Response } from "express";
import responseData from "../../../data/response.json";
import formateJSON from "../../../data/format.json";
import quizJSON from "../../../data/quiz.json";



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

        // const { TopicId, FormateId } = req.body

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

        // console.log(`News total point = ${TotalPoint}`);
        // if (TotalPoint >= 0) {
        //     //@ts-ignore
        //     req.newsPoint = TotalPoint;
        //     next();
        // }

        return Point

    }

    const GamesMatchMiddleware = (formateId: string | any[]) => {

        // const { FormateId } = req.body

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


        // if (TotalPoint >= 0) {
        //     //@ts-ignore
        //     req.gamesPoint = TotalPoint;
        //     next();
        // }
        return Point

    }

    let quizPoint = QuizMiddleware(TopicId, FormateId)
    let newsPoint = NewsMachMiddleware(TopicId, FormateId)
    let gamePoint = GamesMatchMiddleware(FormateId)

    // console.log(quizPoint);
    // console.log(newsPoint);
    // console.log(gamePoint);
    //@ts-ignore
    req.QuizPoint = quizPoint;
    //@ts-ignore
    req.NewsPoint = newsPoint
    //@ts-ignore
    req.GamesPoint = gamePoint
    next()



    //  const SectionMiddleware = (req: Request, res: Response, next: NextFunction) => {


    //     const { ItemId, FormateId, SectionId, itemIds, SourceId } = req.body;
    //     let TotalPoint = 0
    //     let countFlight: number = 0
    //     let arr: [] = []


    //     responseData.map((data) => {

    //         if (data.section_type === 'Flight') {

    //             //@ts-ignore
    //             arr.push(data)
    //         }

    //     })

    //     // console.log(arr.length);

    //     for (let i = 0; i < arr.length; i++) {

    //         // console.log(arr[0].content);
    //         //@ts-ignore
    //         let contents
    //         //@ts-ignore
    //         contents = arr[0].content

    //         for (let j = 0; j < arr.length; j++) {

    //             FormateId.map((id: number) => {
    //                 //@ts-ignore
    //                 if (id === contents[j].format_id) {


    //                 }
    //             })
    //             // console.log(contents[j].source_id ==);

    //             break;
    //         }

    //         // (arr[i].content).map((data) => {

    //         //     console.log(data.);

    //         // })
    //         break;


    //     }


    //     // let ItemsIdManual = 0
    //     //@ts-ignore
    //     // for (const iterator of arr) {

    //     //     for (let i = 0; i < itemIds.length; i++) {

    //     //         if (itemIds[ItemsIdManual] === iterator.id) {

    //     //             for (let j = 0; j < FormateId.length; j++) {
    //     //                 if (iterator.format_id === FormateId[j]) {

    //     //                     console.log(FormateId[j]);


    //     //                     // console.log("true");





    //     //                 }
    //     //             }
    //     //             // console.log(iterator)
    //     //             // break;
    //     //             // console.log(true);

    //     //         }




    //     //     }


    //     // }


    //     if (TotalPoint >= 0) {
    //         //@ts-ignore
    //         req.point = TotalPoint;
    //         next();
    //     }
    // }
}