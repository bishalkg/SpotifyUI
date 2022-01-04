import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import spotifyApi from '../lib/spotify';




export default function useSpotify() {
  const { data: session, status } = useSession();


  useEffect(() => {
    if (session) {

      //if refresh token attempt fails, redirect to login page
      if (session.error == 'RefreshAccessTokenError') {
        signOut();
      } else {

        spotifyApi.setAccessToken(session.user.accessToken);
      }

    }



  }, [session]);

  return spotifyApi;

}


