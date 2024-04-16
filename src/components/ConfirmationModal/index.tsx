import React from 'react'
import Modal from '@mui/material/Modal'
import { Box, Button, Typography } from '@mui/material'
interface ConfirmationModalProps {
  title: string
  content: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const ConfirmationModal = ({
  title,
  content,
  open,
  onConfirm,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, paddingBottom: '1rem' }}
          >
            {content}
          </Typography>
          <Box columnGap={2} display={'flex'} justifyContent={'flex-end'}>
            <Button onClick={onConfirm} variant="outlined">
              YES
            </Button>
            <Button onClick={onClose} variant="outlined">
              NO
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
