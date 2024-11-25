import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { LayoutComponent } from "../../../shared/components/dahsboard/layout/layout.component"; 
import Quill from 'quill'; 
@Component({ selector: 'app-media-page', 
  standalone: true, imports: [LayoutComponent, CommonModule], 
  templateUrl: './media-page.component.html', 
  styleUrls: ['./media-page.component.scss'] }) 
  
  export class MediaPageComponent implements AfterViewInit { @ViewChild('editor') 
    editorElement!: ElementRef; 
    @ViewChild('fileInput') fileInput!: ElementRef;
    quillInstance: any; 
    content: string = "";
    inputContent: string = "";
    selectedFile: File | null = null;
    fileContent: string | ArrayBuffer | null = '';
    selectedOption: string = 'Images';
    acceptTypes: string = 'image/*';

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

   console.log(formData)

    $upload.subscribe(res => {
      console.log('Images uploaded', res)

      this.theme.saveThemeInStorage(res);
    }).add(() => {
      this.loading.isLoading.set(false)
    })
  }
}
    
    ngAfterViewInit() { 
      if (this.selectedOption === 'Wysiwyg') 
        { this.initializeQuillEditor();   
      } 
    } 
    
    initializeQuillEditor() { if (this.quillInstance) { this.quillInstance = null; } setTimeout(() => { if (this.editorElement) { this.quillInstance = new Quill(this.editorElement.nativeElement, { theme: 'snow', modules: { toolbar: [ [{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['link', 'blockquote', 'code-block', 'image'], [{ list: 'ordered' }, { list: 'bullet' }] ] } }); } }, 0); }

          save() { this.content = this.quillInstance.root.innerHTML; console.log(this.content); }

          discard() { this.content = ""; this.quillInstance.root.innerHTML = ""; this.selectedFile = null; this.fileContent = null; if (this.fileInput) { this.fileInput.nativeElement.value = ""; } console.log("Content and file chooser cleared"); }

          onFileSelected(event: Event) { 
            const input = event.target as HTMLInputElement; 
            if (input.files && input.files.length > 0) { this.selectedFile = input.files[0]; 

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
              this.initializeQuillEditor(); }
              
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
                default: this.acceptTypes = '';  
              } 
            } 
          } 
