import { Request, Response } from "express";
import responseJSON from "../../../data/response.json"


export const ResController = (req: Request, res: Response) => {

    //@ts-ignore
    let quizPoint = req.QuizPoint;
    //@ts-ignore
    let newsPoint = req.NewsPoint;
    //@ts-ignore
    let gamesPoint = req.GamesPoint;
    //@ts-ignore
    let sectionPoint: number[] = req.SectionPoint
    let sectionId: number[] = []
    let inc = 0

    responseJSON.find((val) => {
        if (val.section_type == "Quiz") {
            //@ts-ignore
            val["Point"] = quizPoint
        } else if (val.section_type == "news") {
            //@ts-ignore
            val["Point"] = newsPoint
        } else if (val.section_type == "games") {
            //@ts-ignore
            val["Point"] = gamesPoint
        }
        else if (val.section_type === "Flight") {
            sectionId.push(val.section_id)
        }
    })
    responseJSON.find((sec) => {
        if (sec.section_type === "Flight") {
            if (sectionId[inc] === sec.section_id) {
                //@ts-ignore
                sec["Point"] = sectionPoint[inc]
                inc++
            }
        }
    })
    return res.json(responseJSON)
}


