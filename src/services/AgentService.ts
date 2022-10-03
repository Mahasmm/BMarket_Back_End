import { Inject, Service } from "typedi";
import { IAgentInputDto } from "../interfaces/IAgent";

@Service()
export default class AgentService {
  constructor(
    @Inject("agentModel") private agentModel,
    @Inject("bookingModel") private bookingModel,
    @Inject("recruitmentModel") private recruitmentModel,
    @Inject("workerModel") private workerModel,
    @Inject("logger") private logger: any
  ) {}

  public async CreateAgent(
    agentDto: IAgentInputDto
  ): Promise<{ AgentId: string }> {
    this.logger.silly("Creating manpower agent");
    const manpowerAgent = await this.agentModel.create({
      ...agentDto,
    });

    if (!manpowerAgent) {
      throw new Error("Manpower Agent cannot be created");
    }

    return { AgentId: manpowerAgent._id };
  }

  public async getAgent(id: string): Promise<{ data: IAgentInputDto }> {
    const Agent = (await this.agentModel.findById(id)) as IAgentInputDto;
    return { data: Agent };
  }

  public async getAgents(): Promise<{ data: IAgentInputDto }> {
    const Agents = (await this.agentModel.find()) as IAgentInputDto;
    return { data: Agents };
  }

  public async getBookings(query) {
    const bookings = await this.bookingModel
      .find(query)
      .populate({
        path: "workers",
        model: "IWorker",
      })
      .populate({
        path: "projectId",
        model: "IProject",
      });

    return bookings;
  }

  public async confirmBooking(query, ak) {
    const booking = await this.bookingModel.findOneAndUpdate(
      query,
      {
        status: ak.status,
      },
      { new: true }
    );
    if (booking.status === "Yes") {
      const workersId = [];
      const wrkId = [];
      for (let i = 0; i < booking.workers.length; i++) {
        workersId.push({ _workerId: booking.workers[i] });
        wrkId.push({ _id: booking.workers[i] });
      }
      const recruitment = await this.recruitmentModel.findOneAndUpdate(
        { agentId: booking.agentId, projectId: booking.projectId },
        {
          agentId: booking.agentId,
          projectId: booking.projectId,

          $push: {
            workers: {
              $each: workersId,
            },
          },
        },
        { new: true, upsert: true }
      );

      for (let i = 0; i < booking.workers.length; i++) {
        await this.workerModel.findOneAndUpdate(
          {
            _id: booking.workers[i],
          },
          {
            availability: false,
          }
        );
      }

      await this.agentModel.findOneAndUpdate(
        { _id: booking.agentId },
        {
          $push: {
            recruitment: {
              _recruitmentId: recruitment._id,
            },
          },
        },
        { new: true }
      );
    }
  }

  public async getRecruitment(query) {
    console.log(query);

    const recruitment = await this.recruitmentModel.findOne(query).populate({
      path: "workers",
      populate: [{ path: "_workerId", model: "IWorker" }],
    });

    return recruitment;
  }
}
