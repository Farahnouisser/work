import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-material.css";
import Button from "@material-ui/core/Button";
export default function Tab(props) {
  const [gridApi, setGridApi] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const serverSideDatasource = createServerSideDatasource;
  const newItemCount = 0;
  const serverSideStoreType = "full";
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data) => {
      const datasource = createServerSideDatasource(data);
      params.api.setServerSideDatasource(datasource);
    };
    fetch(props.fetchUrl)
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const defaultColDef = {
    width: 240,
    filter: "agTextColumnFilter",
    flex: 1,
  };

  const onBtAdd = () => {
    const tx = {
      addIndex: 0,
      add: [{ employeeName: "New Item" + newItemCount }],
    };

    gridApi.applyServerSideTransaction(tx);
  };

  const isServerSideGroup = (dataItem) => {
    return dataItem.group;
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Button
        align="right"
        variant="contained"
        color="primary"
        onClick={() => onBtAdd()}
      >
        Add Before Selected Row
      </Button>
      <div
        id="myGrid"
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-material"
      >
        <AgGridReact
          serverSideDatasource={serverSideDatasource}
          autoGroupColumnDef={props.autoGroupColumnDef}
          getDataPath={props.getDataPath}
          getRowNodeId={props.getRowNodeId}
          rowModelType={"serverSide"}
          serverSideStoreType={serverSideStoreType}
          debug={true}
          treeData={true}
          animateRows={true}
          isServerSideGroup={isServerSideGroup}
          getServerSideGroupKey={props.getServerSideGroupKey}
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          columnDefs={props.columnDefs}
          rowSelection={"single"}
        ></AgGridReact>
      </div>
    </div>
  );

  function createServerSideDatasource(data) {
    return {
      getRows: function (params) {
        window.rowDataServerSide = props.extractRowsFromData(
          params.request.groupKeys,
          data
        );
        setTimeout(function () {
          params.success({
            rowData: window.rowDataServerSide,
            rowCount: window.rowDataServerSide.length,
          });
        }, 600);
      },
    };
  }
}
