var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(src_exports);
var path = __toESM(require("path"));
var import_coc = require("coc.nvim");
var client;
function activate(context) {
  let serverModule = context.asAbsolutePath(path.join("lib", "server", "server.js"));
  let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  let serverOptions = {
    run: { module: serverModule, transport: import_coc.TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: import_coc.TransportKind.ipc,
      options: debugOptions
    }
  };
  let clientOptions = {
    documentSelector: [
      { scheme: "file", language: "teal" },
      { scheme: "file", language: "lua", pattern: "**/tlconfig.lua" }
    ],
    synchronize: {
      fileEvents: import_coc.workspace.createFileSystemWatcher("**/*.{tl,lua}")
    },
    outputChannelName: "Teal Language Server"
  };
  client = new import_coc.LanguageClient(
    "TealLanguageServer",
    "Teal Language Server",
    serverOptions,
    clientOptions
  );
  client.start();
}
function deactivate() {
  if (!client) {
    return void 0;
  }
  return client.stop();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
