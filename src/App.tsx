import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WebApp from "@twa-dev/sdk";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    // Lấy thông tin người dùng từ Telegram
    const user = WebApp.initDataUnsafe.user;
    if (user) {
      setUser(user);
      fetch(
        `https://server-test-webhook.onrender.com/webhook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: "oke",
            chat_id: user.id,
          }),
        }
      );
    }
  }, [user]);

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
      {user && <div>{JSON.stringify(user.username)}</div>}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
