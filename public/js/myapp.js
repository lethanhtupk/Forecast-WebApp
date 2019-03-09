
const searchForm = document.querySelector('form');
const searchButton = document.querySelector('input');
const locationMessage = document.querySelector('.location');
const degree_curr = document.querySelector('#degree_curr');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const visibility = document.querySelector('#visibility');
const dayOfWeek = document.querySelector('#dayOfWeek');
const date = document.querySelector('.date');

const dayOfweek_1 = document.querySelector('#dayOfweek_1');
const dayOfweek_2 = document.querySelector('#dayOfweek_2');
const dayOfweek_3 = document.querySelector('#dayOfweek_3');
const dayOfweek_4 = document.querySelector('#dayOfweek_4');
const dayOfweek_5 = document.querySelector('#dayOfweek_5');
const dayOfweek_6 = document.querySelector('#dayOfweek_6');

const degreemax_1 = document.querySelector('#degreemax_1');
const degreemax_2 = document.querySelector('#degreemax_2');
const degreemax_3 = document.querySelector('#degreemax_3');
const degreemax_4 = document.querySelector('#degreemax_4');
const degreemax_5 = document.querySelector('#degreemax_5');
const degreemax_6 = document.querySelector('#degreemax_6');

const degreemin_1 = document.querySelector('#degreemin_1');
const degreemin_2 = document.querySelector('#degreemin_2');
const degreemin_3 = document.querySelector('#degreemin_3');
const degreemin_4 = document.querySelector('#degreemin_4');
const degreemin_5 = document.querySelector('#degreemin_5');
const degreemin_6 = document.querySelector('#degreemin_6');

const mess_curr = document.querySelector('#mess_curr');
const mess_1 = document.querySelector('#mess_1');
const mess_2 = document.querySelector('#mess_2');
const mess_3 = document.querySelector('#mess_3');
const mess_4 = document.querySelector('#mess_4');
const mess_5 = document.querySelector('#mess_5');
const mess_6 = document.querySelector('#mess_6');

const error = document.querySelector('#error');
const forecasttable = document.querySelector('.forecast-table');

forecasttable.style.display = 'none';

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchButton.value;
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                error.innerHTML = data.error;
                error.style.display = "block";
                forecasttable.style.display = "none";
            }
            else{
                // function to convert day of week
                function dayOfweek(timestamp){
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var dayNums = new Date(timestamp).getDay();
                    var result = days[dayNums];
                    return result;
                }
                // fetch data for currently forecast
                if(data.forecast.visibility >10){
                    visibility.innerHTML = " 10+ km";
                }
                else{
                    visibility.innerHTML = data.forecast.visibility + 'km';
                }
                var dayNum = new Date(data.forecast.timestamp*1000).getDate();
                var month = new Date(data.forecast.timestamp*1000).getMonth();
                var result = dayOfweek(data.forecast.timestamp*1000);
                dayOfWeek.innerHTML = result;
                switch(month){
                    case 0:
                        monthText = "Jan";
                        break;
                    case 1:
                        monthText = "Feb";
                        break;
                    case 2:
                        monthText = "Mar";
                        break;
                    case 3:
                        monthText = "Apr";
                        break;
                    case 4:
                        monthText = "May";
                        break;
                    case 5:
                        monthText = "Jun";
                        break;
                    case 6:
                        monthText = "Jul";
                        break;
                    case 7:
                        monthText = "Aug";
                        break;
                    case 8:
                        monthText = "Sep";
                        break;
                    case 9:
                        monthText = "Oct";
                        break;
                    case 10:
                        monthText = "Nov";
                        break;
                    case 11:
                        monthText = "Dec";
                        break;
                };


                date.innerHTML = dayNum + " " + monthText;
                humidity.innerHTML = data.forecast.humidity + '%';
                degree_curr.innerHTML = data.forecast.temperature;
                windSpeed.innerHTML = data.forecast.windSpeed + " km/h";
                locationMessage.innerHTML = data.Location;
                mess_curr.innerHTML = data.forecast.summary;
                // end currently forecast
                dayOfweek_1.innerHTML = dayOfweek(data.forecast.daily.data[1].time*1000);
                dayOfweek_2.innerHTML = dayOfweek(data.forecast.daily.data[2].time*1000);
                dayOfweek_3.innerHTML = dayOfweek(data.forecast.daily.data[3].time*1000);
                dayOfweek_4.innerHTML = dayOfweek(data.forecast.daily.data[4].time*1000);
                dayOfweek_5.innerHTML = dayOfweek(data.forecast.daily.data[5].time*1000);
                dayOfweek_6.innerHTML = dayOfweek(data.forecast.daily.data[6].time*1000);

                degreemax_1.innerHTML = Math.round((data.forecast.daily.data[1].temperatureMin-32)/1.8);
                degreemax_2.innerHTML = Math.round((data.forecast.daily.data[2].temperatureMin-32)/1.8);
                degreemax_3.innerHTML = Math.round((data.forecast.daily.data[3].temperatureMin-32)/1.8);
                degreemax_4.innerHTML = Math.round((data.forecast.daily.data[4].temperatureMin-32)/1.8);
                degreemax_5.innerHTML = Math.round((data.forecast.daily.data[5].temperatureMin-32)/1.8);
                degreemax_6.innerHTML = Math.round((data.forecast.daily.data[6].temperatureMin-32)/1.8);

                degreemin_1.innerHTML = Math.round((data.forecast.daily.data[1].temperatureMax-32)/1.8);
                degreemin_2.innerHTML = Math.round((data.forecast.daily.data[2].temperatureMax-32)/1.8);
                degreemin_3.innerHTML = Math.round((data.forecast.daily.data[3].temperatureMax-32)/1.8);
                degreemin_4.innerHTML = Math.round((data.forecast.daily.data[4].temperatureMax-32)/1.8);
                degreemin_5.innerHTML = Math.round((data.forecast.daily.data[5].temperatureMax-32)/1.8);
                degreemin_6.innerHTML = Math.round((data.forecast.daily.data[6].temperatureMax-32)/1.8);

                mess_1.innerHTML = data.forecast.daily.data[1].summary;
                mess_2.innerHTML = data.forecast.daily.data[2].summary;
                mess_3.innerHTML = data.forecast.daily.data[3].summary;
                mess_4.innerHTML = data.forecast.daily.data[4].summary;
                mess_5.innerHTML = data.forecast.daily.data[5].summary;
                mess_6.innerHTML = data.forecast.daily.data[6].summary;

                forecasttable.style.display = "block";
                error.style.display = "none";
            }
        })
    })
    // console.log('Test');
})
