import axios from './axios';

async function getDetailPokemon(name) {
  const result = await axios.get(`/pokemon/${name}`);
  return result.data;
}

async function getAllPokemon(offset = 0) {
  const response = await axios.get(`/pokemon/?offset=${offset}&limit=10`);
  const getAllDetailPokemon = await Promise.all(
    response?.data?.results?.map(async ({name}) => {
      const result = await getDetailPokemon(name);
      return {
        ...result,
        image:
          result &&
          result.sprites &&
          result.sprites.other &&
          result.sprites.other.home &&
          result.sprites.other.home.front_default,
      };
    }),
  )
    .then(data => data)
    .catch(err => console.log(err));
  return getAllDetailPokemon;
}

async function getAlltype() {
  const response = await axios.get('/type');
  return response.data;
}

async function getEvolution(id) {
  const response = await axios.get(`/evolution-chain/${id}`);
  return response.data;
}

async function getAllPokemonByType(type) {
  const response = await axios.get(`/type/${type}/`);
  const getAllDetailPokemon = await Promise.all(
    response?.data?.pokemon?.map(async ({pokemon}) => {
      const result = await getDetailPokemon(pokemon.name);
      return {
        ...result,
        image:
          result &&
          result.sprites &&
          result.sprites.other &&
          result.sprites.other.home &&
          result.sprites.other.home.front_default,
      };
    }),
  )
    .then(data => data)
    .catch(err => console.log(err));
  return getAllDetailPokemon;
}

export {getAllPokemon, getAlltype, getAllPokemonByType, getEvolution};
