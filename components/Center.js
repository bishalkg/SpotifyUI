
import { useSession } from 'next-auth/react';

export default function Center() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex flex-grow text-white">
      <h1>Center</h1>
      <header>
        <div>
          <img className="" src={session?.user.image} alt=""/>
        </div>

      </header>

    </div>
  )
}