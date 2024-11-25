import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../shared/components/buttons/button-primary/button-primary.component";
import { LoadingService } from '../../../shared/components/loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-captions-select',
  standalone: true,
  imports: [ButtonPrimaryComponent],
  templateUrl: './captions-select.component.html',
})
export class CaptionsSelectComponent {
  loading = inject(LoadingService)
  _http: HttpClient = inject(HttpClient)
  theme = inject(ThemeService)


  selectedFile: File | null = null;
  fileContent: string | ArrayBuffer | null = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCaptionsSumbit () {
    this.loading.isLoading.set(true)
    const formData = new FormData()

    // this.images.forEach((image, index) => {
    //   const newFileName = `image-${index}`;
    //   const newFile = new File([image], newFileName, { type: image.type });

    // })

    formData.append(`captions`, this.selectedFile as Blob)

   const $upload = this._http.patch('api/media/captions', formData)

   console.log(formData)

    $upload.subscribe(res => {
      console.log('Captions uploaded', res)

      this.theme.saveThemeInStorage(res);
    }).add(() => {
      this.loading.isLoading.set(false)
    })
  };

}
