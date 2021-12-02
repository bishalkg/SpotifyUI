import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";


async function refreshAccessToken(token) {
  try {

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    //send spotify the access token and refresh token, the refresh token (doesn't expire) will refresh the access token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    console.log('refreshed token is: ', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, //1 hour
      refreshToken: refresedToken.refresh_token ?? token.refreshToken, //fallback to old token if new is not returned from spotify api
    }

  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user, }) {

      //if initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //ms
        }
      }

      //if accestoken still valid , return the previous token
      if (Date.now() < token.accessTokenExpires) {
        console.log("existing token is valid")
        // console.log(token);
        return token;
      }

      console.log('token needs refresh')
      //if accesstoken is expired, refresh it
      return await refreshAccessToken(token);

    },

  async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  }
});
