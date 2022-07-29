import axios from 'axios';
import moment from 'moment';

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ClientTable } from "../ClientTable";
import { ModalRegister } from "../ModalRegister";


import { 
  styleBox,
  styleText,
  styleMain
} from "./styles";

export function Main() {
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    listClientes()
  },[]);


  async function listClientes(){

    const response = await axios.get('http://localhost:3333/clients')
    

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
  }

  return (
    <Box sx={styleMain}>
      <Box sx={styleBox}>
        <span style={styleText}>Clientes</span>
        <ModalRegister id={linhaSelecionada} onConfirm={listClientes}/>
      </Box>
      <ClientTable onSelectedItem={(valorSelecionado) => {setLinhaSelecionada(valorSelecionado)}} rows={rows}/>
    </Box>
  )
}