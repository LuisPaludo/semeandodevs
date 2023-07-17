python -m venv .venv
Set-ExecutionPolicy Unrestricted -Scope Process
.venv/Scripts/activate
python.exe -m pip install --upgrade pip
pip install flask
pip install requests
pip install flask_sqlalchemy
pip install psycopg2-binary
pip install Flask-RESTful
pip install flasgger
python -m main