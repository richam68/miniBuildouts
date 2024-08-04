import React, { useEffect, useState } from "react";
import "./style.css";

const Country = () => {
  const [countryData, setCountryData] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");

  const [stateData, setStateData] = useState([]);
  const [selectState, setSelecteState] = useState('');

  const [cityData, setCityData] = useState([]);
  const [selectCity, setSelectCity] = useState('');

  useEffect(() => {
    countryApi();
  }, []);

  useEffect(() => {
    if(selectCountry){
        stateApi()
    }
  }, [selectCountry]);

  useEffect(() => {
    if(selectCountry && selectState){
        cityApi()
    }
  }, [selectCountry, selectState])

  const countryApi = async () => {
    try {
      let response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      let responseData = await response.json();
      setCountryData(responseData);
    } catch (err) {
      console.log("err", err);
    }
  };

  const stateApi = async () => {
    try {
      let response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectCountry}/states`
      );
      let responseData = await response.json();
      setStateData(responseData)
    } catch (err) {
      console.log("err", err);
    }
  };

  const cityApi = async() => {
    try{
    let response = await fetch(`https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`);
    let responseData = await response.json();
    console.log("responseData", responseData);
    setCityData(responseData)
    }catch(err){
        console.log("err", err);
    }
  }

  const handleCountryChange = (e) => {
    setSelectCountry(e.target.value);
    setSelecteState(""); // Reset state and city when country changes
    setCityData([]);
    setSelectCity("");
  };

  const handleStateChange = (e) => {
    setSelecteState(e.target.value) 
    setCityData([]); // Reset city when state changes
    setSelectCity("");
  }

  const handleSelectCity = (e) => {
    setSelectCity(e.target.value)
  }

  return (
    <div>
      <h1>Select Location</h1>
      <div className="select-wrapper">

        <select onChange={handleCountryChange} value={selectCountry} className="dropdown">
          <option>Select Country</option>
          {countryData.map((item, i) => {
            return (
              <option key={i + 1} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select onChange={handleStateChange} value={selectState} disabled={!selectCountry} className="dropdown">
          <option>Select State</option>
          {stateData.map((item, i) => {
            return <option key={i+1} value={item}>{item}</option>;
          })}
        </select>

        <select onChange={handleSelectCity} value={selectCity} disabled={!selectState} className="dropdown">
          <option >Select City</option>
          {cityData.map((item, i) => {
            return (
                <option key={i+1} value={item}>{item}</option>
            )
          })}
        </select>
      </div>

    
      {selectCountry && selectState && selectCity && (
          <p className="fade">
             You selected 
         {selectCity}, {selectState}, {selectCountry}
        </p>
        )}
    
    </div>
  );
};

export default Country;
