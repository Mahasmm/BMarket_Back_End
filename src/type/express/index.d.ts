import { Document, Model } from "mongoose";
import { IWorkersInputDto } from "../../interfaces/IWorkers";
import { IAgentInputDto } from "../../interfaces/IAgent";
import { IUserInputDto } from "../../interfaces/IUser";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IAgentInputDto & Document;
      currentWorker: IWorkersInputDto & Document;
      // currentUsers: IUserInputDto & Document;
    }
  }

  namespace Models {
    export type WorkerModel = Model<IWorkersInputDto & Document>;
    export type ManpowerModel = Model<IAgentInputDto & Document>;
    // export type UserModels = Model<IUserInputDto & Document>;
  }
}
