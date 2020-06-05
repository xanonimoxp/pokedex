import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule,Routes} from '@angular/router';
import  {FormsModule} from '@angular/forms'
import { TestComponent } from './test/test.component';
import {TipoComponent} from './tipo/tipo.component';
import {HttpClientModule}  from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';

const router:Routes=[
  {path:'test/:NumPokedex',component:TestComponent},
  {path:'tipo/:type2',component:TipoComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TipoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(router,{useHash: true}),
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
