import styles from './playlistTracks.module.css';
import PlaylistTrack from '../PlaylistTrack/PlaylistTrack';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Loading from '../Loading/Loading';
import { useAppSelector } from '@/store/store';


type PlaylistTracksProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[],
  isLoading: boolean,
  error: string
}


export default function PlaylistTracks({ playlist, isLoading, error }: PlaylistTracksProp) {
  // console.log("data в PlaylistTracks: ", playlist);
  // console.log("data в isLoading: ", isLoading);

  const isAccessToken = useAppSelector((state) => state.auth.access);


  return (
    <div className={styles.content__playlist}>
      {
        !isAccessToken ?
          <div className={styles.messageContainer}>Авторизуйтесь чтобы посмотреть избранные треки</div>
          :
          error ?
            <div className={styles.errorContainer}>{error}</div>
            :
            isLoading ?
              <Loading />
              :
              playlist.map((track) =>
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
