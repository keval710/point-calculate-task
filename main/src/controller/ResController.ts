import { Request, Response } from "express";
import responseData from "../../../data/response.json";
import formateJSON from "../../../data/format.json";
import quizJSON from "../../../data/quiz.json";
import sectionJSON from "../../../data/section.json"

export const ResController = (req: Request, res: Response) => {

    //* collect all ID data from body
    const { TopicId, FormateId, SourceId } = req.body as {
        TopicId: number[],
        FormateId: number[],
        SourceId: number[]
    };

    const QuizFunction = (topicId: number[], formateId: number[]): number => {

        let Point: number = 0

        responseData.map((data): void => {
            if (data.section_type == "Quiz") {

                //* stores all id of quiz section
                //@ts-ignore
                let id: number[] = (data.content).map((data): String => data.id);

                //* calculate points if topicId matched
                for (let i: number = 0; i < topicId.length; i++) {
                    quizJSON.map((data): void => {
                        if (data.id == id[i]) {
                            if (topicId.includes(data.topic_id)) {
                                Point += 100  //* content includes topicId
                            }
                        }
                    })
                }

                //* calculate points if formateId matched
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


    const NewsFunction = (topicId: number[], formateId: number[]): number => {

        let Point: number = 0;

        responseData.map((data): void => {
            if (data.section_type == "news") {

                //* check topicId exist
                (data.content).map((contentData: any): void => {
                    if (topicId.includes(contentData.topic_id)) {
                        Point += 100  //* content includes topicId
                    }
                })

                //* check formateId exist
                for (let i: number = 0; i < formateId.length; i++) {
                    formateJSON.map((dataFormat): void => {
                        if (dataFormat.id == formateId[i] && dataFormat.title === "Reading") {
                            Point += 10  //* content includes formateId and title
                        }
                    })
                }
            }
        })

        return Point

    } //* news fun ends here


    const GamesFunction = (formateId: number[]): number => {

        let Point: number = 0

        responseData.map((data): void => {

            if (data.section_type == "games") {

                //* check formateId exist
                for (let i = 0; i < formateId.length; i++) {
                    formateJSON.map((data): void => {
                        if (data.id == formateId[i] && data.title == "Playing") {
                            Point += 10 //* content includes formateId and title 
                        }
                    })
                }
            }
        })

        return Point

    } //* games function ends here


    const CustomSection = (topicId: number[], formateId: number[], sourceId: number[]): number[] => {

        let arr: number[] = [];

        responseData.forEach((section) => {
            let totalPoints: number = 0;

            //* get Flight sections
            if (section.section_type === 'Flight') {
                const content = section.content || [];

                //* for topic_id
                content.forEach((val): void => {
                    for (let i = 0; i < sectionJSON.length; i++) {
                        // @ts-ignore
                        if (sectionJSON[i].id === val.section_id) {
                            if (topicId.includes(sectionJSON[i].topic_id)) {
                                totalPoints += 100 //* content includes topicId
                            }
                        }
                    }
                })

                //* for format_id
                content.forEach((flightContent): void => {
                    //@ts-ignore
                    if (formateId.includes(flightContent.format_id)) {
                        totalPoints += 10
                    }
                });

                //* for source_id
                content.forEach((flightContent): void => {
                    //@ts-ignore
                    if (sourceId.includes(flightContent.source_id)) {
                        totalPoints += 10
                    }
                });

                arr.push(totalPoints)
            }
        });
        return arr

    } //* section fun ends here


    //* fun calling and stores its values in var
    let quizPoint: number = QuizFunction(TopicId, FormateId)
    let newsPoint: number = NewsFunction(TopicId, FormateId)
    let gamesPoint: number = GamesFunction(FormateId)
    let sectionPoint: number[] = CustomSection(TopicId, FormateId, SourceId)


    //* adding points in json response 
    let sectionId: number[] = [];
    let inc = 0

    //* shows points in res
    responseData.forEach((val): void => {
        if (val.section_type == "Quiz") {
            //@ts-ignore
            val["points"] = quizPoint
        }
        else if (val.section_type == "news") {
            //@ts-ignore
            val["points"] = newsPoint
        }
        else if (val.section_type == "games") {
            //@ts-ignore
            val["points"] = gamesPoint
        }
        else if (val.section_type === "Flight") {

            //* all flight section sectionId pushed in array
            sectionId.push(val.section_id)
        }
    })

    //* adding points to each flight section
    responseData.forEach((sec): void => {
        if (sec.section_type === "Flight") {
            if (sectionId[inc] === sec.section_id) {
                //@ts-ignore
                sec["points"] = sectionPoint[inc]
                inc++
            }
        }
    })

    //* sort descending order
    //@ts-ignore
    responseData.sort((a, b) => b.points - a.points);

    //* final output JSON
    return res.json(responseData)
}