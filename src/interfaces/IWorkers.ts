import SkillType from "../models/enums/skill-type";
import mongoose from "mongoose";

export interface IWorkersInputDto {
  NIC: string;
  contactName: string;
  contactNo: string;
  contactEmail: string;
  skillCategory: SkillType;
  availability: string;
  vaccineReport: string;
  experience: object;
  companyName: string;
  iRating: number;
  rating: number;
  agentId: string;
}

export interface IWorkers extends IWorkersInputDto {
  _WorkerId: string;
}
