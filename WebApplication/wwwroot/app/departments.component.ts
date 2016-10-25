import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


import { Department }                from './department';
import { GenericService }         from './generic.service';

@Component({
  selector: 'my-departments',
  templateUrl: 'app/departments.component.html',
  styleUrls:  ['app/edit-detail.component.css']
})

export class DepartmentsComponent implements OnInit {
  departments: Department[];

  selectedDepartment: Department = null;

  constructor(
    private departmentService: GenericService<Department>,
    private router: Router) {
     }

  getDepartments(): void {
    this.departmentService
        .getAll(Department.url)
        .then(departments => this.departments = departments);
  }

  edit(department: Department): void {
    // Copy object
    this.selectedDepartment = Object.assign({}, department);
    this.gotoDetail();
  }

  createNew(): void {
    this.router.navigate(['departments/new']);
  }

  reset(): void {
    this.selectedDepartment = null; //new Department();
  }

  delete(department: Department): void {
    this.departmentService
        .delete(Department.url, department.id)
        .then(() => {
          this.departments = this.departments.filter(i => i !== department);
          if (this.selectedDepartment === department) { this.selectedDepartment = null; }
        });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  onSelect(department: Department): void {
    this.selectedDepartment = department;
  }

  gotoDetail(): void {
    this.router.navigate(['/departments', this.selectedDepartment.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
