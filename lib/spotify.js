import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-email',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  //user-libary-modify,
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',');

const params = {
  scope: scopes,
}


const queryParamString = new URLSearchParams(params);
// console.log(queryParamString)
/* generates this
URLSearchParams {
  'scope' => 'user-read-email,playlist-read-private,playlist-read-collaborative,user-read-email,streaming,user-read-private,user-library-read,user-top-read,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,user-read-recently-played,user-follow-read' }
*/


const LOGIN_URL =  `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

// console.log(LOGIN_URL);
/* generates this url,to authorize the given scopes with the spotify api
https://accounts.spotify.com/authorize?scope=user-read-email%2Cplaylist-read-private%2Cplaylist-read-collaborative%2Cuser-read-email%2Cstreaming%2Cuser-read-private%2Cuser-library-read%2Cuser-top-read%2Cuser-read-playback-state%2Cuser-modify-playback-state%2Cuser-read-currently-playing%2Cuser-read-recently-played%2Cuser-follow-read
*/

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi;

export { LOGIN_URL };