import {Component, Input, SimpleChange} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";

@Component({
    selector: 'app-file-view',
    templateUrl: './file-view.component.html',
    styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent {

    isLoading: boolean = false;

    @Input()
    imageId: string = '';

    imageUrl: string = '';

    constructor(private fileUploadService: FileUploadService) {

    }

    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        let change: SimpleChange = changes['imageId'];

        if (change) {
            this.isLoading = true;
            this.fileUploadService.getFileUrl(this.imageId).subscribe({
                next: (response) => {
                    console.log(response)
                    this.imageUrl = response.value;
                    this.isLoading = false;
                },
                error: (err) => {
                    console.log(err);
                    this.isLoading = false;
                }
            });
        }

    }
}
