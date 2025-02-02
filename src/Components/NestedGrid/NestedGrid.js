import React from "react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-material.css";
import Tab from "./Tab";

export default function GridExample() {
  const columnDef = [
    { field: "employeeId", hide: true },
    { field: "employeeName", hide: true },
    { field: "jobTitle", hide: false },
    { field: "employmentType", hide: false },
  ];

  const autoGroupColumnDef = {
    headerName: "Employee",
    field: "employeeName",
    cellRendererParams: {
      innerRenderer: function (params) {
        return params.data.employeeName;
      },
    },
  };

  const getServerSideGroupKey = (dataItem) => {
    return dataItem.employeeId;
  };

  return (
    <div>
      <Tab
        fetchUrl="https://www.ag-grid.com/example-assets/small-tree-data.json"
        autoGroupColumnDef={autoGroupColumnDef}
        getDataPath={function (data) {
          return data.employeeName;
        }}
        getRowNodeId={function (data) {
          return data.employeeId;
        }}
        getServerSideGroupKey={getServerSideGroupKey}
        columnDefs={columnDef}
        extractRowsFromData={extractRowsFromData}
      ></Tab>
    </div>
  );
}

function extractRowsFromData(groupKeys, data) {
  if (groupKeys.length === 0) {
    return data.map(function (d) {
      return {
        group: !!d.children,
        employeeId: d.employeeId,
        employeeName: d.employeeName,
        employmentType: d.employmentType,
        jobTitle: d.jobTitle,
      };
    });
  }
  const key = groupKeys[0];
  for (let i = 0; i < data.length; i++) {
    if (data[i].employeeId === key) {
      return extractRowsFromData(groupKeys.slice(1), data[i].children.slice());
    }
  }
}
