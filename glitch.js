const tagName = "sgj-glitch"
const customTagName = tagName.replace("sgj-", "")
customElements.define(tagName, class extends HTMLElement {
    connectedCallback() {
        const scratchDisable = this.getAttribute("scratchDisable")
        const noiseDisable = this.getAttribute("noiseDisable")
        const id = `glitch-${document.querySelectorAll(tagName).length}`

        this.innerHTML = `
            <span data-text="${this.textContent}" id="${id}">${this.textContent}</span>

            <style>
            #${id} {
                --tiktok-pink: #ff0050;
                --tiktok-aqua: #00f2ea;
                position: relative;
                color: transparent;
                
                ${scratchDisable ?? `
                clip-path: shape(
                    from 0% 0%, hline to 100%,
                    vline by calc( var(--scratch) * 1% ), hline to 0%, vline by 2px, hline to 100%, vline to 100%, hline to 0%,
                    close
                );
                `}
                animation: scratch 1s infinite linear alternate;
                ${noiseDisable ?? `
                mask: repeating-radial-gradient(circle, #000 0, #0009 var(--noise));
                `}

                &::before, &::after {
                    content: attr(data-text);
                    position: absolute;
                    inset: 0;
                    mix-blend-mode: multiply;
                    animation: glitch 1s infinite linear alternate;

                }
                &::before {
                    text-shadow: calc(var(--x) * -1px) calc(var(--y) * 1px) var(--tiktok-pink);
                }
                &::after {
                    text-shadow: calc(var(--x) * 1px) calc(var(--y) * -1px) var(--tiktok-aqua);
                }
            }
            @property --x {
                syntax: '<integer>';
                inherits: true;
                initial-value: 0;
            }
            @property --y {
                syntax: '<integer>';
                inherits: true;
                initial-value: 0;
            }
            @keyframes glitch {
                0% {--x: -1; --y: -1; filter: blur(1px);}
                10% {--x: 1; --y: 0;}
                30% {--x: 2; --y: -1;}
                35% {--x: -2; --y: 1;}
                50% {--x: 0; --y: 0; filter: blur(0px);}
            }
            @keyframes scratch {
                0% {--scratch: 60;}
                10% {--scratch: 70;}
                20% {--scratch: 40;}
                25% {--scratch: 50;}
                50% {--scratch: 0; --noise: 0.1px;}
            }
            @property --noise {
                syntax: '<length>';
                inherits: true;
                initial-value: 0px;
            }
            </style>
        `
    }
})

document.querySelectorAll(customTagName).forEach(e => e.outerHTML = e.outerHTML.replace(customTagName, tagName))
