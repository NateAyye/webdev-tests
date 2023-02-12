# Web Components

## Table Of Contents

- [Custom Elements](#custom-elements)
- [Extended Elements](#extending-elements)
- [Web Component Life Cycle Methods](#life-cycle-methods)
-

## Custom Elements

    - Creating Custom Elements

```javascript
  // JavaScript

class CustomElement extends HTMLElement {
  constructor () {
    super();
  }

  // More JavaScript Here
}

customElements.define('custom-element', CustomElement)
```

```html
 <!--   HTML -->
<custom-element></custom-element>
```

## Extending Elements

```javascript
  // JavaScript

class CustomButtonName extends HTMLButtonElement {
  constructor () {
    super();
  }

  // More JavaScript Here
}

customElements.define('custom-element', CustomElement, {
  extends: 'button'
})
```

## Life Cycle Methods

    - constructor(): Called when an instance of the element is created or upgraded.
    - connectedCallback(): Called every time when the element is inserted into the DOM.
    - disconnectedCallback(): Called every time the element is removed from the DOM.
    - attributeChangedCallback(attributeName, oldValue, newValue): Called when an
      attribute is added, removed, updated, or replaced.

### Examples

- ### constructor()
  - ```javascript
      class CustomElement extends HTMLElement {
        constructor() {
          super();
        } 
      }
      ```
- ### connectedCallback()
  - ```js
      class CustomElement extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({
            mode: 'open', // default: 'closed'
            delegatesFocus: true // default: false
          })
        } 
        
        connectedCallback() {
          console.log('Element Mounted --');
          this.render();
        } 
        
        render() {
          this.shadowRoot.innerHTML = `
            <div></div>
          `
        }
      }
    ```
- ### disconnectedCallback()
  - ```js
      class CustomElement extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({
            mode: 'open', // default: 'closed'
            delegatesFocus: true // default: false
          })
        } 
        
        connectedCallback() {
          console.log('Element Mounted --');
          this.render();
        } 
        
        disconnectedCallback() {
          console.log('Element Unmounted --');
        } 
        
        render() {
          this.shadowRoot.innerHTML = `
            <div></div>
          `
        }
      }
    ```

- ### attributeChangedCallback(attributeName, oldValue, newValue)
  - ```js
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({
          mode: 'open', // default: 'closed'
          delegatesFocus: true // default: false
        })
      } 
        
      connectedCallback() {} 
      
      disconnectedCallback() {} 
      
      attributeChangedCallback() {
      
      }
      render() {
        this.shadowRoot.innerHTML = `
          <div></div>
        `
      }
    }
    ```


