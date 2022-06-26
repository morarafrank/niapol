import React, { useState, useEffect } from "react";
// import App.css
import "../App.css";
// import login and logout
import {
  login,
  logout,
  get_election_topic,
  get_first_candidate,
  get_second_candidate,
  increment_votes,
  declare_winner,
  set_first_candidate,
  set_election_topic,
  getNearBalance,
} from "../assets/js/near/utils";

const PollsComponent = () => {
  const [election_topic, setElectionTopic] = React.useState("");
  const [first_candidate, setFirstCandidate] = React.useState("");
  const [second_candidate, setSecondCandidate] = React.useState("");
  const [first_votes, setFirstVotes] = React.useState(0);
  const [second_votes, setSecondVotes] = React.useState(0);
  const [winner, setWinner] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [votes, setVotes] = React.useState(0);

  const addFirstVotes = () => {
    // increment_votes();
    setFirstVotes(first_votes + 1);
  };

  const addSecondVotes = () => {
    // increment_votes();
    setSecondVotes(second_votes + 1);
  };

  // function to compare first and second candidate votes and update winner text
  const compareVotes = () => {
    if (first_votes > second_votes) {
      setWinner(first_candidate);
    } else if (first_votes < second_votes) {
      setWinner(second_candidate);
    } else {
      setWinner("Tie");
    }
  };

  // useEffect to get election topic
  React.useEffect(() => {
    get_election_topic().then((topic) => {
      setElectionTopic(topic);
    });
  }, []);

  // useEffect to get first candidate
  React.useEffect(() => {
    get_first_candidate().then((candidate) => {
      setFirstCandidate(candidate);
    });
  }, []);

  // useEffect to get second candidate
  React.useEffect(() => {
    get_second_candidate().then((candidate) => {
      setSecondCandidate(candidate);
    });
  }, []);

  // useEffect to get declared winner
  // React.useEffect(() => {
  //   declare_winner().then((winner) => {
  //     setWinner(winner);
  //   }, []);
  // }, []);

  // UseEffect to get account balance
  // React.useEffect(() => {
  //   getNearBalance().then((balance) => {
  //     if (balance > 10) {
  //       setBalance(balance);
  //     } else {
  //       ("Insufficient Funds");
  //     }
  //   });
  // }, []);

  // useEffect to incrememt votes
  // React.useEffect(() => {
  //   increment_votes().then((votes) => {
  //     setVotes(votes);
  //   });
  // }, []);

  return (
    <div>
      <div className="polls-container"></div>
      <div className="polls-component">
        <div className="polls-component">
          <div className="vote-title"></div>

          <h4>{election_topic}</h4>
          <div className="first-candidate">
            <h5> {first_candidate}</h5>
            <button className="btn" onClick={addFirstVotes}>
              Vote
            </button>
            <h5>{first_votes} Votes</h5>
          </div>

          <div className="second-candidate">
            <h5>{second_candidate}</h5>
            <button className="btn" onClick={addSecondVotes}>
              Vote
            </button>
            <h5>{second_votes} Votes.</h5>
          </div>

          <h5>
            Winner:{" "}
            {
              //set winner to expression comparing first votes to second votes
              first_votes > second_votes
                ? first_candidate + " wins!"
                : second_candidate + " wins!"
              // compareVotes()
            }
          </h5>
        </div>
        <button className="btn" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default PollsComponent;
