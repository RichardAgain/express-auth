import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/dahsboard/layout/layout.component';
import Quill from 'quill';
import { ImagesSelectComponent } from "./images-select/images-select.component";
import { VideoSelectComponent } from "./video-select/video-select.component";
import { CaptionsSelectComponent } from "./captions-select/captions-select.component";
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { ThemeService } from '../../shared/services/theme.service';
import { DocumentSelectComponent } from "./document-select/document-select.component";
@Component({
  selector: 'app-media-page',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ImagesSelectComponent, VideoSelectComponent, CaptionsSelectComponent, DocumentSelectComponent],
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss'],
})
export class MediaPageComponent implements AfterViewInit {
  @ViewChild('editor')
  editorElement!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  quillInstance: any;
  content: string = '';
  inputContent: string = '';
  selectedFile: File | null = null;
  fileContent: string | ArrayBuffer | null = '';
  selectedOption: string = 'Images';
  acceptTypes: string = 'image/*';

  _http = inject(HttpClient);
  _loading = inject(LoadingService);
  _theme = inject(ThemeService);

  ngAfterViewInit() {
    if (this.selectedOption === 'Wysiwyg') {
      this.initializeQuillEditor();
    }
  }

  initializeQuillEditor() {
    if (this.quillInstance) {
      this.quillInstance = null;
    }
    setTimeout(() => {
      if (this.editorElement) {
        this.quillInstance = new Quill(this.editorElement.nativeElement, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'blockquote', 'code-block', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          },
        });
      }
    }, 1);
  }

  save() {
    this._loading.isLoading.set(true)
    this.content = this.quillInstance.root.innerHTML;

    const $update = this._http.patch('api/media/wysiwyg', { content: this.content })

    $update.subscribe(res => {
      console.log('Content saved', res)

      this._theme.saveThemeInStorage(res);
    }).add(() => {
      this._loading.isLoading.set(false)
    })
  }

  discard() {
    this.content = '';
    this.quillInstance.root.innerHTML = '';
    this.selectedFile = null;
    this.fileContent = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    console.log('Content and file chooser cleared');
  }

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

  onOptionChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedOption = select.value;
    if (this.selectedOption === 'Wysiwyg') {
      this.initializeQuillEditor();
    }

    switch (this.selectedOption) {
      case 'Images':
        this.acceptTypes = 'image/jpeg, image/png';
        break;
      case 'PDF':
        this.acceptTypes = 'application/pdf';
        break;
      case 'Audio':
        this.acceptTypes = 'audio/*';
        break;
      case 'Video':
        this.acceptTypes = 'video/*';
        break;
      default:
        this.acceptTypes = '';
    }
  }
}
