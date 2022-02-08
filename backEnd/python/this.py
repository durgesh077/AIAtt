import sys,base64,json,numpy as np
from io import BytesIO as BIO
from PIL import Image
import matplotlib.pyplot as plt
import cv2
def show(photoBGR):
    cv2.imshow("photo",photoBGR)
    cv2.waitKey(0)
def print(x):
    sys.stdout.write(str(x))
    sys.stdout.flush()
def convertToFile(name,img):
    photo=img[img.find(',')+1:]
    imgBinary=base64.b64decode(photo)
    imgReader=BIO(imgBinary)
    photo=Image.open(imgReader).convert("RGB")
    photoRGB=np.array(photo)
    photoBGR=cv2.cvtColor(photoRGB, cv2.COLOR_RGB2BGR)
    show(photoBGR)
while(True):
    data=sys.stdin.readline()[:-1]
    data=json.loads(data)
    convertToFile(data['name'], data['img64base'])
    sys.stdout.flush()






