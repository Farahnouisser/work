import React, { useState } from 'react'   
import { AgGridReact, AgGridColumn } from 'ag-grid-react' 
import 'ag-grid-enterprise'  
import 'ag-grid-community/dist/styles/ag-grid.css'  
import '@ag-grid-community/all-modules/dist/styles/ag-theme-material.css'    
import Button from '@material-ui/core/Button'    
  export default function GridExample () {      
  const [gridApi, setGridApi] = useState(null)      
// eslint-disable-next-line no-unused-vars      
  const [gridColumnApi, setGridColumnApi] = useState(null)          
  const serverSideDatasource = createServerSideDatasource       

  const serverSideStoreType = 'full'         
      const onGridReady = (params) => 
      {  setGridApi(params.api)          
       setGridColumnApi(params.columnApi)              
       const updateData = (data) => { 
       const datasource = createServerSideDatasource(data)              
       params.api.setServerSideDatasource(datasource)          }            
      fetch('https://www.ag-grid.com/example-assets/small-tree-data.json')              
      .then((resp) => resp.json())              
      .then((data) => updateData(data))      }       
          
       const defaultColDef={
             width: 240, 
             filter: 'agTextColumnFilter',  
             flex: 1  }           
         
             const columnDef = [  
            { field: 'employeeId',  hide: true  },   
            { field: 'employeeName', hide: true  }, 
            { field: 'jobTitle', hide: false  },         
            { field: 'employmentType', hide: false}, ]

        const autoGroupColumnDef={ 
        headerName:'Employee',
        field: 'employeeName',            
         cellRendererParams: {            
         innerRenderer: function (params) 
         {return params.data.employeeName  }   }  }          
         const onBtAdd = () => 
         { const tx =
         { addIndex: 0,  add:[{ employeeName: 'New Item' + newItemCount }] }         
                // call api  -> create new Item          
                // if the answer is resulting in error          
                // todoerrorhandling          
                // either coloring the row          
                // remove the row and show a toast notification         
                 gridApi.applyServerSideTransaction(tx)      }       
                  const isServerSideGroup = dataItem => {  return dataItem.group  }       
                   const getServerSideGroupKey = dataItem => { return dataItem.employeeId   }         
                    return (  <div style={{ width: '100%', height: '400px' }}> 
                     <Button align= "right" variant="contained" color="primary" onClick={() => onBtAdd()}>Add Before Selected Row</Button> 
                    <div  id="myGrid"  style={{   height: '100%',  width: '100%'   }}   className="ag-theme-material"    >  
                   <AgGridReact                     
                    serverSideDatasource={serverSideDatasource}                     
                    autoGroupColumnDef={autoGroupColumnDef}                     
                    getDataPath={
                    function (data) {   return data.employeeName     }}                      
                     getRowNodeId={function (data)
                    {  return data.employeeId  }}                     
                    rowModelType={'serverSide'} 
                    serverSideStoreType={serverSideStoreType}  
                     debug={true} 
                     treeData={true} 
                     animateRows={true}   
                     isServerSideGroup={isServerSideGroup}  
                     getServerSideGroupKey={getServerSideGroupKey}  
                     onGridReady={onGridReady}   
                     defaultColDef={defaultColDef}  
                     columnDefs={columnDef}           
                     rowSelection={'single'}  
                         >   
                  </AgGridReact>   
                  </div>   
                  </div>)  }    
                                            
const newItemCount = 0   
 function extractRowsFromData (groupKeys, data)
  {   if (groupKeys.length === 0) {   return data.map(function (d) {  
       return { group: !!d.children,  
         employeeId: d.employeeId,   
         employeeName: d.employeeName,  
          employmentType: d.employmentType,  
          jobTitle: d.jobTitle,  
                   }    })    }      
           const key = groupKeys[0]      
           for (let i = 0; i < data.length; i++) {   
                 if (data[i].employeeId === key) { 
                      return extractRowsFromData( 
                           groupKeys.slice(1), 
                             data[i].children.slice()   )    }   }  }    
     function createServerSideDatasource (data) {  
     return {         
     getRows: 
     function (params) {  window.rowDataServerSide = extractRowsFromData(params.request.groupKeys, data)         
       setTimeout(function () 
       {  params.success({  rowData: window.rowDataServerSide,  
                            rowCount: window.rowDataServerSide.length })  }, 600)          
                                           
        }    
                                         
     }  
                                        
    }