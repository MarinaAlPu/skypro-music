'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';


export default function FavoritePage() {
  const dispatch = useAppDispatch();
  // const { favoriteTracks, fetchIsLoading, fetchError, allTracks, filters, filtredTracks } = useAppSelector((state) => state.tracks);
  const { fetchIsLoading, fetchError, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const isAuthRequired = true;

  // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const [myTracks, setMyTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTracks');
    // console.log("savedFavorites: ", savedFavorites);

    const favoritePlaylist: TrackType[] | [] | null = savedFavorites ? JSON.parse(savedFavorites) : [];
    // console.log("favoritePlaylist: ", favoritePlaylist);

    if (favoritePlaylist) {
      setMyTracks(favoritePlaylist);
      dispatch(setFavoriteTracks(favoritePlaylist));
    }
  }, [dispatch]);

  // получить плэйлист текущей страницы в зависимости от ипользования фильтров, поиска
  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filtredTracks : myTracks;
    setPlaylist(currentPlaylist);
  }, [myTracks, filtredTracks]);


  return (
    <>
      <Centerblock
        categoryName="Мои треки"
        pagePlaylist={myTracks}
        // playlist={favoriteTracks}
        playlist={playlist}
        isLoading={fetchIsLoading}
        error={fetchError || ''}
        isAuthRequired={isAuthRequired}
      />
    </>
  )
}
