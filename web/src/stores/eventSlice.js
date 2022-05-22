import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

export const getEvents = createAsyncThunk("event/fetchEvents",
    async () => {
        const fetchedEvents = await axios('http://localhost:8080/api/events');
        if (fetchedEvents.data.status == 200) {
            return fetchedEvents.data.data
        }
        return [];
    }   
)

export const getFavoriteEvents = createAsyncThunk("event/fetchFavoriteEvents",
    async () => {
        const fetchedEvents = await axios('http://localhost:8080/api/favorites');
        if (fetchedEvents.data.status == 200) {
            return fetchedEvents.data.data
        }
        return [];
    }   
)

export const getDate = date => {
    return moment(date.split('T')[0]).format('DD MMM, Y');
};


export const toggleFavorite = createAsyncThunk("event/toggleFavoriteEvent",
    async (id) => {
      await axios.post('http://localhost:8080/api/favorite', {'favoriteID':id});
      return true
    }   
)

export const deleteEvent = createAsyncThunk("event/deleteEvent",
    async (id) => {
      await axios.delete(`http://localhost:8080/api/event/${id}`);
      return true
    }   
)

export const deleteAllEvents = createAsyncThunk("event/deleteAllEvent",
    async () => {
      await axios.delete('http://localhost:8080/api/events');   
      return true
    }   
)

const initialState = {
  events: {
    data: [],
    loading: true,
    error: null,
  },
  favorites: {
    data: [],
    loading: true,
    error: null,
    ids: []
  },
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    
  },
  extraReducers: {
      [getEvents.fulfilled]: (state, { meta, payload, error }) => {
        state.events.data = payload;
        state.events.loading = false;
        state.events.error = '';
      },
      [getEvents.pending]: (state, action) => {
        state.events.loading = true;
      },
      [getEvents.rejected]: (state, { meta, payload, error }) => {
        state.events.loading = false;
        state.events.error = error;
      },
      [getFavoriteEvents.fulfilled]: (state, { meta, payload, error }) => {
        state.favorites.data = payload;
        state.favorites.ids = [payload.map(favorite => favorite._id)];
        state.favorites.loading = false;
        state.favorites.error = '';
      },
      [getFavoriteEvents.pending]: (state, action) => {
        state.favorites.loading = true;
      },
      [getFavoriteEvents.rejected]: (state, { meta, payload, error }) => {
        state.favorites.loading = false;
        state.favorites.error = error;
      },
  }
});


export default eventSlice.reducer;