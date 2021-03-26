# Plutus Finance

|                                                 Docker Build Status                                             |
| :-------------------------------------------------------------------------------------------------------------: |
| ![build](https://github.com/icatalin201/plutus-frontend/workflows/Docker%20Image%20CI/badge.svg?branch=master)  |


## Overview

This is an angular web client [Plutus Finance](https://github.com/icatalin201/plutus-backend). It consumes the api data and display it using the dashboard charts and a few tables.

### Contents

The application is splited into few modules:

- core - Contains all the main services and guards which will be used inside the entire application.
- features - These are all the application main features, which are also treated as pages inside the routing mechanism.
- shared - Contains the common components and models used inside the application. 

The application routing mechanism uses the following paths:

- `/portal/login` - Login page
- `/portal/dashboard` - Dashboard page where a few charts are rendered
- `/portal/partners` - Partners page where you can create/update/delete and see partners
- `/portal/items` - Items page where you can create/update/delete and see items
- `/portal/invoices` - Invoices page where you can collect/create/update/delete and see invoices
- `/portal/transactions` - Transactions page where you can collect/create/update/delete and see transactions

## Setup

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Version

Currently, the application is at version `1.0.0`.

## License

```
 Copyright 2021 Catalin Matache

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```