import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import Player from '../components/Player';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow">
      <Head>
        <title>SpotifyUI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar/>
        <Center />

      </main>

      <div className="sticky bottom-0">
        <Player/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
