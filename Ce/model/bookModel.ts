import mongoose, { Document, Schema, model } from "mongoose";

interface iKidsD {
  name: string;
  image: string;
  number: number;
  spelling: string;
}

interface iKidsData extends iKidsD, Document {}

const IkidsData = new Schema<iKidsData>(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    number: {
      type: Number,
    },
    spelling: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iKidsData>("kidsData", IkidsData);
