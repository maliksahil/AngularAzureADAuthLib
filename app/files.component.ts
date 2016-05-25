import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {Authenticator} from '../ng2ADAL/Authenticator';
import {AuthenticatedHttpService} from '../ng2ADAL/AuthenticatedHttpService';

@Component({
    selector: "files",
    templateUrl: "./app/files.component.html"
})

export class FilesComponent {
    private files = [];
    constructor(private _authenticator:Authenticator, private _http:AuthenticatedHttpService) { 
    }

    getFiles() {
        this._http.get("https://graph.microsoft.com/v1.0/me/drive/root/children").then((files:any) => { 
            this.files = files.value; 
        })
    }
}