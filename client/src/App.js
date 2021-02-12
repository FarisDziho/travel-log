import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, {Marker , Popup} from 'react-map-gl';
import './App.css';
import {listLogEntries} from './api'
import LogEntryForm from './form'
import { STATES } from 'mongoose';


const MAPBOX_TOKEN ='pk.eyJ1IjoiZmFyaXMxMiIsImEiOiJja2djZGk3OXYwcHgxMnpxZmc4c2VobWh2In0._5Wq5eZW3BcSjhEmw7d79g';

const App = () => {
  const [addNewEntry, setAddNewEntry] = useState(null);
  const [showPopup , setShowPopup] = useState({});
  const [logEntries,setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width:'100%',
    height:'100vh',
    latitude: 43.856430,
    longitude: 18.413029,
    zoom: 5
  });


  const getEntries = async () =>{
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  React.useEffect(() => {
    getEntries();
  },[])
  
  const showAddMarkerPopup = (event) => {
    const [longitude,latitude] = event.lngLat
    setAddNewEntry({
      longitude,
      latitude
    });
  };

  return (
    <ReactMapGL
      className="map"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick = {showAddMarkerPopup}
    >
     {
       logEntries.map(entry => (
         <React.Fragment key = {entry._id}>
            <Marker latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-20} offsetTop={-10}>
              <div className="point" onClick={()=> setShowPopup({
                [entry._id]:true,
              })}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="red" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
            </Marker>
            {
            showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                  </div>
               </Popup>
            ) : null
          }
          </React.Fragment>
         )
       )
     } 
     {
       addNewEntry ? (
         <>
          <Marker 
            latitude={addNewEntry.latitude} 
            longitude={addNewEntry.longitude}>     
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="red" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
         </Marker>
         <Popup
           latitude={addNewEntry.latitude}
           longitude={addNewEntry.longitude}
           closeButton={true}
           closeOnClick={false}
           dynamicPosition={true}
           onClose={() => setAddNewEntry(null)}
           anchor="top"
          >
            <div>
              <LogEntryForm onClose={()=>{
                setAddNewEntry(null);
                getEntries();
              }}
                location={addNewEntry}
              />
            </div>

         </Popup>
        </>
       ) : null
     }
    

    </ReactMapGL>
      
  );
}

export default App;