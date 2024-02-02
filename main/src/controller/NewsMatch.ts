import { Request, Response } from "express";
import responseJSON from "../../../data/response.json"

export const NewsMach = (req: Request, res: Response) => {

    //@ts-ignores
    let Point = req.point;

    responseJSON.find((val) => {
        if (val.section_type === "news") {

            //@ts-ignore

            val["TotalPoints"] = Point

            return res.json(responseJSON)
        }
    })



}