import mongoose from "mongoose";

export interface ICompanyInputDTO {
  grade: String;
  companyName: String;
  Address: String;
  contactNumber: String;
  contactEmail: String;
  projects: Object;
  password: string;
}

export interface ICompany extends ICompanyInputDTO {
  _companyId: String;
}
