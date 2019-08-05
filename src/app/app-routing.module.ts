import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { BackgroundComponent } from './background/background.component';
import { AppComponent } from './app.component';
import { RouteGuard } from './shared/route.guard';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: 'options', component: OptionsComponent },
  { path: 'background', component: BackgroundComponent },
  { path: 'popup', component: PopupComponent },
  { path: '**', component: AppComponent, canActivate: [RouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
