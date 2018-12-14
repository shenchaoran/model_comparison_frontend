import { User } from '@models';
import { UserService } from '@services';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { get } from 'lodash';
export interface DialogData {
  selectedImg: string;
  imageChangedEvent: any;
}

@Component({
  selector: 'ogms-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  settingsFG: FormGroup;
  selectedImg: any;
  croppedImg: string ='';
  imageChangedEvent: any = '';
  onRequest: boolean = false;
  user: User; 
  errorInfo: {
    show: boolean,
    message?: string
  } = {
      show: false
    }

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.user = this.service.user;

    this.settingsFG = this.fb.group({
      id: [get(this.service, 'jwt.user._id')],
      url: [''],
      group: [''],
      location: [''],
      file: ['']
    })
  }

  onSubmit() {
    this.onRequest = true;
    this.errorInfo = { show: false };
    this.settingsFG.value.file = this.croppedImg;
    var settingsData = this.settingsFG.value;
    console.log(settingsData);
    if (settingsData.url === '' && settingsData.group === '' && settingsData.location === '' && settingsData.file === '') {
      this.errorInfo = {
        show: true,
        message: "You haven't update anything"
      };
      this.onRequest = false;
    } else {
      this.service.setUp(settingsData)
        .subscribe({
          next: res => {
            if (res.error) {
              this.errorInfo = {
                show: true,
                message: res.error.desc
              };
              this.onRequest = false;
            }
          },
          error: e => {
            this.onRequest = false;
            console.log(e);
          }
        })
    }
  }

  onFileChange(event) {
    this.errorInfo = { show: false };
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      var fileSize = file.size;
      console.log('fileSize:' + fileSize);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.cd.markForCheck();
        this.selectedImg = reader.result;
        console.log("selectedImg:" + this.selectedImg);
        //判断图片大小  小于1M
        if (fileSize > 1024 * 1000) {
          this.errorInfo = {
            show: true,
            message: "Please upload a picture smaller than 1MB"
          };
        } else {
          this.openDialog();
        }

      }
    }
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(CropDialog, {
      width: '500px',
      data: { selectedImg: this.selectedImg, imageChangedEvent: this.imageChangedEvent }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.croppedImg = result; 
    });
  }

}

@Component({
  selector: 'crop-dialog',
  templateUrl: './crop-dialog.html'
})
export class CropDialog {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;

  constructor(
    public dialogRef: MatDialogRef<CropDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.imageChangedEvent = data.imageChangedEvent;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("cropped:" + this.croppedImage);
  }

  imageLoaded() {
    this.cropperReady = true;
  }

  loadImageFailed() {
    console.log('Load failed');
  }
}
