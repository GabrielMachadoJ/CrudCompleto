import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styleTable, styleMainTable } from './styles';
import axios from 'axios';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nome', width: 130 },
  { field: 'city', headerName: 'Cidade', width: 130 },
  { field: 'uf', headerName: 'UF', width: 90 },
  {field: 'birthday', headerName: 'Nascimento', width: 130 },
];



// const rows = [
//   { id: 1, name: 'Gabriel Machado', city: 'Tubarão', uf: 'SC', birthday: '15/03/1999' },
//   { id: 2, name: 'João', city: 'Tubarão', uf: 'SC', birthday: '15/03/1999' },
//   { id: 3, name: 'Vitor', city: 'Tubarão', uf: 'SC', birthday: '15/03/1999' },
//   { id: 4, name: 'Lucas', city: 'Tubarão', uf: 'SC', birthday: '15/03/1999' },
//   { id: 5, name: 'Diego', city: 'Tubarão', uf: 'SC', birthday: '15/03/1999' },
// ];

export function ClientTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:3333/clients')
      .then((response) => {
        setRows(response.data)
      })
  }, [])
  
//arrumar essa questão
  
  return (
    <div style={styleMainTable}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={styleTable}
      />
    </div>
  );
}