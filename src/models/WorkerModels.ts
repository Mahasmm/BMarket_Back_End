import mongoose from "mongoose";
import SkillType from "./enums/skill-type";
import { IWorkersInputDto } from "../interfaces/IWorkers";

const Workers = new mongoose.Schema(
  {
    availability: {
      type: Boolean,
      index: true,
      default: true,
    },

    NIC: {
      type: String,
    },

    skillCategory: {
      type: SkillType,
    },

    experience: [
      {
        iRating: { type: Number },
        companyName: { type: String },
      },
    ],

    contactName: {
      type: String,
    },

    contactNo: {
      type: String,
    },

    contactEmail: {
      type: String,
    },

    vaccineReport: {
      type: String,
    },

    agentId: {
      type: String,
      index: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkersInputDto & mongoose.Document>(
  "IWorker",
  Workers,
  "workers"
);
