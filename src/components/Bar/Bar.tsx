'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import { setIsPlay } from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helpers';


export default function Bar() {
  // получить текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // console.log("currentTrack в Bar: ", currentTrack);
  const currentTrackName = useAppSelector((state) => state.tracks.currentTrack?.name);
  const currentTrackAuthor = useAppSelector((state) => state.tracks.currentTrack?.author);

  // проверить, что текущий трек играет
  const currentTrackIsPlay = useAppSelector((state) => state.tracks.isPlay);
  // console.log("currentTrackIsPlay в Bar: ", currentTrackIsPlay);

  const dispatch = useAppDispatch();

  const [volume, setVolume] = useState(0.5);
  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    if (audioRef.current) {
      // console.log("audioRef.current.volume ДО: ", audioRef.current.volume);
      audioRef.current.volume = volume;
      // console.log("audioRef.current.volume ПОСЛЕ: ", audioRef.current.volume);
    }
  }, [volume]);

  // при смене трека обнулять состояние, что трек не загрузился
  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);


  if (!currentTrack) return <></>;

  if (currentTrack && currentTrackIsPlay && audioRef.current) {
    audioRef.current.play();
  }


  const playPauseTrack = () => {
    if (currentTrackIsPlay === false) {
      // console.log("Нажали кнопку Play");
      if (audioRef.current) {
        audioRef.current.play();
        dispatch(setIsPlay(true));
      }
    } else {
      // console.log("Нажали кнопку Pause");
      if (audioRef.current) {
        audioRef.current.pause();
        dispatch(setIsPlay(false));
      }
    }
  };

  const onVolumeChange = (currentVolumeLevel: number) => {
    if (audioRef.current) {
      // console.log("currentVolumeLevel ДО: ", currentVolumeLevel);
      setVolume(currentVolumeLevel);
      // console.log("currentVolumeLevel ПОСЛЕ: ", currentVolumeLevel);
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    // console.log(`трек "${currentTrackName}" isLoadedTrack: `, isLoadedTrack);
    if (audioRef.current && isLoadedTrack) {
      // // учесть загрузился трек или нет, начинать проиграывать только после загрузки
      // isLoadedTrack д.б. = true
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);

      // console.log("currentTime: ", currentTime);
      // console.log("duration: ", duration);
    }
  };

  const onLoadedMetadata = () => {
    // console.log("Start");
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };
  
  const onEnded = () => {
    console.log("isLoop: ", isLoop);
    console.log("Next track");
    dispatch(setIsPlay(false));
  };


  return (
    <div className={styles.bar}>
      <audio
        className={styles.audio}
        controls
        ref={audioRef}
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      >
      </audio>
      <div className={styles.bar__content}>
        <div className={styles.trackPlay__timeBlock}>
          <div className={styles.trackPlay__time}>
            {getTimePanel(currentTime, duration)}
          </div>
        </div>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={playPauseTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref={
                    currentTrackIsPlay ? "/img/icon/sprite.svg#icon-pause" : "/img/icon/sprite.svg#icon-play"}></use>
                </svg>
              </div>
              <div className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={
                  classnames(
                    styles.player__btnRepeat, styles.btnIcon,
                    { [styles.btnIcon__active]: isLoop, }
                  )}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={classnames(styles.player__btnShuffle, styles.btnIcon)}>
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrackName}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrackAuthor}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div className={classnames(styles.player__btnShuffle, styles.btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={classnames(styles.trackPlay__dislike, styles.btnIcon)}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(styles.volume__progressLine, styles.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}