import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
console.log("soy el Router");

router.setRoutes([
  { path: "/", component: "init-auth" },
  { path: "/sign-up", component: "init-signup" },
  { path: "/log-in", component: "init-login" },
  { path: "/welcome", component: "init-welcome" },
  { path: "/new-game", component: "new-game" },
  { path: "/join-game", component: "join-game" },
  { path: "/full-room", component: "full-room" },
  { path: "/share-room", component: "share-room" },
  { path: "/game", component: "init-game" },
  { path: "/results", component: "init-results" },
]);
