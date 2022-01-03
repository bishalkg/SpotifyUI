import { getProviders, signIn } from 'next-auth/react';
import { getSession } from "next-auth/react"
import SpotifyLogo from '../public/img/Spotify-logo.png';
import Image from 'next/image';

function Login({ providers }) {

  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="w-30 mb-5">
        <Image src={SpotifyLogo} alt="spotify-logo"  height="282" width="800"/>
      </div>


      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })} //send back to homepage / after login
            >Login using {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  //all defined in [...nextauth].js

  return {
    props: {
      providers,
      // session: await getSession(ctx)
    }
  }
}