import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
console.log("soy el Router");

router.setRoutes([
  { path: "/", component: "init-welcome" },
  { path: "/details", component: "init-details" },
  { path: "/game", component: "init-game" },
  { path: "/results", component: "init-results" },
]);
