import socket
import cv2
import tensorflow as tf
import numpy as np
import flask
import os

from flask import Flask, flash, request, redirect, url_for, session
app = Flask(__name__)

import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


# HOST = "192.168.56.1"
# PORT = 9999
#
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# s.bind((HOST, PORT))
# s.listen(5)


print("Listening ...")


@app.route('/image', methods=['POST'])
def index():
    print("welcome to upload")
    file = request.files['file']
    file.save(file.filename)
    prediction = model.predict([prepare(file.filename)])
    print(CATEGORIES[int(np.argmax(prediction[0]))])
    return (CATEGORIES[int(np.argmax(prediction[0]))])

CATEGORIES = ["Dog", "Cat", "Snake", "Bird"]

def prepare(filepath):
    IMG_SIZE = 70
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)

model = tf.keras.models.load_model("64x3-CNN_2.model")



if __name__ == '__main__':
    app.run(host='192.168.1.22', port=5000)

# def DownloadImage():
#     while True:
#         conn, addr = s.accept()
#         print("[+] Client connected: ", addr)
#
#         # get file name to download
#         f = open("received.jpg", "wb")
#         while True:
#             # get file bytes
#             data = conn.recv(4096)
#             if not data:
#                 break
#             # write bytes on file
#             f.write(data)
#         f.close()
#         print("[+] Download complete!")
#
#         # close connection
#         conn.close()
#         print("[-] Client disconnected")
#
# DownloadImage()
#


