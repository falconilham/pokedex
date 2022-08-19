import {createSlice} from '@reduxjs/toolkit';

import {dispatch} from '../store';

// ----------------------------------------------------------------------

const initialState = {
  pokemon: [],
};

const slice = createSlice({
  name: 'pokemon-data',
  initialState,
  reducers: {
    addData: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        pokemon: [...state.pokemon, data],
      };
    },
    removeData: (state, action) => {
      const id = action.payload;
      return {
        ...state,
        pokemon: state.pokemon.filter(item => item.id !== id),
      };
    },
  },
});

export function addData(payload) {
  dispatch(slice.actions.addData(payload));
}

export function removeData(payload) {
  dispatch(slice.actions.removeData(payload));
}
export default slice.reducer;
