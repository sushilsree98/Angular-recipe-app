import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth/auth.component';


const routes: Routes = [
  { 
    path:'',
    redirectTo:"/recipe",
    pathMatch:'full'
  },
  {
    path:"shoppinglist",
    component:ShoppingListComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
