import { getProviders, signIn } from 'next-auth/react';
import { getSession } from "next-auth/react"

function Login({ providers }) {

  // console.log(session, 'loginpage')
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />


      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })} //send back to homepage / after login
            >Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  //all defined in [...nextauth].js

  return {
    props: {
      providers,
      // session: await getSession(ctx)
    }
  }
}