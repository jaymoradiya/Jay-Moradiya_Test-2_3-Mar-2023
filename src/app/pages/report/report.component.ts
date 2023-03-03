import { Component, OnInit } from '@angular/core';
import { VirtualProject } from 'src/app/models/project.model';
import { VirtualProgram } from 'src/app/models/virtual-program.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  programs: VirtualProgram[] = [];
  projects: VirtualProject[] = [];

  programsControl = new FormControl<VirtualProgram[]>([]);
  projectsControl = new FormControl('');

  get availableProjects() {
    const programs = this.programsControl.value;
    return this.projects.filter(
      (project) =>
        programs?.findIndex(
          (program) => program.programId == project.programID
        ) != -1
    );
  }

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getPrograms().subscribe(
      (res) => {
        this.programs = res.virtualProgramList;
      },
      (err) => console.log(err)
    );
    this.reportService.getProjects().subscribe(
      (res) => {
        this.projects = res.virtualProgramDetails;
      },
      (err) => console.log(err)
    );
  }

  getData() {
    console.log(this.programsControl.value);
    console.log(this.projectsControl.value);
  }
}
