import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-material.css";
import Typography from '@material-ui/core/Typography';
import AddDeletePanel from "./AddDeletePanel";
import './Styles.css'
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";





export default class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  };

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }

  onRowDragMove = (event) => {
    setPotentialParentForNode(event.api, event.overNode);
  };

  onRowDragLeave = (event) => {
    setPotentialParentForNode(event.api, null);
  };

  onRowDragEnd = (event) => {
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
      this.gridApi.applyTransaction({ update: updatedRows });
      this.gridApi.clearFocusedCell();
    }
    setPotentialParentForNode(event.api, null);
  };


  render() {
    return (
        

    
      <div style={{ width: "100%", height: "100%" }}>
         
          <div style={{ width: "100%", height: "100%" }}><Typography color="inherit" gutterBottom variant="h5" align="left" >Product Mangement</Typography></div>

          <div style={searchDivStyle}>
        
          <input
          style={searchStyle}
            type="text"
            id="filter-text-box"
            placeholder="Search Products..."
            onInput={this.onFilterTextBoxChanged.bind(this)}
          />
            <Fab
            style={{ top: 0, left: 830 }}
            color="primary"
            onClick={this.onAddRow}
            size="small"
          >
            <AddIcon />
          </Fab>
       
        </div>
        <div
          style={{
            height: "100%",
            boxSizing: "border-box"
          }}
        >
          <div
            id="myGrid"
            style={{
              height: "370px",
              width: "100%"
            }}
            className="ag-theme-material"
          >
            
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              treeData={true}
              animateRows={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              getDataPath={this.state.getDataPath}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              onGridReady={this.onGridReady}
              onRowDragMove={this.onRowDragMove.bind(this)}
              onRowDragLeave={this.onRowDragLeave.bind(this)}
              onRowDragEnd={this.onRowDragEnd.bind(this)}
              getDataPath={this.state.getDataPath}
              getRowNodeId={this.state.getRowNodeId}
            />
           
          </div>
      
        </div>  
      </div>
    
    );
  }
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


 const searchDivStyle={padding:10}
 const searchStyle={width:"30%",padding:"10px 20px",borderRadius:20,outline:0,
  border:"2px #3f51b5 solid",fontSize:"100%"}

 

