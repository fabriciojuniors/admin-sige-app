import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ToastMessageComponent } from './shared/toast-message/toast-message.component';
import { LocalComponent } from './local/local.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { EventosComponent } from './eventos/eventos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParametrosComponent } from './parametros/parametros.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AutorizarPagamentoComponent } from './autorizar-pagamento/autorizar-pagamento.component';
import { AcompanharEventosComponent } from './acompanhar-eventos/acompanhar-eventos.component';
import { EmitirCertificadoComponent } from './emitir-certificado/emitir-certificado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    UsuarioComponent,
    ToastMessageComponent,
    LocalComponent,
    ParceiroComponent,
    EventosComponent,
    ParametrosComponent,
    AutorizarPagamentoComponent,
    AcompanharEventosComponent,
    EmitirCertificadoComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
