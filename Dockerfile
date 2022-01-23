FROM python:3-slim

RUN pip3 install flask flask-socketio simple-websocket

WORKDIR /app/

COPY main.py /app/
COPY static/ /app/static/

ENV FLASK_APP=main

EXPOSE 5000
CMD python3 -m flask run -h 0.0.0.0
