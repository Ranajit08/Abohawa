from flask import Blueprint, render_template, request
from dotenv import load_dotenv
import os
import requests

load_dotenv()

bp = Blueprint('index', __name__)
SECRET_KEY = os.getenv('API_KEY')

@bp.route('/')
def index():
    a = requests.get(f'http://api.weatherapi.com/v1/current.json?key={SECRET_KEY}&q=22.6855752,88.3748587') 
    return render_template('index.html')

@bp.route('/search/<t>')
def search(t):
    a = requests.get(f'https://photon.komoot.io/api/?q={t}')
    return a.json()

