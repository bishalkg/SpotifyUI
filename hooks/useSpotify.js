import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from '../lib/spotify';




export default function useSpotify() {
  const { data: session, status } = useSession();


  useEffect(() => {
    if (session) {

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


