import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType,
  isPlay: boolean,
  currentPlaylist: TrackType[]
}

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentPlaylist: []
}

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      if (state.currentTrack) {
        const currentTrackIndex = state.currentPlaylist.findIndex((track) => track._id === state.currentTrack?._id);
        const nextTrackIndex = currentTrackIndex + 1;
        state.currentTrack = state.currentPlaylist[nextTrackIndex];
      }
    },
    setPrevTrack: (state) => {
      if (state.currentTrack) {
        const currentTrackIndex = state.currentPlaylist.findIndex((track) => track._id === state.currentTrack?._id);
        const prevTrackIndex = currentTrackIndex - 1;
        state.currentTrack = state.currentPlaylist[prevTrackIndex];
      }
    }
  }
})


export const { setCurrentTrack, setCurrentPlaylist, setIsPlay, setNextTrack, setPrevTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
