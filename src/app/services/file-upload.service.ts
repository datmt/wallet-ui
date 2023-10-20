import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, shareReplay} from "rxjs";
import {FileUpload} from "../interfaces/file-upload";
import {ValueResponse} from "../interfaces/value-response";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    private FILE_API = environment.API_SERVER + 'api/files';

    constructor(private http: HttpClient) {
    }

    upload(formData: FormData): Observable<FileUpload> {
        return this.http.post(this.FILE_API, formData).pipe(shareReplay());
    }

    getFileUrl(id: string): Observable<ValueResponse> {
        return this.http.get<ValueResponse>(this.FILE_API + `/view/${id}`).pipe(shareReplay());
    }
}
