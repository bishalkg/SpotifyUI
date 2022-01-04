# Next.js + NextAuth.js + Tailwind CSS 

## Description

- this application allows the user to login to their spotify account, retrieve their playlists and their liked songs, play and pause any song in those lists, control the volume up and down by sliding the volume bar or pressing the volume up/down icons.

## How to use dev

- go to [Spotify for Developers](https://developer.spotify.com/dashboard/applications) dashboard and create a new project.
- then retrieve the clientID and clientSecret from the new project dashboard.
- under settings add http://localhost:3000/api/auth/callback/spotify to the Redirect URIs
- create a .env.local file and add the clientID and clientSecret as well as the NEXTAUTH_URL and a JWT_SECRET
 ```
 NEXTAUTH_URL=http://localhost:3000
 NEXT_PUBLIC_CLIENT_SECRET=YOUR_SPOTIFY_DEV_ACCT_CLIENT_SECRET_HASH
 NEXT_PUBLIC_CLIENT_ID=YOUR_SPOTIFY_DEV_ACCT_CLIENT_ID
 JWT_SECRET=SOME_RANDOM_ENCRYPTED_VALUE
 ```
- open the repo and run:
```npm run dev```
to run in development mode
- go to localhost:3000 on your browser and log in with spotify as prompted
- Keep open the [Spotify Web Player](https://open.spotify.com/) on your browser for this to work.

## Demo
- Don't forget to turn the audio on!

https://user-images.githubusercontent.com/84740259/148000847-78522b37-4348-4e18-9a9b-c9b645b37431.mp4







