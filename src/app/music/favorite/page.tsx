'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useState } from 'react';
import { myData } from "@/data";


export default function FavoritePage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
      <Centerblock categoryName="Мои треки" playlist={myData} isLoading={isLoading} error={error}/>
    </>
  )
}
