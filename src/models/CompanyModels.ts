import mongoose from "mongoose";
import { ICompanyInputDTO } from "./../interfaces/ICompany";

const companySchema = new mongoose.Schema(
  {
    grade: {
      type: String,
    },
    companyName: {
      type: String,
    },
    Address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    contactEmail: {
      type: String,
      unique: true,
    },
    projects: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "projects",
        },
      },
    ],
    // recruitment: [
    //   {
    //     recruitmentId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "recruitment",
    //     },
    //   },
    // ],
  },

  { timestamps: true }
);

export default mongoose.model<ICompanyInputDTO & mongoose.Document>(
  "ICompany",
  companySchema,
  "company"
);
