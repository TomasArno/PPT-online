import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
console.log("soy el Router");

router.setRoutes([
  { path: "/", component: "init-welcome" },
  { path: "/new-game", component: "new-game" },
  { path: "/join-game", component: "join-game" },
  { path: "/full-room", component: "full-room" },
  { path: "/share-room", component: "share-room" },
  { path: "/details", component: "init-details" },
  { path: "/wait-room", component: "wait-room" },
  { path: "/game", component: "init-game" },
  { path: "/results", component: "init-results" },
]);
