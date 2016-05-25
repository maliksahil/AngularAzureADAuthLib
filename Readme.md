## Angular2 ADAL (Active Directory Authentication Library)
*This is an unofficial, not written by Microsoft, but open source authentication library for Angular 2 that lets you authenticate with AzureAD, and tap into Office 365 APIs or other AzureAD protected APIs*
*The code has been written so this could be easily enhanced to support other auth providers (such as ADFS3/Google etc.)*

To use,
1. Register a native client app in Azure AD and enable OAuth2 implicit flow.
2. Pass in the constants in app.component.ts (intentionally sent from app since the library shouldn't have these hardcoded in them).
3. Run npm install
4. Run npm start

When the app launches, it should look like this - 
![Launch](/screenshots/signin.png)

Click the "Sign in, and it should look like -
![Launch](/screenshots/signedin.png)

At this point, you have an access token, which you can see in the local storage of the browser.
Also, the library adds a hidden IFrame to renew the access token 5 mins before it expires. This is automatic, you don't have to worry about it.

Note: Since this is a multi-tenant app, and it is (as of now) registered in my tenancy, just changing the tenancy will also also ask for consent to your tenancy (so you can distribute this app via appstores etc.)

Now you can click on the "Get Files" button, and it will automatically add the access token in the header of your request, and the request should succeed.
In order to do so, use the "AuthenticatedHttpService" which is also part of this library.

If you click on Get Files without signing in, or for some reason the access token has expired (library renews it so it should never happen), it will prompt the user to sign in.

And the running app looks like this -- (yeah I know basic, and my UX sucks, but shows the concept, doesn't it?) :-)
![Launch](/screenshots/getfiles.png)

Credits:
This app uses the following component:
    1. AngularJS2 www.angularjs.org
    2. Typescript typescriptlang.org
    3. JWT token decoder from auth0