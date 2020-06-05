import { Component, OnInit,Input} from '@angular/core';
import {PokeapiService} from './services/pokeapi.service'
import {Types} from './models/types'
import {TipoComponent} from './tipo/tipo.component'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})




export class AppComponent implements OnInit {
  PokeLista=undefined;
  NombrePokeBuscar:string='';

  constructor(private pokeApi:PokeapiService){

  }
  TipoInicial='selecciona por tipo';
  title = 'pokedex';
  TiposArray:Types[]=this.pokeApi.GetTypes();
  
  BuscarTipo(tipo:string){

     this.TipoInicial=tipo
     //console.log(this.PokeLista)
  }
  NumPokedex(url:string){
    var listado=url.split('/');
    return listado[listado.length-2];
  }
 URLImagen(url:string){
   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.NumPokedex(url)}.png`
 }
 ReturnTiposArray(){
   return this.TiposArray;
 }
 ngOnInit(){
  // this.pokeApi.GetPokes(false,'normal')
  // .subscribe(
  //   res=>console.log(res),
  //   err=>console.log(err)
  // )
}

BuscarPoke(){
  console.log(this.NombrePokeBuscar)
}
DefinePoke(valor){
  this.NombrePokeBuscar=valor;
  console.log(valor);
}
  lado=1;


}
