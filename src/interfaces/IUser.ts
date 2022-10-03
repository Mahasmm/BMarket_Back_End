export interface IUserInputDto {
  name: string;
  age: number;
}

export interface IUser extends IUserInputDto {
  _id: string;
}
