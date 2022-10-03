import Joi from "joi";

const projectValidation = Joi.object({
  ProjectTitle: Joi.string(),
  companyId: Joi.string(),
});

export default projectValidation;
