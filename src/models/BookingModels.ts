import mongoose from "mongoose";
import { IBookInputDTO } from "./../interfaces/IBook";

const bookingSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agents",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    status: {
      type: String,
      default: "empty",
    },
    workers: [],
  },
  { timestamps: true }
);

export default mongoose.model<IBookInputDTO & mongoose.Document>(
  "IBook",
  bookingSchema,
  "booking"
);
