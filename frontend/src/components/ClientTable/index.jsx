import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styleTable, styleMainTable } from './styles';
import axios from 'axios';
import moment from 'moment';
// import { Button } from '@mui/material';

const renderData = () => {
  return (
    <>
      <button>1</button>
      <button>2</button>
    </>

  )
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70},
  { field: 'name', headerName: 'Nome', width: 130},
  { field: 'city', headerName: 'Cidade', width: 130 },
  { field: 'uf', headerName: 'UF', width: 90},
  {field: 'birthday', headerName: 'Nascimento', width: 130},
  {field: 'actions', headerName: '', width:90, renderCell: renderData}
];



export function ClientTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:3333/clients')
      .then((response) => {
        // const [{id, name, city, uf, birthday}] = response.data
        const client = response.data.map((index) => {
          return {
            id: index.id,
            name: index.name,
            city: index.city,
            uf: index.uf,
            birthday: moment(index.birthday).format('DD/MM/YYYY')

          }
        })
        setRows(client)
      })
      //arrumar essa questão criar uma função e chamar sempre que o cadastrar for alterado
  }, [])
  // testesss 

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