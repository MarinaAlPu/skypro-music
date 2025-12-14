import styles from './centerblockPlaylistTracks.module.css';
import CenterblockTrack from '../CenterblockPlaylistTrack/CenterblockPlaylistTrack';


export default function CenterblockPlaylistTracks() {
  return (
    <div className={styles.content__playlist}>
      <CenterblockTrack/>
      <CenterblockTrack/>
      <CenterblockTrack/>
      <CenterblockTrack/>
      <CenterblockTrack/>
    </div>
  )
}
