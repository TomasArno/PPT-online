import { rtDb } from "./db";
import { State, Credentials } from "./interfaces";

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
    lastWinner: "",
  },
  listeners: [],

  syncroLocalStorage() {
    const ls: State = this.getState();
    const localData = this.getLocalStorage();

    if (localData) {
      ls.userData.userId = localData.userId;
      ls.userData.userEmail = localData.userEmail;
      ls.userData.userName = localData.userName;
      console.log(ls.userData.userName);

      this.setState(ls);
    }
  },

  deleteLocalStorage() {
    try {
      localStorage.removeItem("user-data");
    } catch (error) {
      console.log("No se pudo borrar el localStorage");
    }
  },

  getLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem("user-data"));
    } catch (error) {
      console.log("local storage no existe");
    }
  },

  setLocalStorage() {
    const cs: State = this.getState();

    try {
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          userId: cs.userData.userId,
          userEmail: cs.userData.userEmail,
          userName: cs.userData.userName,
        })
      );
    } catch (err) {
      console.log(err);
    }
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
  },

  connectChatroom() {
    const lastState: State = this.getState();

    const chatRoomsRef = rtDb.ref(`/rooms/${lastState.userData.longRoomId}`);
    console.log("me conecto al chatroom");

    chatRoomsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      console.log("CAMBIOS", data);

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

  hasBasicCredentials() {
    const cs: State = this.getState();

    if (cs.userData.userName && cs.userData.userId && cs.userData.userEmail) {
      return true;
    } else {
      return false;
    }
  },

  async auth(userEmail) {
    const cs: State = this.getState();

    const validatedUserEmail = userEmail.toLowerCase();

    const userDataRes = await fetch(
      `${API_BASE_URL}/users/login?userEmail=${validatedUserEmail}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (userDataRes.status != 400) {
      const userData = await userDataRes.json();

      const { userId } = userData;
      const { userEmail } = userData;
      const { userName } = userData;

      cs.userData.userId = userId;
      cs.userData.userEmail = userEmail;
      cs.userData.userName = userName;

      this.setState(cs);
    } else {
      const { err } = await userDataRes.json();
      console.error(err);
    }
  },

  async signUp(userEmail: string, userName: string) {
    const cs: State = this.getState();

    const userIdDataRes = await fetch(`${API_BASE_URL}/users`, {
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
      this.setState(cs);
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
      this.setState(cs);
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
      this.setState(cs);

      this.connectChatroom();

      return true;
    } else {
      const { err } = await userRoomIdRes.json();
      console.error(err);

      return false;
    }
  },

  async setPlayerStateDb(properties: {}) {
    const cs: State = this.getState();
    const userStateRes = await fetch(
      `${API_BASE_URL}/rooms/${cs.userData.shortRoomId}/users/${cs.userData.userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(properties),
      }
    );

    console.log(await userStateRes.json());
  },

  async setHistoryDb(properties: {}) {
    console.log("entre a set history");

    const cs: State = this.getState();

    cs.lastWinner = properties["lastWinner"];
    this.setState(cs);

    const userStateRes = await fetch(
      `${API_BASE_URL}/rooms/${cs.userData.shortRoomId}/history?userId=${cs.userData.userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(properties),
      }
    );

    console.log(await userStateRes.json());
  },

  async setWinner() {
    console.log("entre a set winner");

    const cs: State = this.getState();

    let history = cs.rtDbData["history"];

    const myData = this.getPlayersData(1);
    const opponentData = this.getPlayersData(2);
    const myMove = myData.choice;
    const opponentMove = opponentData.choice;

    if (!history) {
      history = {
        [myData.userName]: 0,
        [opponentData.userName]: 0,
        draws: 0,
      };
    }

    if (
      (myMove && !opponentMove) ||
      (myMove == "rock" && opponentMove == "scissors") ||
      (myMove == "paper" && opponentMove == "rock") ||
      (myMove == "scissors" && opponentMove == "paper")
    ) {
      history[myData.userName] += 1;
      history.lastWinner = myData.userName;
      console.log("Le sume a " + myData.userName, history[myData.userName]);
    } else if (myMove == opponentMove) {
      history["draws"] += 1;
      history.lastWinner = "draw";
    } else {
      history[opponentData.userName] += 1;
      history.lastWinner = opponentData.userName;
      console.log(
        "Le sume a " + opponentData.userName,
        history[opponentData.userName]
      );
    }

    await this.setHistoryDb(history);
  },

  async deletePlayer() {
    const cs: State = this.getState();
    const userDeletedRes = await fetch(
      `${API_BASE_URL}/rooms/${cs.userData.shortRoomId}/users/${cs.userData.userId}`,
      {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(await userDeletedRes.json());
  },

  getPlayersData(number: 1 | 2) {
    const cs: State = this.getState();

    for (let prop in cs.rtDbData["currentGame"]) {
      if (number == 1) {
        if (prop == cs.userData.userId) {
          return cs.rtDbData["currentGame"][prop];
        }
      } else {
        if (prop != cs.userData.userId) {
          return cs.rtDbData["currentGame"][prop];
        }
      }
    }
    return false;
  },

  checkStatus() {
    //Incorporar
  },

  setMove(moves) {
    this.setPlayerStateDb(moves);
  },
};
