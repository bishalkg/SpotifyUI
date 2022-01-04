import { useSession, signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

import { shuffle } from 'lodash';

import { playlistIdState, playlistState, isLikedSongState } from '../atoms/playlistAtom';
import { useRecoilValue, useRecoilState } from 'recoil';


import useSpotify from '../hooks/useSpotify';

import Songs from './Songs';

const colors = [
  "from-indigo-500",
  "from-purple-500",
  "from-yellow-500",
  "from-blue-500",
  "from-green-500",
  "from-pink-500",
  "from-red-500",
]

export default function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isLikedSong, setIsLikedSong] = useRecoilState(isLikedSongState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {

    if (isLikedSong) {
      spotifyApi.getMySavedTracks({
      })
      .then((data) => {
        setPlaylist(data.body)
      })
      .then(() => {
        setIsLikedSong(true);
      })
      .catch((err) => console.log(err, 'error setting liked song'))
    }


  }, [spotifyApi, playlistId]);

  // console.log(playlist);
  /*
  users top tracks
  spotifyApi.getMyTopTracks()
  .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
  */


  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div onClick={() => signOut()} className="text-white flex items-center bg-green-500 space-x-3 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-20 h-20"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5"/>
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {isLikedSong ? null : <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />}
        <div>
          <p>{isLikedSong ? "LIKED SONGS" : "PLAYLIST"}</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs/>
      </div>

    </div>
  )
}