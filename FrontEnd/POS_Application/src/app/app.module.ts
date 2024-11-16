import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './Components/login/login.component';
// import { SignupComponent } from './Components/signup/signup.component';
// import { NavbarComponent } from './layouts/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
// import { DashboardComponent } from './dashboardComponent/dashboard/dashboard.component';
// import { CategoriesChartComponent } from './dashboardComponent/categories-chart/categories-chart.component';
// import { BelowStockProductsTableComponent } from './dashboardComponent/below-stock-products-table/below-stock-products-table.component';
import { LayoutModule } from './layouts/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthLayoutComponent } from './components/Auth/auth-layout/auth-layout.component';
// import { CreateAdminComponent } from './components/Auth/create-admin/create-admin.component';
// import { LoginComponent } from './components/Auth/login/login.component';
// import { ManageUsersComponent } from './components/manage-users/manage-users.component';
// import { ProductsComponent } from './Components/products/crud/all-products/products.component';
// import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
// import { CanviewDirective } from './directive/canview.directive';
// import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
// import { CategoryTableComponent } from './components/categories/category-table/category-table.component';
// import { CategoriesComponent } from './components/categories/categories.component';
// import { InvoiceComponent } from './components/invoice/invoice.component';
// import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [AppComponent],
    // AppComponent,

    // LoginComponent,
    // SignupComponent,
    // CanviewDirective,
    // CategoryFormComponent,
    // CategoryTableComponent,
    // CategoriesComponent,
    // InvoiceComponent,
    // SettingsComponent,
    // CategoriesChartComponent,
    // BelowStockProductsTableComponent,
    // NavbarComponent,
    // MainLayoutComponent,
    // DashboardComponent

  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthInterceptorProvider,MatSnackBar
    // provideAnimationsAsync()
  ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
