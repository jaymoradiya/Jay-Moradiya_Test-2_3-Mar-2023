import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualProject } from 'src/app/models/project.model';
import { VirtualProgram } from 'src/app/models/program.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  programs: VirtualProgram[] = [];
  projects: VirtualProject[] = [];
  allAvailableProjects: VirtualProject[] = [];

  programsControl = new FormControl<VirtualProgram[]>([]);
  projectsControl = new FormControl<VirtualProject[]>([]);

  @ViewChild('program')
  selectAllProgramRef: MatOption | undefined;
  @ViewChild('project')
  selectAllProjectRef: MatOption | undefined;

  selectAllProgram: VirtualProgram = {
    programName: 'Select All',
    programId: '0',
    programNumber: '0',
    totalVirtualProjects: 0,
    isActive: true,
  };
  selectAllProject: VirtualProject = {
    programID: '0',
    projectID: '0',
    projectNumber: '0',
    projectName: 'Select All',
  };

  constructor(private reportService: ReportService) {
    this.programsControl.valueChanges.subscribe((value) => {
      /// removed select all program
      const filteredPrograms = value?.filter(
        (program) => program.programId != '0'
      );

      /// filtering projects on selected programs
      const filteredProjects: VirtualProject[] = this.projects.filter(
        (project) =>
          filteredPrograms?.findIndex(
            (program) => program.programId == project.programID
          ) != -1
      );
      /// Removing duplicate named projects
      this.allAvailableProjects = filteredProjects.reduce<VirtualProject[]>(
        (arr, project) => {
          if (
            arr.findIndex((pr) => project.projectName == pr.projectName) == -1
          ) {
            arr.push(project);
          }
          return arr;
        },
        []
      );

      /// Making select All unselected on programs value change
      /// Managing toggle of deselect and select
      if (
        this.selectAllProgramRef?.selected &&
        this.selectAllProgram.programName == 'Deselect All' &&
        value &&
        value.length != 1 &&
        value.length < this.programs.length + 1
      ) {
        this.selectAllProgramRef?.deselect();
        this.selectAllProgram.programName = 'Select All';
      }
    });

    /// Making select All unselected on projects value change
    this.projectsControl.valueChanges.subscribe((value) => {
      /// removed select all project
      const filteredProjects = value?.filter(
        (program) => program.projectID != '0'
      );
      /// Managing toggle of deselect and select
      if (
        this.selectAllProjectRef?.selected &&
        this.selectAllProject.projectName == 'Deselect All' &&
        value &&
        value.length != 1 &&
        value.length < this.allAvailableProjects.length + 1
      ) {
        this.selectAllProjectRef?.deselect();
        this.selectAllProject.projectName = 'Select All';
      }
    });
  }

  ngOnInit(): void {
    this.reportService.getPrograms().subscribe(
      (res) => (this.programs = res.virtualProgramList),
      (err) => console.log(err)
    );
    this.reportService.getProjects().subscribe(
      (res) => (this.projects = res.virtualProgramDetails),
      (err) => console.log(err)
    );
  }

  selectProgram(ev: MatOption) {
    if (ev.selected) {
      this.programsControl.setValue([this.selectAllProgram, ...this.programs]);
      this.selectAllProgram.programName = 'Deselect All';
    } else {
      this.programsControl.setValue([]);
      this.selectAllProgram.programName = 'Select All';
    }
  }
  selectProject(ev: MatOption) {
    if (ev.selected) {
      this.projectsControl.setValue([
        this.selectAllProject,
        ...this.allAvailableProjects,
      ]);
      this.selectAllProject.projectName = 'Deselect All';
    } else {
      this.projectsControl.setValue([]);
      this.selectAllProject.projectName = 'Select All';
    }
  }
}
