import axios from 'axios';
import {REACT_APP_POKEMON_API} from '@env';

const newAxios = axios.create({
  baseURL: REACT_APP_POKEMON_API,
});

export default newAxios;
