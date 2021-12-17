import { useEffect, useState } from 'react';
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/outline';
import { HeartIcon} from '@heroicons/react/solid';

import { useSession } from "next-auth/react";
import useSpotify from '../hooks/useSpotify';

import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);



  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);


  // console.log(session)
  return (
    <div className="text-gray-500 p-5 text-sm lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
      {/* <button className="flex items-center space-x-2 hover:text-green-500">
          <p>Logout</p>
        </button> */}
        <button className="flex items-center space-x-2 hover:text-green-500">
          <HomeIcon className="h-5 w-5"/>
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <SearchIcon className="h-5 w-5"/>
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <LibraryIcon className="h-5 w-5"/>
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        <button className="flex items-center space-x-2 hover:text-green-500">
          <PlusCircleIcon className="h-5 w-5"/>
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <HeartIcon className="text-green-500 h-5 w-5"/>
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <RssIcon className="h-5 w-5"/>
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>
        {playlists.map(playlist => {
          // if (playlist.name.length > 20) {
          //   playlist.name = playlist.name.slice(0,30).concat('...');
          // }
          return (
            <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">
              {playlist.name}
            </p>
          )
        })}


      </div>
    </div>
  )
}

export default Sidebar;