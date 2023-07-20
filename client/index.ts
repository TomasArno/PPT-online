import { Router } from "@vaadin/router";

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

import "./components/button";
import "./components/win";
import "./components/lose";

(function init() {
  Router.go("/");
})();
