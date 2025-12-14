import styles from './centerblock.module.css';
import CenterblockFilter from '../CenterblockFilter/CenterblockFilter';
import CenterblockPlaylistTitle from '../CenterblockPlaylistTitle/CenterblockPlaylistTitle';
import CenterblockPlaylistTracks from '../CenterblockPlaylistTracks/CenterblockPlaylistTracks';


export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <CenterblockFilter />
      <div className={styles.centerblock__content}>
        <CenterblockPlaylistTitle />
        <CenterblockPlaylistTracks />
      </div>
    </div>
  )
}