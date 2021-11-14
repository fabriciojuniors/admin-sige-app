import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcompanharEventosComponent } from './acompanhar-eventos/acompanhar-eventos.component';
import { AutorizarPagamentoComponent } from './autorizar-pagamento/autorizar-pagamento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventosComponent } from './eventos/eventos.component';
import { LoginGuard } from './guards/login.guard';
import { LocalComponent } from './local/local.component';
import { LoginComponent } from './login/login.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'local',
    component: LocalComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'parceiro',
    component: ParceiroComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'eventos',
    component: EventosComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'parametros',
    component: ParametrosComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'autorizar-pagamento',
    component: AutorizarPagamentoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'acompanhar-eventos',
    component: AcompanharEventosComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
