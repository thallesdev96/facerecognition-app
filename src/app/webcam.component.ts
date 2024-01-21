import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  standalone: true // Add standalone: true here

})
export class WebcamComponent implements OnInit {
  videoElement!: HTMLVideoElement; // Add the "!" to indicate it will be initialized in the constructor
  public stream!: MediaStream;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // constructor() {
  //   // Initialize videoElement here, for example:
  //   this.videoElement = document.createElement('video');
  // }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.videoElement = document.getElementById('videoElement') as HTMLVideoElement;
      this.startVideo();
      this.loadFaceRecognitionModel();
    }
  }

  async startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: {}});
      this.videoElement.srcObject = stream;
      await this.loadFaceRecognitionModel();
    } catch (err) {
      console.error("Error accessing the webcam: ", err);
    }
  }


  async loadFaceRecognitionModel() {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]);
    console.log("Face recognition models loaded successfully");
  }

  async recognizeFaces() {
    const detections = await faceapi.detectAllFaces(this.videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    console.log(detections);
  }



  //a partir daqui nao sei

  async startWebcam() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      this.videoElement.srcObject = this.stream;
    } catch (err) {
      console.error("Error accessing the webcam: ", err);
    }
  }

  stopWebcam() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.videoElement.srcObject = null;
    }
  }

}

