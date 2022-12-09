import mongoose from "mongoose";
import { IAgentInputDto } from "../interfaces/IAgent";
// import Workers_schema from "./WorkerModels";
import SkillType from "./enums/skill-type";
import { IWorkersInputDto } from "../interfaces/IWorkers";

const Manpower = new mongoose.Schema(
  {
    NIC: {
      type: String,
    },

    AvailableWorkerCount: {
      type: Number,
    },

    contactName: {
      type: String,
    },

    contactNo: {
      type: String,
    },

    contactEmail: {
      type: String,
    },

    password: {
      type: String,
    },

    vaccineReport: {
      type: String,
    },

    rating: {
      type: Number,
    },

    workers: [
      {
        workerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "workers",
        },
      },
    ],
    projects: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "projects",
        },
      },
    ],
    recruitment: [
      {
        _recruitmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "recruitment",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IAgentInputDto & mongoose.Document>(
  "IAgent",
  Manpower,
  "agents"
);
