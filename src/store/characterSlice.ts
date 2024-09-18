import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: string;
}

interface FetchCharactersParams {
  name?: string;
  page?: number;
  limit?: number;
}

interface CharacterState {
  characters: Character[];
  loading: boolean;
}

export const fetchCharacters = createAsyncThunk<Character[], FetchCharactersParams>(
  'characters/fetch',
  async ({ name, page, limit }) => {
      // change to this url if you do not have Backend project :
      // https://characters-w4ti.onrender.com//api/characters/all


    const response = await axios.get('http://localhost:3002/api/characters/all', { params: { name, page, limit } });
    return response.data;
  }
);

export const refreshCharacters = createAsyncThunk<void>(
  'characters/refresh',
  async () => {
      // change to this url if you do not have Backend project :
      // https://characters-w4ti.onrender.com/api/characters/refresh


      const response = await axios.post('http://localhost:3002/api/characters/refresh');
      console.log(response.data);
  }
);

const initialState: CharacterState = {
  characters: [],
  loading: false,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(refreshCharacters.fulfilled, () => {
        console.log('Characters refreshed!');
      });
  },
});

export default characterSlice.reducer;
