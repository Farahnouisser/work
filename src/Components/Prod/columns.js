

export const columnDefs = [
  {
    headerName: "jobTitle (simpleEditor)",
    field:  "jobTitle" ,
    cellEditor: "simpleEditor"
  },
  {
    headerName: "EmploymentType",
    field: "employmentType",
  },
  {
    headerName: "Actions",
    colId: "actions",
    cellRenderer: "actionsRenderer",
    editable: false,
    filter: false,
    minWidth: 220
  }
];

export const defaultColDef = {
  editable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
  suppressKeyboardEvent: params => params.editing
};
