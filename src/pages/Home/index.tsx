import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const history = useNavigate()
  return (
    <Box className="home" display={'flex'} rowGap={2}>
      <Typography
        sx={{ color: 'whitesmoke', fontSize: '3rem', fontFamily: 'Prata' }}
      >
        Welcome to Recipe app
      </Typography>
      <Box display={'flex'} columnGap={2}>
        <Button
          sx={{
            color: 'whitesmoke',
            fontSize: '2rem',
            border: '1.5px solid whitesmoke',
            borderRadius: '5px',
            fontFamily: 'Prata',
          }}
          onClick={() => history(`/create`)}
        >
          Add Recipe
        </Button>
        <Button
          onClick={() => history(`/view`)}
          sx={{
            color: 'whitesmoke',
            fontSize: '2rem',
            border: '1.5px solid whitesmoke',
            borderRadius: '5px',
            fontFamily: 'Prata',
          }}
        >
          View Recipe
        </Button>
      </Box>
    </Box>
  )
}

export default Home
