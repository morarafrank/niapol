use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};

const DEFAULT_ELECTION_TOPIC: &str = "World Super Powers";
const DEFAULT_FIRST_CANDIDATE: &str = "United States";
const DEFAULT_SECOND_CANDIDATE: &str = "China";

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
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
#[cfg(test)]
mod tests {
    use super::*;
    // testing increment votes function
    #[test]
    fn test_increment_votes() {
        let mut candidate = Candidate::default();
        candidate.increment_votes();
        assert_eq!(candidate.number_of_votes, 1);
    }

    // testing declare winner function
    #[test]
    fn test_declare_winner() {
        //    compare first and second candidate votes and declare winner, if tie return tie
        let mut election_details = ElectionDetails::default();
        election_details.first_candidate.number_of_votes = 1;
        election_details.second_candidate.number_of_votes = 1;
        assert_eq!(election_details.declare_winner(), "Tie");
        election_details.first_candidate.number_of_votes = 2;
        election_details.second_candidate.number_of_votes = 1;
        assert_eq!(election_details.declare_winner(), "United States");
        election_details.first_candidate.number_of_votes = 1;
        election_details.second_candidate.number_of_votes = 2;
        assert_eq!(election_details.declare_winner(), "China");
    }

    // testing set first candidate function
    #[test]
    fn test_set_first_candidate() {
        let mut election_details = ElectionDetails::default();
        election_details.set_first_candidate("United States".to_string());
        assert_eq!(
            election_details.first_candidate.candidate_name,
            "United States"
        );
    }

    // testing set second candidate function
    #[test]
    fn test_set_second_candidate() {
        let mut election_details = ElectionDetails::default();
        election_details.set_second_candidate("China".to_string());
        assert_eq!(election_details.second_candidate.candidate_name, "China");
    }

    // testing set election topic function
    #[test]
    fn test_set_election_topic() {
        let mut election_details = ElectionDetails::default();
        election_details.set_election_topic("World Super Powers".to_string());
        assert_eq!(election_details.election_topic, "World Super Powers");
    }
}
