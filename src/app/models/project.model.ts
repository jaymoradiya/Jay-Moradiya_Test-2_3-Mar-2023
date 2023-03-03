/// Program Details
export interface ProjectApiResponse {
  success: boolean;
  message: string;
  virtualProgramDetails: VirtualProject[];
}

export interface VirtualProject {
  programID: string;
  projectID: string;
  projectNumber: string;
  projectName: string;
}
