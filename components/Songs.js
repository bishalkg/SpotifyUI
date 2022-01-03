import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistState, isLikedSongState } from '../atoms/playlistAtom';
import Song from './Song';

function Songs() {

  const playlist = useRecoilValue(playlistState);
  const [isLikedSong, setIsLikedSong] = useRecoilState(isLikedSongState);
  //liked songs => playlist.body.items
  return isLikedSong ?
  (
    <div className="px-8 flex flex-col space-y-1 pb-20 text-white">
      {playlist?.items.map((track, i) => (
      <Song key={track.track.id} track={track} order={i}/>
      ))}
    </div>
  )
  :
  (
    <div className="px-8 flex flex-col space-y-1 pb-20 text-white">
      {playlist?.tracks.items.map((track, i) => (
      <Song key={track.track.id} track={track} order={i}/>
      ))}
    </div>
  )
}

export default Songs;