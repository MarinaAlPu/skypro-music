'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';


export default function FavoritePage() {
  const { favoriteTracks, fetchIsLoading, fetchError,  allTracks, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const isAuthRequired = true;

  // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  // получить плэйлист текущей страницы в зависимости от ипользования фильтров, поиска
  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filtredTracks : favoriteTracks;
    setPlaylist(currentPlaylist);
  }, [favoriteTracks, filtredTracks]);


  return (
    <>
      <Centerblock
        categoryName="Мои треки"
        pagePlaylist={favoriteTracks}
        // playlist={favoriteTracks}
        playlist={playlist}
        isLoading={fetchIsLoading}
        error={fetchError || ''}
        isAuthRequired={isAuthRequired}
      />
    </>
  )
}
