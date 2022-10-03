import { IWorkersInputDto, IWorkers } from "../interfaces/IWorkers";
import { IExperienceInputDto, IExperience } from "@/interfaces/IExperience";
import { Inject, Service } from "typedi";
import { NextFunction, query, Request, Response } from "express";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
// import Experience from "./../models/WorkerModels";

import { resolve } from "path";

@Service()
export default class RecruitmentService {
  constructor(
    @Inject("companyModel") private companyModel,
    @Inject("agentModel") private agentModel,
    @Inject("recruitmentModel") private recruitmentModel,
    @Inject("logger") private logger: any
  ) {}

  public async createRecruitment(query, recruitmentDto) {
    // const recruitment = await this.recruitmentModel.create({
    //   ...recruitmentDto,
    // });

    const Company = await this.agentModel.findOne(
      {
        _id: "62debfcbd7c6aa416c9078e1",
        // "projects._id": "62e0bb5965f315473816c195",
      },
      { projects: 1 }
    );

    console.log(Company);

    return Company;

    // const CompanyRecruitmentId = await this.companyModel.findOneAndUpdate(
    //   query,
    //   {
    //     $push: {
    //       projects: {
    //         $push: {
    //           recruitment: { recruitmentId: recruitment._id },
    //         },
    //       },
    //     },
    //   },
    //   { new: true }
    // );

    // const AgentRecruitmentId = await this.agentModel.findOneAndUpdate(
    //   { _id: "62debfcbd7c6aa416c9078e1" },
    //   { "projects._id": recruitmentDto.projectId },
    //   {
    //     projects: {
    //       //   _id: recruitmentDto.projectId,

    //       $push: {
    //         recruitment: { recruitmentId: recruitment._id },
    //       },
    //     },
    //   },
    //   { new: true }
    // );

    // console.log(recruitment._id);
  }
}
