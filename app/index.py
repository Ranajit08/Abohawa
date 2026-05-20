from flask import Blueprint, render_template, request
from dotenv import load_dotenv
import os
import requests

load_dotenv()

bp = Blueprint('index', __name__)
SECRET_KEY = os.getenv('API_KEY')

@bp.route('/')
def index():
    return render_template('index.html')
