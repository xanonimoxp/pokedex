import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PokeapiService} from '../services/pokeapi.service'
import {Types} from '../models/types'
 

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],

})
export class TipoComponent implements OnInit {
  PokeLista;
  constructor(private pokeApi:PokeapiService,private route:ActivatedRoute) { }

  @Input () title:Types;
  
    TipoInicial='';
  //   TiposArray:Types[]=[
  //   {tipo:'Normal',referencia:'normal',UrlImagenTipo:''},
  //   {tipo:'Lucha',referencia:'fighting',UrlImagenTipo:''},
  //   {tipo:'Volador',referencia:'flying',UrlImagenTipo:''},
  //   {tipo:'Veneno',referencia:'poison',UrlImagenTipo:''},
  //   {tipo:'Electrico',referencia:'electric',UrlImagenTipo:'https://vignette.wikia.nocookie.net/es.pokemon/images/1/1b/Tipo_el%C3%A9ctrico.gif/revision/latest?cb=20170114100155'},
  //   {tipo:'Tierra',referencia:'ground',UrlImagenTipo:''},
  //   {tipo:'Roca',referencia:'rock',UrlImagenTipo:''},
  //   {tipo:'Bicho',referencia:'bug',UrlImagenTipo:''},
  //   {tipo:'Fantasma',referencia:'ghost',UrlImagenTipo:''},
  //   {tipo:'Acero',referencia:'steel',UrlImagenTipo:''},
  //   {tipo:'Fuego',referencia:'fire',UrlImagenTipo:''},
  //   {tipo:'Agua',referencia:'water',UrlImagenTipo:''},
  //   {tipo:'Planta',referencia:'grass',UrlImagenTipo:''},
  //   {tipo:'Psiquico',referencia:'psychic',UrlImagenTipo:''},
  //   {tipo:'Hielo',referencia:'ice',UrlImagenTipo:''},
  //   {tipo:'Dragon',referencia:'dragon',UrlImagenTipo:''},
  //   {tipo:'Siniestro',referencia:'dark',UrlImagenTipo:''},
  //   {tipo:'Hada',referencia:'fairy',UrlImagenTipo:''},
  
  // ]

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('type2'));
      this.BuscarTipo(params.get('type2'),params.get('type2'));
    });
  }
    BuscarTipo(ref:string,tipo){
      this.pokeApi.GetPokes(false,ref)
       .subscribe(
         res=>{
          this.PokeLista = res;
        },
         err=>console.log(err)
       )
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


  }


