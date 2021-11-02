interface IDefault {
    elemDOMTag: string
    classname? :string
    textDOMElem?: string | null
    insertThisElemIntoDOM(parentDom: string) : HTMLElement
    createChild(tagName: string, className: string, text: string) : HTMLElement
}