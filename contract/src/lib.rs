use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};

const DEFAULT_ELECTION_TOPIC: &str = "The 5th President?";
const DEFAULT_FIRST_CANDIDATE: &str = "Raila Odinga";
const DEFAULT_SECOND_CANDIDATE: &str = "William Ruto";

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
// #[serde(crate = "near_sdk::serde")]
pub struct Candidate {
    candidate_name: String,
    number_of_votes: u32,
}

// implement default for Candidate
impl Default for Candidate {
    fn default() -> Self {
        Self {
            candidate_name: "".to_string(),
            number_of_votes: 0,
        }
    }
}

#[near_bindgen]
impl Candidate {
    pub fn increment_votes(&mut self) {
        log!("Increased votes to: {}", self.number_of_votes);
        self.number_of_votes += 1;
    }

    pub fn get_votes(&self) -> u32 {
        return self.number_of_votes;
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ElectionDetails {
    election_topic: String,
    first_candidate: Candidate,
    second_candidate: Candidate,
}

impl Default for ElectionDetails {
    fn default() -> Self {
        ElectionDetails {
            election_topic: DEFAULT_ELECTION_TOPIC.to_string(),
            first_candidate: Candidate {
                candidate_name: DEFAULT_FIRST_CANDIDATE.to_string(),
                number_of_votes: 0,
            },
            second_candidate: Candidate {
                candidate_name: DEFAULT_SECOND_CANDIDATE.to_string(),
                number_of_votes: 0,
            },
        }
    }
}

#[near_bindgen]
impl ElectionDetails {
    // Function to declare winner of election. if number of votes are equal, declare tie.
    pub fn declare_winner(&self) -> String {
        if self.first_candidate.number_of_votes > self.second_candidate.number_of_votes {
            log!("{}", self.election_topic);
            return self.first_candidate.candidate_name.clone();
        } else if self.first_candidate.number_of_votes < self.second_candidate.number_of_votes {
            log!("{}", self.election_topic);
            return self.second_candidate.candidate_name.clone();
        } else {
            log!("{}", self.election_topic);
            return "Tie".to_string();
        }
    }
    pub fn set_first_candidate(&mut self, candidate_name: String) {
        log!("{}", self.first_candidate.candidate_name);
        self.first_candidate.candidate_name = candidate_name;
    }

    // return first candidate number of votes
    pub fn get_first_candidate_votes(&self) -> u32 {
        return self.first_candidate.number_of_votes;
    }

    // return second candidate number of votes
    pub fn get_second_candidate_votes(&self) -> u32 {
        return self.second_candidate.number_of_votes;
    }

    pub fn set_second_candidate(&mut self, candidate_name: String) {
        log!("{}", self.second_candidate.candidate_name);
        self.second_candidate.candidate_name = candidate_name;
    }

    pub fn set_election_topic(&mut self, election_topic: String) {
        log!("{}", self.election_topic);
        self.election_topic = election_topic;
    }

    pub fn get_first_candidate(&self) -> String {
        log!("{}", self.first_candidate.candidate_name);
        return self.first_candidate.candidate_name.clone();
    }

    pub fn get_second_candidate(&self) -> String {
        log!("{}", self.second_candidate.candidate_name);
        return self.second_candidate.candidate_name.clone();
    }

    pub fn get_election_topic(&self) -> String {
        log!("{}", self.election_topic);
        return self.election_topic.clone();
    }

    // get election details default function...
}

// tests here
