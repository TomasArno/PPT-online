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

// AUTO-DELETE PLAYER WHEN RELOADING

window.addEventListener("beforeunload", () => {
  const cs: State = state.getState();

  console.log("entre a beforeunload");

  if (cs.userData.shortRoomId && cs.userData.userId) {
    state.deletePlayer();
  }
});
