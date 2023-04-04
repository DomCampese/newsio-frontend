import { Box, Button, Chip, CircularProgress, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getNews } from 'api/search';

const NewsSearch = () => {
  const [searchTermInvalid, setSearchTermInvalid] = useState(false);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);

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
    doGetNews({ searchTerm });
  }

  const doGetNews = ({ searchTerm }) => {
    setLoading(true);
    getNews({ keywords: searchTerm, sort: 'published_desc', languages: 'en' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        return response.json();
      })
      .then(data => {
        setNews(data);
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err)
        setLoading(false);
      })
  }

  return (
    <Container>
      <Box
        component='form'
        onSubmit={handleUpdate}
        sx={{ mt: 3 }}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography variant='h4'>Find news</Typography>
        <TextField
          sx={{ width: 600, ml: 5 }}
          size='medium'
          id='search-bar'
          label='Search'
          variant='outlined'
          name='searchTerm'
          type='text'
          error={searchTermInvalid}
          helperText={searchTermInvalid && 'Letters and spaces only'}
        />
      </Box>
      <Box>
        {(loading) 
          ? <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress></CircularProgress>
            </Box>
          : (news && news.newsStories) && news.newsStories.map((story) => {
             return (
              <Box
                sx={{
                  mt: 3,
                  boxShadow: 2,
                  borderRadius: 2,
                  padding: 2
                }}
              >
                <Box className='news-story-content' display='flex'>
                  <Box display='flex' flexDirection='column' justifyContent='center'>
                    <Typography variant='h5'>{story.title}</Typography>
                    <Typography fontWeight='bold'>{story.source}</Typography>
                    <Typography color='gray'>{new Date(story.published_at).toDateString()}</Typography>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Chip sx={{ textTransform: 'uppercase' }} size='small' variant='outlined' color='secondary' label={story.category}/>
                    </Box>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Typography>{story.description}</Typography>
                    </Box>
                    <Button sx={{ width: '115px' }} variant='outlined' target='_blank' href={story.url}>Read more</Button>
                  </Box>
                  {story.image && <Box component='img' sx={{ objectFit: 'contain', ml: 1.5 }} className='news-story-img' src={story.image} height='300px' width='300px'></Box>}
                </Box>
              </Box>
            );
          })
        }
      </Box>
    </Container>
  )
}

export default NewsSearch