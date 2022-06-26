import "regenerator-runtime/runtime";
import React from "react";

import "./assets/css/global.css";
import "./App.css";
import { login, logout } from "./assets/js/near/utils";
import getConfig from "./assets/js/near/config";
import PollsComponent from "./Components/PollsComponent";

export default function App() {
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: "var(--secondary)",
              borderBottom: "2px solid var(--secondary)",
            }}
          ></label>
          Welcome to niapol
        </h1>
        <p>
          niapol is a web app built with React for frontend and Rust smart
          contracts that conducts polls and voting between two candidates on the
          NEAR Blockchain Network.
        </p>
        <p>
          This web app currently runs in the testnet environment. To use it, you
          need to sign in with your NEAR account.
        </p>
        <p>To vote, sign in below</p>
        <button className="btn" onClick={login}>
          Sign in
        </button>
      </main>
    );
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <main>
        <h1>Voter: {window.accountId}</h1>
        <PollsComponent />
      </main>
    </>
  );
}
