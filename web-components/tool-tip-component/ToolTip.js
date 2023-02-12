const template = document.createElement("template");
template.innerHTML = `
<style>

.tooltip-container {
display: inline-block;
position: relative;
z-index: 2;
}

.cancel {
display: none;
}

svg {
 width: 1em;
 cursor: pointer;
}

.notify-container {
  position: absolute;
  bottom: 125%;
  z-index: 9;
  width: max-content;
  background: white;
  box-shadow: 5px 5px 10px rgba(0,0,0,.1);
  font-size: .8em;
  border-radius: .5em;
  padding: .75em;
  transform: scale(0);
  transform-origin: bottom left;
  
  transition: transform 250ms cubic-bezier(0.860, 0.000, 0.070, 1.000) ;
  
}

/*.tooltip-container:is(:hover, :focus) .notify-container {*/
/*  transform: scale(1);*/
/*}*/
</style>
 
<div class="tooltip-container">

  <svg class="alert" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.89 111.55">
      <defs>
          <style>.cls-1{fill:#b71616;}.cls-2{fill:#e21b1b;fill-rule:evenodd;}.cls-3{fill:#fff;}</style>
      </defs>
      <title>red-alert</title>
      <path class="cls-1" d="M2.35,84.43,45.29,10.2l.17-.27h0a22.92,22.92,0,0,1,7-7.23A17,17,0,0,1,61.58,0a16.78,16.78,0,0,1,9.11,2.69,22.79,22.79,0,0,1,7,7.26c.13.21.25.42.36.64l42.24,73.34.23.44h0a22.22,22.22,0,0,1,2.37,10.19,17.59,17.59,0,0,1-2.16,8.35,16,16,0,0,1-6.94,6.61l-.58.26a21.34,21.34,0,0,1-9.11,1.74v0H17.62c-.23,0-.44,0-.66,0a18.07,18.07,0,0,1-6.2-1.15A16.46,16.46,0,0,1,3,104.26a17.59,17.59,0,0,1-3-9.58,23,23,0,0,1,1.57-8.74,8.24,8.24,0,0,1,.77-1.51Z"/>
      <path class="cls-2" d="M9,88.76l43.15-74.6c5.23-8.25,13.53-8.46,18.87,0l42.44,73.7c3.38,6.81,1.7,16-9.34,15.77H17.62c-7.27.18-12-6.19-8.64-14.87Z"/>
      <path class="cls-3" d="M57.57,82.7a5.51,5.51,0,0,1,3.48-1.58,5.75,5.75,0,0,1,2.4.35,5.82,5.82,0,0,1,2,1.31,5.53,5.53,0,0,1,1.62,3.55,6.05,6.05,0,0,1-.08,1.4,5.54,5.54,0,0,1-5.64,4.6,5.67,5.67,0,0,1-2.27-.52,5.56,5.56,0,0,1-2.82-2.94,5.65,5.65,0,0,1-.35-1.27,5.83,5.83,0,0,1-.06-1.31h0a6.19,6.19,0,0,1,.57-2,4.57,4.57,0,0,1,1.13-1.56Zm8.16-10.24c-.2,4.79-8.31,4.8-8.5,0-.82-8.21-2.92-29.39-2.85-37.1.07-2.38,2-3.79,4.56-4.33a12.83,12.83,0,0,1,5,0c2.61.56,4.65,2,4.65,4.44v.24L65.73,72.46Z"/>
  </svg>
  <svg class="cancel" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       viewBox="0 0 305.002 305.002"
       xml:space="preserve">
  <g> 
<g>
<path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
<path d="M170.18,152.5l43.13-43.129c4.882-4.882,4.882-12.796,0-17.678c-4.881-4.882-12.796-4.881-17.678,0l-43.13,43.13
l-43.131-43.131c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678l43.13,43.13l-43.131,43.131
c-4.881,4.882-4.881,12.796,0,17.679c2.441,2.44,5.64,3.66,8.839,3.66c3.199,0,6.398-1.221,8.839-3.66l43.131-43.132
l43.131,43.132c2.441,2.439,5.64,3.66,8.839,3.66s6.398-1.221,8.839-3.66c4.882-4.883,4.882-12.797,0-17.679L170.18,152.5z"/>
</g>
  </g>
  </svg>
  <div class="notify-container">
    <slot name="message"></slot>
  </div>
</div>
`;

class ToolTip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  tooltip(expandState) {
    const tooltip = this.shadowRoot.querySelector(".notify-container");
    const alert = this.shadowRoot.querySelector(".alert");
    const cancel = this.shadowRoot.querySelector(".cancel");

    if (expandState) {
      tooltip.style.transform = "scale(1)";
      alert.style.display = "none";
      cancel.style.display = "block";
      expandState = false;
    } else {
      tooltip.style.transform = "scale(0)";
      cancel.style.display = "none";
      alert.style.display = "block";
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".alert").addEventListener("click", (e) => {
      this.tooltip(true);
    });
    this.shadowRoot.querySelector(".cancel").addEventListener("click", (e) => {
      this.tooltip(false);
    });

    if (this.getAttribute("background-color")) {
      this.shadowRoot.querySelector(".notify-container").style.background =
        this.getAttribute("background-color");
    }
    if (this.getAttribute("color")) {
      this.shadowRoot.querySelector(".notify-container").style.color =
        this.getAttribute("color");
    }
  }
}

window.customElements.define("tool-tip", ToolTip);
