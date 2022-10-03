import { Router } from "express";
import ManpowerController from "./controller/AgentController";
import WokerController from "./controller/WokerController";
import ProjectController from "./controller/ProjectController";
import CompanyController from "./controller/CompanyController";
import RecruitmentController from "./controller/RecruitmentController";

export default () => {
  const app = Router();
  ManpowerController(app);
  WokerController(app);
  ProjectController(app);
  CompanyController(app);
  RecruitmentController(app);

  return app;
};
