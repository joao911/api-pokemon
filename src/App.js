import React,{useState, useEffect} from 'react';
import {getAllPokemon, getPokemon} from './services/pokemon'
import './App.css';

function App() {
  const [pokemonData, setPokemonData]= useState([]);
  const [nextUrl, setNextUrlr] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loadindig, setLoading] = useState(true);
  //esse constante vai ficar armazenada a api do pokémom
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  //nessa parte irei usar useEffect a parte onde irei fazer a função onde usarei a api
  useEffect(()=>{
    async function fectchData(){
      let response =await getAllPokemon(initialUrl);
      //onde next é uma parte da api
      setNextUrlr(response.next)
      // onde previous é uma parte da api
      setPrevUrl(response.previous);
      let pokemon = await loadindigPokemon(response.results)
      console.log(pokemon)
      setLoading(false)
    }
    fectchData();
  },[])

  const loadindigPokemon =async data =>{
    let _pokemonData =await Promise.all(
      data.map(async pokemon =>{
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  }
  
  return (
    <div>
      {/* aqui temos um if ternario onde se loadindig for true vai aparecer Loading..
       se não vai renderizar a api, ou seja se estiver faltando alguma letra em 
       initialUrl ou der erro na requisição irá aparecer loading... */}
      {loadindig ?  <h1>Loading...</h1>: (
        <h1>Data is fetched</h1>
      ) }
    </div>
  );
}

export default App;
