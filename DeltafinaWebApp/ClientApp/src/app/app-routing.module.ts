import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout2Component } from './layout/layout-2/layout-2.component';
import { Layout2FlexComponent } from './layout/layout-2-flex/layout-2-flex.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';


// *******************************************************************************
// Routes

/* tslint:disable */
const routes: Routes = [
  // Default
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'auth', component: LayoutBlankComponent, loadChildren: './authentication/authentication.module#AuthenticationModule' },
  //{ path: 'device-page', component: Layout2Component, loadChildren: () => import('./device-page/device-page.module').then(m => m.DevicePageModule) },
  { path: 'alarms', component: Layout2Component, loadChildren: () => import('./alarms/alarms.module').then(m => m.AlarmsModule) },
  { path: 'alarms-settings', component: Layout2Component, loadChildren: () => import('./alarms-settings/alarms-settings.module').then(m => m.AlarmsSettingsModule) },  

  { path: 'portal-farms', component: Layout2Component, loadChildren: () => import('./portal-farms/portal-farms.module').then(m => m.PortalFarmsModule) },

  //{ path: 'customers', component: Layout2Component, loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'recipes', component: Layout2Component, loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'silos', component: Layout2Component, loadChildren: () => import('./silos/silos.module').then(m => m.SilosModule) },
  { path: 'materials', component: Layout2Component, loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule) },
  { path: 'users', component: Layout2Component, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'planning', component: Layout2Component, loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule) },

  { path: 'dosings', component: Layout2Component, loadChildren: () => import('./dosings/dosings.module').then(m => m.DosingsModule) },
  { path: 'trend', component: Layout2Component, loadChildren: () => import('./trend/trend.module').then(m => m.TrendModule) },

  { path: 'settings', component: Layout2Component, loadChildren: './settings/settings.module#SettingsModule' },


  { path: 'dashboard', component: Layout2Component, loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'carico-sabbia', component: Layout2Component, loadChildren: () => import('./carico-sabbia/carico-sabbia.module').then(m => m.CaricoSabbiaModule) },
  { path: 'carico-rottame', component: Layout2Component, loadChildren: () => import('./carico-rottame/carico-rottame.module').then(m => m.CaricoRottameModule) },
  { path: 'rottame-interno', component: Layout2Component, loadChildren: () => import('./rottame-interno/rottame-interno.module').then(m => m.RottameInternoModule) },
  { path: 'carico-silos', component: Layout2Component, loadChildren: () => import('./carico-silos/carico-silos.module').then(m => m.CaricoSilosModule) },
  //{ path: 'layouts', loadChildren: () => import('./+layouts/layouts.module').then(m => m.LayoutsModule) },

  // Pages
  //{ path: 'pages', component: Layout2Component, loadChildren: () => import('./+pages/pages.module').then(m => m.PagesModule) },
  //{ path: 'pages', component: Layout2FlexComponent, loadChildren: () => import('./+pages/pages-flex.module').then(m => m.PagesFlexModule) },
  //{ path: 'pages', component: LayoutBlankComponent, loadChildren: () => import('./+pages/pages-blank.module').then(m => m.PagesBlankModule) },

  // 404 Not Found page
  { path: '**', component: NotFoundComponent }
];
/* tslint:enable */

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
