import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5Qrcode } from 'html5-qrcode';
import { __await } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'duck-go';
  html5QrCode: Html5Qrcode;
  cameraId: string = '';
  reading: boolean = false;
  cameraReady: boolean = false;
  buttonDisabler: boolean = false;
  permissionName = 'camera' as PermissionName;
  cameraPermission:boolean = false;

  ngOnInit(): void {
    // navigator.permissions
    //   .query({ name: "camera" })
    //   .then((permission) => {
    //     console.log(permission);
    //   })
    //   .catch((err) => {});
    navigator.permissions.query({ name: this.permissionName }).then((result) => {
      if(result.state === 'granted'){
        this.cameraPermission = true;
      }
    });
  }

  askCamera() {
    this.cameraReady = true;
  }

  dontGetCamera() {
    this.cameraReady = false;
  }

  getCamera() {
    this.buttonDisabler = true;
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          this.cameraId = devices[0].id;
          this.html5QrCode = new Html5Qrcode('reader');
          this.cameraReady = false;
        }
      })
      .catch((err) => {
        // handle err
      });
  }

  startReading() {
    if (!this.cameraId && !this.cameraPermission) {
      this.askCamera();
      return;
    }

    this.reading = true;
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          this.cameraId = devices[0].id;
          this.html5QrCode = new Html5Qrcode('reader');
          this.html5QrCode
            .start(
              { facingMode: 'environment' },
              { fps: 10, qrbox: 250 },
              (decodedText, decodedResult) => {
                // do something when code is read
              },
              (errorMessage) => {
                // parse error, ignore it.
              }
            )
            .catch((err) => {
              // Start failed, handle it.
            });
        }
      })
      .catch((err) => {
        // handle err
      });

  }

  stopReading() {
    this.reading = false;
    this.html5QrCode
      .stop()
      .then((ignore) => {
        // QR Code scanning is stopped.
      })
      .catch((err) => {
        // Stop failed, handle it.
      });
  }
}
