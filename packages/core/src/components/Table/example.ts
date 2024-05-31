import * as BUI from "../..";

BUI.Manager.init();

const table = document.body.querySelector<BUI.Table>("bim-table")!;
table.addEventListener("rowcreated", ({ detail }) => {
  const { row } = detail;
  row.style.borderBottom = "1px solid var(--bim-ui_bg-contrast-20)";
});

table.dataTransform = {
  PredefinedType: (value) => {
    if (typeof value !== "string") return value;
    return BUI.html`
      <bim-label style="padding: 0.25rem 0.5rem; background-color: purple; color: white; border-radius: 0.25rem">${value}</bim-label>
    `;
  },
};

const loadBtn = document.getElementById("load-data") as BUI.Button;
loadBtn.addEventListener("click", async () => {
  const jsonData = await fetch(
    "https://thatopen.github.io/engine_ui-components/resources/table-data.json",
  );

  if (!jsonData.ok) {
    alert("Failed fetching table data from GitHub!");
    return;
  }
  const fetchedData = (await jsonData.json()) as BUI.TableGroupData[];

  table.data = fetchedData;
  table.columns = [{ name: "Entity", width: "12rem" }];
});

const cleanBtn = document.getElementById("clean-data") as BUI.Button;
cleanBtn.addEventListener("click", () => (table.data = []));

// You can get an object with the current values of the table taking into account any filtering
const printBtn = document.getElementById("print-data") as BUI.Button;
printBtn.addEventListener("click", () => {
  console.log(table.value);
});

// You can download a JSON file with the current table data. This will let you recreate the table but with fixed values.
const downloadBtn = document.getElementById("download-data") as BUI.Button;
downloadBtn.addEventListener("click", () => {
  table.downloadData();
});

// You can generate a csv or tsv text of the table data
const copyCSVBtn = document.getElementById("copy-csv") as BUI.Button;
copyCSVBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(table.csv);
  alert("Table data copied as CSV in clipboard!");
});

const copyTSVBtn = document.getElementById("copy-tsv") as BUI.Button;
copyTSVBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(table.tsv);
  alert("Table data copied as TSV in clipboard!");
});

// You can search data in the table by providing a queryString
const searchBox = document.getElementById("search-box") as BUI.TextInput;

searchBox.addEventListener("input", () => {
  table.queryString = searchBox.value;
});

const preserveStructure = document.getElementById(
  "preserve-structure",
) as BUI.Checkbox;

table.preserveStructureOnFilter = preserveStructure.checked;

preserveStructure.addEventListener("change", () => {
  table.preserveStructureOnFilter = preserveStructure.checked;
});
