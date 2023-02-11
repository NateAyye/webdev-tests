class MyButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.href = this.attributes.getNamedItem("href");
    console.log(this.href.value);
  }

  initializeRipples() {
    this.shadowRoot.addEventListener("click", (e) => {
      e.preventDefault();
      // * Toggle the current active button to off
      this.toggleCurrentActiveButton();

      // * Add the active Attribute to the currently clicked button
      this.toggleAttribute("active", true);

      // * Add the Ripple Effect to the button
      this.rippleEffect(this, e);
    });
  }

  toggleCurrentActiveButton = () => {
    // * Get the Element that has the active attribute
    const activeButton = document?.querySelector("[active]");

    // * if there is an active button then toggle the active attribute off
    if (activeButton) {
      activeButton.toggleAttribute("active", false);
    }
  };

  rippleEffect = (btn, event) => {
    // * grab the x and y position of the mouse click for the ripple effect
    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;

    let ripples = document?.createElement("span");

    ripples.style.left = x + "px";
    ripples.style.top = y + "px";

    if (!this.shadowRoot.querySelector("span")) {
      this.shadowRoot.querySelector("a").appendChild(ripples);
    }

    // * setting the timeout for the ripple
    setTimeout(() => {
      ripples.remove();
    }, 700);
  };

  connectedCallback() {
    console.log("connected -- rendering");
    this.color = this.getAttribute("color");
    this.render();
    this.initializeRipples();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        @keyframes animate {
    0% {
      width: 0;
      height: 0;
      opacity: 0.2;
    }
    100% {
      width: 400px;
      height: 400px;
      opacity: 0;
    }

  }
    
      a {
      display: inline-block;
      overflow: hidden;
      position: relative;
      padding: .5em 1em;
      background-color: ${this.color};
      color: ${this.color};
      border-radius: .5em;
      text-decoration: none;
      }
      
      a span {
        position: absolute;
        background-color: inherit;
        filter: invert(1) grayscale(1);
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-radius: 50%;
        z-index: 200;
        animation: animate 700ms linear infinite;
      }
      
      p {
      padding: 0;
      margin: 0;
      font-weight: 700;
      color: inherit;
      filter: invert(1) grayscale(1);
      }
      
      #text {
        color: ${this.color};
        filter: invert(1) grayscale(1);
      }
    </style>
    <a href={this.href.value}>
    <p>
      <slot class='title'>
      </slot>
      </p>
    </a>
    `;
  }
}

customElements.define("my-button", MyButton);
