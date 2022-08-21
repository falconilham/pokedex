import {createSlice} from '@reduxjs/toolkit';

const initialPokemon = [];

const slice = createSlice({
  name: 'pokemon-data',
  initialState: initialPokemon,
  reducers: {
    addData: (state, action) => [...state, ...action.payload],
    changeData: (_, action) => action.payload,
    removeData: (state, action) => {
      const id = action.payload;
      return {
        ...state,
        pokemon: state.pokemon.filter(item => item.id !== id),
      };
    },
  },
});

export const {addData, removeData, changeData} = slice.actions;

export default slice.reducer;
