import * as React from 'react';

import { 
  styleMain,
  styleBox,
  styleSelectorUf,
  styleSelectorCity,
  styleForm,
  styleText
} from './styles.js'

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


export function ModalRegister() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Cadastrar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMain} component="form">
          <span style={styleText}>Cadastro cliente</span>

          <TextField id="outlined-basic" label="Nome" variant="outlined" sx={{width: 300}}/>
          <Box sx={styleBox}>
          <FormControl sx={styleForm}>
            <InputLabel id="demo-simple-select-label">UF</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={}
              label="Age"
              // onChange={handleChange}
              sx={styleSelectorUf}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
            <FormControl sx={{width: 300}}>
            <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={}
              label="Age"
              // onChange={handleChange}
              sx={styleSelectorCity}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
            </FormControl>
          </FormControl>
          </Box>
            <Button variant="contained" color="success" sx={{width: 300}} >Cadastrar</Button>
        </Box>
      </Modal>
    </>
  );
}

