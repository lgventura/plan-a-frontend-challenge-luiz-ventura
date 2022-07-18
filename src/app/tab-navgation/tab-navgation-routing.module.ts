import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabNavgationPage } from './tab-navgation.page';

const routes: Routes = [
  {
    path: '',
    component: TabNavgationPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'top-rated-movies',
        loadChildren: () =>
          import('../top-rated-movies/top-rated-movies.module').then(
            (m) => m.TopRatedMoviesPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNavgationPageRoutingModule {}
