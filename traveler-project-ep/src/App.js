import React,{useState, useEffect} from 'react';
import { CssBaseline, Grid,useMediaQuery } from '@material-ui/core';
import {getPlacesData} from './api'
import Header from './components/Header/Header';
import List from './components/Lists/Lists';
import Map from './components/Map/Map';

const App = () => {
  const [places,setPlaces] = useState([]);
  const[filteredPlaces,setFilteredPlaces]= useState([])
  const [coordinates,setCoordinates] = useState({});
  const [bounds,setBounds] = useState({});
  const[childClicked,setChildClicked]=useState(null)
  const [autocomplete, setAutocomplete] = useState(null);
  const[isLoading,setIsLoading] = useState(false)
  const [type,setType]=useState('restaurants')
  const [rating,setRating]=useState('')
  const matches = useMediaQuery('(min-width:600px)');
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}})=>{
      setCoordinates({lat: latitude, lng: longitude});
    })
  }, [])
  useEffect(()=>{
    const filteredPlaces = places.filter((place)=>place.rating > rating)
    setFilteredPlaces(filteredPlaces);
  },[rating]);

  useEffect(()=>{
    if(bounds.sw && bounds.ne){
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data)=>{
        setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0));
        setFilteredPlaces([])
        setIsLoading(false);
      });
    }
  },[type, bounds]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
      <center>
      <Grid container spacing={3} style={{ width: '90%',marginTop: 10}}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces: places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        {!matches ? (
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces: places}
          setChildClicked={setChildClicked}
          />
        </Grid> ) : (
            <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: 150 }}>
            <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces: places}
            setChildClicked={setChildClicked}
            />
          </Grid>

        )}
      </Grid>
      </center>
    </>
  );
}

export default App;
