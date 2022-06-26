import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { async } from "regenerator-runtime";
import getConfig from "./config";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [
        "get_election_topic",

        "get_first_candidate",
        "get_second_candidate",
        "accountBalance",
        "getNearBalance",
        "get_votes",
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "set_election_topic",
        "set_first_candidate",
        "set_second_candidate",

        "increment_votes",
        "declare_winner",
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

// increment votes
export async function increment_votes(votes) {
  await window.contract.increment_votes({
    args: { votes: votes },
  });
}

// first candidate
export async function get_first_candidate() {
  let first_candidate = await window.contract.get_first_candidate();
  return first_candidate;
}

export async function set_first_candidate(first_candidate) {
  let response = await window.contract.set_first_candidate({
    args: { first_candidate: first_candidate },
  });
  return response;
}

// second candidate
export async function get_second_candidate() {
  let second_candidate = await window.contract.get_second_candidate();
  return second_candidate;
}

export async function set_second_candidate(second_candidate) {
  let response = await window.contract.set_second_candidate({
    args: { second_candidate: second_candidate },
  });
  return response;
}

// election topic
export async function get_election_topic() {
  let election_topic = await window.contract.get_election_topic();
  return election_topic;
}

export async function set_election_topic(election_topic) {
  let response = await window.contract.set_election_topic({
    args: { election_topic: election_topic },
  });
  return response;
}

// declare winner
// export async function declare_winner() {
//   let response = await window.contract.declare_winner({
//     args: {},
//   });
//   return response;
// }

// function to return NEAR balance
// export async function getNearBalance() {
//   return formatNearAmount(
//     (await window.walletConnection.account().getAccountBalance()).total,
//     2
//   );
// }

/** 
// get votes
export async function getVotes() {
  let votes = await window.contract.get_votes();
  return votes;
}

// get first candidate votes
export async function getFirstCandidateVotes() {
  let first_candidate_votes = await window.contract.get_first_candidate_votes();
  return first_candidate_votes;
}

// get second candidate votes
export async function getSecondCandidateVotes() {
  let second_candidate_votes =
    await window.contract.get_second_candidate_votes();
  return second_candidate_votes;
}

*/
