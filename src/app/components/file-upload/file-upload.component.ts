import {Component, EventEmitter, Output} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {FileUpload} from "../../interfaces/file-upload";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

    selectedFile: File | null = null;
    isUploading: boolean = false;

    constructor(private fileUploadService: FileUploadService) {
    }

    @Output()
    onFileUploaded = new EventEmitter<FileUpload>();

    onFileSelect(event: Event) {
        this.selectedFile = (event.target as HTMLInputElement).files![0];

        if (this.selectedFile) {
            const formData = new FormData();
            formData.append("file", this.selectedFile);
            this.isUploading = true;
            this.fileUploadService.upload(formData).subscribe({
                next: (response) => {
                    console.log(response);
                    this.onFileUploaded.emit(response);
                    this.isUploading = false;
                },
                error: (error) => {
                    console.log(error);
                    this.isUploading = false;
                }
            });
        }
    }
}
