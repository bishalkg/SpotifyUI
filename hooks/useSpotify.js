import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
// import SpotifyWebApi from 'spotify-web-api-node';
import spotifyApi from '../lib/spotify';


// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
// })


export default function useSpotify() {
  const { data: session, status } = useSession();

  // console.log(session, 'useSpotify');

  useEffect(() => {
    if (session) {
      // console.log(session, 'inside session block');
      //if refresh token attempt fails, redirect to login page
      if (session.error == 'RefreshAccessTokenError') {
        signIn();
      } else {

        spotifyApi.setAccessToken(session.user.accessToken);
      }

    }



  }, [session]);

  return spotifyApi;

}


