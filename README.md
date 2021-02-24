# grc-ui [![Build Status](https://travis-ci.com/open-cluster-management/grc-ui.svg?token=1xoYGv8XzWhB2heDk2My&branch=master)](https://travis-ci.com/open-cluster-management/grc-ui)

The UI microservice, `grc-ui`, is the governance and risk dashboard for Red Hat Advanced Cluster Management.

## Design

The UI Platform is developed as an isomorphic react application. View the list of major components that are used to build this service:

* NodeJS
* Express
* React
* Handlebars
* Redux
* Webpack
* Babel
* Apollo/GraphQL
* IBM Carbon Design System
* RedHat PatternFly
* Jest
* Nightwatch


## Build

- Install the modules

   ```bash
   npm install
   ```
- Build the project

   ```bash
      npm run build
   or npm run build:watch
   or npm run build:production
   ```

## Run installation

1. The following environment variables need to be set to point to a running Openshift cluster. Your environment might resemble the following content:

   ```json
   {
      "NODE_ENV": "development",
      "headerUrl": "<url-to-rhacm-console>",
      "API_SERVER_URL": "<url-to-openshift-apiserver>",
      "SERVICEACCT_TOKEN": "<openshift-token-to-authenticate>",
      "OAUTH2_CLIENT_ID": "multicloudingress",
      "OAUTH2_CLIENT_SECRET": "multicloudingresssecret",
      "OAUTH2_REDIRECT_URL": "https://localhost:3000/multicloud/policies/auth/callback",
   }
   ```

   The `SERVICEACCT_TOKEN` expires so if you need to get a new one:
   - From the UI...
      - Go to the RHACM Hub, enter the Hub login info, and hit “configure client” from the menu in the top right
   - With the CLI...
      - Login to the RHACM Hub with `oc` using the API Server URL and run
      
         ```bash
         oc whoami -t
         ```

2. Start the server for production by running the following command:

   ```bash
   npm run start:production
   ```

3. Start the server for development by running the following commands:

   ```bash
   npm run build:watch
   npm run start
   ```

5.Open a browser to `https://localhost:3000/multicloud/policies` and log in using your cluster admin credentials.

## Testing

### Unit Tests

Run the following command to start all unit tests (run through Jest):

```bash
npm run test:unit
```

### E2E Tests

**Note**: To run E2E tests, you'll need to install `chromedriver` before the first run or the test run will fail immediately:

```bash
npm install chromedriver
```
### Cypress Tests
**Note**: To run Cypress tests, you'll need to add necessary values in `cypressEnvConfig.yaml` file. e.g. `multicloud-console.apps.{BASE_DOMAIN}`.

**Note**: It is required that the UI runs locally or can target a remote cluster to start the selenium based tests.

1. The RBAC tests require a set of users to exist in the remote cluster. To set up these users, first log in to your remote cluster. Decide on a password you'd like to use for these users. Then, from the `grc-ui` folder, run these commands (the script will also export `SELENIUM_USER`, `SELENIUM_PASSWORD`, and `SELENIUM_USER_SELECT` to match the RBAC users and use in place of `kubeadmin`):

   ```bash
   export RBAC_PASS=<your-rbac-password>
   ./build/rbac-setup.sh
   ```

   Alternatively, you can set `DISABLE_CANARY_TEST` to `true` to disable tests that would fail in the canaries like RBAC.

   For reference, the following users will be created:

   | USER | ACCESS | ROLE |
   | --- | --- | --- |
   | e2e-cluster-admin-cluster | Cluster | cluster-admin |
   | e2e-admin-cluster | Cluster | admin |
   | e2e-edit-cluster | Cluster | edit |
   | e2e-view-cluster | Cluster | view |
   | e2e-group-cluster | Cluster | view |
   | e2e-cluster-admin-ns | Namespace | cluster-admin for `e2e-rbac-test-1` |
   | e2e-admin-ns | Namespace | admin for `e2e-rbac-test-1`</br>view for `e2e-rbac-test-2` |
   | e2e-edit-ns | Namespace | edit for `e2e-rbac-test-1` |
   | e2e-view-ns | Namespace | view for `e2e-rbac-test-1` |
   | e2e-group-ns | Namespace | view for `e2e-rbac-test-1` |

