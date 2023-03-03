export interface ProgramApiResponse {
  success: boolean;
  message: string;
  virtualProgramList: VirtualProgram[];
}

export interface VirtualProgram {
  programId: string;
  programName: string;
  programNumber: string;
  totalVirtualProjects: number;
  isActive: boolean;
}
