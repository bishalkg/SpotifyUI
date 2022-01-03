import { debounce } from 'lodash';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';


import { BiSkipNextCircle, BiPlayCircle, BiRewindCircle, BiVolumeFull, BiVolumeLow, BiPauseCircle } from 'react-icons/bi';

function Player() {

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          console.log('now playing', data.body);
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  }
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  /*
  spotifyApi.skipToNext()
    .then(function() {
      console.log('Skip to next');
    }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
    });

  // Skip User’s Playback To Previous Track
  spotifyApi.skipToPrevious()
    .then(function() {
      console.log('Skip to previous');
    }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
    });

  */

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {

      fetchCurrentSong();
      setVolume(50);
    }

  }, [currentTrackIdState, spotifyApi, session]);


  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }

  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 300),
    []
  );


  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt=""/>
      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>
      </div>

      <div className="flex items-center justify-evenly">
        <BiRewindCircle
          //onClick
          className="button w-8 h-8 bg-green-500 rounded-full text-black"
        />

        {isPlaying ? (
          <BiPauseCircle onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <BiPlayCircle onClick={handlePlayPause} className="button w-10 h-10"/>
        )}

        <BiSkipNextCircle
          //onClick
          className="button w-8 h-8"
        />

      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <BiVolumeLow onClick={() => volume > 0 && setVolume(volume - 10)} className="button"/>
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <BiVolumeFull onClick={() => volume < 100 && setVolume(volume + 10)} className="button"/>
      </div>
    </div>
  )
}

export default Player;

