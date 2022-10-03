import mongoose from "mongoose";

export interface IRecruitmentInputDto {
  agentId: mongoose.Schema.Types.ObjectId;
  projectId: mongoose.Schema.Types.ObjectId;
  workers: Object;
}

export interface IRecruitment extends IRecruitmentInputDto {
  _recId: string;
}
