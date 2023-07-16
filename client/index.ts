import { Router } from "@vaadin/router";
import { state } from "./state";
import "./router";
import "./pages/auth";
import "./pages/sign-up";
import "./pages/log-in";
import "./pages/welcome";
import "./pages/join-game";
import "./pages/full-room";
import "./pages/share-room";
import "./pages/details";
import "./pages/wait-room";
import "./pages/play";
import "./pages/results";
import "./components/button";
import "./components/win";
import "./components/lose";

(function init() {
  // state.syncroWithLocalStorage();
  Router.go("/");
})();
