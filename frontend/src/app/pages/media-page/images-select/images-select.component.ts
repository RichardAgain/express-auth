import { Component, inject } from '@angular/core';
import { LayoutComponent } from "../../../shared/components/dahsboard/layout/layout.component";
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../shared/components/loading/loading.service';
import { ButtonPrimaryComponent } from "../../../shared/components/buttons/button-primary/button-primary.component";
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-images-select',
  standalone: true,
  imports: [ButtonPrimaryComponent],
  templateUrl: './images-select.component.html',
})
export class ImagesSelectComponent {
  _http: HttpClient = inject(HttpClient)
  loading = inject(LoadingService)
  theme = inject(ThemeService)

  images: File[] = []
  imagesSrc: string[] = []

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.images.push(file)
    }

    this.imagesSrc = this.images.map(image => URL.createObjectURL(image))
  }

  onImagesSubmit = () => {
    this.loading.isLoading.set(true)
    const formData = new FormData()

    this.images.forEach((image, index) => {
      const newFileName = `image-${index}`;
      const newFile = new File([image], newFileName, { type: image.type });

      formData.append(`images`, newFile)
    })

   const $upload = this._http.patch('api/media/carousel', formData)

    $upload.subscribe(res => {
      console.log('Images uploaded', res)

      this.theme.saveThemeInStorage(res);
    }).add(() => {
      this.loading.isLoading.set(false)
    })
  }
}