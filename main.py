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

#@app.route("/draw", methods=["GET"])
#def draw_new_image():
#    return render_template("draw.html")

@app.route("/", methods=["POST"])
def push_new_image():
    #print("Received: ", request.files)
    #for key, value in request.files.items():
    #    value.save("storage/" + key + ".png")
    #print(request.files["file"])
    s = request.stream
    newfilename = str(uuid4())
    print("Received stream: ", s)
    with open(f"static/storage/{newfilename}.png", "wb") as f:
        while (buf := s.read(16384)):
            f.write(buf)
    return ('', 204)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)