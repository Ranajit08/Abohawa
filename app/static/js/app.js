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
            w.innerHTML = JSON.stringify(data);
            console.log(data)
        })
}
