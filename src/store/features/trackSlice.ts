import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type initialStateType = {
  currentTrack: null | TrackType,
  isPlay: boolean,
  currentPlaylist: TrackType[],
  isShuffle: boolean,
  shuffledPlaylist: TrackType[],
  allTracks: TrackType[],
  favoriteTracks: TrackType[],
  fetchError: null | string,
  fetchIsLoading: boolean,
  filters: {
    authors: string[],
    years: string,
    genres: string[]
  }
}

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentPlaylist: [],
  isShuffle: false,
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  filters: {
    authors: [],
    years: 'По умолчанию',
    genres: []
  }
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
      // spread-оператор - чтобы не мутировал исходный плейлист
      state.shuffledPlaylist = [...state.currentPlaylist].sort(() => Math.random() - 0.5);
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;

      const currentTrackIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

      // if (currentTrackIndex === playlist.length - 1) {
      //   state.currentTrack = playlist[0];
      // } else {
      //   const nextTrackIndex = currentTrackIndex + 1;
      //   state.currentTrack = playlist[nextTrackIndex];
      // }

      if (currentTrackIndex !== playlist.length - 1) {
        const nextTrackIndex = currentTrackIndex + 1;
        state.currentTrack = playlist[nextTrackIndex];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;

      const currentTrackIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

      // if (currentTrackIndex === 0) {
      //   state.currentTrack = playlist[playlist.length - 1];
      // } else {
      //   const prevTrackIndex = currentTrackIndex - 1;
      //   state.currentTrack = playlist[prevTrackIndex];
      // }

      if (currentTrackIndex !== 0) {
        const prevTrackIndex = currentTrackIndex - 1;
        state.currentTrack = playlist[prevTrackIndex];
      }
    },
    toggleIsShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
      // console.log("Добавили трек в избранное");
      localStorage.setItem("favoriteTracks", JSON.stringify(state.favoriteTracks));
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      // console.log("Удаляем из избранного трек:", action.payload._id);
      state.favoriteTracks = state.favoriteTracks.filter((track) => track._id !== action.payload._id);
      // console.log("Удалили трек из избранного");
      localStorage.setItem("favoriteTracks", JSON.stringify(state.favoriteTracks));
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if(state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => el !== author);
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      // const year = action.payload;
      // if(state.filters.years.includes(year)) {
      //   state.filters.years = state.filters.years.filter((el) => el !== year);
      // } else {
      //   state.filters.years = [...state.filters.years, year];
      // }
      state.filters.years = action.payload;
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if(state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter((el) => el !== genre);
      } else {
        state.filters.genres = [...state.filters.genres, genre];
      }
    },
  }
})


export const { setCurrentTrack, setCurrentPlaylist, setIsPlay, setNextTrack, setPrevTrack, toggleIsShuffle, setAllTracks, setFavoriteTracks, addLikedTracks, removeLikedTracks, setFetchError, setFetchIsLoading, setFilterAuthors, setFilterYears, setFilterGenres } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
