SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.15",
      "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.6.0",
      "ts": "github:frankwallis/plugin-typescript@5.1.2",
      "text": "github:systemjs/plugin-text@0.0.9",
      "font-awesome": "npm:font-awesome@4.6.3"
    },
    "packages": {
      "github:capaj/systemjs-hot-reloader@0.6.0": {
        "map": {
          "debug": "npm:debug@2.2.0",
          "socket.io-client": "github:socketio/socket.io-client@1.4.8",
          "weakee": "npm:weakee@1.0.0"
        }
      },
      "npm:debug@2.2.0": {
        "map": {
          "ms": "npm:ms@0.7.1"
        }
      },
      "npm:font-awesome@4.6.3": {
        "map": {
          "css": "github:systemjs/plugin-css@0.1.30"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  typescriptOptions: {
    "module": "es6",
    "target": "es6",
    "typeCheck": true,
    "tsconfig": true,
    "typings": {
      "@angular/core": "index.d.ts",
      "@angular/common": "index.d.ts",
      "@angular/compiler": "index.d.ts",
      "@angular/platform-browser": "index.d.ts",
      "@angular/platform-browser-dynamic": "index.d.ts",
      "@angular/forms": "index.d.ts",
      "@angular/http": "index.d.ts",
      "@angular/router": "index.d.ts",
      "rxjs": "Rx.d.ts",
      "ng2-bootstrap": "ng2-bootstrap.d.ts",
      "angular2-in-memory-web-api": "index.d.ts",
      "json-typescript-mapper": "index.d.ts",
      "typescript-collections": "dist/lib/index.d.ts",
      "moment": "moment.d.ts"
    }
  },
  packages: {
    "app": {
      "main": "bootstrap",
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "ts"
        },
        "*.css": {
          "loader": "css"
        },
        "*.html": {
          "loader": "text"
        },
        "*.scss": {
          "loader": "scss"
        }
      },
      "map": {
        "./environments/environment.ts": {
          "~production": "./environments/environment-dev.ts"
        },
        "json-typescript-mapper/index.d.ts": "./utils/json-typescript-mapper/index.d.ts"
      }
    },
    "npm:babel-runtime@5.8.38": {
      "map": {}
    }
  },
  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "plugin-babel-runtime": "npm:babel-runtime@5.8.38",
    "ts-runtime": "npm:babel-runtime@5.8.38"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "moment": "npm:moment@2.15.1",
    "es6-shim": "github:es-shims/es6-shim@0.35.1",
    "@angular/router": "npm:@angular/router@3.0.1",
    "json-typescript-mapper": "npm:json-typescript-mapper@1.0.5",
    "angular2-in-memory-web-api": "npm:angular2-in-memory-web-api@0.0.21",
    "@angular/http": "npm:@angular/http@2.0.1",
    "ng2-bootstrap": "npm:ng2-bootstrap@1.1.14",
    "@angular/forms": "npm:@angular/forms@2.0.1",
    "scss": "github:mobilexag/plugin-sass@0.4.6",
    "bootstrap-sass": "npm:bootstrap-sass@3.3.7",
    "@angular/common": "npm:@angular/common@2.0.1",
    "@angular/compiler": "npm:@angular/compiler@2.0.1",
    "@angular/core": "npm:@angular/core@2.0.1",
    "@angular/platform-browser": "npm:@angular/platform-browser@2.0.1",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@2.0.1",
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "frankwallis/plugin-typescript": "github:frankwallis/plugin-typescript@5.1.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.0",
    "module": "npm:jspm-nodelibs-module@0.2.0",
    "net": "npm:jspm-nodelibs-net@0.2.0",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.0",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "reflect-metadata": "npm:reflect-metadata@0.1.8",
    "rxjs": "npm:rxjs@5.0.0-beta.12",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "timers": "npm:jspm-nodelibs-timers@0.2.0",
    "tty": "npm:jspm-nodelibs-tty@0.2.0",
    "typescript-collections": "npm:typescript-collections@1.2.3",
    "url": "npm:jspm-nodelibs-url@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.0",
    "vm": "npm:jspm-nodelibs-vm@0.2.0",
    "zone.js": "npm:zone.js@0.6.25"
  },
  packages: {
    "npm:@angular/router@3.0.1": {
      "map": {
        "@angular/common": "npm:@angular/common@2.0.1",
        "@angular/core": "npm:@angular/core@2.0.1",
        "@angular/platform-browser": "npm:@angular/platform-browser@2.0.1",
        "rxjs": "npm:rxjs@5.0.0-beta.12"
      }
    },
    "npm:@angular/forms@2.0.1": {
      "map": {
        "@angular/common": "npm:@angular/common@2.0.1",
        "@angular/core": "npm:@angular/core@2.0.1"
      }
    },
    "github:frankwallis/plugin-typescript@5.1.2": {
      "map": {
        "typescript": "npm:typescript@2.0.3"
      }
    },
    "npm:@angular/common@2.0.1": {
      "map": {
        "@angular/core": "npm:@angular/core@2.0.1"
      }
    },
    "npm:@angular/compiler@2.0.1": {
      "map": {
        "@angular/core": "npm:@angular/core@2.0.1"
      }
    },
    "npm:@angular/core@2.0.1": {
      "map": {
        "rxjs": "npm:rxjs@5.0.0-beta.12",
        "zone.js": "npm:zone.js@0.6.25"
      }
    },
    "npm:@angular/platform-browser-dynamic@2.0.1": {
      "map": {
        "@angular/common": "npm:@angular/common@2.0.1",
        "@angular/compiler": "npm:@angular/compiler@2.0.1",
        "@angular/core": "npm:@angular/core@2.0.1",
        "@angular/platform-browser": "npm:@angular/platform-browser@2.0.1"
      }
    },
    "npm:@angular/platform-browser@2.0.1": {
      "map": {
        "@angular/common": "npm:@angular/common@2.0.1",
        "@angular/core": "npm:@angular/core@2.0.1"
      }
    },
    "npm:asn1.js@4.8.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:bn.js@4.11.6": {
      "map": {}
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.3",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.3.2",
        "inherits": "npm:inherits@2.0.3",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:buffer-xor@1.0.3": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:elliptic@6.3.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.8.1",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:process@0.11.9": {
      "map": {}
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:randombytes@2.0.3": {
      "map": {}
    },
    "npm:ripemd160@1.0.1": {
      "map": {}
    },
    "npm:rxjs@5.0.0-beta.12": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:timers-browserify@1.4.2": {
      "map": {
        "process": "npm:process@0.11.9"
      }
    },
    "npm:typescript@2.0.3": {
      "map": {}
    },
    "npm:zone.js@0.6.25": {
      "map": {}
    },
    "npm:stream-http@2.4.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "readable-stream": "npm:readable-stream@2.1.5"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "isarray": "npm:isarray@1.0.0",
        "base64-js": "npm:base64-js@1.2.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:readable-stream@2.1.5": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "buffer-shims": "npm:buffer-shims@1.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.1.5"
      }
    },
    "github:mobilexag/plugin-sass@0.4.6": {
      "map": {
        "postcss": "npm:postcss@5.2.4",
        "lodash": "npm:lodash@4.16.3",
        "autoprefixer": "npm:autoprefixer@6.5.0",
        "sass.js": "npm:sass.js@0.9.13",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "fs": "npm:jspm-nodelibs-fs@0.2.0",
        "url": "npm:jspm-nodelibs-url@0.2.0",
        "reqwest": "github:ded/reqwest@2.0.5"
      }
    },
    "npm:postcss@5.2.4": {
      "map": {
        "js-base64": "npm:js-base64@2.1.9",
        "source-map": "npm:source-map@0.5.6",
        "supports-color": "npm:supports-color@3.1.2",
        "chalk": "npm:chalk@1.1.3"
      }
    },
    "npm:autoprefixer@6.5.0": {
      "map": {
        "postcss": "npm:postcss@5.2.4",
        "num2fraction": "npm:num2fraction@1.2.2",
        "browserslist": "npm:browserslist@1.4.0",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "normalize-range": "npm:normalize-range@0.1.2",
        "caniuse-db": "npm:caniuse-db@1.0.30000547"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "supports-color": "npm:supports-color@2.0.0",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5"
      }
    },
    "npm:supports-color@3.1.2": {
      "map": {
        "has-flag": "npm:has-flag@1.0.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:browserslist@1.4.0": {
      "map": {
        "caniuse-db": "npm:caniuse-db@1.0.30000547"
      }
    },
    "npm:pbkdf2@3.0.9": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:ng2-bootstrap@1.1.14": {
      "map": {
        "moment": "npm:moment@2.15.1"
      }
    },
    "npm:json-typescript-mapper@1.0.5": {
      "map": {
        "reflect-metadata": "npm:reflect-metadata@0.1.8"
      }
    },
    "npm:jspm-nodelibs-url@0.2.0": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.0": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.4.0"
      }
    },
    "npm:jspm-nodelibs-timers@0.2.0": {
      "map": {
        "timers-browserify": "npm:timers-browserify@1.4.2"
      }
    }
  }
});
