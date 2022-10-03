import mongoose from "mongoose";
import { IRecruitmentInputDto } from "./../interfaces/IRecruitment";

const recruitmentSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agents",
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },

    workers: [
      {
        _workerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "workers",
          unique: true,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IRecruitmentInputDto & mongoose.Document>(
  "IRecruitment",
  recruitmentSchema,
  "recruitment"
);
