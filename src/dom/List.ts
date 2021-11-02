const IDefault = require('../interfaces/IDefault')


module.exports = class List implements IDefault{
    elemDOMTag: string;
    className: string;
    $elemDOM: HTMLElement;

    constructor(tagName: string, className: string) {
        this.elemDOMTag = tagName;
        this.className = className;
        this.$elemDOM = document.createElement(this.elemDOMTag)
    }

    insertThisElemIntoDOM(parentTagClass: string) {
        this.className ? this.$elemDOM.classList.add(this.className) : '';
        return document.querySelector(parentTagClass)!.appendChild(this.$elemDOM)
    }

    createChild(tagName: string, className: string, text: string) {
        const e = document.createElement(tagName);
        e.textContent = text;
        className ? e.classList.add(className) : '';
        return this.$elemDOM.appendChild(e)
    }
}

