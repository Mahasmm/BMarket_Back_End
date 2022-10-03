import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ expressApp }: { expressApp: any }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const workersModel = {
    name: "workerModel",
    model: require("../models/WorkerModels").default,
  };

  const agentModel = {
    name: "agentModel",
    model: require("../models/AgentModels").default,
  };

  const companyModel = {
    name: "companyModel",
    model: require("../models/CompanyModels").default,
  };

  const projectModel = {
    name: "projectModel",
    model: require("../models/ProjectModels").default,
  };

  const recruitmentModel = {
    name: "recruitmentModel",
    model: require("../models/RecruitmentModels").default,
  };

  const bookingModel = {
    name: "bookingModel",
    model: require("../models/BookingModels").default,
  };
  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      workersModel,
      agentModel,
      companyModel,
      projectModel,
      recruitmentModel,
      bookingModel,
    ],
  });

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
