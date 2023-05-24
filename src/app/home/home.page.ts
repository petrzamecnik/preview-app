import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PhotoService} from "../services/photo.service";
import {CapOcr} from "cap-ocr";
// import {CapOcr} from "../../../../cap-ocr";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result$ = new BehaviorSubject('placeholder ...');
  imageBase64$ = new BehaviorSubject('');
  isLoading$ = new BehaviorSubject(false);

  public placeholderImage = 'https://placehold.jp/200x150.png';


  constructor(private _photoService: PhotoService) {
  }

  async chooseImage() {
    const image = await this._photoService.pickImageBase64();
    this.getText(image);
  }

  async captureImage() {
    const image = await this._photoService.captureImageBase64();
    this.getText(image);
  }

  getText(image: string | undefined) {
    if (image) {
      this.imageBase64$.next(this.addBase64Prefix(image));

      this.isLoading$.next(true);
      CapOcr.detectText({imageBase64: image})
        .then((result: any) => {
          if (result) {
            const extractedText = result.value;
            console.log('extracted text: ', extractedText);
            this.result$.next(extractedText);
            this.isLoading$.next(false);
          }
        })

      // CapOcr.detectData({imageBase64: image})
      //   .then((result: any) => {
      //     const data = JSON.parse(result.value);
      //     console.log(data);
      //   })
    }
  }

  addBase64Prefix(image: string) {
    return 'data:image/jpeg;base64,' + image;
  }
}
