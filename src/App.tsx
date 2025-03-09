import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { authServices } from './services/authServices.js';
import { conversationServices } from './services/conversationServices.js';

import { Conversation, Message } from './types/Conversation.js';

function App() {
  const [count, setCount] = useState(0)
  const [profile, setProfile] = useState<{ success: boolean } | null>(null);

  const logtest = {
    mail: 'bernard62@gmail.com',
    password: "admin1234"
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authServices.login(logtest);
        setProfile(data);
      }
      catch (error) {
        console.error(error)
      }
    };
    fetchProfile()
  }, [])
  console.log(profile)
  const testLogOk = async () => {
    const data = await conversationServices.getConversation(1);
    console.log(data, 'login ok le client peut recup les données')
  }

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
        <button onClick={testLogOk}>Log ok ?</button>
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
