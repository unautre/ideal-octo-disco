#!/usr/bin/env python3

from flask import Flask, render_template, request
from glob import glob
from uuid import uuid4

app = Flask(__name__)

@app.route("/", methods=["GET"])
def hello_world():
    # load images from storage
    images = glob("static/storage/*.png")

    return render_template('gallery.html', images=images)

@app.route("/", methods=["POST"])
def push_new_image():
    newfilename = str(uuid4())

    f = request.files["file"]
    f.save(f"static/storage/{newfilename}.png")
    return ('', 204)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)