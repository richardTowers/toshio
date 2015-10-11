System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {    
    "*": "lib/*",
    "lib": "lib",
    "npm:*": "jspm_packages/npm/*"
  },
  packages: {
    "/lib": {
      "defaultExtension": "ts"
    }
  },
  map: {
    "pixi": "npm:pixi@0.3.1",
    "typescript": "npm:typescript@1.6.2"
  }
});
