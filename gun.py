import sys
import os
import numpy as np
from ultralytics import YOLO

model = YOLO('weights/train14_3cl_340ep.pt')
results = model.predict('uploads', conf = 0.5, verbose = False, classes = [2])