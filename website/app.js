/* Global Variables */
const generateButton = document.querySelector("#generate");
// base url to get data from openweathermap.org, Country by default is (US)
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = ",&appid=3c85982aaf172297d8446f64d303d28b&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
//Adding one to d.getMonth() because it starts from 0 => oct = 9 ... etc
//Changing the Format => dd/mm/yy
let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

/* Function called by event listener */
const collectData = async () => {
  //Select Textboxes => ZIP,Feelings from HTML
  const zipInupt = document.querySelector("#zip").value;
  const feelingsInupt = document.querySelector("#feelings").value;
  const fetchedApiData = await fetchWebApiData(zipInupt);
  console.log(fetchedApiData); // <--- Check how the promise looks like
  let finalData = getData(fetchedApiData, feelingsInupt, newDate);
  await postData("/add", finalData);
  await retrieveData();
};

/* Function to GET Web API Data*/
const fetchWebApiData = async (zipInupt) => {
  const apiLink = baseURL + zipInupt + apiKey;
  try {
    const response = await fetch(apiLink);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("Whooops", error);
  }
};

//Function to get data from Object Coming from api
const getData = (data, feelingsInupt, newDate) => {
  //Getting Data from object recieved from API using Object Destructuring
  const {
    sys: { country },
    name: city,
    main: { temp },
    weather: [{ description }],
    main: { humidity },
    main: { pressure },
  } = data;
  //Creating a new Object Carryying our New Data
  const objData = {
    Country: country,
    City: city,
    Temp: temp,
    Weather: description,
    Humidity: humidity,
    Pressure: pressure,
    Feeling: feelingsInupt,
    Date: newDate,
  };
  return objData;
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = Math.round(allData.Temp) + "°C";
    document.getElementById("press").innerHTML = allData.Pressure;
    document.getElementById("humd").innerHTML = allData.Humidity;
    document.getElementById("count").innerHTML = allData.Country;
    document.getElementById("city").innerHTML = allData.City;
    document.getElementById("weath").innerHTML = allData.Weather;
    document.getElementById("date").innerHTML = allData.Date;
    document.getElementById("feel").innerHTML = allData.Feeling;
  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
};

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", collectData);

// Just For Checking Data
const checkVlues = (data) => {
  //Print,Getting Data using Object Destructuring
  const {
    sys: { country },
    name: city,
    main: { temp },
    weather: [{ description }],
    main: { humidity },
    main: { pressure },
  } = data;

  console.log(data); // <--- Check Getting Data Object
  console.log("Country: ", country); // <--- Check Getting Temp
  console.log("City: ", city); // <--- Check Getting Temp
  console.log("Temp: ", temp); // <--- Check Getting Temp
  console.log("Weather: ", description); // <--- Check Getting Temp
  console.log("Humidity: ", humidity); // <--- Check Getting Humidity
  console.log("Pressure: ", pressure); // <--- Check Getting Pressure

  //Old Way to Print,Getting data
  // console.log('CountryOLD: ', data.sys.country); // <--- Check Getting Temp
  // console.log('CityOLD: ', data.name); // <--- Check Getting Temp
  // console.log('TempOLD: ', data.main.temp); // <--- Check Getting Temp
  // console.log('HumidityOLD: ', data.main.humidity); // <--- Check Getting Humidity
  // console.log('PressureOLD: ', data.main.pressure); // <--- Check Getting Pressure
  // console.log('WeatherOLD: ', data.weather[0].description); // <--- Check Getting Temp
};
