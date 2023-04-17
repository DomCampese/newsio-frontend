import { Box, Button, Chip, CircularProgress, Container, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getNews } from 'api/search';
import { saveNews } from 'api/save';
import { NONE, categories, countries, languages } from 'api/filters';
import { useEffect } from 'react';

const NewsSearch = () => {
  const [savedSearchTerm, setSavedSearchTerm] = useState('');
  const [searchTermInvalid, setSearchTermInvalid] = useState(false);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dropdownCategory, setDropdownCategory] = useState('');
  const [dropdownLanguage, setDropdownLanguage] = useState('');
  const [dropdownCountry, setDropdownCountry] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    countries: ['us'],
    languages: ['en']
  })
  const [filtersToAdd, setFiltersToAdd] = useState({
    categories: [],
    countries: ['us'],
    languages: ['en']
  })

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
    setSavedSearchTerm(searchTerm);
  }

  const doGetNews = ({ searchTerm }) => {
    setLoading(true);
    getNews({ ...selectedFilters, keyword: searchTerm })
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

  useEffect(() => doGetNews({ searchTerm: '' }), []);

  useEffect(() => {
    doGetNews({ searchTerm: savedSearchTerm });
  }, [selectedFilters]);

  useEffect(() => {
    if (!showFilterModal) {
      return;
    }
    setFiltersToAdd({ ...selectedFilters })
  }, [showFilterModal])

  const doSaveNews = (storyInfo) => {
    setLoading(true);
    saveNews(storyInfo);
    setLoading(false);
  }

  const saveSelectedFilters = () => {
    setSelectedFilters({ ...filtersToAdd });
    setShowFilterModal(false);
  }

  const renderFilterTags = (filterObject, setFilterObject) => {
    return (
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', width: 425 }}>
        {Object.keys(filterObject).map(filterType => {
          if (filterType === 'categories') {
            return filterObject.categories.map(ca => <Box sx={{ mr: '3px' }}><Chip label={ca} variant="outlined" color='secondary' onDelete={() => setFilterObject({ ...filterObject, categories: filterObject.categories.filter(c => c !== ca) })}></Chip></Box>)
          }
          if (filterType === 'countries') {
            return filterObject.countries.map(co => <Box sx={{ mr: '5px' }}><Chip label={co} variant="outlined" color='primary' onDelete={() => setFilterObject({ ...filterObject, countries: filterObject.countries.filter(c => c !== co) })}>{co}</Chip></Box>)
          }
          return filterObject.languages.map(la => <Box sx={{ mr: '5px' }}><Chip label={la} variant="outlined" color='success' onDelete={() => setFilterObject({ ...filterObject, languages: filterObject.languages.filter(l => l !== la) })}>{la}</Chip></Box>)
        })}
      </Box>
    )
  }

  const handleAddFilter = (filterType, dropdownState, setDropdownState) => {
    if (!dropdownState || filtersToAdd[filterType].includes(dropdownState)) {
      return;
    }
    setFiltersToAdd({
      ...filtersToAdd,
      [filterType]: [...filtersToAdd[filterType], dropdownState]
    })
    setDropdownState('');
  }

  return (
    <Container>
      <Box
        component='form'
        onSubmit={handleUpdate}
        sx={{ mt: 3, flexDirection: 'column' }}
        display='flex'
      >
        <Typography variant='h4'>Find news</Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <TextField
            sx={{ width: 600, mt: 1, mr: 1 }}
            size='medium'
            id='search-bar'
            label='Search'
            variant='outlined'
            name='searchTerm'
            type='text'
            error={searchTermInvalid}
            helperText={searchTermInvalid && 'Letters and spaces only'}
          />
          <Button onClick={() => setShowFilterModal(true)} variant='contained' sx={{ mt: 1 }}>Filters</Button>
        </Box>
        {renderFilterTags(selectedFilters, setSelectedFilters)}
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
                      <Button sx={{ width: '120px', marginLeft: 0.5 }} variant='outlined' onClick={() => doSaveNews(story)}>Save Story</Button>
                    </div>
                  </Box>
                  {story.image && <Box component='img' sx={{ objectFit: 'contain', ml: 1.5 }} className='news-story-img' src={story.image} height='300px' width='300px'></Box>}
                </Box>
              </Box>
            );
          })
        }
      </Box>
      {showFilterModal &&
        <Modal
          open={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          aria-labelledby="filter-modal"
          aria-describedby="a modal for setting search filters"
        >
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px'
            }}
          >
            <Typography variant='h5'>Edit filters</Typography>
            <FormControl sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'space-between', width: 400 }}>
                <Select
                  sx={{ width: '100%' }}
                  label='Category'
                  value={dropdownCategory}
                  onChange={(e) => setDropdownCategory(e.target.value)}
                >
                  {Object.keys(categories).map(category =>
                    <MenuItem value={categories[category]}>{category}</MenuItem>
                  )}
                </Select>
                <Button onClick={() => handleAddFilter('categories', dropdownCategory, setDropdownCategory)} sx={{ ml: 0.5 }}>+ Add</Button>
              </Box>
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'space-between', width: 400 }}>
                <Select
                  sx={{ width: '100%' }}
                  label='Language'
                  value={dropdownLanguage}
                  onChange={(e) => setDropdownLanguage(e.target.value)}
                >
                  <MenuItem value={NONE}>None</MenuItem>
                  {Object.keys(languages).map(language =>
                    <MenuItem value={languages[language]}>{language}</MenuItem>
                  )}
                </Select>
                <Button onClick={() => handleAddFilter('languages', dropdownLanguage, setDropdownLanguage)} sx={{ ml: 1 }}>+ Add</Button>
              </Box>
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'space-between', width: 400 }}>
                <Select
                  sx={{ width: '100%' }}
                  label='Country'
                  value={dropdownCountry}
                  onChange={(e) => setDropdownCountry(e.target.value)}
                >
                  <MenuItem value={NONE}>None</MenuItem>
                  {Object.keys(countries).map(country =>
                    <MenuItem value={countries[country]}>{country}</MenuItem>
                  )}
                </Select>
                <Button onClick={() => handleAddFilter('countries', dropdownCountry, setDropdownCountry)} sx={{ ml: 1 }}>+ Add</Button>
              </Box>
              <Button onClick={saveSelectedFilters} variant='contained' sx={{ mt: 2 }}>Done</Button>
            </FormControl>
            {renderFilterTags(filtersToAdd, setFiltersToAdd)}
          </Box>
        </Modal>
      }
    </Container>
  )
}

export default NewsSearch