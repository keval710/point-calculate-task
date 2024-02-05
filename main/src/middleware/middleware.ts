import { NextFunction, Request, Response } from "express";
import responseData from "../../../data/response.json";
import formateJSON from "../../../data/format.json";
import quizJSON from "../../../data/quiz.json";
import sectionJSON from "../../../data/section.json"



export const MainFunction = (req: Request, res: Response, next: NextFunction) => {

    const { TopicId, FormateId, SourceId } = req.body as {
        TopicId: number[],
        FormateId: number[],
        SourceId: number[]
    };


    const QuizFunction = (topicId: any[], formateId: string | any[]) => {

        let Point: number = 0

        responseData.map((data): void => {
            if (data.section_type == "Quiz") {

                //@ts-ignore
                let id: number[] = (data.content).map((data): String => data.id);

                for (let i: number = 0; i < topicId.length; i++) {
                    quizJSON.map((data) => {
                        if (data.id == id[i]) {
                            if (topicId.includes(data.topic_id)) {
                                Point += 100  //* content includes topicId
                            }
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


    } //* quiz fun ends here


    const NewsFunction = (topicId: any[], formateId: string | any[]) => {

        let Point: number = 0;

        responseData.map((data) => {
            if (data.section_type == "news") {
                (data.content).map((contentData: any) => {
                    if (topicId.includes(contentData.topic_id)) {
                        Point += 100  //* content includes topicId
                    }
                })

                for (let i = 0; i < formateId.length; i++) {
                    formateJSON.map((dataFormat) => {
                        if (dataFormat.id == formateId[i] && dataFormat.title === "Reading") {
                            Point += 10  //* content includes formateId and title
                        }
                    })
                }
            }
        })

        return Point

    } //* news fun ends here


    const GamesFunction = (formateId: string | any[]) => {

        let Point: number = 0

        responseData.map((data): void => {

            if (data.section_type == "games") {
                for (let i = 0; i < formateId.length; i++) {
                    formateJSON.map(data => {
                        if (data.id == formateId[i] && data.title == "Playing") {
                            Point += 10 //* content includes formateId and title 
                        }
                    })
                }
            }
        })

        return Point

    } //* games function ends here


    const CustomSection = (topicId: any[], formateId: string | any[], sourceId: number[]) => {

        let flag: boolean = false;
        let arr: number[] = [];

        responseData.forEach((section) => {
            let totalPoints: number = 0;

            if (section.section_type === 'Flight') {
                const content = section.content || [];

                //* for topic_id
                content.forEach((val) => {
                    for (let i = 0; i < sectionJSON.length; i++) {
                        //@ts-ignore
                        if (sectionJSON[i].id === val.section_id) {
                            if (topicId.includes(sectionJSON[i].topic_id)) {
                                totalPoints += 100 //* content includes topicId
                                flag = true
                            }
                        }
                        if (flag) {
                            break;
                        }
                        flag = false;
                    }
                })

                //* for format_id
                const formatIdExists = content.some((flightContent) =>
                    //@ts-ignore
                    formateId.includes(flightContent.format_id));

                //* for source_id
                const sourceIdExists = content.some((flightContent) =>
                    //@ts-ignore
                    sourceId.includes(flightContent.source_id));

                if (formatIdExists) {
                    totalPoints += 10; //* Content includes formateId
                }

                if (sourceIdExists) {
                    totalPoints += 10; //* Content includes sourceId
                }

                arr.push(totalPoints)
            }

        });

        // console.log(arr);

        return arr
    } //* section fun ends here




    let quizPoint: number = QuizFunction(TopicId, FormateId)
    let newsPoint: number = NewsFunction(TopicId, FormateId)
    let gamePoint: number = GamesFunction(FormateId)
    let sectionPoint: number[] = CustomSection(TopicId, FormateId, SourceId)

    //@ts-ignore
    req.QuizPoint = quizPoint;
    //@ts-ignore
    req.NewsPoint = newsPoint;
    //@ts-ignore
    req.GamesPoint = gamePoint;
    //@ts-ignore
    req.SectionPoint = sectionPoint
    next();
}