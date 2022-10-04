# Address-Parser
Attempts to parse a concatenated mailing address into street address, street address 2, city, state, postal code and country code (ISO2 or ISO3).

## Prerequisites

This project requires NodeJS (version 16 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
8.7.0
v16.13.1
```

## Table of contents

  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Running the app](#running-the-app)
    - [Running the tests](#running-the-tests)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/bergerinc/Address-Parser.git
$ cd Address-Parser
```

To install and set up the library, run:

```sh
$ npm install
```

## Usage

### Running the app

#### Examples

```sh
$ node parse-address.js -a "1234 Main Street*Suite 100*New York*NY*10001*USA" -d "*"
$ node parse-address.js -a "1234 Main Street,Suite 100,New York,NY,10001,USA" -d ","
$ node parse-address.js -a "1234 Main Street|Suite 100|New York|NY|10001|USA" -d "|"
```

### Running the tests

```sh
$ npm test
```

## Contributing

1.  Fork the repo.
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Bill Berger** - *Initial work* - [Bill Berger](https://github.com/bergerinc)

See also the list of [contributors](https://github.com/bergerinc/address-parser/contributors) who participated in this project.

## License

MIT License
