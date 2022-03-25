import cv2
import numpy as np
from tensorflow.image import resize
from tensorflow import convert_to_tensor,argmax
from tensorflow.data import Dataset
pxls=100
blackPxls=0.5
th=90

def preprocess(img):
  img=np.array(img,np.int32)
  shp=(250,150)
  for r in range(shp[0]):
    for c in range((img.shape[1])):
      if r ==0 and c==0:
        img[r][c]=img[r][c]>th
      elif r==0 and c:
        img[r][c]=img[r][c-1]+(img[r][c]>th)
      elif c==0 and r:
        img[r][c]=img[r-1][c]+(img[r][c]>th)
      else:
        img[r][c]=img[r-1][c]+img[r][c-1]-img[r-1][c-1]+(img[r][c]>th)
  for r in range(shp[0],img.shape[0]):
    for c in range((shp[1])):
      if r ==0 and c==0:
        img[r][c]=img[r][c]>th
      elif r==0 and c:
        img[r][c]=img[r][c-1]+(img[r][c]>th)
      elif c==0 and r:
        img[r][c]=img[r-1][c]+(img[r][c]>th)
      else:
        img[r][c]=img[r-1][c]+img[r][c-1]-img[r-1][c-1]+(img[r][c]>th)
  return img
def ratioBlack(img,r,c,h,w):
  h-=1
  w-=1
  sm=0
  if r ==0 and c==0:
    sm= img[h][w]
  elif r==0 and c:
    sm= img[h][c+w]- img[h][c-1]
  elif c==0 and r:
    sm= img[r+h][w]-img[r-1][w]
  else:
    sm= img[r+h][c+w]-img[r-1][c+w]-img[r+h][c-1]+img[r-1][c-1]
  total=((h+1)*(w+1))
  return 1-sm/total;

def convoluteShort(on,kernelShape):
  
  if on.shape[0]<200 or on.shape[1]<200:
    return 1

  y_len=kernelShape[0]
  x_len=kernelShape[1]
  y_from,x_from=0,0
  done=False
  for y in range(100):
    for x in range(100):
      res=ratioBlack(on,y,x,y_len,x_len)
      if res>blackPxls:
        y_from,x_from=(y+y_len,x+x_len)
        done=True
        break
    if done:
      break

  # try:
  while(ratioBlack(on,y_from,x_from,5,5)>blackPxls):
    x_from+=2
  x_from-=2
  while(1-ratioBlack(on,y_from,x_from,2,pxls)>blackPxls):
    y_from+=1
  return y_from,x_from
  # except:
  #   return 2


def nextHorizontalShort(on,y_prev,x_prev):
  y_prev+=30
  y_from=y_prev
  x_from=x_prev
  while(ratioBlack(on,y_from,x_from,5,pxls)>blackPxls):
      y_from+=1
  while(1-ratioBlack(on,y_from,x_from,5,pxls)>blackPxls):
      y_from+=1
  return y_from,x_from

def nextVerticalShort(on,y_prev,x_prev):
  x_prev+=30
  y_from=y_prev
  x_from=x_prev
  while(ratioBlack(on,y_from,x_from,pxls,5)>blackPxls):
    x_from+=1
  while(1-ratioBlack(on,y_from,x_from,pxls,5)>blackPxls):
      x_from+=1
  return y_from,x_from

def rotate(img,angle):
  rows = img.shape[0]
  cols = img.shape[1]

  img_center = (cols / 2, rows / 2)
  M = cv2.getRotationMatrix2D(img_center, angle, 1)

  rotated_image = cv2.warpAffine(img, M, (cols, rows),
                            borderMode=cv2.BORDER_CONSTANT,
                            borderValue=(255,255,255))
  return rotated_image

# import tensorflow as tf
# from tensorflow import keras
def getAllCells(hori,ver,on):
  starts=[]
  for y in range(len(hori)-1):
    for x in range(len(ver)-1):
      leftTop=hori[y][0],ver[x][1]
      rightEnd=hori[y+1][0],ver[x+1][1]
      starts.append((leftTop,rightEnd))
  return starts

def giveHoriVer(marked):
  for ii in np.arange(0,5):
      for i in [ii,-(ii)]:
        global done
        done=False
        if i:
          timg=rotate(marked,i)
        else: 
          timg=marked
        img=preprocess(timg)
        try:
          leftEndpoint=convoluteShort(img,(30,30))
          horizontal=[leftEndpoint]
          vertical=[leftEndpoint]
          while(len(horizontal)<10):
            horizontal.append(nextHorizontalShort(img,horizontal[-1][0],horizontal[-1][1]))
          while(len(vertical)<8):
            vertical.append(nextVerticalShort(img,vertical[-1][0],vertical[-1][1]))
          done=True
          marked=timg
          break
        except:
          if ii==0:
            break
      if done :
        break
  # print(done)
  if not done:
    raise "not good image"
  else:
    return horizontal,vertical,marked

input_shape=(50,50)
num_classes=3

def extractImg(img,x1,y1,x2,y2):
  x1=x1-3
  y1=y1-3
  x2=x2+3
  y2=y2+3
  trimmed=img[y1:y2,x1:x2,np.newaxis]
  trimmed=resize([trimmed],input_shape)
  return trimmed[0]

def getSubImgs(marked):
  horizontal,vertical,marked=giveHoriVer(marked)
  allBlocks=getAllCells(horizontal,vertical,marked)
  cells=marked.copy()
  subImgs=[]
  for lt,rb in allBlocks:
    cv2.rectangle(cells,lt[::-1],rb[::-1],100,2)
    subImgs.append(extractImg(marked,lt[1],lt[0],rb[1],rb[0]))
  subImgs=convert_to_tensor(subImgs)
  return subImgs

kernelErode=np.ones((3,3),np.uint8)
def readImgGray(imgGrid):
  imgGrid=cv2.threshold(imgGrid,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
  imgGrid=cv2.erode(imgGrid,kernelErode)
  imgGrid=cv2.resize(imgGrid,(500,600),interpolation=cv2.INTER_AREA)
  cv2.imshow("",imgGrid)
  cv2.waitKey(0)
  return imgGrid


cellStates=['EMPTY','PRESENT','ABSENT']

def createData(img):
  subImgs=getSubImgs(readImgGray(img))
  return subImgs

def giveModel():
  return load_model("resConv4GridModel")


def createDataSet(X,y,is_training=False):
  ds=Dataset.from_tensor_slices((X,y))
  ds=ds.batch(32).prefetch(32)
  if is_training:
    ds=ds.shuffle(32)
  return ds

from tensorflow.keras import models
Attendance_model=models.load_model("./python/resConv4GridModel")

def imgWithLabel(img,model,labels):
  pred=argmax(model.predict(np.array([img])),axis=1)[0].numpy()
  return pred;
#Requires grayscaled image
def getStatusOfGrid(img):
  subImgs=createData(img)
  ans=[]
  for i in subImgs:
    ans.append(imgWithLabel(i,Attendance_model,cellStates))
  return ans;


