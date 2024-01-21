import { Component , ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebcamComponent } from './webcam.component';
import * as faceapi from "face-api.js";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[WebcamComponent],
  styleUrl: './app.component.scss',
  standalone: true // Add standalone: true here
})
export class AppComponent {
  @ViewChild(WebcamComponent) webcamComponent!: WebcamComponent;

  startStopWebcam() {
    if (this.webcamComponent) {
      console.log('aqui', this.webcamComponent.stream);
      if (!this.webcamComponent.stream) {
        this.webcamComponent.startWebcam();
      } else {
        this.webcamComponent.stopWebcam();
      }
    }
  }
}


// import { Component } from '@angular/core';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   // ... código do AppComponent
// }
