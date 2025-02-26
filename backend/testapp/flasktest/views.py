from flasktest import app
from flask import render_template

@app.route('/')
def index():
    my_dict = {
        'insert_something1': 'おはようございます。',
        'insert_something2': 'こんにちは。',
        'test_titles': ['title1','title2','title3']
    }
    return render_template('flasktest/index.html', my_dict=my_dict)
@app.route('/test')
def other1():
    return 'Hellow World!'
