import React from "react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-material.css";
import Tab from "./Tab";

export default function GridExample() {
  const columnDef = [
    { field: "ArticleId", hide: true },
    { field: "Article", hide: true },
    { field: "Title", hide: false },
    { field: "Type", hide: false },
    { field: "Status", hide: false },
  ];

  const autoGroupColumnDef = {
    headerName: "Article",
    field: "Article",
    cellRendererParams: {
      innerRenderer: function (params) {
        return params.data.Article;
      },
    },
  };

  const getServerSideGroupKey = (dataItem) => {
    return dataItem.ArticleId;
  };

  return (
    <div>
      <Tab
        fetchUrl="https://api.mocki.io/v1/d90a8a7a"
        autoGroupColumnDef={autoGroupColumnDef}
        getDataPath={function (data) {
          return data.Article;
        }}
        getRowNodeId={function (data) {
          return data.ArticleId;
        }}
        getServerSideGroupKey={getServerSideGroupKey}
        columnDefs={columnDef}
        extractRowsFromData={extractRowsFromData}
      ></Tab>
    </div>
  );
}

const newItemCount = 0;
function extractRowsFromData(groupKeys, data) {
  if (groupKeys.length === 0) {
    return data.map(function (d) {
      return {
        group: !!d.children,
        ArticleId: d.ArticleId,
        Type: d.Type,
        Title: d.Title,
        Status: d.Status,
        Article: d.Article,
      };
    });
  }
  const key = groupKeys[0];
  for (let i = 0; i < data.length; i++) {
    if (data[i].ArticleId === key) {
      return extractRowsFromData(groupKeys.slice(1), data[i].children.slice());
    }
  }
}
