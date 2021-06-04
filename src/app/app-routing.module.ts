import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { RadnikComponent } from './components/radnik/radnik.component';
import { SektorComponent } from './components/sektor/sektor.component';


const routes: Routes = [
  { path: 'obrazovanje', component: ObrazovanjeComponent},
  { path: 'preduzece', component: PreduzeceComponent},
  { path: 'sektor', component: SektorComponent},
  //{ path: 'radnik', component: RadnikComponent}
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'author', component: AuthorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
