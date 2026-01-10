import styles from './playlistTracks.module.css';
import PlaylistTrack from '../PlaylistTrack/PlaylistTrack';
import { TrackType } from '@/sharedTypes/sharedTypes';
// import { data } from '@/data';
// import {formatTime} from '@/utils/helpers'


type PlaylistTracksProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[]
}


// export default function PlaylistTracks({ data }: TrackType[]) {
export default function PlaylistTracks({ playlist }: PlaylistTracksProp) {
  console.log("data в PlaylistTracks: ", playlist);
  return (
    <div className={styles.content__playlist}>
      {playlist.map((track) =>
        <PlaylistTrack
          key={track._id}
          // name={track.name}
          // author={track.author}
          // album={track.album}
          // time={formatTime(track.duration_in_seconds)}
          track={track}
          playlist={playlist}
        />
      )}
    </div>
  )
}
