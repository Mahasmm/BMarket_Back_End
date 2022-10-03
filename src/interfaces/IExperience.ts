export interface IExperienceInputDto {
  companyName: String;
  irating: Number;
}

export interface IExperience extends IExperienceInputDto {
  _expId: string;
}