2. Before you run any end-to-end (e2e) test, make sure the environment parameters `selenium_user` and `selenium_password` are set. If they are not set you can re-run the `rbac-setup.sh` script or to use the `kubeadmin` user, run the following commands:

   ```bash
   export SELENIUM_USER=UI_USERNAME
   export SELENIUM_PASSWORD=UI_PASSWORD
   ```

3. **Optional**: By default, e2e test runs against https://localhost:3000. You can run e2e test against a specific remote cluster. Set the environment parameter, `SELENIUM_CLUSTER` by running the following command:

   ```bash
   export SELENIUM_CLUSTER=https://target.base.url
   ```

4. Run the following command to start the e2e test:

   ```bash
   npm run test:e2e
   ```

   To run the tests headless (i.e. with the browser running in the background):

   ```bash
   npm run test:e2e-headless
   ```


## NPM Commands

View the full list of npm scripts that are described in the following table:

| Command                          | Description                                                                                                                      |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `npm start`                      | Starts the application with NODE_ENV='development'.                                                                               |
| `npm test:unit`                  | Runs jest tests.                                                                                                                |
| `npm run test:cypress`            | Cypress headed or GUI based test with Chrome browser.|
| `npm test:update-snapshot`       | Updates snapshots for jest tests. This command should only be used if you have made changes to a component that requires an updated snapshot artifact for a test case.|
| `npm test:update-a11ySnap`       | Updates snapshots for automated a11y test in e2e test. To update a11y test snapshot, first run `npm run test:e2e` locally, then run this command to update files. Only update a11y snapshot when you make changes and make sure those a11y issues can't be fixed on our side.|
| `npm test:e2e`                   | Runs nightwatch e2e tests. |
| `npm test:e2e-headless`          | Runs nightwatch e2e tests with headless browser (i.e. browser runs in the background). |
| `npm run start:production`       | Starts the application with NODE_ENV='production'.                                                                                |
| `npm run clean`                  | Deletes the generated files from public folder.                                                                                  |
| `npm run build`                  | Does a FULL development build.  (caching disabled and dev source maps)                                                           |
| `npm run build:production`       | Does a FULL production build.                                                                                                    |
| `npm run build:watch`            | Does a build of application code (w/o the DLL generation) and continues to run in the background watching for changes.            |
| `npm run build:dll`              | Only re-builds the the vendor library component.                                                                                 |
| `npm run test:install-selenium`  | Install selenium standalone for running UI tests locally. Automatically invoked when you run `npm run test:e2e`.                        |
| `npm run lint`                   | Runs linting on the code base.                                                                                                   |
| `npm run lint:fix`               | Attempts to fix any linting errors automatically.                                                                                |
| `npm run shrinkwrap:clean`       | Regenerates a clean `npm-shrinkwrap.json` - THIS COMMAND SHOULD ONLY BE USED IN EXTREME CIRCUMSTANCES.                           |

  **Note**: The build process leverages the Dll and DllReference plugins to extract vendor plugins for faster build times and improve browser caching.  A separate bundle is created for 3rd-party client-side libraries.  The generated bundle is sourced (_public/dll.vendor.js_) along with its manifest (_vendor-manifest.json_).  If new client dependencies are added or existing versions of dependencies are updated, this module needs to be regenerated and recommitted back into source control. Run the following command  `npm run build:dll`.

## Links

These are a few useful links that provide technical reference and best practices when developing for the platform.

- [Carbon Components](https://github.com/carbon-design-system/carbon-components)
- [Carbon React Components](https://github.com/carbon-design-system/carbon-components-react)
- [Patternfly](https://www.patternfly.org/v4/)
- [Webpack](https://webpack.js.org)
- [React Docs](https://facebook.github.io/react/docs/hello-world.html)
- [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
- [Redux](http://redux.js.org)
- [Structuring Redux State](https://hackernoon.com/avoiding-accidental-complexity-when-structuring-your-app-state-6e6d22ad5e2a)
- [React Best Practices](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)
- [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Redux Best Practices](https://medium.com/@kylpo/redux-best-practices-eef55a20cc72)

<!---
Date: Feb/17/2021
-->

