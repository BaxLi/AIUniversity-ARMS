import sys
import json
from io import BytesIO
from PIL import Image
from ultralytics import YOLO

def process_image(image_data):
    # Load the image from the buffer
    image = Image.open(BytesIO(image_data))

    # Convert the image to RGB if it's not already in that format
    if image.mode != 'RGB':
        image = image.convert('RGB')

    # Run YOLO on the image
    model = YOLO("yolov8s.yaml")  # build a new model from scratch
    model = YOLO("saved_weights/train14_3cl_340ep.pt")  # load a pretrained YOLOv8s weights
    results = model.predict(source=image, classes=[0,2], conf=0.75)  # classes=[0,2], conf=0.75, stream=True, save=True
    humans = 0
    guns = 0
    for res in results:
        boxes = res.boxes
        for box in boxes:
            if int(box.cls[0]) == 0:
                humans += 1
            elif int(box.cls[0]) == 2:
                guns += 1
    response = {"guns": guns, "humans": humans}

    # Return the result as a JSON-encoded string
    return json.dumps(response)

if __name__ == '__main__':
    # Read the image data from stdin
    image_data = sys.stdin.buffer.read()

    # Process the image and return the result as a JSON-encoded string
    result = process_image(image_data)

    # Write the result to stdout
    sys.stdout.write(result)
