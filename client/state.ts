type Move = "rock" | "paper" | "scissors";

type Game = {
  myMove: Move;
  cpuMove: Move;
};

export const state = {
  data: {
    currentMoves: {
      myMove: "",
      cpuMove: "",
    },
    history: {
      myWins: 0,
      cpuWins: 0,
      draws: 0,
    },
    lastWinner: "",
  },

  syncroWithLocalStorage() {
    const localData = localStorage.getItem("saved-state");

    if (localData != null) {
      this.setState(JSON.parse(localData as any));
    }
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;

    localStorage.setItem("saved-state", JSON.stringify(newState));
  },

  deleteHistory() {
    const lastState = this.getState();
    this.setState({
      ...lastState,
      history: { myWins: 0, cpuWins: 0, draws: 0 },
    });
  },

  getWinner(currentState) {
    const myMove = currentState.currentMoves.myMove;
    const cpuMove = currentState.currentMoves.cpuMove;
    console.log(myMove, cpuMove);

    if (
      (myMove == "rock" && cpuMove == "scissors") ||
      (myMove == "paper" && cpuMove == "rock") ||
      (myMove == "scissors" && cpuMove == "paper")
    ) {
      currentState.history.myWins = currentState.history.myWins + 1;
      currentState.lastWinner = "user";
    } else if (myMove == cpuMove) {
      currentState.history.draws = currentState.history.draws + 1;
      currentState.lastWinner = "draw";
    } else {
      currentState.history.cpuWins = currentState.history.cpuWins + 1;
      currentState.lastWinner = "cpu";
    }

    this.setState(currentState);
  },
  setMove(moves: Game) {
    const currentState = this.getState();

    currentState.currentMoves = moves;

    this.getWinner(currentState);
  },
};
