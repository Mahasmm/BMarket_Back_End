import SkillType from "../models/enums/skill-type";

export interface IAgentInputDto {
  NIC: string;
  contactName: string;
  contactNo: string;
  contactEmail: string;
  AvailableWorkerCount: number;
  vaccineReport: string;
  rating: number;
  skillCategory: SkillType;
  availability: string;
  experience: object;
  companyName: string;
  iRating: number;
  password: string;
}

export interface IAgent extends IAgentInputDto {
  _Agentid: string;
}
