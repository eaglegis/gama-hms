import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndividualsComponent }     from './individuals.component';
import { IndividualDetailComponent } from './individual-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: IndividualDetailComponent
  },
  {
    path: 'individuals',
    component: IndividualsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);