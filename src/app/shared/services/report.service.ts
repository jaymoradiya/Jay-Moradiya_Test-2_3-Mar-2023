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
} from 'src/app/models/program.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getPrograms(): Observable<ProgramApiResponse> {
    return this.http.get<ProgramApiResponse>(API.BASE_URL + API.PROGRAMS);
  }

  getProjects(): Observable<ProjectApiResponse> {
    return this.http.get<ProjectApiResponse>(API.BASE_URL + API.PROJECTS);
  }
}
