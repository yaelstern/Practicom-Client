import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "instruction", component: InstructionPageComponent },
  { path: "**", component: LoginPageComponent },
  { path: "", component: LoginPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
