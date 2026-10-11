---
title: "Object Detection with YOLO in 90 Seconds"
date: "2026-06-16"
description: "A 90-second tutorial on running YOLOv8 object detection on a real driving image, no setup required."
---

Watch the video: [Object Detection with YOLO in 90 Seconds](https://youtu.be/ZuGV6ncvR20)

Every self-driving car starts with the same problem: turning pixels into things. Before a car can decide whether to brake, turn, or keep going, it has to recognize the cars, pedestrians, and traffic signs around it. That skill is called object detection, and you can try it yourself in about 90 seconds.

## What the video covers

I made a short tutorial that uses YOLOv8, a popular family of object detection models, on a real driving image from the [Berkeley DeepDrive dataset](https://www.kaggle.com/datasets/solesensei/solesensei_bdd100k). That dataset contains around 100,000 driving videos and is used by actual researchers.

The whole thing runs in a Google Colab notebook, so there’s nothing to set up on your computer. In the video, I:

1. Install the Ultralytics library
2. Load the smallest pretrained YOLOv8 model, which already recognizes 80 everyday object classes, including cars, people, and stop signs
3. Load a sample street image
4. Run detection with a single line of code
5. Save and display the image with labeled bounding boxes

The result is every object in the scene identified, located, and labeled. Self-driving systems do this same kind of work on every video frame, more than 30 times a second.

## Why it matters

Detection is the first layer of perception in a self-driving stack. Path planning, prediction, and control all get built on top of it. The model you run in the notebook is small, but it shows how a car starts to make sense of the road.

## Try it yourself

[Open the Colab notebook](https://colab.research.google.com/drive/1PGWun2ZavlYJbHccHpSt-ksWM6y_uW0t?usp=sharing) and run the cells from top to bottom. Then try some of these:

- Swap in your own dashcam photo
- Switch to a larger model (`yolov8s` or `yolov8m`) for better accuracy at slower speeds
- Explore the Ultralytics docs for video, training, and segmentation

Thanks for reading, and I’d love to hear what you detect!
