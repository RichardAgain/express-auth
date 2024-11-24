import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core'; 
import { LayoutComponent } from "../../../shared/components/dahsboard/layout/layout.component"; 
import Quill from 'quill'; 
@Component({ selector: 'app-media-page', 
  standalone: true, imports: [LayoutComponent], 
  templateUrl: './media-page.component.html', 
  styleUrls: ['./media-page.component.scss'] }) 
  export class MediaPageComponent implements AfterViewInit { @ViewChild('editor') 
    editorElement!: ElementRef; 
    quillInstance: any; 
    content: string = "";
    ngAfterViewInit() { this.quillInstance = new Quill(this.editorElement.nativeElement, 
      { theme: 'snow', 
        modules: { toolbar: [ [
          { header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['link', 'blockquote', 'code-block', 'image'], [{ list: 'ordered' }, { list: 'bullet' }] ] } }); }
          save() { this.content = this.quillInstance.root.innerHTML; console.log(this.content); }
        }
          