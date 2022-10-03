import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import logger from "./../../loaders/logger";
import { IProjectInputDTO } from "./../../interfaces/IProject";
import ProjectService from "./../../services/ProjectService";
import projectValidation from "./../../validators/project";

const route = Router();

export default (app: Router) => {
  app.use("/b1/project", route);

  route.post(
    "/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const companyId = req.params._id;
        await projectValidation.validateAsync(req.body);
        // console.log("result", result);

        const projectService = Container.get(ProjectService);
        const { projectId } = await projectService.createProject(
          { _id: companyId },
          req.body as IProjectInputDTO
        );

        return res.status(200).json(projectId);
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectService = Container.get(ProjectService);
      const { projects } = await projectService.getProjects();

      return res.status(200).json(projects);
    } catch (e) {
      logger.error("🔥 error: %o can not get projects ", e);
      return next(e);
    }
  });

  route.get(
    "/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectId = req.params._id;
        const projectService = Container.get(ProjectService);
        const { project } = await projectService.getProject({
          _id: projectId,
        });

        return res.status(200).json(project);
      } catch (e) {
        logger.error("🔥 error: %o can not get project ", e);
        return next(e);
      }
    }
  );
};
