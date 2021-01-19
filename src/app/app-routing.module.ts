import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signup-pro',
    loadChildren: () => import('./pages/signup-pro/signup-pro.module').then( m => m.SignupProPageModule)
  },
  {
    path: 'dashboardC',
    loadChildren: () => import('./pages/Client/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboardP',
    loadChildren: () => import('./pages/Professionnel/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'testpage',
    loadChildren: () => import('./pages/testpage/testpage.module').then( m => m.TestpagePageModule)
  },
  {
    path: 'testpage2',
    loadChildren: () => import('./pages/testpage2/testpage2.module').then( m => m.Testpage2PageModule)
  },
  {
    path: 'mes-services',
    loadChildren: () => import('./pages/Professionnel/mes-services/mes-services.module').then( m => m.MesServicesPageModule)
  },
  {
    path: 'mes-rdv',
    loadChildren: () => import('./pages/Professionnel/mes-rdv/mes-rdv.module').then( m => m.MesRDVPageModule)
  },
  {
    path: 'parametres',
    loadChildren: () => import('./pages/Professionnel/parametres/parametres.module').then( m => m.ParametresPageModule)
  },
  {
    path: 'profil-pro',
    loadChildren: () => import('./pages/Professionnel/profil-pro/profil-pro.module').then( m => m.ProfilProPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'cprofile',
    loadChildren: () => import('./pages/Client/cprofile/cprofile.module').then( m => m.CProfilePageModule)
  },
  {
    path: 'prendre-rdv',
    loadChildren: () => import('./pages/Client/prendre-rdv/prendre-rdv.module').then( m => m.PrendreRDVPageModule)
  },
  {
    path: 'cmes-rdv',
    loadChildren: () => import('./pages/Client/cmes-rdv/cmes-rdv.module').then( m => m.CmesRDVPageModule)
  },
  {
    path: 'MyClients',
    loadChildren: () => import('./pages/Professionnel/liste-des-clients/liste-des-clients.module').then( m => m.ListeDesClientsPageModule)
  },
  {
    path: 'myrdv',
    loadChildren: () => import('./pages/Client/myrdv/myrdv.module').then( m => m.MyrdvPageModule)
  },
  {
    path: 'reporter',
    loadChildren: () => import('./pages/Client/reporter/reporter.module').then( m => m.ReporterPageModule)
  },
  {
    path: 'horaire',
    loadChildren: () => import('./pages/Client/horaire/horaire.module').then( m => m.HorairePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
