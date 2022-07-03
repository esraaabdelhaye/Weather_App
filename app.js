window.addEventListener('load' , onLoad)
const latitude = document.querySelector('.lat');
const longitude = document.querySelector('.long');

document.querySelector('.sendInfo').addEventListener('click' , ()=> getWeather(latitude.value,longitude.value)
)

function onLoad(){
    navigator.geolocation.getCurrentPosition((location)=>{
        const lat= location.coords.latitude;
        const long = location.coords.longitude;
        getWeather(lat , long)
    })
}



function getWeather(lat , long){
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(`${proxy}https://api.weatherapi.com/v1/current.json?key=a2b7c1081f3441559a2102541220307&q=${lat},${long}&aqi=no`)
    .then(response => response.json())
    .then(data => displayInfo(data))
    .catch(error => console.log(error))
}


function displayInfo(data){
    console.log(data);
    const {current , location} = data;
    const iconinfo = current.condition;
    const time = location.localtime.split(/\s+/);
    const arr = [time.shift(), time.join(' ')];
    
    document.querySelector('.icon').setAttribute('src' , iconinfo.icon)
    document.querySelector('.icon-description').textContent = iconinfo.text;
    document.querySelector('.city').textContent = location.name + ", " + location.country;
    document.querySelector('.timezoon').textContent = location.tz_id;
    document.querySelector('.date').textContent = arr[0];
    document.querySelector('.time').textContent = arr[1];
    document.querySelector('.temprature').textContent = `${current.temp_c} °C`;
    document.querySelector('.wind').textContent = `Wind Speed: ${current.gust_kph} KM/H`;

}


// The Used API => weatherapi.com

