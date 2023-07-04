import sys
import cv2
import numpy as np
from ultralytics import YOLO
from ultralytics.yolo.utils.plotting import Annotator

orig_dir = str(sys.argv[1])
#print(f"What we got is: {orig_dir}")

def get_relativeness(b_h, b_g):
    xh1, xh2, yh1, yh2 = int(b_h[0]), int(b_h[2]), int(b_h[1]), int(b_h[3])
    xg1, xg2, yg1, yg2 = int(b_g[0]), int(b_g[2]), int(b_g[1]), int(b_g[3])

    #get the coordinates of intersection rectangle
    x1_i = max(xh1, xg1)
    y1_i = max(yh1, yg1)
    x2_i = min(xh2, xg2)
    y2_i = min(yh2, yg2)

    height_i = x2_i - x1_i
    width_i = y2_i - y1_i

    if height_i < 0 : height_i = 0
    if width_i < 0 : width_i = 0

    intersection = width_i * height_i
    return (intersection / ((xg2 - xg1) * (yg2 - yg1))) #its not iou a think that like this it is more informative for our purpose

# Load the YOLOv8 weights to the Yolo model 
model_human = YOLO('weights/train14_3cl_340ep.pt')

model_gun = YOLO('weights/train14_3cl_340ep.pt')

results_human = model_human.predict(orig_dir, conf = 0.5, verbose = False, classes = [0]) #set up the prediction of human model
results_gun = model_gun.predict(orig_dir, conf = 0.5, verbose = False, classes = [2]) #set up the prediction of gun model

is_alarm = False

for result_h in results_human:
            boxes_h = result_h.boxes
            for box_h in boxes_h:          
                b_h = box_h.xyxy[0]  # get box coordinates in (top, left, bottom, right) format
                conf_h = int(float(box_h.conf[0]) * 100)

                for result_g in results_gun:
                    boxes_g = result_g.boxes
                    for box_g in boxes_g:          
                        b_g = box_g.xyxy[0]  # get box coordinates in (top, left, bottom, right) format                       
                        #print(get_relativeness(b_h, b_g))
                        if get_relativeness(b_h, b_g) > 0.3: #the comman field of boundig boxes more than 30%
                              is_alarm = True #we have weapon on the frame

if is_alarm:
    print("alarm")
else:
    print("no alarm")