from flask import Blueprint, render_template, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()

bp = Blueprint('index', __name__)
SECRET_KEY = os.getenv('API_KEY')
base_url = f'http://api.weatherapi.com/v1/'

@bp.route('/')
def index():
    return render_template('index.html')

# this route is for search area in frontend. 
@bp.route('/search/<query>')
def search(query):
    url = f'{base_url}search.json?key={SECRET_KEY}&q={query}'

    try:
        response = requests.get(url, params={'lang': 'en', 'limit': 3})
        response.raise_for_status()

        data = response.json()
        res = []

        for item in data[:3]:
            res.append({
                'name': item.get('name'),
                'country': item.get('country'),
                'state': item.get('region'),
                'lon': item.get('lon'),
                'lat': item.get('lat')
            })

        return jsonify(res)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching search results: {e}")
        return jsonify({'error': 'Failed to fetch search results'}), 500

# this route is for fetching weather data from api.
@bp.route('/get/<lat>&<lon>')
def getWeather(lat, lon):
    current_url = f'{base_url}current.json?key={SECRET_KEY}&q={lat},{lon}'
    try:
        response = requests.get(current_url)
        response.raise_for_status()

        item = response.json()
        res = []
        res.append({
            'name': item['location']['name'],
            'name2' : f'{item['location']['region']}, {item['location']['country']}',
            'temp_c': item['current']['temp_c'],
            'c_text': item['current']['condition']['text'],
            'c_icon_url': item['current']['condition']['icon'],
            'humidity': item['current']['humidity'],
            'wind_kph': item['current']['wind_kph'],
            'feelslike_c': item['current']['feelslike_c'],
            'is_day': item['current']['is_day']
            })
        return jsonify(res)
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching search results: {e}")
        return jsonify({'error': 'Failed to fetch search results'}), 500
