niapol
==================

A web app that conducts polls on the NEAR Blockchain Network.


Quick Start
===========

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `yarn install`
3. Run the local development server: `yarn dev` 

Exploring The Code
==================

1. The "backend" code lives in the `/contract` folder. 
      The contracts has methods that set election details set_election_topic, set_first_candidate, set_second_candidate.
      It also has increment_votes contract that adds the number of votes by one.
      The contract has also other methods like declare_winner to decide the winner depending on the number of votes of candidates,
      set_winner that returns winning candidate name and get_votes to get the number of votes of candidates.
2. The frontend code lives in the `/frontend` folder. `/frontend/App.js` 
      The frontend App.js is the entry point to the web app where the voter is asked to first login in order to be able to vote. 
      After successful sign in, the PollsComponent is launched and voting takes place.
      The fronted has one component PollsComponent where the voting takes place.
3. Tests: Tests are found in the `/contract/lib.rs` file.

Deploy
======

run `yarn dev`, your smart contract gets deployed to the live NEAR TestNet with a throwaway account.To Interact with niapol, follow the steps below:

Step 1: Create an account for the contract
------------------------------------------
1. Authorize NEAR CLI, following the commands it gives you:
Quick Start
      near login

2. Create a subaccount Quick StartQuick Start(replace `YOUR-NAME` below with your actual account name):

      near create-account near-blank-project.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet

Step 2: set contract name in code
---------------------------------

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'near-blank-project.YOUR-NAME.testnet'


Step 3: deploy!
---------------

One command:

    yarn deploy



