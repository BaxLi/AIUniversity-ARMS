import sys
from ultralytics import YOLO

def process_image(image_path):
    # TODO: Process the image and return the result
    # accepts all formats - image/dir/Path/URL/video/PIL/ndarray. 0 for webcam
    model = YOLO("yolov8s.yaml")  # build a new model from scratch
    model = YOLO("saved_weights/train14_3cl_340ep.pt")  # load a pretrained YOLOv8s weights
    results = model.predict(source=image_path, classes=[2], conf=0.75)  # classes=[0,2], conf=0.75, stream=True, save=True
    return results

if __name__ == '__main__':
    result = process_image(sys.argv[1])
    print(result)


