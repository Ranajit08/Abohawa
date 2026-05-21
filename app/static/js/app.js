let timeout;
document.getElementById('suggestions').style.display = 'none';
document.getElementById('search').addEventListener('input', function() {
    clearTimeout(timeout);
    const query = this.value;
    timeout = setTimeout(() => {
        fetchWeather(query);
        document.getElementById('suggestions').style.display = 'block';
    }, 500);
    
});

function fetchWeather(query) {
    fetch(`/search/${query}`)
            .then(response => response.json())
            .then(data => {
                const suggestions = document.getElementById('suggestions');
                let html = '';
                data.forEach(item => {
                    html += `<div class="suggestion"><h4>${item.name}</h4><p>${item.state}, ${item.country}</p></div>`;
                });
                suggestions.innerHTML = html;
            });
    if (query === '') {
        document.getElementById('suggestions').style.display = 'none';
    } 
}   