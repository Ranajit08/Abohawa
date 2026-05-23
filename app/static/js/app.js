let timeout;
const sug = document.getElementById('suggestions');
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
                    html += `<button><div class="suggestion">
                                <h4>${item.name}</h4>
                                <p>${item.state}, ${item.country}</p>
                                <input type="hidden" name="cordinets" value="${item.lat},${item.lon}">
                            </div></button><hr>`;
                });
                suggestions.innerHTML = html;
                sug.style.display = 'block';
            });
    } 