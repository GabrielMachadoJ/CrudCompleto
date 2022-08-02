import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import axios from 'axios';

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
  CloseButton,
  styleButtonContainer,
  styleButton,
  styleChangeButton,
  styleDeleteButton
} from './styles.js'
import { DeleteModal } from '../DeleteModal/index.jsx';



export function ModalRegister({ id, onConfirm }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [ufs, setUfs] = React.useState([]);
  const [selectedUf, setSelectedUf] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [name, setName] = React.useState('');
  const [alt, setAlt] = React.useState(false)

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

  const handleCreateNewRegister = async () => {
    const dadosCliente = {
      name: name, 
      city: selectedCity, 
      uf: selectedUf, 
      birthday: value
    }

    if(alt)
      await axios.put(`http://localhost:3333/clients/${id.id}`, dadosCliente)
    else
      await axios.post('http://127.0.0.1:3333/clients', dadosCliente)


    handleClose()
    onConfirm()
    setAlt(false)
  }

  function handleSelectedName(event) {
    const name = event.target.value;
    setName(name);
  }

  function handleSelectedUf(event) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }
  function handleSelectedCity(event) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const handleOpen = () => {
    setValue(null)
    setSelectedUf('')
    setSelectedCity('')
    setName('')
    setOpen(true);
  };

  async function handleUpdateClient(clientId) {
    const { id } = clientId
    const { data } = await axios.get(`http://localhost:3333/clients/${id}`)
    const { birthday, uf, city, name } = data
      
    setValue(birthday)
    setSelectedUf(uf)
    setSelectedCity(city)
    setName(name)
    setOpen(true);
    setAlt(true)
  }
  
  function handleClose() {
    setOpen(false)
    setValue(null)
    setSelectedUf('')
    setSelectedCity('')
  };

  return (
    <>
      <Box sx={styleButtonContainer}>
        <Button variant="outlined" onClick={() => handleUpdateClient(id)} sx={styleChangeButton}>Alterar</Button>
        <Button><DeleteModal id={id} onConfirm={onConfirm} /></Button>
        <Button sx={styleButton} variant="outlined" onClick={handleOpen}>+ cadastrar</Button>
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMain} component="form">   
          <span style={styleText}>Cadastro cliente</span>

          <TextField
            id="outlined-basic" 
            label="Nome" 
            value={name}
            onChange={handleSelectedName}
            variant="outlined" 
            sx={textFild}/>

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
                <Button variant="outlined" sx={button} onClick={handleCreateNewRegister}>Cadastrar</Button>
                <Button variant="outlined" sx={CloseButton} onClick={handleClose}>Cancelar</Button>
              </Box>
        </Box>
      </Modal>
    </>
  );
}

