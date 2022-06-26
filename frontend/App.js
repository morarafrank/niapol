import "regenerator-runtime/runtime";
import React from "react";

import "./assets/css/global.css";
import "./App.css";
import {
  login,
  logout,
  get_election_topic,
  get_first_candidate,
  get_second_candidate,
  increment_votes,
  declare_winner,
} from "./assets/js/near/utils";
import getConfig from "./assets/js/near/config";
import PollsComponent from "./Components/PollsComponent";

export default function App() {
  const [showNotification, setShowNotification] = React.useState(false);

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
          Welcome to niapol!
        </h1>
        <p>
          niapol is a web app built with React for frontend and Rust smart
          contracts that conducts polls and voting between two candidates on the
          NEAR Blockchain Network.
        </p>
        <p>
          This web app currently runs in the testnet environment. To use it, you
          need to sign in with your NEAR account. You can sign in with your NEAR
          account by clicking the button below.
        </p>
        <p style={{ textAlign: "center", marginTop: "2.5em" }}>
          <button onClick={login}>Sign in</button>
        </p>
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
      {showNotification && <Notification />}
    </>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || "development");
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;

  return (
    <aside>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: 'set_greeting' in contract:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
