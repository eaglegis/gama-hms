import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }     from './dashboard.component';
import { IndividualsComponent }     from './individuals.component';
import { IndividualDetailComponent } from './individual-detail.component';
import { OrganisationsComponent }     from './organisations.component';
import { OrganisationDetailComponent } from './organisation-detail.component';

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
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
