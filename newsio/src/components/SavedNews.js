import { Box, Button, Chip, CircularProgress, Container, TextField, Typography } from '@mui/material'
import React, { Component, useState , useEffect} from 'react'
import { getSavedNews, unsaveNews } from 'api/save';

const SavedNews = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {doGetSavedNews()}, []); // empty array to stop infinite loop

  const doGetSavedNews = () => {
    getSavedNews()
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch saved news');
        }
        return response.json();
      })
      .then(data => {
        setNews(data);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      })
  }

  const doUnsaveNews = (story) => {
    setLoading(false);
    unsaveNews(story).then(() => doGetSavedNews());
  }

  return (
    <Container>
      <Typography variant='h4' textAlign='center'>My Stories</Typography>
      <Box>
        {(loading)
          ? <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress></CircularProgress>
            </Box>
          : (news) && news.newsStories.map((story) => {
            return ( <Box
              sx={{
                mt: 3,
                boxShadow: 2,
                borderRadius: 2,
                padding: 2
              }}
            >
              <Box className='news-story-content' display='flex' sx={{ justifyContent: 'space-between' }}>
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
                  <div> {/* for buttons to be next to each other */}
                    <Button sx={{ width: '115px' }} variant='outlined' target='_blank' href={story.url}>Read more</Button>
                    <Button sx={{ width: '150px', marginLeft: 0.5 }} variant='outlined' onClick={() => doUnsaveNews(story)}>UnSave Story</Button>
                  </div>
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

export default SavedNews