let timeout;

document.getElementById('search').addEventListener('input', function() {
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
                    html += `<div class="suggestion"><h3>${item.name}</h3><p>${item.state}, ${item.country}</p></div>`;
                });
                suggestions.innerHTML = html;
            });
    if (query === '') {
        document.getElementById('suggestions').innerHTML = '';
    } 
}   