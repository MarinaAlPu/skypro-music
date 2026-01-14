import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';
import PlaylistTracks from '../PlaylistTracks/PlaylistTracks';
import { TrackType } from '@/sharedTypes/sharedTypes';


type CenterblockProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[],
  categoryName?: string
}


export default function Centerblock({ playlist, categoryName }: CenterblockProp) {
  // console.log("Отфильтрованные треки в Centerblock: ", playlist);
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{categoryName || 'Треки'}</h2>
      <Filter playlist={playlist} />
      <div className={styles.centerblock__content}>
        <PlaylistTitle />
        <PlaylistTracks playlist={playlist} />
      </div>
    </div>
  )
}