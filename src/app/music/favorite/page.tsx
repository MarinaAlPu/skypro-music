'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';


export default function FavoritePage() {
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector((state) => state.tracks);

  const isAccessToken = useAppSelector((state) => state.auth.access);


  return (
    <>
      <Centerblock
        categoryName="Мои треки"
        playlist={isAccessToken ? favoriteTracks : []}
        isLoading={fetchIsLoading}
        error={fetchError || ''} />
    </>
  )
}
