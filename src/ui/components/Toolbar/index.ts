import { css, html } from "lit";
import { UIComponent } from "../../core/UIComponent"
import { ToolbarSection } from "../ToolbarSection";
import { Button } from "../Button";
import { UIManager } from "../../core/UIManager";
import { HasName } from "../../core/types";

export class Toolbar extends UIComponent implements HasName {
  static styles = css`
    :host {
      --bim-button--bgc: transparent;
      background-color: var(--bim-ui_bg-base);
      border-radius: var(--bim-ui_size-4xs);
    }

    :host([active]) {
      display: block;
    }

    :host(:not([active])) {
      display: none;
    }

    .parent {
      display: flex;
      align-items: center;
    }

    :host([vertical]) .parent {
      flex-direction: column;
    }

    ::slotted(bim-toolbar-section:not(:last-child)) {
      border-right: 1px solid var(--bim-ui_bg-contrast-20);
      border-bottom: none;
    }

    :host([vertical]) ::slotted(bim-toolbar-section:not(:last-child)) {
      border-bottom: 1px solid var(--bim-ui_bg-contrast-20);
      border-right: none;
    }
  `

  static properties = {
    label: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    labelsHidden: { type: Boolean, attribute: "labels-hidden", reflect: true },
    vertical: { type: Boolean, reflect: true },
    gridArea: { type: String, attribute: false },
    active: { type: Boolean, reflect: true }
  }

  declare label: string
  declare icon?: string
  declare labelsHidden: boolean

  private onActiveChange = new Event("activechange")

  private _active = true

  set active(value: boolean) {
    this._active = value
    this.dispatchEvent(this.onActiveChange)
  }

  get active() {
    return this._active
  }

  private _vertical = false

  set vertical(value: boolean) {
    this._vertical = value
    this.updateSections()
  }

  get vertical() {
    return this._vertical
  }

  private _gridArea: string = ""

  get gridArea() {
    return this._gridArea
  }

  set gridArea(value: string) {
    this._gridArea = value
    this.style.gridArea = `toolbar-${value}`
  }

  activationButton: Button = document.createElement("bim-button")

  constructor() {
    super()
    this.labelsHidden = false
    this.active = false
    this.label = "Toolbar"
  }

  private updateSections() {
    const children = this.children;
    for (const child of children) {
      if (child instanceof ToolbarSection) {
        child.labelHidden = this.vertical && !UIManager.config.sectionLabelOnVerticalToolbar
        child.vertical = this.vertical
      }
    }
  }

  private onTabElementClick = () => {
    this.active = true
  }

  connectedCallback() {
    super.connectedCallback()
    const managerId = UIManager.generateRandomId()
    this.setAttribute("data-ui-manager-id", managerId)
    this.activationButton.setAttribute("data-ui-manager-id", managerId)
    this.activationButton.icon = this.icon
    this.activationButton.addEventListener("click", this.onTabElementClick)
    this.activationButton.draggable = true
    this.activationButton.addEventListener("dragstart", (e) => {
      const uiId = this.getAttribute("data-ui-manager-id")
      if (e.dataTransfer && uiId) {
        e.dataTransfer.setData("id", uiId);
        e.dataTransfer.effectAllowed = "move";
      }
      const containers = document.querySelectorAll("bim-toolbars-container")
      for (const container of containers) {
        if (container === this.parentElement) continue;
        container.dropping = true
      }
    })
    this.activationButton.addEventListener("dragend", (e) => {
      if (e.dataTransfer) {
        e.dataTransfer.clearData();
      }
      const containers = document.querySelectorAll("bim-toolbars-container")
      for (const container of containers) {
        container.dropping = false
      }
    })
  }

  render() {
    this.activationButton.label = this.label
    this.activationButton.active = this.active
    return html`
      <div class="parent">
        <slot @slotchange=${this.updateSections}></slot>
      </div>
    `
  }
}