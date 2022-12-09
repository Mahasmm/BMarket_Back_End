import {
  Get,
  Route,
  Path,
  Body,
  Delete,
  Patch,
  Post,
  Query,
  Security,
} from "@tsoa/runtime";
import { request } from "http";
// import { Responses } from "../../Response";
import AgentValidation from "../../validators/agent";
import AgentService from "../../services/AgentService";
import { NextFunction, Request, Router, Response } from "express";
import Container from "typedi";
import { IAgentInputDto } from "../../interfaces/IAgent";
import logger from "../../loaders/logger";
import mongoose from "mongoose";
import { IBookInputDTO } from "../../interfaces/IBook";

const route = Router();

export default (app: Router) => {
  app.use("/b1/manpower", route);

  // route.get("/", async (req: Request, res: Response, next: NextFunction) => {
  //   console.log("req.body ", req.body);
  //   res.send("hello world");
  //   return res.status(200).end();
  // });

  route.post("/", async (req: Request, res: Response, next: NextFunction) => {
    // const logger: Logger = Container.get("logger");
    try {
      await AgentValidation.validateAsync(req.body);
      const agentService = Container.get(AgentService);
      const { AgentId } = await agentService.CreateAgent(
        req.body as IAgentInputDto
      );
      return res.status(201).json({ AgentId });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agentService = Container.get(AgentService);
      const { data } = await agentService.getAgents();
      return res.status(201).json(data);
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.get(
    "/:_agentId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const agentService = Container.get(AgentService);
        const { data } = await agentService.getAgent(req.params._agentId);

        return res.status(201).json({ data });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.get(
    "/booking/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const agentService = Container.get(AgentService);
        const bookings = await agentService.getBookings({
          agentId: req.params._id,
        });
        return res.status(200).json(bookings);
      } catch (e) {
        logger.error("🔥 error: %o cannot get booking details ", e);
        return next(e);
      }
    }
  );

  route.post(
    "/booking/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      // const logger: Logger = Container.get("logger");
      try {
        const agentId = req.params._id;
        const agentService = Container.get(AgentService);
        const bookings = await agentService.confirmBooking(
          { _id: agentId },
          req.body as IBookInputDTO
        );
        return res.status(200).json(bookings);
      } catch (e) {
        logger.error("🔥 error: %o cannot post conformation  ", e);
        return next(e);
      }
    }
  );

  route.get(
    "/recruitment/:_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const agentService = Container.get(AgentService);
        const recruitment = await agentService.getRecruitment({
          agentId: req.params._id,
        });
        return res.status(200).json(recruitment);
      } catch (e) {
        logger.error("🔥 error: %o cannot get recruitment  ", e);
        return next(e);
      }
    }
  );
};
