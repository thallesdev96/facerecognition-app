import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
    selector: 'app-webcam',
    templateUrl: './webcam.component.html',
    styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
    videoElement !: HTMLVideoElement;

    ngOnInit() {
        this.videoElement = document.getElementById('videoElement') as HTMLVideoElement;
        this.startVideo();
        this.loadFaceRecognitionModel();
    }

    async startVideo() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            this.videoElement.srcObject = stream;
        } catch (err) {
            console.error("Error accessing the webcam: ", err);
        }
    }

    async loadFaceRecognitionModel() {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        console.log("Face recognition model loaded successfully");
    }

    async recognizeFaces() {
        const detections = await faceapi.detectAllFaces(this.videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        console.log(detections);
    }
}
