class BlogPost extends HTMLElement {
  constructor() {
    super();

    // Connecting a shadowRoot to the Element in order to have separate styling
    this.attachShadow({
      //<editor-fold desc="Modes">
      // open: means the outside dom can access/affect the element
      // closed: the outside dom cannot affect the shadow element
      //</editor-fold>
      mode: "open",
      //<editor-fold desc="Delegate Focus modes">
      // true: when a non-focusable part of the shadow DOM is clicked, or .focus() is called on the host element
      //      , the first focusable part is given focus, and the shadow host is given any available :focus styling.
      // false (default):  act Normally
      //</editor-fold>
      delegatesFocus: true,
    });
  }

  // When the element gets loaded to the document call this function
  connectedCallback() {
    console.log("-- mounted");
    this.render();
  }

  // When the element gets removed from the document call this function
  disconnectedCallback() {
    console.log("-- unmounted");
  }

  // Called when the Element is adopted inside a document Usage:
  //  ---  document.body.appendChild(document.adoptNode(document.querySelector('img'))
  adoptedCallback() {}

  render() {
    console.log("Rendering...");
    this.shadowRoot.innerHTML = `
     <div class="blog-post">
      <h2>My post Title</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, quod.</p>
      <a href="">learn more</a>
     </div>
    `;
  }
}

customElements.define("blog-post", BlogPost);
