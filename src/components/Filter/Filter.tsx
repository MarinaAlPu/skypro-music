'use client'

import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { useEffect, useRef, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValuesByKey } from '@/utils/helpers';
import { useAppDispatch } from '@/store/store';
import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';


type FilterProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[]
}


export default function Filter({ playlist }: FilterProp) {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>('');
  const filterRef = useRef<HTMLDivElement | null>(null);


  const onOpenDropdownList = (title: string) => {
    setIsOpen(title === isOpen ? "" : title); // закрыть список, если он уже открыт
    setActiveFilter(title);
    // console.log("Открыть список: ", title);
  };

  const uniqAuthors = getUniqueValuesByKey(playlist, 'author');
  const uniqGenres = getUniqueValuesByKey(playlist, 'genre');
  // console.log("uniqGenres: ", uniqGenres);
  const years = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  }

  const onSelectYear = (year: string) => {
    dispatch(setFilterYears(year));
  }

  const onSelectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setIsOpen("");
    }
  };

  useEffect(() => {
    // добавить обработчик клика вне окна
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      // удалить обработчик клика вне окна при размонтировании компонента
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div className={styles.centerblock__filter} ref={filterRef}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        title="исполнителю"
        onClick={() => onOpenDropdownList("исполнителю")}
        isOpen={isOpen === "исполнителю"}
        activeFilter={activeFilter}
        playlist={playlist}
        filterName='author'
        list={uniqAuthors}
        onSelect={onSelectAuthor}
      />
      <FilterItem
        title="году выпуска"
        onClick={() => onOpenDropdownList("году выпуска")}
        isOpen={isOpen === "году выпуска"}
        activeFilter={activeFilter}
        playlist={playlist}
        filterName='year'
        list={years}
        onSelect={onSelectYear}
      />
      <FilterItem
        title="жанру"
        onClick={() => onOpenDropdownList("жанру")}
        isOpen={isOpen === "жанру"}
        activeFilter={activeFilter}
        playlist={playlist}
        filterName='genre'
        list={uniqGenres}
        onSelect={onSelectGenre}
      />
    </div>
  )
}
