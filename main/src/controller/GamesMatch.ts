import { Request, Response } from "express";
import responseJSON from "../../../data/response.json"

export const GamesMatch = (req: Request, res: Response) => {
    //@ts-ignore
    let Point = req.point;

    responseJSON.find((val) => {
        if (val.section_type === "games") {

            //@ts-ignore
            val["TotalPoints"] = Point

            return res.json(responseJSON)
        }
    })

}