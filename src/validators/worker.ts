import Joi from "joi";

const WorkerValidation = Joi.object({
  NIC: Joi.string(),
  contactName: Joi.string(),
  contactNo: Joi.string(),
  contactEmail: Joi.string(),
  vaccineReport: Joi.string(),
  rating: Joi.number(),
  experience: Joi.array(),
  companyName: Joi.string(),
  iRating: Joi.number(),
  agentId: Joi.string(),
  skillCategory: Joi.number(),
  availability: Joi.boolean(),
  _id: Joi.string(),
});

export default WorkerValidation;
