import {Component, provide} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import {Authenticator} from '../ng2ADAL/Authenticator';
import {ServiceConstants, AuthHelperBase} from '../ng2ADAL/AuthHelperBase';
import {AzureADAuthHelper} from '../ng2ADAL/AzureADAuthHelper';
import {AuthenticatedHttpService} from '../ng2ADAL/AuthenticatedHttpService';

import {FilesComponent} from './files.component'

var azureADAuthHelper = new AzureADAuthHelper(new ServiceConstants("1c623fa4-c6c8-4903-a6aa-67c5ba9a1535", "winsmartsdev.onmicrosoft.com", "http://localhost:3000"));
var authenticator = new Authenticator(azureADAuthHelper);

let authFactory = () => {return authenticator;}

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    providers:[Http, HTTP_PROVIDERS, AuthenticatedHttpService, provide(Authenticator, { useFactory: authFactory })],
    directives:[FilesComponent]
})

export class AppComponent {
    private isUserAuthenticated:boolean = false;
        
    constructor(private _authenticator:Authenticator, private _authenticatedHttpService:AuthenticatedHttpService) {
        this.isUserAuthenticated = _authenticator.isUserAuthenticated();
    }
    
    logIn() {
        this._authenticator.logIn(window.location.href);
    }
    
    logOut() {
        this._authenticator.logOut(window.location.href);
    }
}