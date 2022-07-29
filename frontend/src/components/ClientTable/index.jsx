import * as React from 'react';
import axios from 'axios';
import moment from 'moment';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import {
   styleTable, 
   styleMainTable, 
   styleButtonContainer,
   styleDeleteButton,
   styleChangeButton
} from './styles';


export function ClientTable({ onSelectedItem, rows }) {
  const [selectionModel, setSelectionModel] = React.useState([]);



  const columns = [
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'name', headerName: 'Nome', width: 130},
    { field: 'city', headerName: 'Cidade', width: 130 },
    { field: 'uf', headerName: 'UF', width: 90},
    {field: 'birthday', headerName: 'Nascimento', width: 130},
  ];
  

  return (
    <div style={styleMainTable}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        onRowClick={(e) => onSelectedItem(e.row)}
        sx={styleTable}
      />
    </div>
  );
}

