import Joi from "joi";

const bookingValidation = Joi.object({
  agentId: Joi.string(),
  projectId: Joi.string(),
  status: Joi.string(),
  workers: Joi.array(),
});

export default bookingValidation;
