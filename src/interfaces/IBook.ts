export interface IBookInputDTO {
  agentId: string;
  projectId: string;
  status: string;
  workers: object;
}

export interface IBook extends IBookInputDTO {
  _bookId: string;
}
