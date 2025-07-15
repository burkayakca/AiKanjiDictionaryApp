import React from "react";
import Store from "./Store.js";
import Settings from "./ui/screens/Settings.jsx"
import Main from "./ui/screens/Main.jsx"

function App() {

  const isSettingsOpen = Store((state) => state.settingsScreenOpen)
  
  return (
    <div className="main">
      {isSettingsOpen 
        ? <Settings />
        : <Main/>
      }
    </div>
  )
}


export default App;