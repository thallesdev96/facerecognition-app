import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent // Add the WebcamComponent to the declarations array
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
