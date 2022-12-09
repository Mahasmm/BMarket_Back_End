import Joi from "joi";

const CompanyValidation = Joi.object({
  Address: Joi.string(),
  grade: Joi.string(),
  companyName: Joi.string(),
  contactNumber: Joi.string(),
  contactEmail: Joi.string(),
  projects: Joi.array(),
  rating: Joi.number(),
  password: Joi.string(),
});

export default CompanyValidation;
