import { Component, OnInit,Input,HostListener } from '@angular/core';
import {PokeapiService} from '../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import {Types} from '../models/types';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  PokemonN=undefined;
  PokemonImagenURL='';
  PokemonChain=undefined;
  postchain=undefined;
  TipoDelPokemon:Types[];
  htmlToAdd = '<div class="two">two</div>';
  Imagen:string='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  
 constructor(private pokeApi:PokeapiService,private route:ActivatedRoute ) { }
  TiposArray:Types[]=this.pokeApi.GetTypes();

  
 

  BuscarTipo(ref:string){
    this.pokeApi.GetPokes(true,ref)
     .subscribe(
       res=>{
         console.log(res);
        this.PokemonN = res;
        this.addelement(this.PokemonN);
        this.PokemonImagenURL=this.PokemonN.sprites.front_default;
        this.TipoDelPokemon=[];
        for(let estilo of this.PokemonN.types){
          if(this.TipoDelPokemon=== undefined){
            this.TipoDelPokemon=this.URLType(estilo.type.name);
          } else {
            this.TipoDelPokemon.push(this.URLType(estilo.type.name)[0]); 
          }
            
          // console.log(estilo.type.name);
          // console.log(this.TipoDelPokemon);
          // //this.TipoDelPokemon.push({tipo:this.soporte[0].tipo,referencia:this.soporte.referencia,UrlImagenTipo:this.soporte.UrlImagenTipo});
        }
        // console.log(this.TipoDelPokemon);
      },
       err=>console.log(err)
     );
     this.pokeApi.GetPokemonbySpecies(ref)
     .subscribe(
       res=>{
         console.log('el que sigue es el species');
         this.PokemonChain=res;
         this.PokemonChain=this.PokemonChain.evolution_chain.url
         this.pokeApi.LinkDirecto(String(this.PokemonChain))
         .subscribe(
           cadena=>{
             console.log('sdfsd')
             this.PokemonChain=cadena;
             console.log(this.PokemonChain);
             this.CuadroEvolutivo(this.PokemonChain);

           },
           err=>console.log(err)           
         )  
       },
       err=>console.log(err)
     );

    // this.pokeApi.LinkDirecto(String(this.PokemonChain))
    // .subscribe(
    //   res=>{
    //     console.log('dsfsdf');
    //   console.log(res);
    //   },
    //   err=>console.log(err)
    // );
  }

  URLType(type:string){
    return this.TiposArray.filter(x=>x.referencia==type)
  }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.BuscarTipo(params.get('NumPokedex'));
    });
    console.log(this.htmlToAdd);

  }

  CambiarImagen(Selecc:string){
    if(Selecc=='Normal'){
      this.PokemonImagenURL=this.PokemonN.sprites.front_default;
    } else if(Selecc=='Shiny'){
      this.PokemonImagenURL=this.PokemonN.sprites.front_shiny;
    }else if(Selecc=='NormalF'){
      this.PokemonImagenURL=this.PokemonN.sprites.front_female;
    }else if(Selecc=='ShinyF'){
      this.PokemonImagenURL=this.PokemonN.sprites.front_shiny_female;
    }
  }

  Checando(){
    document.write('<h1>hola mundo</h1>');
    //document.body.innerHTML='<h1>hola mundo</h1>';
    //return "<h1>gggerer</h1>"
  }
  CuadroEvolutivo(cadena){
    console.log('precadena');
    console.log(cadena);
    console.log('postcadena');
    if(cadena.chain.evolves_to.length>0){
      if(cadena.chain.evolves_to[0].evolves_to.length>0){
        this.htmlToAdd=`
        <table class="table">
      <thead class="thead-light">
        <tr>
        <th scope="col">Inicial</th>
        <th scope="col">Primera Evolucion</th>
        <th scope="col">Segunda Evolucion</th>
        </tr>
        </thead>
        <tbody>
        <tr >
        
        <td rowspan="${cadena.chain.evolves_to.length+1}"  >
        <img src="${this.Imagen}${this.pokeApi.NumPokedex(cadena.chain.species.url)}.png" ></br>
        <a href="/#/test/${this.pokeApi.NumPokedex(cadena.chain.species.url)}" >
        ${cadena.chain.species.name}</a>
         </td>
        <td rowspan="${cadena.chain.evolves_to[0].evolves_to.length+1}" >
        <img src="${this.Imagen}${this.pokeApi.NumPokedex(cadena.chain.evolves_to[0].species.url)}.png" ></br>
        <a href="/#/test/${this.pokeApi.NumPokedex(cadena.chain.evolves_to[0].species.url)}" >${cadena.chain.evolves_to[0].species.name}</a></td>
        <td rowspan="${cadena.chain.evolves_to[0].evolves_to[0].length+1}" >
        <img src="${this.Imagen}${this.pokeApi.NumPokedex(cadena.chain.evolves_to[0].evolves_to[0].species.url)}.png" ></br>
        <a href="/#/test/${this.pokeApi.NumPokedex(cadena.chain.evolves_to[0].evolves_to[0].species.url)}" >
        ${cadena.chain.evolves_to[0].evolves_to[0].species.name}</a></td>
        </tr>`;
        if(cadena.chain.evolves_to[0].evolves_to.length>1){
          this.htmlToAdd=`${this.htmlToAdd}<tr >
        <td rowspan="${cadena.chain.evolves_to[0].evolves_to[1].length+1}" >
        <img src="${this.Imagen}${this.pokeApi.NumPokedex(cadena.chain.evolves_to[0].evolves_to[1].species.url)}.png" ></br>
        <a href="/#/test/${this.pokeApi.NumPokedex(cadena.chain.evolves_to[0].evolves_to[1].species.url)}" >
        ${cadena.chain.evolves_to[0].evolves_to[1].species.name}</a></td>
        </tr>
        `;
      }
        // for( let evolucion of  cadena.chain.evolves_to){
        //   this.htmlToAdd=`${this.htmlToAdd}
        //   <tr>
        //   <td>${evolucion.species.name}</td>
        //   </tr>`          
        // }
        this.htmlToAdd=`${this.htmlToAdd}</tbody>
          </table>`


      } else {
        this.htmlToAdd=`
        <table class="table">
      <thead class="thead-light">
        <tr>
        <th scope="col">Inicial</th>
        <th scope="col">Primera Evolucion</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td rowspan="${cadena.chain.evolves_to.length+1}" >
        <img src="${this.Imagen}${this.pokeApi.NumPokedex(cadena.chain.species.url)}.png" ></br>
        <a href="/#/test/${this.pokeApi.NumPokedex(cadena.chain.species.url)}" >
        ${cadena.chain.species.name}</a></td>
        </tr>`;
        for( let evolucion of  cadena.chain.evolves_to){
          this.htmlToAdd=`${this.htmlToAdd}
          <tr>
          <td>
          <img src="${this.Imagen}${this.pokeApi.NumPokedex(evolucion.species.url)}.png" ></br>
          <a href="/#/test/${this.pokeApi.NumPokedex(evolucion.species.url)}">${evolucion.species.name}</a></td>
          </tr>`          
        }
        this.htmlToAdd=`${this.htmlToAdd}</tbody>
          </table>`
      } }else {
        this.htmlToAdd='<div class="two">'+cadena.chain.evolves_to.length+'-0</div>';
      }
    }
  
    // NumPokedex(url:string){
    //   return  this.tipocomponent.NumPokedex(url);
    // }
    addelement(PokemonN){
      var Data=[];
      var chartLabels=[];
      for(let stat1 of PokemonN.stats){
        Data.push(stat1.base_stat);
        chartLabels.push(stat1.stat.name);

      }
      this.chartData = [
        { data: Data, label: 'Valor' }
      ];
      this.chartLabels=chartLabels;
    }
    chartOptions = {
      scaleShowVerticalLines:false,
      responsive:true,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
    };

    chartData = [
      { data: [300, 600, 260, 700], label: 'Valor' }
    ];
    //this.PokemonN.stats[0].base_stat
    
    chartLabels = ['January', 'February', 'Mars', 'April'];
    public barChartColors= [
      { backgroundColor: 'rgb(235,40,40)' },
    ]
   
}
