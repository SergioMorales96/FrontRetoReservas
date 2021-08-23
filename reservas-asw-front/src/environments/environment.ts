// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://localhost:8089/api/v1',
  baseUrl: 'http://192.168.3.6:8089/api/v1',
  assetsUrl: 'assets/',
  autenticacion: {
    clientId: '473482fb-2ddd-44f1-8332-7185bb10b914',
    authority: 'https://login.microsoftonline.com/bf208dcb-97e8-4d43-bd72-323680bef25c',
    redirectUri: 'http://localhost:4200/',
  }
};

export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
