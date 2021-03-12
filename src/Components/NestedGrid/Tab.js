import { AgGridReact} from 'ag-grid-react' 
import React from 'react'

function Tab(props) {
    return (
        <div>

         <AgGridReact                  
         serverSideDatasource={props.serverSideDatasource}                     
          autoGroupColumnDef={props.autoGroupColumnDef}                     
                    getDataPath={props.getDataPath}  

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
                     editType="fullRow"   >   
                  </AgGridReact>   
            
        </div>
    )
}

export default Tab
