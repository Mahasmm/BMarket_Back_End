import { NextFunction, Request, Response, Router } from "express";
import CompanyValidation from "./../../validators/company";
import bookingValidation from "./../../validators/booking";
import { Container } from "typedi";
import logger from "./../../loaders/logger";
import CompanyService from "../../services/CompanyService";
import { ICompanyInputDTO } from "./../../interfaces/ICompany";
import { IBookInputDTO } from "./../../interfaces/IBook";

const route = Router();

export default (app: Router) => {
  app.use("/b1/company", route);

  route.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CompanyValidation.validateAsync(req.body);
      const companyService = Container.get(CompanyService);
      const { companyId } = await companyService.createCompany(
        req.body as ICompanyInputDTO
      );
      return res.status(200).json(companyId);
    } catch (e) {
      logger.error("🔥 error: %o can not create company details ", e);
      return next(e);
    }
  });

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyService = Container.get(CompanyService);
      const companies = await companyService.getCompanies();
      return res.status(200).json(companies);
    } catch (e) {
      logger.error("🔥 error: %o can not get companies details ", e);
      return next(e);
    }
  });

  route.get(
    "/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const companyId = req.params._id;
        const companyService = Container.get(CompanyService);
        const company = await companyService.getCompany({ _id: companyId });
        return res.status(200).json(company);
      } catch (e) {
        logger.error("🔥 error: %o can not get company details ", e);
        return next(e);
      }
    }
  );

  // route.post(
  //   "/project/:_id",
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const companyId = req.params._id;
  //       const companyService = await Container.get(CompanyService);
  //       const project = await companyService.createProject(
  //         { _id: companyId },
  //         req.body,
  //         { new: true }
  //       );
  //       return res.status(200).json(project);
  //     } catch (e) {
  //       logger.error("🔥 error: %o can not create project ", e);
  //       return next(e);
  //     }
  //   }
  // );

  route.get(
    "/projects/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const companyId = req.params._id;
        const companyService = Container.get(CompanyService);
        const projects = await companyService.getProjects({ _id: companyId });
        return res.status(200).json(projects);
      } catch (e) {
        logger.error("🔥 error: %o can not get projects ", e);
        return next(e);
      }
    }
  );

  route.post(
    "/booking/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectId = req.params._id;
        await bookingValidation.validateAsync(req.body);
        const companyService = Container.get(CompanyService);
        const booking = await companyService.createBooking(
          { _id: projectId },
          req.body as IBookInputDTO
        );
        return res.status(200).json(booking);
      } catch (e) {
        logger.error("🔥 error: %o can not create booking ", e);
        return next(e);
      }
    }
  );
};
