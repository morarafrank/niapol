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
2. The frontend code lives in the `/frontend` folder. `/frontend/App.js` 
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



