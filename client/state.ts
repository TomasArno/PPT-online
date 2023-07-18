import { rtDb, fsDb } from "./db";
import {
  State,
  Game,
  HistoryGame,
  Credentials,
  UserData,
  rtDbPlayerData,
} from "./interfaces";

const API_BASE_URL = process.env.API_URL;

export const state = {
  data: {
    userData: {
      userId: "",
      userName: "",
      userEmail: "",
      shortRoomId: "",
      longRoomId: "",
    },
    rtDbData: {},
    currentMoves: {
      myMove: "",
      cpuMove: "",
    },
    historyGame: {
      myWins: 0,
      cpuWins: 0,
      draws: 0,
    },
    lastWinner: "",
  },
  listeners: [],

  // syncroWithLocalStorage() {
  //   const localData = localStorage.getItem("saved-state");

  //   if (localData != null) {
  //     this.setState(JSON.parse(localData as any));
  //   }
  // },

  getPlayersData(number: 1 | 2) {
    const cs: State = this.getState();

    for (let prop in cs.rtDbData) {
      if (number == 1) {
        if (prop == cs.userData.userId) {
          return cs.rtDbData[prop];
        }
      } else {
        if (prop != cs.userData.userId) {
          return cs.rtDbData[prop];
        }
      }
    }
    return false;
  },

  subscribe(callBack: () => any) {
    this.listeners.push(callBack);
  },

  getState() {
    return this.data;
  },

  setState(newState: State) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }

    localStorage.setItem("saved-state", JSON.stringify(newState));
  },

  connectChatroom() {
    const lastState: State = this.getState();
    console.log("me conecto al chatroom");

    const chatRoomsRef = rtDb.ref(
      `/rooms/${lastState.userData.longRoomId}/currentGame`
    );

    chatRoomsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      console.log("CAMBIOS", data);

      // state.deletePlayer(); probar si puede ir aca

      lastState.rtDbData = data;

      this.setState(lastState);
    });
  },

  setCredentials(credentials: Credentials) {
    const cs: State = this.getState();

    cs.userData.userName = credentials.userName;
    cs.userData.userEmail = credentials.userEmail;

    this.setState(cs);
  },

  checkStatus() {
    //Incorporar
  },

  async auth(userEmail) {
    const cs: State = this.getState();

    const userDataRes = await fetch(`${API_BASE_URL}/auth`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail.toLowerCase(),
      }),
    });

    if (userDataRes.status != 400) {
      const userData = await userDataRes.json();

      const { userId } = userData;
      const { userEmail } = userData;
      const { userName } = userData;

      cs.userData.userId = userId;
      cs.userData.userEmail = userEmail;
      cs.userData.userName = userName;

      state.setState(cs);
    } else {
      const { err } = await userDataRes.json();
      console.error(err);
    }
  },
  async signUp(userEmail: string, userName: string) {
    const cs: State = this.getState();

    const userIdDataRes = await fetch(`${API_BASE_URL}/signup`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail.toLowerCase(),
        userName: userName.toLowerCase(),
      }),
    });

    if (userIdDataRes.status != 400) {
      const { userId } = await userIdDataRes.json();
      cs.userData.userId = userId;
      state.setState(cs);
    } else {
      const { err } = await userIdDataRes.json();
      console.error(err);
    }
  },

  async createRoom() {
    const cs: State = this.getState();

    const userRoomIdRes = await fetch(`${API_BASE_URL}/rooms`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: cs.userData.userId,
      }),
    });

    if (userRoomIdRes.status != 401) {
      const { roomSimpleId } = await userRoomIdRes.json();

      cs.userData.shortRoomId = roomSimpleId;
      state.setState(cs);
    } else {
      const { err } = await userRoomIdRes.json();
      console.error(err);
    }

    const ls: State = this.getState();
    await this.joinRoom(ls.userData.shortRoomId);
  },

  async joinRoom(roomId) {
    const cs: State = this.getState();

    const userRoomIdRes = await fetch(
      `${API_BASE_URL}/rooms/${roomId}?userId=${cs.userData.userId}&userName=${cs.userData.userName}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (userRoomIdRes.status != 401) {
      const { rtDbRoomId } = await userRoomIdRes.json();

      cs.userData.longRoomId = rtDbRoomId;
      cs.userData.shortRoomId = roomId;
      state.setState(cs);

      this.connectChatroom();

      return true;
    } else {
      const { err } = await userRoomIdRes.json();
      console.error(err);

      return false;
    }
  },
  async setPlayerStateDb(properties: rtDbPlayerData) {
    const cs: State = this.getState();
    const userStateRes = await fetch(
      `${API_BASE_URL}/rooms/${cs.userData.shortRoomId}/${cs.userData.userId}`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          choice: properties.choice,
          start: properties.start,
        }),
      }
    );

    console.log(await userStateRes.json());
  },
  async deletePlayer() {
    const cs: State = this.getState();
    const userDeletedRes = await fetch(
      `${API_BASE_URL}/rooms/${cs.userData.shortRoomId}/${cs.userData.userId}`,
      {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(await userDeletedRes.json());
  },

  deleteHistory() {
    const lastState: State = this.getState();
    this.setState({
      ...lastState,
      historyGame: { myWins: 0, cpuWins: 0, draws: 0 },
    });
  },

  getWinner(currentState: State) {
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
    const currentState: State = this.getState();

    currentState.currentMoves = moves;

    this.getWinner(currentState);
  },
};
