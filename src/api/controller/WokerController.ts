import WorkerService from "./../../services/WorkerService";
import { NextFunction, Request, Response, Router } from "express";
import WorkerValidation from "./../../validators/worker";
import { IWorkersInputDto } from "./../../interfaces/IWorkers";
import { IExperienceInputDto } from "./../../interfaces/IExperience";
import { Container } from "typedi";
import logger from "./../../loaders/logger";

const route = Router();

export default (app: Router) => {
  app.use("/b1/worker", route);

  route.post(
    "/:_agentId",
    async (req: Request, res: Response, next: NextFunction) => {
      const agentId = req.params._agentId;

      try {
        await WorkerValidation.validateAsync(req.body);
        const workerService = Container.get(WorkerService);
        const worker = await workerService.createWorker(
          { _id: agentId },
          req.body as IWorkersInputDto
        );
        return res.status(200).json(worker);
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.patch(
    "/:_workerId",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._workerId;
      const update = req.body;

      try {
        const workerService = Container.get(WorkerService);
        const data = await workerService.updateWorker(
          { _id },
          update as IWorkersInputDto,
          { new: true }
        );
        return res.status(201).json({ data });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.delete(
    "/:_workerid",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._workerid;
      try {
        const workerService = Container.get(WorkerService);
        await workerService.deleteWorker({ _id });
        return res.status(201).json("Successfully removed");
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.get(
    "/:_workerId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const workerService = Container.get(WorkerService);
        const { data } = await workerService.getWorker(req.params._workerId);

        return res.status(201).json({ data });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.get(
    "/cat/:_AgentId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const workerService = Container.get(WorkerService);
        const { data } = await workerService.getWorkers(req.params._AgentId);

        return res.status(201).json({ data });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  // Experience

  route.post(
    "/exp/:_workerId",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._workerId;
      const update = req.body;
      console.log("id ", _id);

      try {
        const workerService = Container.get(WorkerService);
        const data = await workerService.updateExperience(
          { _id },
          update as IExperienceInputDto,
          { new: true }
        );
        return res.status(201).json({ data });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
