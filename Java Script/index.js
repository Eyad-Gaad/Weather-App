document.addEventListener("DOMContentLoaded",function(e){
//DOM HTML Selection And Const Arrays
let form = document.querySelector("form");
let input = document.getElementById("input");
let invalidMessage = document.getElementById("invalid");
let locationName = document.getElementById("name");
let currentTemp = document.getElementById("temp_c");
let icon1 = document.getElementById("icon1");
let weather1 = document.getElementById("weather1");
let icon2 = document.getElementById("icon2");
let maxtemp_c1 = document.getElementById("maxtemp_c1");
let mintemp_c1 = document.getElementById("mintemp_c1");
let weather2 = document.getElementById("weather2");
let icon3 = document.getElementById("icon3");
let maxtemp_c2 = document.getElementById("maxtemp_c2");
let mintemp_c2 = document.getElementById("mintemp_c2");
let weather3 = document.getElementById("weather3");
let fDate = document.getElementById("fDate");
let sDate = document.getElementById("sDate");
let tDate = document.getElementById("tDate");
let month = document.getElementById("month");
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// (Async / Await ) API Function With Default Parameter "reigon = 'cairo'".

async function getData(reigon = 'cairo'){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7141b846b23f464fb96140642241212&q=${reigon}&days=3`);
    if(!response.ok){
        let obj = await response.json();
        showError(obj.error.message);
    }
    else{
        let obj = await response.json();
        let {location,current,forecast} = obj;
        display(location,current,forecast);
        hideError();
    }
}
getData();

// Distructing And Display in InnerHTML.

function display(location,current,forecast){
    let {forecastday} = forecast;
    let[day1,day2,day3] = forecastday;
    let date1 = new Date(current.last_updated);
    let date2 = new Date(day2.date);
    let date3 = new Date(day3.date);
    fDate.innerHTML=weekDays[date1.getDay()];
    month.innerHTML = `${date1.getDate()}${months[date1.getMonth()]}`
    locationName.innerHTML = location.name;
    currentTemp.innerHTML = current.temp_c;
    icon1.setAttribute("src",`https:${current.condition.icon}`);
    weather1.innerHTML = current.condition.text;
    sDate.innerHTML=weekDays[date2.getDay()];
    icon2.setAttribute("src",`https:${day2.day.condition.icon}`);
    maxtemp_c1.innerHTML = `${day2.day.maxtemp_c}°C`
    mintemp_c1.innerHTML = `${day2.day.mintemp_c}°C`
    weather2.innerHTML = day2.day.condition.text;
    tDate.innerHTML=weekDays[date3.getDay()];
    icon3.setAttribute("src",`https:${day3.day.condition.icon}`);
    maxtemp_c2.innerHTML = `${day3.day.maxtemp_c}°C`
    mintemp_c2.innerHTML = `${day3.day.mintemp_c}°C`
    weather3.innerHTML = day3.day.condition.text;
};

// Display An Error Message.

function showError(error){
    invalidMessage.classList.replace('d-none','d-inline');
    invalidMessage.innerHTML = error;
};

// Hide Error 

function hideError(){
    invalidMessage.classList.replace('d-inline','d-none'); 
};

// User Submit Event For Search Reigon.

form.addEventListener("submit",function(e){
    e.preventDefault();
    getData(input.value);
    input.value = null;
});
});