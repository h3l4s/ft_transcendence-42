import i_user from "./user.interface";

interface i_matchHistory
{
	opponent: i_user,
	won_round: number,
	lost_round: number,
}

export default i_matchHistory;
