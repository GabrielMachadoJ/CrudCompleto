import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';

import { styleCancelButton, styleConfirmButton, styleDeleteButton, styleMain, styleButtonContainer, styleText } from './styles.js'
import axios from 'axios';
import { Check } from 'phosphor-react';
import { MainContent } from '../Main/index.jsx';


export function DeleteModal({id, onConfirm}) {
  const [open, setOpen] = React.useState(false);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleDelete(data) {
    const { id } = data;
    await axios.delete(`http://localhost:3333/clients/${id}`)
    onConfirm()
    handleClose()
  }

  return (
    <div>
       <Button variant="outlined"  onClick={handleOpen} sx={styleDeleteButton}>Excluir</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={styleMain}>
          <span style={styleText}>Deseja excluir esse registro?</span>
          <Box sx={styleButtonContainer}>
            <Button onClick={() => handleDelete(id)} sx={styleConfirmButton} variant="outlined" color="success" startIcon={<Check />}>
              Sim
            </Button>
            <Button onClick={handleClose} sx={styleCancelButton} variant="outlined" color="error" startIcon={<ClearIcon />}>
              Não
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
