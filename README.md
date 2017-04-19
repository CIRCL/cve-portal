![logo](./app/static/logo/logo-circl-CVEPORT.png?raw=true "cve-portal")

cve-portal Common Vulnerabilities and Exposures - Portal

Installation
============

`./install.sh` (install package and dependencies)

`cd config; cp config.cfg.sample config.cfg` (copy the sample configuration)

Change the configuration with your settings in config.cfg.

Activate the Python virtual env `cd app; . ./virtenv/bin/activate`

`python create.py` (tables creation and populating db)

`./LAUNCH.sh` (Run the flask server)

The first user to register will be the administrator. Please be careful
that the email for the administrator should be match the one in the configuration
under the category [ADMIN].

macOS Sierra
============

You want to install the openssl libraries via [homebrew](https://brew.sh/)

```
brew install openssl
```

Once installed, flask-scrypt installs as such with LDFLAGS/CFLAGS.

```
env LDFLAGS="-L$(brew --prefix openssl)/lib" CFLAGS="-I$(brew --prefix openssl)/include" pip install flask-scrypt
```

Requirements
============

cve-portal requires [cve-search](https://github.com/adulau/cve-search) to be installed
for the CVE (Common Vulnerabilities and Exposures) and CPE (Common Platform Enumeration) back-end.

The installationscript will install the following packages on your system
 * python-mysqldb
 * libmysqlclient-dev
 * python-dev
 * unzip
 * python-virtualenv
 * git
 * libssl-dev

The pip requirements.txt script will install the following packages on your system
 * flask
 * flask-bootstrap
 * flask-wtf
 * flask-login
 * flask-SQLAlchemy
 * mysql-python
 * flask-script
 * flask-mail
 * flask-scrypt
 * https://github.com/isislovecruft/python-gnupg.git
 * redis
 * flask-pymongo
 * whoosh
 * gunicorn

License
=======


```
    Copyright (C) 2014 Jules Debra
    Copyright (C) 2014 Raphaël Vinot
    Copyright (C) 2014 Alexandre Dulaunoy
    Copyright (C) 2014 CIRCL - Computer Incident Response Center Luxembourg (c/o smile, security made in Lëtzebuerg, Groupement d'Intérêt Economique)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
```



