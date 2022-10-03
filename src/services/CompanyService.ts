import { IBook, IBookInputDTO } from "./../interfaces/IBook";
import { Inject, Service } from "typedi";
import { ICompanyInputDTO, ICompany } from "../interfaces/ICompany";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

@Service()
export default class CompanyService {
  constructor(
    @Inject("companyModel") private companyModel,
    @Inject("bookingModel") private bookingModel,
    @Inject("projectModel") private projectModel,
    @Inject("logger") private logger: any
  ) {}

  public async createCompany(
    companyDto: ICompanyInputDTO
  ): Promise<{ companyId: string }> {
    const company = await this.companyModel.create({
      ...companyDto,
    });
    return { companyId: company._id };
  }

  public async getCompanies() {
    return await this.companyModel.find();
  }

  public async getCompany(
    query: FilterQuery<ICompany>
  ): Promise<{ company: ICompany }> {
    return await this.companyModel.findById(query);
  }

  // public async createProject(query, update, options) {
  //   const project = await this.companyModel.findOneAndUpdate(query, {
  //     $push: {
  //       projects: update,
  //     },
  //     options,
  //   });

  //   return project.projects;
  // }

  public async getProjects(query): Promise<{ project: object }> {
    const project = await this.companyModel
      .findOne(query, {
        projects: 1,
        _id: 0,
      })
      .populate({
        path: "projects",
        populate: [{ path: "projectId", model: "IProject" }],
      });

    return project;
  }

  public async createBooking(
    query,
    bookingDto: UpdateQuery<IBookInputDTO>
  ): Promise<{ booking: IBook }> {
    const booking = await this.bookingModel.create({
      ...bookingDto,
    });

    await this.projectModel.findOneAndUpdate(query, {
      $push: {
        booking: { bookingId: booking._id },
      },
    });

    return booking;
  }
}
