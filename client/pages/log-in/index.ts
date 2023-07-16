import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "init-login",
  class InitLogIn extends HTMLElement {
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
            <button-comp class="button">Log In</button-comp>
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

      this.shadow.querySelector(".button").addEventListener("click", () => {
        state.auth(inputEmailEl.value).then(() => {
          const cs = state.getState();
          if (
            cs.userData.userId &&
            cs.userData.userEmail &&
            cs.userData.userName
          ) {
            console.log(
              `your userID is ${cs.userData.userId},
              your userName is ${cs.userData.userName},
              your userEmail is ${cs.userData.userEmail}`
            );
            Router.go("/welcome");
          }
        });
      });
    }
  }
);
