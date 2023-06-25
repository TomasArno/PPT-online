import { Router } from "@vaadin/router";
import { state } from "./state";
import "./router";
import "./pages/welcome";
import "./pages/details";
import "./pages/play";
import "./pages/results";
import "./components/button";
import "./components/win";
import "./components/lose";

(function init() {
  state.syncroWithLocalStorage();

  Router.go("/");
})();
