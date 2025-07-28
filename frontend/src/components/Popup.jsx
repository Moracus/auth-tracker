import { useState } from "react";
import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKENDURL;

const Popup = () => {
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const url = new URL(tab.url);
      const domain = url.hostname;

      fetch(`${backendUrl}/track-login/${domain}`)
        .then((res) => res.json())
        .then(setLogins);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Previous Logins</h2>
      {logins.map((login) => (
        <div key={login._id} className="my-2">
          {login.loginMethod === "oauth" ? (
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              Use {login.credential}
            </button>
          ) : (
            <button
              onClick={() => navigator.clipboard.writeText(login.credential)}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Copy {login.credential}
            </button>
          )}
          <p className="text-sm text-gray-400">Used {login.loginCount} times</p>
        </div>
      ))}
    </div>
  );
};

export default Popup;
