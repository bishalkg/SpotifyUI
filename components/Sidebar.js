import { useEffect, useState } from 'react';
import { BiHeart, BiHome, BiSearch, BiPlusCircle, BiLibrary, BiRss } from 'react-icons/bi';

import { useSession } from "next-auth/react";
import useSpotify from '../hooks/useSpotify';

import { playlistIdState, playlistState, isLikedSongState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isLikedSong, setIsLikedSong] = useRecoilState(isLikedSongState);



  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items);
    });


    }
  }, [session, spotifyApi]);

  const fetchLikedSongs = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks({
      })
      .then((data) => {
        setPlaylist(data.body)
        console.log(data.body, 'sidebar likedsongs')
      })
      .then(() => {
        setIsLikedSong(true);
      })
      .catch((err) => console.log(err, 'error setting liked song'))
    }
  }

  const resetToPlaylist = (playlistId) => {
    setPlaylistId(playlistId);
  }



  return (
    <div className="text-gray-500 p-5 text-sm lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-green-500">
          <BiHome className="button"/>
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <BiSearch className="button"/>
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <BiLibrary className="button"/>
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        <button className="flex items-center space-x-2 hover:text-green-500">
          <BiPlusCircle className="button"/>
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <BiHeart className="button"/>
          <p onClick={() => fetchLikedSongs()}>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <BiRss className="button"/>
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>
        {playlists.map(playlist => {
          return (
            <p key={playlist.id} onClick={() => resetToPlaylist(playlist.id)} className="cursor-pointer hover:text-white">
              {playlist.name}
            </p>
          )
        })}


      </div>
    </div>
  )
}

export default Sidebar;