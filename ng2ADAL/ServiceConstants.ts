import { Injectable } from '@angular/core';

@Injectable()
export class ServiceConstants {
    constructor(public clientID:string, public tenantID:string, public redirectURL:string, public graphResource = "https://graph.microsoft.com") {}
} 