import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }     from './dashboard.component';
import { IndividualsComponent }     from './individuals.component';
import { IndividualDetailComponent } from './individual-detail.component';
import { OrganisationsComponent }     from './organisations.component';
import { OrganisationDetailComponent } from './organisation-detail.component';
import { CrewsComponent }     from './crews.component';
import { CrewDetailComponent } from './crew-detail.component';
import { DepartmentsComponent }     from './departments.component';
import { DepartmentDetailComponent } from './department-detail.component';
import { WorkPlacesComponent }     from './workplaces.component';
import { WorkPlaceDetailComponent } from './workplace-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'individuals/:id',
    component: IndividualDetailComponent
  },
  {
    path: 'individuals/new',
    component: IndividualDetailComponent
  },
  {
    path: 'individuals',
    component: IndividualsComponent
  },
  {
    path: 'organisations/:id',
    component: OrganisationDetailComponent
  },
  {
    path: 'organisations/new',
    component: OrganisationDetailComponent
  },
  {
    path: 'organisations',
    component: OrganisationsComponent
  },
  {
    path: 'crews/:id',
    component: CrewDetailComponent
  },
  {
    path: 'crews/new',
    component: CrewDetailComponent
  },
  {
    path: 'crews',
    component: CrewsComponent
  },
  {
    path: 'departments/:id',
    component: DepartmentDetailComponent
  },
  {
    path: 'department/new',
    component: DepartmentDetailComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'workplaces/:id',
    component: WorkPlaceDetailComponent
  },
  {
    path: 'workplaces/new',
    component: WorkPlaceDetailComponent
  },
  {
    path: 'workplaces',
    component: WorkPlacesComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
