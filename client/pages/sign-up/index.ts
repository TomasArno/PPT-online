import { Router } from "@vaadin/router";
import { state } from "../../state";
import { State } from "../../interfaces";

customElements.define(
  "init-signup",
  class InitSignUp extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    addStyles() {
      const style = document.createElement("style");
      style.innerHTML = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .main {
        width: 100%;
        height: 100vh;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      .form {
        width: 400px;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }

      .btn {
        height: 55px;
      }

      .input {
        background-color: white;
        border: 8px solid #001997;
        border-radius: 10px;
        
        width: 100%;
        height: 55px;

        color: black;
        font-family: Odibee Sans;
        font-size: 40px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
      }
      
      .input::placeholder {
        color: #006CFC;
        font-size: 35px;
      }

      .hand-img {
        height: 170px;
        position: relative;
        top: 40px;
      }

      @media (min-width: 767px) {
        .hand-img {
          height: 230px;
        }
      }

  `;
      this.shadow.appendChild(style);
    }

    render() {
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/piedra.svg");
      const rock = require("url:../../images/tijera.svg");

      this.shadow.innerHTML = `
      <main class="main">
        <title-comp></title-comp>
        
        <form class="form">
          <input placeholder="Tu email" type="email" class="email input" />
          <input placeholder="Tu nombre" type="text" class="name input" />
          <button-comp class="button btn">Registrarse</button-comp>
        </form>
        <div class="images">
          <img class="hand-img" src="${rock}">
          <img class="hand-img" src="${paper}">
          <img class="hand-img" src="${scissors}">
        </div>
      </main>
      `;

      this.addStyles();

      this.setListeners();
    }

    setListeners() {
      const inputEmailEl = this.shadow.querySelector(
        ".email"
      ) as HTMLFormElement;
      const inputNameEl = this.shadow.querySelector(".name") as HTMLFormElement;

      let enteredFlag = false;

      const intervalId = setInterval(() => {
        enteredFlag = false;
      }, 1500);

      this.shadow.querySelector(".button").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;

          state.setCredentials({
            userName: inputNameEl.value,
            userEmail: inputEmailEl.value,
          });

          const ls: State = state.getState();
          const userName = ls.userData.userName;
          const userEmail = ls.userData.userEmail;

          if (userName && userEmail) {
            state.signUp(userEmail, userName).then(() => {
              const cs = state.getState();

              if (cs.userData.userId) {
                state.setLocalStorage();
                Router.go("/welcome");
                clearInterval(intervalId);
              }
            });
          }
        }
      });
    }
  }
);
