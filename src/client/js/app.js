// including environment variables
require('dotenv').config();

//function for api requests
export async function location(e){
    const location = document.getElementById('city').value;
    if(!location){
        return alert('It must be a city OR country!');
    }
    const LeavingDate = document.getElementById('leave').value;
    const ReturningDate = document.getElementById('return').value;
    const img = document.getElementById('img');

    //Api call to get the coordinates of the place from geonames.
     const coordinates = await getData(process.env.GEO_URL + location + process.env.CON_URL + '&username=' + process.env.USR);
     const latitude = coordinates.geonames[0].latitude;
     const longitude = coordinates.geonames[0].longitude;

     //api call to get the weather from weatherbit API based on coordinates we got from geonames api.
     const weather = await getData(process.env.WB_URL + 'lon=' + longitude + '&key=' + process.env.WB_KEY + '&lat=' + latitude);

     //api call to get the picture of place we searched from pixabay.
     const picture = await getData(process.env.PIX_URL + 'key=' + process.env.PIX_KEY + '&q=' + location + process.env.URL);
    document.querySelector('.trip-info').classList.remove('hide');

         return postData('/forecast',
          {
            minTemp: weather.data[0].min_temp,
            maxTemp:weather.data[0].max_temp,
            description: weather.data[0].weather.description,
            country: coordinates.geonames[0].countryName,
            cityName: coordinates.geonames[0].toponymName,
            picture: picture.hits[0].largeImageURL,
            LeavingDate: LeavingDate,
            ReturningDate: ReturningDate
         })

          .then(
              function(response){
               return getData('/save');
             }
           )

          .then (
            function(update){
            const weather = `Min Temperature: ${update.minTemp}C - Max temperature: ${update.maxTemp}C`;
            document.getElementById('weather').innerHTML = weather;
            document.getElementById('con').innerText = update.country;
            document.getElementById('place').innerHTML = update.cityName;
            document.getElementById('desc').innerHTML = update.description;

            if(!dateLeaving && !dateReturning){
                document.getElementById('leave_date').innerText = 'No date picked';
                document.getElementById('return_date').innerText = 'No date picked';

                } else {
                document.getElementById('leave_date').innerHTML = update.dateLeaving;
                document.getElementById('return_date').innerHTML = update.dateReturning;
            }

            img.setAttribute('src', `${update.picture}`);

        }
    );
}

export const getData = async(url = '')=>{
    const response = await fetch(url);
    if(response.status === 404){
        alert('Error');
    }
    try{
        const data = response.json();
        return data;

    }catch(err){
        alert(err);
    }
};

 export const postData = async (url = '', data = {}) => {
    console.log(data);
       const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    } catch(err) {
        console.log(err);
    }
};

