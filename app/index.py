from flask import Blueprint, render_template, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()

bp = Blueprint('index', __name__)
SECRET_KEY = os.getenv('API_KEY')

@bp.route('/')
def index():
    return render_template('index.html')

# this route is for search area in frontend. 
@bp.route('/search/<query>')
def search(query):
    url = 'https://photon.komoot.io/api/'

    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }
        response = requests.get(url, params={'q': query, 'limit': 3, 'lang': 'en'}, headers=headers, timeout=5)
        response.raise_for_status()

        data = response.json()
        res = []

        for item in data.get('features', [])[:3]:
            props = item.get('properties', {})
            coords = item.get('geometry', {}).get('coordinates', [None, None])

            res.append({
                'name': props.get('name'),
                'country': props.get('country'),
                'state': props.get('state'),
                'lon': coords[0],
                'lat': coords[1]
            })
        seen = set()
        unique_res = []
        for item in res:
            if item['name'] not in seen:
                seen.add(item['name'])
                unique_res.append(item)

        return jsonify(unique_res)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching search results: {e}")
        return jsonify({'error': 'Failed to fetch search results'}), 500

# this route is for fetching weather data from api.
@bp.route('/get/<lat>&<lon>')
def getWeather(lat, lon):
    url = f' http://api.weatherapi.com/v1/current.json?key={SECRET_KEY}&q={lat},{lon}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching search results: {e}")
        return jsonify({'error': 'Failed to fetch search results'}), 500
