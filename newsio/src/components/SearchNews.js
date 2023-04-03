import { Box, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const NewsSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermInvalid, setSearchTermInvalid] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const letterRegex = /^[a-zA-Z\s]+$/
    const searchTerm = String(data.get('searchTerm'));
    if (!letterRegex.test(searchTerm)) {
      setSearchTermInvalid(true);
      return;
    }
    setSearchTermInvalid(false);
    setSearchTerm(searchTerm);
  }

  return (
    <Container>
      <Typography variant='h4' textAlign='center'>News Search</Typography>
      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{ mt: 3 }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <TextField
          sx={{ width: 600 }}
          size="medium"
          id="search-bar"
          label="Keywords"
          variant="outlined"
          name="searchTerm"
          type='text'
          error={searchTermInvalid}
          helperText={searchTermInvalid && 'Letters and spaces only'}
        />
      </Box>
    </Container>
  )
}

export default NewsSearch