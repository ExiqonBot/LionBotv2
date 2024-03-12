"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var lib_exports = {};
__export(lib_exports, {
  AlreadyInstalledError: () => import_service.AlreadyInstalledError,
  MACOS_SERVICE_PATH: () => import_service.MACOS_SERVICE_PATH,
  NotInstalledError: () => import_service.NotInstalledError,
  bin: () => import_constants.bin,
  identifier: () => import_service.identifier,
  install: () => import_install.install,
  service: () => import_service.service,
  tunnel: () => import_tunnel.tunnel
});
module.exports = __toCommonJS(lib_exports);
var import_constants = require("./constants.js");
var import_install = require("./install.js");
var import_tunnel = require("./tunnel.js");
var import_service = require("./service.js");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlreadyInstalledError,
  MACOS_SERVICE_PATH,
  NotInstalledError,
  bin,
  identifier,
  install,
  service,
  tunnel
});
