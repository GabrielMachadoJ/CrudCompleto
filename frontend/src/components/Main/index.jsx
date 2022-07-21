import { Box } from "@mui/material";
import { ClientTable } from "../ClientTable";
import { ModalRegister } from "../ModalRegister";


import { 
  styleBox,
  styleText,
  styleMain
} from "./styles";

export function Main() {
  return (
    <Box sx={styleMain}>
      <Box sx={styleBox}>
        <span style={styleText}>Dashboard Clientes</span>
        <ModalRegister />
      </Box>
      <ClientTable />
    </Box>
  )
}