import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropDownDirective } from './shared/dropdown.directive'
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipe/recipe.service';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipeModule } from './recipe/recipe.module';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent,  
    ShoppingListComponent, ShoppingEditComponent,
    DropDownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecipeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, RecipeService,{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent],
  exports:[AppRoutingModule]
})
export class AppModule { }
