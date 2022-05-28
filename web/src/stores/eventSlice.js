import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

export const getEvents = createAsyncThunk("event/fetchEvents",
    async () => {
        const fetchedEvents = await axios('http://localhost:8080/api/events');
        if (fetchedEvents.data.status == 200) {
            const response = {
              status: fetchedEvents.data.message,
              data: fetchedEvents.data.data
            }
            return response
        }
        return [];
    }   
)

export const getFavoriteEvents = createAsyncThunk("event/fetchFavoriteEvents",
    async () => {
        const fetchedEvents = await axios('http://localhost:8080/api/favorites');
        if (fetchedEvents.data.status == 200) {
            const response = {
                status: fetchedEvents.data.message,
                data: fetchedEvents.data.data
            }
            return response
        }
        return [];
    }   
)

export const getFavoriteEventsHandler = createAsyncThunk("event/fetchFavoriteEventsHandler",
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
      const response = await axios.post('http://localhost:8080/api/favorite', {'favoriteID':id});
      return response.data.message
    }   
)

export const deleteEvent = createAsyncThunk("event/deleteEvent",
    async (id) => {
      const response = await axios.delete(`http://localhost:8080/api/event/${id}`);
      return response.data.message
    }   
)

export const deleteAllEvents = createAsyncThunk("event/deleteAllEvent",
    async () => {
      const response = await axios.delete('http://localhost:8080/api/events');   
      return response.data.message
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
  status: null,
  theme: 'light'
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearStatus: (state, action) => {
      state.status = null;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    }
  },
  extraReducers: {
      [getEvents.fulfilled]: (state, { meta, payload, error }) => {
        state.events.data = payload.data;
        state.events.loading = false;
        state.events.error = '';
        state.status = payload.status;
      },
      [getEvents.pending]: (state, action) => {
        state.events.loading = true;
      },
      [getEvents.rejected]: (state, { meta, payload, error }) => {
        state.events.loading = false;
        state.events.error = error;
      },
      [getFavoriteEvents.fulfilled]: (state, { meta, payload, error }) => {
        state.favorites.data = payload.data;
        state.favorites.ids = payload.data.map(favorite => favorite._id);
        state.favorites.loading = false;
        state.favorites.error = '';
        state.status = payload.status;
      },
      [getFavoriteEvents.pending]: (state, action) => {
        state.favorites.loading = true;
      },
      [getFavoriteEvents.rejected]: (state, { meta, payload, error }) => {
        state.favorites.loading = false;
        state.favorites.error = error;
      },
      [toggleFavorite.fulfilled]: (state, { meta, payload, error }) => {
        state.status = payload;
      },
      [deleteEvent.fulfilled]: (state, { meta, payload, error }) => {
        state.status = payload;
      },
      [deleteAllEvents.fulfilled]: (state, { meta, payload, error }) => {
        state.status = payload;
      },
      [getFavoriteEventsHandler.fulfilled]: (state, { meta, payload, error }) => {
        state.favorites.data = payload
        state.favorites.ids = payload.map(favorite => favorite._id);
      },
  }
});


export const { clearStatus, changeTheme } = eventSlice.actions;

export default eventSlice.reducer;