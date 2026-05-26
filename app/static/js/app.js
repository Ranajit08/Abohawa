let timeout;
const sug = document.getElementById('suggestions');
const greet = document.getElementById('g');
sug.style.display = 'none'
document.getElementById('search').addEventListener('input', function() {
    if (this.value == '') {
        sug.style.display = 'none';
    }
    clearTimeout(timeout);
    const query = this.value;
    timeout = setTimeout(() => {
        fetchWeather(query);
    }, 500);
    
});

function fetchWeather(query) {
    fetch(`/search/${query}`)
            .then(response => response.json())
            .then(data => {
                const suggestions = document.getElementById('suggestions');
                let html = '';
                data.forEach(item => {
                    html += `<button onclick=getWeatherInfo(${item.lat},${item.lon})><div class="suggestion">
                                <h4>${item.name}</h4>
                                <p>${item.state}, ${item.country}</p>
                            </div></button>`;
                });
                suggestions.innerHTML = html;
                sug.style.display = 'block';
            });
    } 

function getWeatherInfo(lat, lon) {
    sug.style.display = 'none'
    fetch(`/get/${lat}&${lon}`)
        .then(response => response.json())
        .then(data => {
            const w = document.getElementById('weather');
            greet.style.display = 'none';
            let json = data[0];

            let img;
            if (json.is_day == 1) {
                img = './static/images/icons8-sun-48.png'
            } else {
                img = './static/images/icons8-moon-60.png'
            }

            let html = `<div id="card">
                            <div id="top">
                                <div id="temp">
                                    <img src='${json.c_icon_url}' alt='${json.c_text}'>
                                    <p>${json.c_text}</p>
                                </div>
                                <h2>Tempreture: ${json.temp_c} ℃</h2>
                                <h6>Feels like: ${json.feelslike_c} ℃</h6>       
                            </div>
                            <div id="bottom">
                                <div id="location">
                                    <div id="sub-img-top">
                                        <h4>${json.name}</h4>
                                        <img src="${img}" alt="${json.is_day}">
                                    </div>
                                    <p>${json.name2}</p>
                                </div>
                                <div id="k">
                                    <div id="hum">
                                        <img src="./static/images/icons8-humidity-48.png" alt="humidity">
                                        <p class='strong'>Humidity:</p>
                                        <p>${json.humidity}%</p>
                                    </div>
                                    <div id="wind">
                                        <img src="./static/images/icons8-windsock-50.png" alt="wind">
                                        <p class='strong'>Wind(kph):</p>
                                        <p>${json.wind_kph}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

            w.innerHTML = html;
        })
}
