import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { API } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import {
  ProjectApiResponse,
  VirtualProject,
} from 'src/app/models/project.model';
import {
  ProgramApiResponse,
  VirtualProgram,
} from 'src/app/models/virtual-program.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  programs = new BehaviorSubject<VirtualProgram[]>([]);
  projects = new BehaviorSubject<VirtualProject[]>([]);

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<ProgramApiResponse> {
    return this.http.get<ProgramApiResponse>(API.BASE_URL + API.PROGRAMS).pipe(
      map((res) => {
        // this.programs.next(res.virtualProgramList);
        return res;
      })
    );
  }

  getProjects(): Observable<ProjectApiResponse> {
    return this.http.get<ProjectApiResponse>(API.BASE_URL + API.PROJECTS).pipe(
      map((res) => {
        // this.projects.next(res.virtualProgramDetails);
        return res;
      })
    );
  }
}
