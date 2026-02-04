'use client';

import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';
import PlaylistTracks from '../PlaylistTracks/PlaylistTracks';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';


type CenterblockProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  pagePlaylist: TrackType[],
  playlist: TrackType[],
  categoryName?: string,
  isLoading: boolean,
  error: string,
  isAuthRequired: boolean
};


export default function Centerblock({ pagePlaylist, playlist, categoryName, isLoading, error, isAuthRequired }: CenterblockProp) {
  // console.log("Отфильтрованные треки в Centerblock: ", playlist);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [isLoading, error]);


  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{categoryName || 'Треки'}</h2>
      <Filter playlist={playlist} />
      <div className={styles.centerblock__content}>
        <PlaylistTitle />
        <PlaylistTracks playlist={playlist} isLoading={isLoading} error={error} isAuthRequired={isAuthRequired} />
      </div>
    </div>
  )
}