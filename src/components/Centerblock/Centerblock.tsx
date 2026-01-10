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
  playlist: TrackType[]
}


// export default function Centerblock({ tracks }: TrackType[]) {
export default function Centerblock({ playlist }: CenterblockProp) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter playlist={playlist}/>
      <div className={styles.centerblock__content}>
        <PlaylistTitle />
        <PlaylistTracks playlist={playlist} />
      </div>
    </div>
  )
}