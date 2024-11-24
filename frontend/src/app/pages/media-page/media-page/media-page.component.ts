import { Component, inject } from '@angular/core';
import { LayoutComponent } from "../../../shared/components/dahsboard/layout/layout.component";
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../shared/components/loading/loading.service';

@Component({
  selector: 'app-media-page',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './media-page.component.html',
  styleUrl: './media-page.component.scss'
})
export class MediaPageComponent {
  _http: HttpClient = inject(HttpClient)
  loading = inject(LoadingService)

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

   console.log(formData)

    $upload.subscribe(res => {
      console.log('Images uploaded', res)
    }).add(() => {
      this.loading.isLoading.set(false)
    })
  }
}
