import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';
import { ProductTableComponent } from './Components/products/product-table/product-table.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { nonAuthGuard } from './guards/non-auth.guard';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  // {path:'',component:ProductTableComponent},
  {
    path: '',
    component: EmptyLayoutComponent,
    canActivate: [nonAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./Components/Auth/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },


  {
    path: 'auth',
    component: MainLayoutComponent,
     canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'products',
        canActivate: [roleGuard],
        data: {},
        loadChildren: () =>
          import('./Components/products/products.module').then(
            m => m.ProductsModule
          ),
      },
      {
        path: 'manage-users',
        canActivate: [roleGuard],
        loadChildren: () =>
          import('./Components/manage-users/manage-user.module').then(
            m => m.ManageUserModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./Components/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./Components/settings/settings.module').then(
            m => m.SettingsModule
          ),
      },
      // {
      //   path: 'shifts',
      //   loadChildren: () =>
      //     import('').then(m => m.ShiftsModule),
      // },
      {
        path: 'categories',
        loadChildren: () =>
          import('./Components/categories/category/category.module').then(
            m => m.CategoryModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import("./Components/invoice/invoice.module").then(m => m.InvoiceModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboardComponent/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
      },
      // {
      //   path: 'supplies',
      //   loadChildren: () =>
      //     import().then(
      //       m => m.SuppliesModule
      //     ),
      // },
    ],
  },

  // {
  //     path: 'products',
  //     // canActivate: [RoleGuard],
  //     data: {},
  //     loadChildren: () =>
  //       import('../app/Components/products/products.module').then(
  //         m => m.ProductsModule
  //       ),
  //   },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
