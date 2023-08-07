import { Router } from "@vaadin/router";
import { State } from "./interfaces";
import { state } from "./state";

// ROUTER INITIALIZATION

import "./router";

// PAGES INITIALIZATION

import "./pages/auth";
import "./pages/sign-up";
import "./pages/log-in";
import "./pages/welcome";
import "./pages/join-game";
import "./pages/full-room";
import "./pages/share-room";
import "./pages/details";
import "./pages/waiting-room";
import "./pages/play";
import "./pages/results";

// COMPONENTS INITIALIZATION

import "./components/title";
import "./components/button";
import "./components/win";
import "./components/lose";

// AUTO-LOGGING WITH LOCALSTORAGE

(function () {
  state.syncroLocalStorage();
  if (state.hasBasicCredentials()) {
    console.log("tengo las credenciales basicas");

    Router.go("/welcome");
  } else {
    console.log("no tengo las credenciales basicas");
    Router.go("/");
  }
})();

// AUTO-DELETE PLAYER AND ROOM WHEN RELOADING

window.addEventListener("beforeunload", () => {
  const cs: State = state.getState();

  const roomMembersLength = Object.keys(cs.rtDbData["currentGame"]).length;

  if (roomMembersLength == 1) {
    state.deleteRoom();
  } else if (cs.userData.shortRoomId && cs.userData.userId) {
    state.deletePlayer();
  }
});
