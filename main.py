#!/usr/bin/env python3

from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit

from glob import glob
from uuid import uuid4 as uuid

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/", methods=["GET"])
def hello_world():
    return app.send_static_file("index.html")

@socketio.on('connect')
def on_connect(auth):
    print("Someone connected: ", auth)

# TODO: chat function ?
@socketio.on('message')
def handle_message(data):
    print("Received message: ", data)

@socketio.on('stroke')
def handle_stroke(data):
    # add stroke reverb
    #socketio.sleep(5)
    emit('stroke', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", debug=False)