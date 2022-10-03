import Joi from "joi";

const AgentValidation = Joi.object({
  AvailableWorkerCount: Joi.number(),
  NIC: Joi.string(),
  contactName: Joi.string(),
  contactNo: Joi.string(),
  contactEmail: Joi.string(),
  vaccineReport: Joi.string(),
  rating: Joi.number(),
});

export default AgentValidation;
