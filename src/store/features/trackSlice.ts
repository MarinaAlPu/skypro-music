import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTracks: null | TrackType
}

const initialState: initialStateType = {
  currentTracks: null
}

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTracks = action.payload;
    }
  }
})


export const { setCurrentTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
