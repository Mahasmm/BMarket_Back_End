export interface IProjectInputDTO {
  ProjectTitle: string;
  agents: Object;
  assignees: Object;
  booking: Object;
}

export interface IProject extends IProjectInputDTO {
  _projectId: string;
}
