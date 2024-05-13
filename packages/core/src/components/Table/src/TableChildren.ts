import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Component } from "../../../core/Component";
import { Table, TableGroupValue } from "../index";
import { TableGroup, TableGroupData } from "./TableGroup";

export class TableChildren extends Component {
  static styles = css`
    :host {
      position: relative;
      grid-area: Children;
    }

    :host([hidden]) {
      display: none;
    }
  `;

  @property({ type: Array, attribute: false })
  groups?: TableGroupData[];

  private _groups: TableGroup[] = [];

  table = this.closest<Table>("bim-table");

  get value() {
    return new Promise<TableGroupValue[]>((resolve) => {
      setTimeout(async () => {
        const value: TableGroupValue[] = [];
        for (const group of this._groups) {
          value.push(await group.value);
        }
        resolve(value);
      });
    });
  }

  toggleGroups(force?: boolean, recursive = false) {
    for (const group of this._groups) {
      group.childrenHidden =
        typeof force === "undefined" ? !group.childrenHidden : !force;
      if (recursive) group.toggleChildren(force, recursive);
    }
  }

  protected render() {
    this._groups = [];
    return html`
      ${this.groups?.map((group) => {
        const tableGroup = document.createElement(
          "bim-table-group",
        ) as TableGroup;
        this._groups.push(tableGroup);
        tableGroup.group = group;
        tableGroup.table = this.table;
        return tableGroup;
      })}
    `;
  }
}
