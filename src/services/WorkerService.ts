import { IWorkersInputDto, IWorkers } from "../interfaces/IWorkers";
import { IExperienceInputDto, IExperience } from "@/interfaces/IExperience";
import { Inject, Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
// import Experience from "./../models/WorkerModels";

import { resolve } from "path";

@Service()
export default class WorkerService {
  constructor(
    @Inject("workerModel") private workerModel,
    @Inject("agentModel") private agentModel,
    @Inject("logger") private logger: any
  ) {}
  public async createWorker(
    query,
    workerDTO: UpdateQuery<IWorkers>
  ): Promise<{ worker: String }> {
    this.logger.silly("Creating worker");
    const worker = await this.workerModel.create({
      ...workerDTO,
    });

    if (!worker) {
      throw new Error("Worker cannot be created");
    }

    await this.agentModel.findOneAndUpdate(query, {
      $push: {
        workers: { workerId: worker._id },
      },
    });

    return { worker: worker._id };
  }

  public async updateWorker(
    query: FilterQuery<IWorkers>,
    update: UpdateQuery<IWorkers>,
    options: QueryOptions
  ) {
    // return this.agentModel.findOneAndUpdate(query, update, options);
    // await this.workerModel.findOneAndUpdate(
    //   { "workers._id": query },
    //   {
    //     $set: {
    //       "workers.$": update,
    //     },
    //   },
    //   options
    // );

    return await this.workerModel.findOneAndUpdate(query, update, options);
  }

  public async getWorker(id: string): Promise<{ data: IWorkers }> {
    const worker = (await this.workerModel.findById(id)) as IWorkers;
    return { data: worker };
  }

  public async getWorkers(id: string): Promise<{ data: IWorkers }> {
    const worker = (await this.workerModel.find({ agentId: id })) as IWorkers;
    return { data: worker };
  }

  public async deleteWorker(query: FilterQuery<IWorkers>) {
    return this.workerModel.deleteOne(query);
  }

  //Experience

  public async updateExperience(
    query: FilterQuery<IExperience>,
    update: UpdateQuery<IExperience>,
    options: QueryOptions
  ) {
    // let newExperience = new Experience(update);
    // newExperience = await newExperience.save();
    // console.log("new ", newExperience);
    console.log("update ", update);

    // const data = await this.workerModel.updateOne(
    //   { _id: query },
    //   {
    //     $push: {
    //       experience: newExperience,
    //     },
    //   }
    // );

    const data = await this.workerModel.findOneAndUpdate(query, {
      $push: {
        experience: update,
      },
      options,
    });

    // return this.workerModel.findOneAndUpdate(query, update, options);
    return data;
  }
}
