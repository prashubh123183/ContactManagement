import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddContactInfoComponent } from './add-contact-info/add-contact-info.component';
import { UpdateContactInfoComponent } from './update-contact-info/update-contact-info.component';
import { ViewContactInfoComponent } from './view-contact-info/view-contact-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'ViewContactInfo/:contactId', component: ViewContactInfoComponent },
  { path: 'AddContactInfo', component: AddContactInfoComponent },
  { path: 'UpdateContactInfo/:contactId', component: UpdateContactInfoComponent } 
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }