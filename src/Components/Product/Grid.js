import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { AgGridReact } from "ag-grid-react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const styles = theme => ({
  grid: {
    marginTop: theme.spacing(1),
    height: "135%",
    width: "700%"
  }
});

function BudgetTable(props) {
  const { classes, error, data, columns } = props;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };


  if (error) {
    return <div>{error}</div>;
  }
  const gridOptions = {
    columnDefs: [{ field: "jobTitle" }, { field: "employmentType" }],
    rowData: [
      { id:1,
          type:'folder',

        orgHierarchy: ["Erica Rogers"],
        jobTitle: "CEO",
        employmentType: "Permanent"
      },
      {id:2,
          type:'folder',
        orgHierarchy: ["Erica Rogers", "Malcolm Barrett"],
        jobTitle: "Exec. Vice President",
        employmentType: "Permanent"
      },
      {id:3,
          type:'folder',
        orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker"],
        jobTitle: "Director of Operations",
        employmentType: "Permanent"
      },
      {id:4,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Esther Baker",
          "Brittany Hanson"
        ],
        jobTitle: "Fleet Coordinator",
        employmentType: "Permanent"
      },
      {id:5,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Esther Baker",
          "Brittany Hanson",
          "Leah Flowers"
        ],
        jobTitle: "Parts Technician",
        employmentType: "Contract"
      },
      {id:6,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Esther Baker",
          "Brittany Hanson",
          "Tammy Sutton"
        ],
        jobTitle: "Service Technician",
        employmentType: "Contract"
      },
      {id:7,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Esther Baker",
          "Derek Paul"
        ],
        jobTitle: "Inventory Control",
        employmentType: "Permanent"
      },
      {id:8,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Francis Strickland"
        ],
        jobTitle: "VP Sales",
        employmentType: "Permanent"
      },
      {id:9,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Francis Strickland",
          "Morris Hanson"
        ],
        jobTitle: "Sales Manager",
        employmentType: "Permanent"
      },
      {id:10,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Francis Strickland",
          "Todd Tyler"
        ],
        jobTitle: "Sales Executive",
        employmentType: "Contract"
      },
      {id:11,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Francis Strickland",
          "Bennie Wise"
        ],
        jobTitle: "Sales Executive",
        employmentType: "Contract"
      },
      {id:12,
          type:'folder',
        orgHierarchy: [
          "Erica Rogers",
          "Malcolm Barrett",
          "Francis Strickland",
          "Joel Cooper"
        ],
        jobTitle: "Sales Executive",
        employmentType: "Permanent"
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
      cellClassRules: {
          'hover-over': function (params) {
            return params.node === potentialParent;
          },
        }
    }
  };


  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById('filter-text-box').value);
  };

 const onRowDragMove = (event) => {
    setPotentialParentForNode(event.api, event.overNode);
  };

 const onRowDragLeave = (event) => {
    setPotentialParentForNode(event.api, null);
  };

const  onRowDragEnd = (event) => {
    if (!potentialParent) {
      return;
    }
    var movingData = event.node.data;
    var newParentPath = potentialParent.data
      ? potentialParent.data.orgHierarchy
      : [];
    var needToChangeParent = !arePathsEqual(newParentPath, movingData.orgHierarchy);
    var invalidMode = isSelectionParentOfTarget(event.node, potentialParent);
    if (invalidMode) {
      console.log('invalid move');
    }
    if (needToChangeParent && !invalidMode) {
      var updatedRows = [];
      moveToPath(newParentPath, event.node, updatedRows);
      gridApi.applyTransaction({ update: updatedRows });
      gridApi.clearFocusedCell();
    }
    setPotentialParentForNode(event.api, null);
  };

  return (
    <div className={classes.grid}>
      <div
        className="ag-theme-balham"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          columnDefs={gridOptions.columnDefs}
          rowData={gridOptions.rowData}
          modules={AllModules}
          treeData={true}
          autoGroupColumnDef={gridOptions.autoGroupColumnDef}
          groupDefaultExpanded={gridOptions.groupDefaultExpanded}
          getDataPath={gridOptions.getDataPath}


          onGridReady={onGridReady}
          onRowDragMove={onRowDragMove}
          onRowDragLeave={onRowDragLeave}
          onRowDragEnd={onRowDragEnd}
      
        />
      </div>
    </div>
  );
}


var cellClassRules = {
  'hover-over': function (params) {
    return params.node === potentialParent;
  },
};
var potentialParent = null;
function moveToPath(newParentPath, node, allUpdatedNodes) {
  var oldPath = node.data.orgHierarchy;
  var fileName = oldPath[oldPath.length - 1];
  var newChildPath = newParentPath.slice();
  newChildPath.push(fileName);
  node.data.orgHierarchy = newChildPath;
  allUpdatedNodes.push(node.data);
  if (node.childrenAfterGroup) {
    node.childrenAfterGroup.forEach(function (childNode) {
      moveToPath(newChildPath, childNode, allUpdatedNodes);
    });
  }
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
  var children = selectedNode.childrenAfterGroup;
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}
function arePathsEqual(path1, path2) {
  if (path1.length !== path2.length) {
    return false;
  }
  var equal = true;
  path1.forEach(function (item, index) {
    if (path2[index] !== item) {
      equal = false;
    }
  });
  return equal;
}
function setPotentialParentForNode(api, overNode) {
  var newPotentialParent;
  if (overNode) {
    newPotentialParent =
      overNode.data.type === 'folder' ? overNode : overNode.parent;
  } else {
    newPotentialParent = null;
  }
  var alreadySelected = potentialParent === newPotentialParent;
  if (alreadySelected) {
    return;
  }
  var rowsToRefresh = [];
  if (potentialParent) {
    rowsToRefresh.push(potentialParent);
  }
  if (newPotentialParent) {
    rowsToRefresh.push(newPotentialParent);
  }
  potentialParent = newPotentialParent;
  refreshRows(api, rowsToRefresh);
}
function refreshRows(api, rowsToRefresh) {
  var params = {
    rowNodes: rowsToRefresh,
    force: true,
  };
  api.refreshCells(params);
}



export default withStyles(styles)(BudgetTable);