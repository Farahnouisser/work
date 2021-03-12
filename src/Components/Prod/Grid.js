/* eslint-disable */
import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import GridComponents from "./components"

import { uuid } from "uuidv4";


function Grid() {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);

  const gridOptions = {
    columnDefs:  [
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
      ],
    groupDefaultExpanded: -1,
    editable: true,
    getDataPath: function(data) {
      return data.orgHierarchy;
    },
    getRowNodeId:{function (data) {
      return data.orgHierarchy.id;
    }},
    autoGroupColumnDef: {
      headerName: "Organisation Hierarchy",
      editable: true,
      rowDrag: true,
      cellRendererParams: { suppressCount: true },
    
    }
  };


  const frameworkComponents = {
    simpleEditor:GridComponents.SimpleEditor,
    addRowStatusBar: GridComponents.AddRowStatusBar
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
        params.api.setRowData(data.slice(0, 50));
      };

    fetch(
      "https://api.mocki.io/v1/3147b5d5"
    )  .then((resp) => resp.json())
    .then((data) => updateData(data)
    
        );
     
      
     
    params.api.sizeColumnsToFit();
  }

  const getRowNodeId = data => data.id;

  return (
    <div className="my-app">
      <div
        id="myGrid"
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
          editType="fullRow"
          suppressClickEdit
          statusBar={{
            statusPanels: [{ statusPanel: "addRowStatusBar" }]
           }}
           modules={AllModules}
          columnDefs={gridOptions.columnDefs}
          rowData={gridOptions.rowData}
          treeData={true}
          autoGroupColumnDef={gridOptions.autoGroupColumnDef}
          groupDefaultExpanded={gridOptions.groupDefaultExpanded}
          getDataPath={gridOptions.getDataPath}
          getRowNodeId={getRowNodeId}
        />
      </div>
    </div>
  );
}

export default Grid;