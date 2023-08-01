import { Router } from "@vaadin/router";
import { state } from "../../state";

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
      
      .intro-title {
        margin-top: 115px;
        
        color: #009048;
        text-align: center;
        font-size: 80px;
        font-weight: 700;
        line-height: 70px;
        letter-spacing: 0em;
      }
      
      .form-container {
        width: 320px;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }

      .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }
      
      .hand-img {
        height: 170px;
        position: relative;
        top: 40px;
      }

      @media (min-width: 767px) {
        .hand-img {
          height: 250px;
        }
      }

      @media (min-width: 768px) {
        .intro-title {

        width: 350px;
        height: 280px;
        font-size: 100px;
        line-height: 90px;
        }

        .comps-container {
          width: 400px;

        }
      }

      .input {
        background-color: white;
        border: 10px solid #001997;
        border-radius: 10px;
        
        width: 100%;
        height: 72px;

        color: black;
        font-family: Odibee Sans;
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
      }
      
      .input::placeholder {
        color: #006CFC;
        font-size: 35px;
      }

  `;
      this.shadow.appendChild(style);
    }

    render() {
      const paper = require("url:../../images/papel.svg");
      const scissors = require("url:../../images/piedra.svg");
      const rock = require("url:../../images/tijera.svg");
      // const paper = "https://picsum.photos/200/300";
      // const scissors = "https://picsum.photos/200/300";
      // const rock = "https://picsum.photos/200/300";

      this.shadow.innerHTML = `
      <main class="main">
        <h1 class="intro-title">Piedra Papel ó Tijera</h1>
        <div class="form-container">
          <form class="form">
            <input placeholder="Tu email" type="email" class="email input" />
            <input placeholder="Tu nombre" type="text" class="name input" />
            <button-comp class="button">Sign Up</button-comp>
          </form>
        </div>
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

      this.shadow.querySelector(".button").addEventListener("click", () => {
        if (!enteredFlag) {
          enteredFlag = true;

          state.setCredentials({
            userName: inputNameEl.value,
            userEmail: inputEmailEl.value,
          });

          const ls = state.getState();
          const userName = ls.userData.userName;
          const userEmail = ls.userData.userEmail;

          if (userName && userEmail) {
            state.signUp(userEmail, userName).then(() => {
              const cs = state.getState();

              if (cs.userData.userId) {
                state.setLocalStorage();
                Router.go("/welcome");
              }
            });
          }
        }
      });
    }
  }
);
