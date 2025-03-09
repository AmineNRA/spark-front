import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { profileServices } from './services/profileServices.js';
type interest = {
  id: number
  name: string
}
type Profile = {
  id: number
  pseudo: string
  profile_image: string
  looking_for?: string
  city?: string
  description?: string
  interests?: interest[]
  like?: string
}

function App() {
  const [count, setCount] = useState(0)
  const [profile, setProfile] = useState<{ bool: boolean } | null>(null);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileServices.deleteProfile();
        setProfile(data);
      }
      catch (error) {
        console.error(error)
      }
    };
    fetchProfile()
  }, [])

  console.log(profile)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
