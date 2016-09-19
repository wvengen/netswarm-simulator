NetSwarm simulator
==================

The real fun with [NetSwarm](https://github.com/wvengen/netswarm-arduino) starts when
multiple nodes begin to act on each other. This simulator gives some visual examples of
how it works, and helps running a NetSwarm network without needing the hardware.

**This isn't fully finished yet. Enjoy a basic Arduino simulator, help out to finish it, or come back later.**


Development
-----------

Start the webserver

```sh
$ npm install
$ npm start
```

and open http://localhost:8080/


Deployment
----------

Build the document root

```sh
$ npm run build
```

and copy the files in `build/` to the webserver.


License
-------

GPL version 3 or later, please see [LICENSE](LICENSE.md) for the full text.
