'use client';


import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { setFavoriteTracks, setPagePlaylist } from '@/store/features/trackSlice';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export default function Home() {
  const dispatch = useDispatch();

  const { fetchError, fetchIsLoading, allTracks, filters, filtredTracks, searchString } = useAppSelector((state) => state.tracks);
  // const { fetchError, fetchIsLoading, allTracks } = useAppSelector((state) => state.tracks);

  const isAuthRequired = false;

  // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  // получить плэйлист текущей страницы в зависимости от ипользования фильтров, поиска
  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filtredTracks : allTracks;
    setPlaylist(currentPlaylist);
  }, [allTracks, filtredTracks]);


  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTracks');
    const favoriteTracks = savedFavorites ? JSON.parse(savedFavorites) : [];
    dispatch(setFavoriteTracks(favoriteTracks));
  }, [dispatch]);

  useEffect(() => {
    const searchedTracks = allTracks.filter((track) => track.name.includes(searchString));

    if (searchedTracks) {
      setPlaylist(searchedTracks);
    } else {
      setPlaylist(allTracks);
    }
  }, [searchString]);
  

  return (
    <>
      <Centerblock
        pagePlaylist={allTracks}
        // playlist={allTracks}
        playlist={playlist}
        // playlist={filtredTracks}
        isLoading={fetchIsLoading}
        error={fetchError ? fetchError : ''}
        isAuthRequired={isAuthRequired}
      />
    </>
  );
}