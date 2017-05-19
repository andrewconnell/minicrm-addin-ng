# MinicrmAddinNg

explain the following:
- how it works
  - addin pulls names from email body
  - sends to REST API for matches
  - displays machtes
- REST API = Northwind hosted on OData.org
  - can't use it because office addins must be SSL
  - Northwind = HTTP only
  - created local REST API hosted SSL
  - self hosted SSL
    - trick is creating the ssl cert & adding to trusted root authority...check my blog on how to do this with MacOS & Chrome
  - of course this could just as easily be hosted in an Azure Function / AWS Lambda function / etc... but i wanted to have a very easy "stand up & work"
- this means the angular app must also be SSL
- using docker to make this easier
  - one container for VorlonJS - WHY?
  - one container for the REST API
  - one container for the angular addin

## Demo Script:

### create project 

```shell
# from within the root repo folder...
ng new minicrm-addin-ng 
  --skip-install 
  --skip-tests 
  --skip-git 
  --style scss
# install everything
yarn
```

run as https & demo

```shell
ng serve
# open browser to http://localhost:4200
```

need ssl... use same certs from **minicrm-api** project:

```shell
ng serve --ssl 
  --ssl-key "../minicrm-api/src/ssl/localhost.andrewconnell.key.pem" 
  --ssl-cert "../minicrm-api/src/ssl/localhost.andrewconnell.cert.pem"
```

### create a customer module

```shell
ng generate module customer
```

import it into the rest of the application

```typescript
// src/app/app.module.ts

import { CustomerModule } from "./customer/customer.module";
//..
@NgModule({
  //..
  imports: [
    //..
    CustomerModule
  ],
  //..
})
export class AppModule { }
```

### create customer list component

```shell
ng generate component customer/customer-list -m customer/customer.module --spec false
```

update app to show the list:

```
<!-- app.component.html -->
<app-customer-list></app-customer-list>
```

### add office ui fabric 2.6.3

- explain why not using v7 of office ui fabric core / js

```shell
npm install --save office-ui-fabric
```

update angular CLI to include office ui fabric

```json
# src/.angular-cli.json
{
  //..
  "apps": [
    {
      //..
      "styles": [
        "styles.scss",
        "../node_modules/office-ui-fabric/dist/css/fabric.min.css",
        "../node_modules/office-ui-fabric/dist/css/fabric.components.min.css"
      ],
//..
```

update the list component UX

```html
<!-- src/app/customer/customer-list/customer-list.component.html -->
<div id="addinHeading"
     class="ms-font-xl ms-bgColor-themePrimary ms-fontColor-white">
  <div>Possible customers found in this email...</div>
</div>

<p>
  customer-list works!
</p>
```

### make it work in outlook

add following to project:
- add app icon (`src/assets/app-icon.png`)
- app manifest (`src/assets/app.xml`)
  - examine and make sure URL for homepage & icon is correct

install in outlook
- login to https://mail.office365.com
- select **COG** => **Manage Integrations**
- select **Click here to add a custom add-in**

show it in an email... but notice it isn't working. why? explain

because need to bootstrap to office client first, then angular

add reference to `office.js`:

```html
<!-- src/index.html -->
<!-- .. -->
<head>
  <!-- .. -->
  <script src="https://appsforoffice.microsoft.com/lib/1/hosted/Office.js" type="application/javascript"></script>
</head>
<!-- .. -->
```

```shell
npm install --save-dev @types/office-js
```
