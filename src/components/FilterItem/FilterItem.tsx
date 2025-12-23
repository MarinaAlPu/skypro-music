'use client';

import styles from './filterItem.module.css';
import { data } from '@/data';


type titleItemProp = {
  title: string,
  onClick: () => void,
  isOpen: boolean
}

export default function FilterItem({ title, onClick, isOpen }: titleItemProp) {
  // console.log(title);

  const uniqueAuthors = [...new Set(data.map(track => track.author))];
  // console.log("uniqueAuthors", uniqueAuthors);

  const uniqueReleaseYears = [...new Set(data.map(track => new Date(track.release_date).getFullYear()))];
  // console.log("uniqueReleaseYears", uniqueReleaseYears);

  const uniqueGenres = [...new Set(data.flatMap(track => track.genre))];
  // console.log("uniqueGenres", uniqueGenres);


  return (
    <>
      <div className={styles.filter__button}
        onClick={() => onClick()}
      >{title}
        {isOpen &&
          <div className={styles.filter__wrapper}>
            <ul className={styles.filter__list}>

              {title === "исполнителю" &&
                uniqueAuthors.map((author) => (
                  <li className={styles.filter__item} key={author}>
                    {author}
                  </li>
                ))}

              {title === "году выпуска" &&
                uniqueReleaseYears.map((year) => (
                  <li className={styles.filter__item} key={year}>
                    {year}
                  </li>
                ))}

              {title === "жанру" &&
                uniqueGenres.map((genre) => (
                  <li className={styles.filter__item} key={genre}>
                    {genre}
                  </li>
                ))}

            </ul>
          </div>
        }
      </div>
    </>
  )
}