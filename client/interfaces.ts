export type Move = "rock" | "paper" | "scissors";

export interface Game {
  myMove: Move;
  cpuMove: Move;
}

export interface HistoryGame {
  myWins: number;
  cpuWins: number;
  draws: number;
}

export interface Credentials {
  userName: string;
  userEmail: string;
}

export interface UserData {
  userId: string;
  userName: string;
  userEmail: string;
  shortRoomId: string;
  longRoomId: string;
}

export interface rtDbPlayerData {
  choice: string;
  start: boolean;
}

export interface State {
  userData: UserData;
  rtDbData: {};
  currentMoves: Game;
  history: HistoryGame;
  lastWinner: string;
}
