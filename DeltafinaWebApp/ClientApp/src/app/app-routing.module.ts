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
  { path: 'silos', component: Layout2Component, loadChildren: () => import('./silos/silos.module').then(m => m.SilosModule) },
  { path: 'materials', component: Layout2Component, loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule) },
  { path: 'users', component: Layout2Component, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'planning', component: Layout2Component, loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule) },

  { path: 'trend', component: Layout2Component, loadChildren: () => import('./trend/trend.module').then(m => m.TrendModule) },

  { path: 'settings', component: Layout2Component, loadChildren: './settings/settings.module#SettingsModule' },


  { path: 'dashboard', component: Layout2Component, loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'slicer-virginia', component: Layout2Component, loadChildren: () => import('./slicer/slicer-virginia/slicer-virginia.module').then(m => m.SlicerVirginiaModule) },
  { path: 'slicer-burley', component: Layout2Component, loadChildren: () => import('./slicer/slicer-burley/slicer-burley.module').then(m => m.SlicerBurleyModule) },
  { path: 'dcc-virginia', component: Layout2Component, loadChildren: () => import('./dcc/dcc-virginia/dcc-virginia.module').then(m => m.DccVirginiaModule) },
  { path: 'dcc-burley', component: Layout2Component, loadChildren: () => import('./dcc/dcc-burley/dcc-burley.module').then(m => m.DccBurleyModule) },
  { path: 'casing-tanks', component: Layout2Component, loadChildren: () => import('./casing/casing-tanks/casing-tanks.module').then(m => m.CasingTanksModule) },
  { path: 'casing-spray', component: Layout2Component, loadChildren: () => import('./casing/casing-spray/casing-spray.module').then(m => m.CasingSprayModule) },
  { path: 'burley-dryer', component: Layout2Component, loadChildren: () => import('./redryer/burley-dryer/burley-dryer.module').then(m => m.BurleyDryerModule) },
  { path: 'final-dryer', component: Layout2Component, loadChildren: () => import('./redryer/final-dryer/final-dryer.module').then(m => m.FinalDryerModule) },
  { path: 'zona-1-0', component: Layout2Component, loadChildren: () => import('./zone/zona-1-0/zona-1-0.module').then(m => m.Zona10Module) },
  { path: 'zona-2-1', component: Layout2Component, loadChildren: () => import('./zone/zona-2-1/zona-2-1.module').then(m => m.Zona21Module) },
  { path: 'zona-2-3', component: Layout2Component, loadChildren: () => import('./zone/zona-2-3/zona-2-3.module').then(m => m.Zona23Module) },
  { path: 'zona-3-4', component: Layout2Component, loadChildren: () => import('./zone/zona-3-4/zona-3-4.module').then(m => m.Zona34Module) },
  { path: 'silo-fill', component: Layout2Component, loadChildren: () => import('./silos/silo-fill/silo-fill.module').then(m => m.SiloFillModule) },
  { path: 'silo-discharge', component: Layout2Component, loadChildren: () => import('./silos/silo-discharge/silo-discharge.module').then(m => m.SiloDischargeModule) },
  { path: 'inverter', component: Layout2Component, loadChildren: () => import('./inverter/inverter.module').then(m => m.InverterModule) },
  { path: 'cabinet', component: Layout2Component, loadChildren: () => import('./cabinet/cabinet.module').then(m => m.CabinetModule) },
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
