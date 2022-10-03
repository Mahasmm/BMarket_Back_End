import { IProjectInputDTO } from "../interfaces/IProject";
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    ProjectTitle: {
      type: String,
    },
    assignees: [
      {
        assigneeName: {
          type: String,
        },
        assigneeNumber: {
          type: String,
        },
        assigneeEmail: {
          type: String,
        },
      },
    ],
    agents: [
      {
        agentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "agents",
        },
      },
    ],

    booking: [
      {
        bookingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "booking",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IProjectInputDTO & mongoose.Document>(
  "IProject",
  projectSchema,
  "projects"
);
