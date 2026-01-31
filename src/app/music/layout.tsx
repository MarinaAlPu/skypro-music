'use client';

// import Link from "next/link";
import { ReactNode, Suspense } from "react";
import styles from './layout.module.css';
import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import FetchingTracks from "@/components/FetchingTracks copy/FetchingTracks";
import { useInitAuth } from "@/hooks/useInitAuth";


interface MusicLayoutProps {
  children: ReactNode
};

export default function MusicLayout({ children }: MusicLayoutProps) {
  useInitAuth();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Navigation />
            {/* <Suspense fallback={<div>"Данные загружаются. Пожалуйста, подождите."</div>}> */}
            {/* <Suspense> */}
            {children}
            {/* </Suspense> */}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
