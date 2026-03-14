import styles from './playlistTracks.module.css';
import PlaylistTrack from '../PlaylistTrack/PlaylistTrack';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Loading from '../Loading/Loading';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import trackStyles from '../PlaylistTrack/playlistTrack.module.css';


type PlaylistTracksProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[],
  isLoading: boolean,
  error: string,
  isAuthRequired: boolean
}


export default function PlaylistTracks({ playlist, isLoading, error, isAuthRequired }: PlaylistTracksProp) {
  // console.log("треки в PlaylistTracks: ", playlist);
  // console.log("data в isLoading: ", isLoading);
  const isAccessToken = useAppSelector((state) => state.auth.access);


  return (
    <div className={styles.content__playlist}>
      {
        !isAccessToken && isAuthRequired ?
          <div className={styles.messageContainer}>Авторизуйтесь чтобы посмотреть избранные треки</div>
          :
          error ?
            <div className={styles.errorContainer}>{error}</div>
            :
            isLoading ?
              // <Loading />
              <>
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className={trackStyles.playlist__item}>
                    <div className={trackStyles.playlist__track}>
                      {/* трек */}
                      <div className={trackStyles.track__title}>
                        <div className={trackStyles.track__titleImage}>
                          <Skeleton width={51} height={51} />
                        </div>
                        <div style={{ width: '80%' }}>
                          <Skeleton width="100%" height={20} />
                        </div>
                      </div>

                      {/* исполнитель */}
                      <div className={trackStyles.track__author}>
                        <div style={{ flex: '1' }}>
                          <Skeleton width="70%" height={20} />
                        </div>
                      </div>

                      {/* альбом */}
                      <div className={trackStyles.track__album}>
                        <Skeleton width="70%" height={20} />
                      </div>

                      {/* лайк и время */}
                      <div className={trackStyles.track__time}>
                        <Skeleton width={20} height={20} circle style={{ marginRight: '10px' }} />
                        <Skeleton width={30} height={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
              :
              !playlist.length ?
                <div className={styles.messageContainer}>Треки не найдены</div>
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
