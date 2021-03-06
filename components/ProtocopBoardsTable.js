'use babel';

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

class ProtocopBoardsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quickFilterText: '',
    };

    this.onClick = this.onClick.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();


    const sort = [
      {
        colId: 'name',
        sort: 'asc',
      },
    ];
    this.gridApi.setSortModel(sort);
  }
  onClick() {
    const selectedRow = this.gridApi.getSelectedRows();
    
    if (Array.isArray(selectedRow) && selectedRow.length > 0) {
      const board = selectedRow[0];
      this.props.callbackRowClick(board);
    }
  }
  onFilterTextChange(event) {
    this.setState({ quickFilterText: event.target.value });
  }
  render() {
    return (
      <div>
        <FormControl
          id="filterText"
          type="text"
          placeholder="Search"
          onChange={this.onFilterTextChange}
        />
        {/* <div className="row">
          <div className="col-md-4">
            {'Filter:'}
          </div>
          <div className="col-md-8">
            {'Future Input Control'}
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-md-12"> */}
            <div className="ag-theme-bootstrap">
              <AgGridReact
                columnDefs={[{ headerName: 'Blackboard Name', field: 'name', suppressMenu: true }]}
                rowData={this.props.boards}
                enableFiltering
                enableSorting
                
                quickFilterText={this.state.quickFilterText}
                suppressMovableColumns
                defaultColDef={{ width: 100, headerComponentParams: { template: '' }}}
                rowSelection="single"
                onSelectionChanged={this.onClick}
                onGridReady={this.onGridReady}
              >
                <AgGridColumn field="name" />
              </AgGridReact>
            </div>
          </div>
      //   </div>
      // </div>
    );
  }
}

export default ProtocopBoardsTable;
