import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
const Lists = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState([])
  useEffect(() => {

    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()))
  }, [places])

  return (
    <div className={classes.container}>

      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>
      ) : (
        <>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <FormControl className={classes.formControl} style={{marginTop: 50}}>
            <Stack direction="row" spacing={2} >
              <ToggleButtonGroup value={type} exclusive onChange={(e) => setType(e.target.value)}>
                <ToggleButton value="restaurants" >
                  Restaurant
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup value={type} exclusive onChange={(e) => setType(e.target.value)}>
                <ToggleButton value="hotels" >
                  Hotels
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup value={type} exclusive onChange={(e) => setType(e.target.value)}>
                <ToggleButton value="attractions">
                  Attractions
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='3'>Above 3.0</MenuItem>
              <MenuItem value='4'>Above 4.0</MenuItem>
              <MenuItem value='4.5'>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          </div>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default Lists