import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { ColorInput } from "./ColorInput";
import { ContextMenu } from "./ContextMenu";
import { Dropdown } from "./Dropdown";
import { Grid } from "./Grid";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Label } from "./Label";
import { NumberInput } from "./NumberInput";
import { Option } from "./Option";
import { Panel } from "./Panel";
import { PanelsContainer } from "./PanelsContainer";
import { PanelSection } from "./PanelSection";
import { Scene2D } from "./Scene2D";
// import { Script } from "./Script";
import { SelectorInput } from "./SelectorInput";
import { Table } from "./Table";
import { TableCell } from "./Table/src/TableCell";
import { TableChildren } from "./Table/src/TableChildren";
import { TableGroup } from "./Table/src/TableGroup";
import { TableRow } from "./Table/src/TableRow";
import { TextInput } from "./TextInput";
import { Toolbar } from "./Toolbar";
import { ToolbarGroup } from "./ToolbarGroup";
import { ToolbarsContainer } from "./ToolbarsContainer";
import { ToolbarSection } from "./ToolbarSection";
import { ViewCube } from "./ViewCube";
import { Viewport } from "./Viewport";

declare global {
  interface HTMLElementTagNameMap {
    "bim-button": Button;
    "bim-checkbox": Checkbox;
    "bim-color-input": ColorInput;
    "bim-context-menu": ContextMenu;
    "bim-dropdown": Dropdown;
    "bim-grid": Grid;
    "bim-icon": Icon;
    "bim-input": Input;
    "bim-label": Label;
    "bim-number-input": NumberInput;
    "bim-option": Option;
    "bim-panel": Panel;
    "bim-panels-container": PanelsContainer;
    "bim-panel-section": PanelSection;
    "bim-scene-2d": Scene2D;
    // "bim-script": Script;
    "bim-selector-input": SelectorInput;
    "bim-table": Table;
    "bim-table-cell": TableCell;
    "bim-table-children": TableChildren;
    "bim-table-group": TableGroup;
    "bim-table-row": TableRow;
    "bim-text-input": TextInput;
    "bim-toolbar": Toolbar;
    "bim-toolbar-group": ToolbarGroup;
    "bim-toolbars-container": ToolbarsContainer;
    "bim-toolbar-section": ToolbarSection;
    "bim-view-cube": ViewCube;
    "bim-viewport": Viewport;
  }
}

export * from "./Button";
export * from "./Checkbox";
export * from "./ColorInput";
export * from "./ContextMenu";
export * from "./Dropdown";
export * from "./Grid";
export * from "./Icon";
export * from "./Input";
export * from "./Label";
export * from "./NumberInput";
export * from "./Option";
export * from "./Panel";
export * from "./PanelsContainer";
export * from "./PanelSection";
export * from "./Scene2D";
// export * from "./Script";
export * from "./SelectorInput";
export * from "./Table";
export * from "./TextInput";
export * from "./Toolbar";
export * from "./ToolbarGroup";
export * from "./ToolbarsContainer";
export * from "./ToolbarSection";
export * from "./ViewCube";
export * from "./Viewport";
