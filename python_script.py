import sys
from ultralytics import YOLO

def process_image(image_path):
    # TODO: Process the image and return the result
    # accepts all formats - image/dir/Path/URL/video/PIL/ndarray. 0 for webcam
    model = YOLO("yolov8s.yaml")  # build a new model from scratch
    model = YOLO("saved_weights/train14_3cl_340ep.pt")  # load a pretrained YOLOv8s weights
    results = model.predict(source=image_path, classes=[0,2], conf=0.75)  # classes=[0,2], conf=0.75, stream=True, save=True
    print('===============================')
    humans = 0
    guns = 0
    for res in results:
        boxes = res.boxes
        for box in boxes:
            if int(box.cls[0]) == 0:
                humans += 1
            elif int(box.cls[0]) == 2:
                guns += 1
    print(f"{guns} guns and {humans} humans detected!")
    print('===============================')
    return results

if __name__ == '__main__':
    result = process_image(sys.argv[1])
    print(result)


