import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { 
  TextField,
  Button, 
  Modal, 
  Box, 
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

import { 
  styleMain,
  styleBox,
  styleSelectorUf,
  styleSelectorCity,
  styleForm,
  styleText,
  textFild,
  button,
  CloseButton
} from './styles.js'
import axios from 'axios';



export function ModalRegister() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [ufs, setUfs] = React.useState([]);
  const [selectedUf, setSelectedUf] = React.useState('0');
  const [selectedCity, setSelectedCity] = React.useState('0');

  const [cities, setCities] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        setUfs(response.data)
      })
  },[])

  React.useEffect(() => {
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        setCities(response.data)
      })
  },[selectedUf]);

  function handleSelectedUf(event) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }
  function handleSelectedCity(event) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  return (
    <>
      <Button onClick={handleOpen}>Cadastrar</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMain} component="form">   
          <span style={styleText}>Cadastro cliente</span>

          <TextField id="outlined-basic" label="Nome" variant="outlined" sx={textFild}/>

          <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DatePicker
              label="Nascimento"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} sx={{width: 300}}/>}
              inputFormat="dd/MM/yyyy"
              disableFuture
            />
          </LocalizationProvider>
          
          <Box sx={styleBox}>
          <FormControl sx={styleForm}>
            <InputLabel id="demo-simple-select-label">UF</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUf}
              label="Uf"
              onChange={handleSelectedUf}
              sx={styleSelectorUf}
            >
              {ufs.map(uf => (
                <MenuItem key={uf.id} value={uf.sigla}>{uf.sigla}</MenuItem>
              ))}
            </Select>
            <FormControl sx={{width: 300}}>
            <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCity}
              label="Cidade"
              onChange={handleSelectedCity}
              sx={styleSelectorCity}
            >
              {cities.map(city => (
                <MenuItem key={city.id} value={city.nome}>{city.nome}</MenuItem>
              ))}
            </Select>
            </FormControl>
          </FormControl>
          </Box>
              <Box sx={styleBox}>
                <Button variant="outlined" sx={button} onClick={handleClose}>Cadastrar</Button>
                <Button variant="outlined" sx={CloseButton} onClick={handleClose}>Cancelar</Button>
              </Box>
        </Box>
      </Modal>
    </>
  );
}

