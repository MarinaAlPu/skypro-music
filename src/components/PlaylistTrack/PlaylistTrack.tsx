'use client';

import Link from 'next/link';
import styles from './playlistTrack.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setCurrentPlaylist, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';
import classNames from 'classnames';
import { MouseEvent, useState } from 'react';
import { addTrackToFavorite } from '@/app/services/tracks/trackApi';


type trackTypeProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  track: TrackType,
  playlist: TrackType[]
}

// export default function PlaylistTrack({ name, author, album, time }: trackProp) {
export default function PlaylistTrack({ track, playlist }: trackTypeProp) {
  const dispatch = useAppDispatch();
  // console.log("track: ", track);

  const [isLikedInPlaylist, setIsLikedInPlaylist] = useState(false);
  const [isLikedInPlayer, setIsLikedInPlayer] = useState(false);

  // получить текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // console.log("currentTrack в PlaylistTrack: ", currentTrack);

  const currentTrackId = useAppSelector((state) => state.tracks.currentTrack?._id)
  // console.log("currentTrackId в PlaylistTrack: ", currentTrackId);

  // проверить, что текущий трек играет
  const currentTrackIsPlay = useAppSelector((state) => state.tracks.isPlay);
  // console.log("currentTrackIsPlay в PlaylistTrack: ", currentTrackIsPlay);


  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentPlaylist(playlist));

    // console.log("playlist: ", playlist);
  }

  const onClickLikeInPlaylist = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    // console.log("Кликнули по лайку");
    // console.log("Содержание e: ", e);


    setIsLikedInPlaylist(!isLikedInPlaylist);


  };


  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}
          onClick={onClickTrack}
        >
          <div className={styles.track__titleImage}>
            <svg className={classNames(
              styles.track__titleSvg,
              {
                [styles.track__selected]: currentTrack && currentTrackId === track._id,
                [styles.track__active]: currentTrackIsPlay === true && currentTrackId === track._id,
              }
            )}>
              {currentTrackId !== track._id && <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>}
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={styles.track__timeSvg}
            onClick={onClickLikeInPlaylist}
          >
            {/* {
              isLikedInPlaylist ?
                <svg width="14" height="12" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.52154 12.5C13.402 9 16.4673 3.70921 13.1127 1.26734C10.9125 -0.334235 8.45343 0.941754 7.52154 1.75572H7.50003H7.49997H7.47846C6.54657 0.941754 4.08746 -0.334235 1.88727 1.26734C-1.4673 3.70921 1.59797 9 7.47846 12.5H7.49997H7.50003H7.52154Z" fill="#B672FF" />
                  <path d="M7.49997 1.75572H7.52154C8.45343 0.941754 10.9125 -0.334235 13.1127 1.26734C16.4673 3.70921 13.402 9 7.52154 12.5H7.49997M7.50003 1.75572H7.47846C6.54657 0.941754 4.08746 -0.334235 1.88727 1.26734C-1.4673 3.70921 1.59797 9 7.47846 12.5H7.50003" stroke="#B672FF" />
                </svg>
                :
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
            } */}

            {
              isLikedInPlaylist ?
                <use xlinkHref="/img/icon/sprite.svg#icon-like-active"></use>
                :
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
            }

          </svg>
          <span className={styles.track__timeText}>{formatTime(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div >
  )
}
