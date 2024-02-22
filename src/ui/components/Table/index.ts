import { TemplateResult, css, html } from 'lit';
import { UIComponent } from './../../core/UIComponent';
import { createRef, ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

interface TableComponentCell {
  component: typeof UIComponent
  onCreated?: (component: UIComponent) => void
}

interface TableRow {
  data: {[key: string]: string | TableComponentCell}
  children?: TableRow[];
}

export interface TableData {
  headers?: string[]
  rows: TableRow[]
}

interface ParsedRow {
  data: TemplateResult[]
  children?: ParsedRow[]
}

interface ParsedData {
  headers: string[],
  rows: ParsedRow[]
}

export class Table extends UIComponent {
  static styles = css`
    :host {
      position: relative
    }

    table {
      border-collapse: collapse;
      margin: 0;
      padding: 0;
      font-size: 0.75rem;
    }
    
    thead {
      color: var(--bim-table_header--c);
      background-color: var(--bim-table_header--bgc);
    }
    
    th {
      font-size: 0.75rem;
      padding: 0.5rem 1rem;
      font-weight: 500;
      text-wrap: nowrap;
    }
    
    td {
      position: relative;
      padding: 0.25rem 1rem;
    }
    
    tr {
      height: 2rem;
      border-bottom: 1px solid #2e2e2e;
      position: relative;
    }

    :host([striped]) tbody tr:nth-child(even) {
      background-color: var(--bim-table¡striped--c);
    }
  `
  
  static properties = {
    value: { type: Object, attribute: false },
    headers: { type: Object, attribute: false },
    rows: { type: Object, attribute: false },
    headersVisible: { type: Boolean, reflect: true, attribute: "headers" },
    indentHighlighted: { type: String, reflect: true, attribute: "indent-highlighted" },
    selectableRows: { type: Boolean, reflect: true, attribute: "selectable-rows" },
    carets: { type: Boolean, reflect: true },
    branches: { type: Boolean, reflect: true },
    striped: { type: Boolean, reflect: true },
  }

  declare headersVisible: boolean
  declare selectableRows: boolean
  declare carets: boolean
  declare striped: boolean
  
  private _indentHighlighted?: string = undefined

  set indentHighlighted(value: string | undefined) {
    this._indentHighlighted = value
    if (value) {
      this.highlightRowsByIndent(Number(value))
    }
  }

  get indentHighlighted() {
    return this._indentHighlighted
  }

  private _parsedData: ParsedData = { headers: [], rows: [] }
  private _value: TableData = { headers: [], rows: []}

  set value(data: TableData) {
    this._value = data
    this._parsedData.headers = data.headers?? []
    this._parsedData.rows = this.process(data.rows)
  }

  get value() {
    return this._value
  }

  private getRowsTemplates(rows: ParsedRow[] = this._parsedData.rows, collector: TemplateResult[] = [], _indentation = "0") {
    for (const [index, row] of rows.entries()) {
      const indentation = _indentation.length === 1 ? (index + 1).toString() : `${_indentation}${index}`
      const tds: TemplateResult[] = []
      const { data, children } = row
      data.length = this._parsedData.headers.length
      for (const value of data) { tds.push(html`${value?? html`<td></td>`}`) }
      collector.push(html`<tr data-ui-table-indentation=${indentation}>${tds.map(td => td)}</tr>`)
      if (children) this.getRowsTemplates(children, collector, `${indentation}.`)
    }
    return collector
  }
  
  private process(row: TableRow[], indentation = 0) {
    const { headers } = this._parsedData
    const rows: ParsedRow[] = []
    for (const [i, dataRow] of row.entries()) {
      rows[i] = {data: []}
      const { children, ...info } = dataRow
      for (const header in info.data) {
        if (!headers.includes(header) && this.inferHeaders) headers.push(header)
        const headerIndex = headers.indexOf(header)
        const value = info.data[header]
        if (value) rows[i].data[headerIndex] = this.createRowData(value, headerIndex, indentation, !!children)
      }
      if (children) rows[i].children = this.process(children, indentation + 1)
    }
    return rows
  }

  private _table = createRef<HTMLTableElement>()

  inferHeaders = true

  constructor() {
    super()
    this.headersVisible = true
    this.selectableRows = false
    this.carets = true
    this.striped = true
  }

  private createSVGLine(indentation = 0) {
    // Create an SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.zIndex = "10"
    svg.style.position = "absolute"
    svg.style.top = "1rem"
    svg.style.left = `${1 + indentation - 0.5}rem`

    // Set attributes (optional)
    svg.setAttribute("width", "1");
    svg.setAttribute("height", "10");

    // Create a line element
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.style.pointerEvents = "none"

    // Set attributes for the line
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "0");
    line.setAttribute("x2", "0");
    line.setAttribute("y2", "10");
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");

    // Append the line element to the SVG
    svg.appendChild(line);
    return svg
  }

  private createRowData(value: string | TableComponentCell, headerIndex: number, _indentation: number, children: boolean) {
    const ADDITIONAL_INDENTATION = 0.125
    const indentation = _indentation + ADDITIONAL_INDENTATION
    const divStyle = {
      display: "flex",
      justifyContent: `${headerIndex === 0? `left` : "center"}`,
      alignItems: "center",
      columnGap: "0.25rem",
      marginLeft: `${headerIndex === 0 ? `${(indentation + (this.carets && !children ? 1 : 0)).toString()}rem` : 0}`,
    }
    const indents: TemplateResult[] = []
    if (headerIndex === 0) {
      for (let index = 0; index < indentation; index++) {
        indents.push(html`
          <span data-ui-table-level=${index} style="position: relative; height: 1.75rem; width: 1rem"></span>
        `)
      }
    }
    const caretRight = html`<svg xmlns="http://www.w3.org/2000/svg" height="1.125rem" viewBox="0 0 24 24" width="${1+ADDITIONAL_INDENTATION}rem" fill="#FFFFFF"><path d="M10 17l5-5-5-5v10z"/><path d="M0 24V0h24v24H0z" fill="none"/></svg>`
    const caretDown = html`<svg xmlns="http://www.w3.org/2000/svg" height="1.125rem" viewBox="0 0 24 24" width="${1+ADDITIONAL_INDENTATION}rem" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/></svg>`
    const caret = headerIndex === 0 && children && this.carets ? caretDown : null
    return html`
      <td style="position: relative;">
        <!-- ${headerIndex === 0 && children ? this.createSVGLine(indentation) : null} -->
        <div style=${styleMap(divStyle)}>
          <!-- ${headerIndex === 0 ? html`<div data-ui-table="indent-helpers" style="display: flex">${indents.map(i => i)}</div>` : null} -->
          ${caret}
          ${
            typeof value === "string"
            ? html`${value}`
            : html`${this.createCellComponent(value as TableComponentCell)}`
          }
        </div>
      </td>
    `
  }

  private createCellComponent(cell: TableComponentCell) {
    const { component, onCreated } = cell
    if (component._tableHostable) {
      const instance = new component()
      if (onCreated) onCreated(instance)
      return instance
    } else {
      console.warn(`You tried to add a ${component.name} component which is not hostable on a table.`)
      return null
    }
  }

  private rowClicked(e: PointerEvent) {
    const row = (e.target as HTMLElement).parentElement!
    const input = row.getAttribute("data-ui-table-group")
    const pattern = new RegExp(`^${input}\\.`);
    const table = this._table.value!
    const rows = table.querySelectorAll('tr[data-ui-table-group]');
    Array.from(rows).filter(row => {
      const pass = pattern.test(row.getAttribute('data-ui-table-group')!)
      if (pass) {
        // row.hidden = !row.hidden
      }
    });
  }

  highlightRowsByIndent(level: number, color = "#6528d752") {
    this._indentHighlighted = level.toString()
    const table = this._table.value!
    const rows = table.querySelectorAll<HTMLTableRowElement>('tr[data-ui-table-group]');
    for (const row of rows) {
      row.style.backgroundColor = "transparent"
      const indentation = row.getAttribute("data-ui-table-group")
      if (!indentation) { continue }
      const nestLevels = indentation.split(".")
      if (nestLevels.length - 1 === level) {
        row.style.backgroundColor = color
      }
    }
  }

  render() {
    const { headers } = this._parsedData
    const templates = this.getRowsTemplates().map(template => template)
    return html`
      <table ${ref(this._table)}>
        <colgroup>${headers.map(() => html`<col />`)}</colgroup>
        ${this.headersVisible ? html`<thead><tr>${headers.map(h => html`<th>${h}</th>`)}</tr></thead>` : null}
        <tbody>${templates}</tbody>
      </table>
    `
  }
}