# ng2-workshop
This is the repo for the Angular 2 workshop @omegapoint.
In order to install and run the application you need Node and NPM installed.
<br>
The project uses jspm and systemJS, jspm is a package/build manager and 
systemJS is a module loader for ES6/TypeScript.
## Prerequisites:
<ul>
  <li>
  Node: >= 4.x
  </li>
  <li>
  Npm: >= 2.x
  </li>
  <li>
    Browser with decent devtools, chrome is recommended. 
    (this setup has been tested with chrome and safari)
  </li>
</ul>
## Instruction for setup:
Run the following command:
<pre>
npm run setup
</pre>
The setup script downloads dependencies and configures systemJS mappings.
We can now start the application by running:
<pre>
npm start
</pre>
This starts a simple web server with chokidar-socket-emitter enabled, the emitter will emit events every
time a file is changed, deleted or added.
<br>
Index.html contains a script which configures systemjs-hot-reloader, the reloader will reload the angular components when needed.

## running tests
The project is configured with the karma test runner and karma-uiuxengineering-jspm, which adds jspm support to karma.
Tests are added to the test runner if a file ends with spec.ts.
<br>
Run the following command:
<pre>
npm test
</pre>

## building the application
JSPM is also used to build the application, the build script applies
tree-shaking with rollup.js and produces a js file in UMD format.
<br>
Build the application by running:
<pre>
npm run build
</pre>
The script creates a build directory containing a index.html with no
dependencies to systemJS, ES6 or TypeScript.
<br>
If you install the npm package http-server globally you can start up the application in the build directory by running:
<pre>
http-server -p {portnumber} -o
</pre> 
