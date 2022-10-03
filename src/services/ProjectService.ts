import { Inject, Service } from "typedi";
import { IProject, IProjectInputDTO } from "./../interfaces/IProject";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { query } from "winston";

@Service()
export default class ProjectService {
  constructor(
    @Inject("projectModel") private projectModel,
    @Inject("companyModel") private companyModel,
    @Inject("logger") private logger: any
  ) {}

  public async createProject(
    query: FilterQuery<IProject>,
    projectDTO: IProjectInputDTO
  ): Promise<{ projectId: string }> {
    this.logger.silly("Creating Project");
    const project = await this.projectModel.create({
      ...projectDTO,
    });

    if (!project) {
      throw new Error("project cannot be created");
    }

    await this.companyModel.findOneAndUpdate(query, {
      $push: {
        projects: { projectId: project._id },
      },
    });

    return { projectId: project._id };
  }

  public async getProjects(): Promise<{ projects: IProject }> {
    const projects = await this.projectModel.find();

    return { projects: projects };
  }

  public async getProject(
    query: FilterQuery<IProject>
  ): Promise<{ project: IProject }> {
    const project = await this.projectModel.findById(query);

    return { project: project };
  }
}
