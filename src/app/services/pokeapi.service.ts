import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Types} from '../models/types'

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  URI:string='';
  TiposArray:Types[]=[
    {tipo:'Normal',referencia:'normal',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/3/32/Tipo_normal.gif/revision/latest?cb=20170114100442'},
    {tipo:'Lucha',referencia:'fighting',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/b/b7/Tipo_lucha.gif/revision/latest?cb=20170114100336'},
    {tipo:'Volador',referencia:'flying',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/e/e1/Tipo_volador.gif/revision/latest?cb=20170114100536'},
    {tipo:'Veneno',referencia:'poison',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/1/10/Tipo_veneno.gif/revision/latest?cb=20170114100535'},
    {tipo:'Electrico',referencia:'electric',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/1/1b/Tipo_el%C3%A9ctrico.gif/revision/latest?cb=20170114100155'},
    {tipo:'Tierra',referencia:'ground',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/1/1d/Tipo_tierra.gif/revision/latest?cb=20170114100533'},
    {tipo:'Roca',referencia:'rock',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/e/e0/Tipo_roca.gif/revision/latest?cb=20170114100446'},
    {tipo:'Bicho',referencia:'bug',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/f/fe/Tipo_bicho.gif/revision/latest?cb=20170114100153'},
    {tipo:'Fantasma',referencia:'ghost',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/4/47/Tipo_fantasma.gif/revision/latest?cb=20170114100329'},
    {tipo:'Acero',referencia:'steel',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/d/d9/Tipo_acero.gif/revision/latest?cb=20170114100151'},
    {tipo:'Fuego',referencia:'fire',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/c/ce/Tipo_fuego.gif/revision/latest?cb=20170114100331'},
    {tipo:'Agua',referencia:'water',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/9/94/Tipo_agua.gif/revision/latest?cb=20170114100152'},
    {tipo:'Planta',referencia:'grass',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/d/d6/Tipo_planta.gif/revision/latest?cb=20170114100444'},
    {tipo:'Psiquico',referencia:'psychic',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/1/15/Tipo_ps%C3%ADquico.gif/revision/latest?cb=20170114100445'},
    {tipo:'Hielo',referencia:'ice',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/4/40/Tipo_hielo.gif/revision/latest?cb=20170114100333'},
    {tipo:'Dragon',referencia:'dragon',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/0/01/Tipo_drag%C3%B3n.gif/revision/latest?cb=20170114100154'},
    {tipo:'Siniestro',referencia:'dark',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/8/82/Tipo_siniestro.gif/revision/latest?cb=20170114100447'},
    {tipo:'Hada',referencia:'fairy',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/b/bc/Tipo_hada.gif/revision/latest?cb=20170114100332'},
  ]



  constructor(private httpClient:HttpClient) { 
    this.URI = `https://pokeapi.co/api/v2`;
  }

  GetPokes(Poke:boolean,texto:string){
    if(Poke){
      return  this.httpClient.get(`${this.URI}/pokemon/${texto}`);
    } else {
    return  this.httpClient.get(`${this.URI}/type/${texto}`);
  }  
  }
  GetTypes(){
    return this.TiposArray;
  }
  GetPokemonbySpecies(texto:string){
    return  this.httpClient.get(`${this.URI}/pokemon-species/${texto}`);
  }
  LinkDirecto(texto:string){
    return  this.httpClient.get(texto);
  }

  NumPokedex(url:string){
    var listado=url.split('/');
    return listado[listado.length-2];
  }

  URLImagen(url:string){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.NumPokedex(url)}.png`
  }


}
