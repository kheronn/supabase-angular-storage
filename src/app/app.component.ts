import { Component, OnInit } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  message: string;
  status: boolean;
  bucket: string;

  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    this.checkBucketExists();
    this.message = null;
    this.status = false;
  }

  checkBucketExists() {
    this.storageService.getBucket().then((data) => {
      if (!data.data) {
        this.storageService.createBucket().then((data) => {
          if (data.error) {
            console.log(`Erro at create bucket: ${data.error.message}`);
          } else {
            console.log('create bucket photos');
            this.bucket = data.data.name;
          }
        });
      } else {
        this.bucket = data.data.name;
        console.log(`bucket ${this.bucket} exists.`);
      }
    });
  }

  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length == 0) {
      this.message = 'You must select an image to upload.';
      return;
    }

    this.status = true;
    const file: File = input.files[0];
    const name = file.name.replace(/ /g, '');
    
    this.storageService.upload(this.bucket, name, file).then((data) => {
      if (data.error) {
        this.message = `Error send message ${data.error.message}`;
      } else {
        console.log(data.data);
        this.message = `File ${file.name} uploaded with success!`;
      }
      this.status = false;
    });
  }
}
