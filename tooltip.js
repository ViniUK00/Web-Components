// This is a simple practice of Web Components

class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some dummy tooltip text.';
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                div {
                background-color: black;
                color: white;
                position: absolute;
                top: 2rem;
                left: 0.75rem;
                z-index: 10;
                padding: 0.15rem;
                border-radius: 3px;
                box-shadow: 1px 1px 6px rgba(0,0,0.26);
                }
                :host {
                background-color: lightblue; 
                }
                
                .highlight {
                background-color: blue;
                }
                
                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }
                
                .icon {
                background: black;
                color: aliceblue;
                padding: 0.15rem 0.5rem;
                text-align: center;
                border-radius: 50%;
                }
            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
        `;
    }


    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';

    }

    attributeChangedCalback(name,oldValue, newValue) {
        console.log(name,oldValue,newValue);
    }

    static get observedAttributes() {                  // Getter function without creating the class
        return['text'];
    }

    _showTooltip() { // Method when we call internally
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('eb-tooltip', Tooltip);
