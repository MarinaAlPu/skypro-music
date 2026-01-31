'use client'

import Image from "next/image";
import Link from "next/link";
import styles from './sidebar.module.css';
import { useAppSelector } from "@/store/store";


export default function Sidebar() {
  const username = useAppSelector((state) => state.auth.username);
  // console.log("username: ", username);

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username || "Авторизуйтесь"}</p>
        <div className={styles.sidebar__icon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className="sidebar__img"
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className="sidebar__img"
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className="sidebar__img"
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
