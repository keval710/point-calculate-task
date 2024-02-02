import { Request, Response } from "express";
import responseJSON from "../../../data/response.json"


export const QuizMatch = (req: Request, res: Response) => {

    //@ts-ignore
    let quizPoint = req.QuizPoint;
    //@ts-ignore
    let newsPoint = req.NewsPoint;
    //@ts-ignore
    let gamesPoint = req.GamesPoint;




    responseJSON.find((val) => {
        if (val.section_type == "Quiz") {
            //@ts-ignore
            val["Point"] = quizPoint
        }
        else if (val.section_type == "news") {
            //@ts-ignore
            val["Point"] = newsPoint
        }
        else if (val.section_type == "games") {
            //@ts-ignore
            val["Point"] = gamesPoint
        }
    })


    return res.json(responseJSON)
    
}


