import { css, html } from "lit"
import { UIComponent } from "../../core/UIComponent"
import { ToolbarGroup } from "../ToolbarGroup"

export class ToolbarSection extends UIComponent {
  static styles = css`
    :host {
      /* height: 100%;
      width: 100%; */
      /* margin: 0.5rem; */
    }

    .parent {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      padding: 0.5rem;
      height: 100%;
      justify-content: space-between;
    }

    :host([vertical]) .parent {
      flex-direction: row-reverse;
    }

    :host([vertical]) .parent > bim-label {
      writing-mode: tb;
    }
    
    .children {
      display: flex;
      gap: 0.25rem;
    }

    :host([vertical]) .children {
      flex-direction: column
    }

  `

  static properties = {
    label: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    vertical: { type: Boolean, reflect: true },
    labelHidden: { type: Boolean, attribute: "label-hidden", reflect: true },
  }

  declare label?: string
  declare icon?: string

  private _vertical = false

  set vertical(value: boolean) {
    this._vertical = value
    this.updateChildren()
  }

  get vertical() {
    return this._vertical
  }

  private _labelHidden = false

  set labelHidden(value: boolean) {
    this._labelHidden = value
    this.updateChildren()
  }

  get labelHidden() {
    return this._labelHidden
  }

  constructor() {
    super()
    this.labelHidden = false
  }

  private updateChildren() {
    const children = this.children
    for (const child of children) {
      if (child instanceof ToolbarGroup) {
        child.vertical = this.vertical
      }
      if (this.vertical) {
        child.setAttribute("label-hidden", "")
      } else {
        child.removeAttribute("label-hidden")
      }
    }
  }

  render() {
    return html`
      <div class="parent">
        <div class="children">
          <slot @slotchange=${this.updateChildren}></slot>
        </div>
        ${!this.labelHidden && (this.label || this.icon) ? html`<bim-label .label=${this.label} .icon=${this.icon} style="font-size: 0.75rem"></bim-label>` : null}
      </div>
    `
  }
}