import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Department }        from './department';
//import { DepartmentService } from './department.service';
import { GenericService } from './generic.service';


@Component({
  selector: 'my-department-detail',
  templateUrl: 'app/department-detail.component.html',
  styleUrls: ['app/edit-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  department: Department;

  constructor(
    private departmentService: GenericService<Department>,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      if(id){
        this.departmentService.get(Department.url, id)
          .then(department => this.department = department);
      } else
      {
        this.department = new Department();
      }
    });
  }

  save(): void {
    this.department = this.trimDepartment(this.department);

    if (!this.department.name) { return; }

    if(this.department.id === undefined){
      this.departmentService.create(Department.url, this.department)
        .then(this.goBack);
    } else {
      this.departmentService.update(Department.url, this.department)
        .then(this.goBack);
    }
  }

  trimDepartment(department: Department):Department{
    if(department.name){
      department.name = department.name.trim();
    }

    return department;
  }


  goBack(): void {
    window.history.back();
  }
}
