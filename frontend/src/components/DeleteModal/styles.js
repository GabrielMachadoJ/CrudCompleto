export const styleMain = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '.1px solid #C1CDCD',
  borderRadius: 2,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4
};

export const styleDeleteButton = {
  borderColor: '#b42727',
  color: '#b42727',
  marginRight: 1,
}

export const styleCancelButton = {
  height: 50,
  width: 140,
  borderColor: '#b42727',
  color: '#b42727',
  '&:hover': {
    filter: 'brightness(0.6)',
    borderColor: '#b42727',
  }
}

export const styleConfirmButton = {
  height: 50,
  width: 140,
  borderColor: '#228B22',
  color: '#228B22',
  '&:hover': {
    filter: 'brightness(0.6)',
    borderColor: '#228B22',
  }
}

export const styleButtonContainer = {
  width: '80%',
  display: 'flex',
  justifyContent: 'space-between'
  
}

export const styleText = {
  fontSize: 22,
  fontFamily: 'Poppins',
  alignItems: 'center'
}