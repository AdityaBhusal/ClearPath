import { Component, OnInit } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/ng';

// Cloudinary's upload widget is provided by a runtime script which attaches
// a `cloudinary` global to `window`. Tell TypeScript about it so the compiler
// doesn't error when we reference `cloudinary`.
declare const cloudinary: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CloudinaryModule],
  templateUrl: './app.html',
  styleUrls: ['./app.sass'] // Corrected this to styleUrls
})
export class AppComponent implements OnInit {
  cloudName = 'dcqrzfyjk'; // Replace with your Cloudinary cloud name
  uploadPreset = 'ProfilePreset'; // Replace with your upload preset
  imageUrl: string | null = null;
  myWidget: any;

ngOnInit(): void {
  alert('ngOnInit called');
}

  onFileSelected(event : any){
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    
    fetch('https://api.cloudinary.com/v1_1/' + this.cloudName + '/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.imageUrl = data.secure_url;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  // ngOnInit() {
  //   this.myWidget = cloudinary.createUploadWidget(
  //     {
  //       cloudName: this.cloudName,
  //       uploadPreset: this.uploadPreset
  //     },
  //     (error: any, result: any) => {
  //       if (!error && result && result.event === 'success') {
  //         console.log('Done! Here is the image info: ', result.info);
  //         this.imageUrl = result.info.secure_url; // Store the image URL
  //       }
  //     }
  //   );
  // }

  // openWidget() {
  //   if (!this.myWidget) {
  //     alert('Upload widget is not ready yet.');
  //     return;
  //   }

  //   alert('Upload widget opened');
  //   this.myWidget.open(); // Open the upload widget
  // }
}
