import WorkerService from "./../../services/WorkerService";
import { NextFunction, Request, Response, Router } from "express";
import WorkerValidation from "./../../validators/worker";
import { IWorkersInputDto } from "./../../interfaces/IWorkers";
import { IExperienceInputDto } from "./../../interfaces/IExperience";
import { Container } from "typedi";
import logger from "./../../loaders/logger";
import RecruitmentService from "../../services/RecruitmentService";

const route = Router();

export default (app: Router) => {
  app.use("/b1/recruitment", route);

  route.post(
    "/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const companyId = req.params._id;
        const recruitmentService = await Container.get(RecruitmentService);
        const recruitment = await recruitmentService.createRecruitment(
          { _id: companyId },
          req.body
        );
        return res.status(200).json(recruitment);
      } catch (e) {
        logger.error("🔥 error: %o can not create recruitment details ", e);
        return next(e);
      }
    }
  );
};
