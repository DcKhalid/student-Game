import { Request, Response } from "express";
import IkidsData from "../model/bookModel";
export const createKidData = async (req: Request, res: Response) => {
  try {
    const { name, image, spelling, number } = req.body;

    const kidsDat = await IkidsData.create({
      name,
      image,
      spelling,
      number,
    });
    res.status(201).json({
      message: "Data created",
      data: kidsDat,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
    });
  }
};

export const viewKidsData = async (req: Request, res: Response) => {
  try {
    const get = await IkidsData.find();
    res.status(200).json({
      message: "Data gotten",
      data: get,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
    });
  }
};

export const viewsortData = async (req: Request, res: Response) => {
  try {
    const kids = await IkidsData.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Data gotten",
      data: kids,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
