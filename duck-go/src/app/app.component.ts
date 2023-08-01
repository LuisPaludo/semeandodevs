import { Component, OnInit } from '@angular/core';
import {Html5QrcodeScanner} from "html5-qrcode";
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'duck-go';

  ngOnInit(): void {
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          var cameraId = devices[0].id;
          // .. use this to start scanning.
        }
      })
      .catch((err) => {
        // handle err
      });

      let html5Qrcode = new Html5Qrcode('reader');
  }

  // qrCodeScanner() {
  //   // this.html5Qrcode.
  //   return
  // }
}
