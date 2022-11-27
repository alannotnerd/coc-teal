var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/utils/is.js
var require_is = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.thenable = exports2.typedArray = exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function thenable(value) {
      return value && func(value.then);
    }
    exports2.thenable = thenable;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/ral.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral) {
        if (ral === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
      }
      RAL2.install = install;
    })(RAL || (RAL = {}));
    exports2.default = RAL;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/disposable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Disposable = void 0;
    var Disposable;
    (function(Disposable2) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable2.create = create;
    })(Disposable = exports2.Disposable || (exports2.Disposable = {}));
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractMessageBuffer = void 0;
    var CR = 13;
    var LF = 10;
    var CRLF = "\r\n";
    var AbstractMessageBuffer = class {
      constructor(encoding = "utf-8") {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
      }
      get encoding() {
        return this._encoding;
      }
      append(chunk) {
        const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
      }
      tryReadHeaders() {
        if (this._chunks.length === 0) {
          return void 0;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row:
          while (chunkIndex < this._chunks.length) {
            const chunk = this._chunks[chunkIndex];
            offset = 0;
            column:
              while (offset < chunk.length) {
                const value = chunk[offset];
                switch (value) {
                  case CR:
                    switch (state) {
                      case 0:
                        state = 1;
                        break;
                      case 2:
                        state = 3;
                        break;
                      default:
                        state = 0;
                    }
                    break;
                  case LF:
                    switch (state) {
                      case 1:
                        state = 2;
                        break;
                      case 3:
                        state = 4;
                        offset++;
                        break row;
                      default:
                        state = 0;
                    }
                    break;
                  default:
                    state = 0;
                }
                offset++;
              }
            chunkBytesRead += chunk.byteLength;
            chunkIndex++;
          }
        if (state !== 4) {
          return void 0;
        }
        const buffer = this._read(chunkBytesRead + offset);
        const result = /* @__PURE__ */ new Map();
        const headers = this.toString(buffer, "ascii").split(CRLF);
        if (headers.length < 2) {
          return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
          const header = headers[i];
          const index = header.indexOf(":");
          if (index === -1) {
            throw new Error("Message header must separate key and value using :");
          }
          const key = header.substr(0, index);
          const value = header.substr(index + 1).trim();
          result.set(key, value);
        }
        return result;
      }
      tryReadBody(length) {
        if (this._totalLength < length) {
          return void 0;
        }
        return this._read(length);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(byteCount) {
        if (byteCount === 0) {
          return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
          throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
          const chunk = this._chunks[0];
          this._chunks.shift();
          this._totalLength -= byteCount;
          return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
          const chunk = this._chunks[0];
          const result2 = this.asNative(chunk, byteCount);
          this._chunks[0] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          return result2;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
          const chunk = this._chunks[chunkIndex];
          if (chunk.byteLength > byteCount) {
            const chunkPart = chunk.slice(0, byteCount);
            result.set(chunkPart, resultOffset);
            resultOffset += byteCount;
            this._chunks[chunkIndex] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            byteCount -= byteCount;
          } else {
            result.set(chunk, resultOffset);
            resultOffset += chunk.byteLength;
            this._chunks.shift();
            this._totalLength -= chunk.byteLength;
            byteCount -= chunk.byteLength;
          }
        }
        return result;
      }
    };
    exports2.AbstractMessageBuffer = AbstractMessageBuffer;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/node/ril.js
var require_ril = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/node/ril.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ral_1 = require_ral();
    var util_1 = require("util");
    var disposable_1 = require_disposable();
    var messageBuffer_1 = require_messageBuffer();
    var MessageBuffer = class extends messageBuffer_1.AbstractMessageBuffer {
      constructor(encoding = "utf-8") {
        super(encoding);
      }
      emptyBuffer() {
        return MessageBuffer.emptyBuffer;
      }
      fromString(value, encoding) {
        return Buffer.from(value, encoding);
      }
      toString(value, encoding) {
        if (value instanceof Buffer) {
          return value.toString(encoding);
        } else {
          return new util_1.TextDecoder(encoding).decode(value);
        }
      }
      asNative(buffer, length) {
        if (length === void 0) {
          return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
        } else {
          return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
        }
      }
      allocNative(length) {
        return Buffer.allocUnsafe(length);
      }
    };
    MessageBuffer.emptyBuffer = Buffer.allocUnsafe(0);
    var ReadableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return disposable_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return disposable_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return disposable_1.Disposable.create(() => this.stream.off("end", listener));
      }
      onData(listener) {
        this.stream.on("data", listener);
        return disposable_1.Disposable.create(() => this.stream.off("data", listener));
      }
    };
    var WritableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return disposable_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return disposable_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return disposable_1.Disposable.create(() => this.stream.off("end", listener));
      }
      write(data, encoding) {
        return new Promise((resolve3, reject) => {
          const callback = (error) => {
            if (error === void 0 || error === null) {
              resolve3();
            } else {
              reject(error);
            }
          };
          if (typeof data === "string") {
            this.stream.write(data, encoding, callback);
          } else {
            this.stream.write(data, callback);
          }
        });
      }
      end() {
        this.stream.end();
      }
    };
    var _ril = Object.freeze({
      messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
      }),
      applicationJson: Object.freeze({
        encoder: Object.freeze({
          name: "application/json",
          encode: (msg, options) => {
            try {
              return Promise.resolve(Buffer.from(JSON.stringify(msg, void 0, 0), options.charset));
            } catch (err) {
              return Promise.reject(err);
            }
          }
        }),
        decoder: Object.freeze({
          name: "application/json",
          decode: (buffer, options) => {
            try {
              if (buffer instanceof Buffer) {
                return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
              } else {
                return Promise.resolve(JSON.parse(new util_1.TextDecoder(options.charset).decode(buffer)));
              }
            } catch (err) {
              return Promise.reject(err);
            }
          }
        })
      }),
      stream: Object.freeze({
        asReadableStream: (stream) => new ReadableStreamWrapper(stream),
        asWritableStream: (stream) => new WritableStreamWrapper(stream)
      }),
      console,
      timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
          return setTimeout(callback, ms, ...args);
        },
        clearTimeout(handle) {
          clearTimeout(handle);
        },
        setImmediate(callback, ...args) {
          return setImmediate(callback, ...args);
        },
        clearImmediate(handle) {
          clearImmediate(handle);
        }
      })
    });
    function RIL() {
      return _ril;
    }
    (function(RIL2) {
      function install() {
        ral_1.default.install(_ril);
      }
      RIL2.install = install;
    })(RIL || (RIL = {}));
    exports2.default = RIL;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/is.js
var require_is2 = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isResponseMessage = exports2.isNotificationMessage = exports2.isRequestMessage = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType = exports2.RequestType0 = exports2.AbstractMessageSignature = exports2.ParameterStructures = exports2.ResponseError = exports2.ErrorCodes = void 0;
    var is = require_is2();
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
      ErrorCodes2.serverErrorStart = ErrorCodes2.jsonrpcReservedErrorRangeStart;
      ErrorCodes2.MessageWriteError = -32099;
      ErrorCodes2.MessageReadError = -32098;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
      ErrorCodes2.serverErrorEnd = ErrorCodes2.jsonrpcReservedErrorRangeEnd;
    })(ErrorCodes = exports2.ErrorCodes || (exports2.ErrorCodes = {}));
    var ResponseError = class extends Error {
      constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
      }
      toJson() {
        return {
          code: this.code,
          message: this.message,
          data: this.data
        };
      }
    };
    exports2.ResponseError = ResponseError;
    var ParameterStructures = class {
      constructor(kind) {
        this.kind = kind;
      }
      static is(value) {
        return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
      }
      toString() {
        return this.kind;
      }
    };
    exports2.ParameterStructures = ParameterStructures;
    ParameterStructures.auto = new ParameterStructures("auto");
    ParameterStructures.byPosition = new ParameterStructures("byPosition");
    ParameterStructures.byName = new ParameterStructures("byName");
    var AbstractMessageSignature = class {
      constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
      }
      get parameterStructures() {
        return ParameterStructures.auto;
      }
    };
    exports2.AbstractMessageSignature = AbstractMessageSignature;
    var RequestType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.RequestType0 = RequestType0;
    var RequestType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType = RequestType;
    var RequestType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType1 = RequestType1;
    var RequestType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.RequestType2 = RequestType2;
    var RequestType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.RequestType3 = RequestType3;
    var RequestType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.RequestType4 = RequestType4;
    var RequestType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.RequestType5 = RequestType5;
    var RequestType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.RequestType6 = RequestType6;
    var RequestType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.RequestType7 = RequestType7;
    var RequestType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.RequestType8 = RequestType8;
    var RequestType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.RequestType9 = RequestType9;
    var NotificationType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType = NotificationType;
    var NotificationType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.NotificationType0 = NotificationType0;
    var NotificationType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType1 = NotificationType1;
    var NotificationType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.NotificationType2 = NotificationType2;
    var NotificationType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.NotificationType3 = NotificationType3;
    var NotificationType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.NotificationType4 = NotificationType4;
    var NotificationType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.NotificationType5 = NotificationType5;
    var NotificationType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.NotificationType6 = NotificationType6;
    var NotificationType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.NotificationType7 = NotificationType7;
    var NotificationType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.NotificationType8 = NotificationType8;
    var NotificationType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.NotificationType9 = NotificationType9;
    function isRequestMessage(message) {
      const candidate = message;
      return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
    }
    exports2.isRequestMessage = isRequestMessage;
    function isNotificationMessage(message) {
      const candidate = message;
      return candidate && is.string(candidate.method) && message.id === void 0;
    }
    exports2.isNotificationMessage = isNotificationMessage;
    function isResponseMessage(message) {
      const candidate = message;
      return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
    }
    exports2.isResponseMessage = isResponseMessage;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Emitter = exports2.Event = void 0;
    var ral_1 = require_ral();
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event = exports2.Event || (exports2.Event = {}));
    var CallbackList = class {
      add(callback, context = null, bucket) {
        if (!this._callbacks) {
          this._callbacks = [];
          this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
          bucket.push({ dispose: () => this.remove(callback, context) });
        }
      }
      remove(callback, context = null) {
        if (!this._callbacks) {
          return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
          if (this._callbacks[i] === callback) {
            if (this._contexts[i] === context) {
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
        }
      }
      invoke(...args) {
        if (!this._callbacks) {
          return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
          try {
            ret.push(callbacks[i].apply(contexts[i], args));
          } catch (e) {
            ral_1.default().console.error(e);
          }
        }
        return ret;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0;
        this._contexts = void 0;
      }
    };
    var Emitter = class {
      constructor(_options) {
        this._options = _options;
      }
      get event() {
        if (!this._event) {
          this._event = (listener, thisArgs, disposables) => {
            if (!this._callbacks) {
              this._callbacks = new CallbackList();
            }
            if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
              this._options.onFirstListenerAdd(this);
            }
            this._callbacks.add(listener, thisArgs);
            const result = {
              dispose: () => {
                if (!this._callbacks) {
                  return;
                }
                this._callbacks.remove(listener, thisArgs);
                result.dispose = Emitter._noop;
                if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                  this._options.onLastListenerRemove(this);
                }
              }
            };
            if (Array.isArray(disposables)) {
              disposables.push(result);
            }
            return result;
          };
        }
        return this._event;
      }
      fire(event) {
        if (this._callbacks) {
          this._callbacks.invoke.call(this._callbacks, event);
        }
      }
      dispose() {
        if (this._callbacks) {
          this._callbacks.dispose();
          this._callbacks = void 0;
        }
      }
    };
    exports2.Emitter = Emitter;
    Emitter._noop = function() {
    };
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/cancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CancellationTokenSource = exports2.CancellationToken = void 0;
    var ral_1 = require_ral();
    var Is2 = require_is2();
    var events_1 = require_events();
    var CancellationToken2;
    (function(CancellationToken3) {
      CancellationToken3.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken3.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken3.None || candidate === CancellationToken3.Cancelled || Is2.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken3.is = is;
    })(CancellationToken2 = exports2.CancellationToken || (exports2.CancellationToken = {}));
    var shortcutEvent = Object.freeze(function(callback, context) {
      const handle = ral_1.default().timer.setTimeout(callback.bind(context), 0);
      return { dispose() {
        ral_1.default().timer.clearTimeout(handle);
      } };
    });
    var MutableToken = class {
      constructor() {
        this._isCancelled = false;
      }
      cancel() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        if (this._isCancelled) {
          return shortcutEvent;
        }
        if (!this._emitter) {
          this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
      }
      dispose() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = void 0;
        }
      }
    };
    var CancellationTokenSource = class {
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken2.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken2.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    };
    exports2.CancellationTokenSource = CancellationTokenSource;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messageReader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = void 0;
    var ral_1 = require_ral();
    var Is2 = require_is2();
    var events_1 = require_events();
    var MessageReader;
    (function(MessageReader2) {
      function is(value) {
        let candidate = value;
        return candidate && Is2.func(candidate.listen) && Is2.func(candidate.dispose) && Is2.func(candidate.onError) && Is2.func(candidate.onClose) && Is2.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is;
    })(MessageReader = exports2.MessageReader || (exports2.MessageReader = {}));
    var AbstractMessageReader = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error) {
        this.errorEmitter.fire(this.asError(error));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Reader received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageReader = AbstractMessageReader;
    var ResolvedMessageReaderOptions;
    (function(ResolvedMessageReaderOptions2) {
      function fromOptions(options) {
        var _a;
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = /* @__PURE__ */ new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = /* @__PURE__ */ new Map();
        if (options === void 0 || typeof options === "string") {
          charset = options !== null && options !== void 0 ? options : "utf-8";
        } else {
          charset = (_a = options.charset) !== null && _a !== void 0 ? _a : "utf-8";
          if (options.contentDecoder !== void 0) {
            contentDecoder = options.contentDecoder;
            contentDecoders.set(contentDecoder.name, contentDecoder);
          }
          if (options.contentDecoders !== void 0) {
            for (const decoder of options.contentDecoders) {
              contentDecoders.set(decoder.name, decoder);
            }
          }
          if (options.contentTypeDecoder !== void 0) {
            contentTypeDecoder = options.contentTypeDecoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
          }
          if (options.contentTypeDecoders !== void 0) {
            for (const decoder of options.contentTypeDecoders) {
              contentTypeDecoders.set(decoder.name, decoder);
            }
          }
        }
        if (contentTypeDecoder === void 0) {
          contentTypeDecoder = ral_1.default().applicationJson.decoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
      }
      ResolvedMessageReaderOptions2.fromOptions = fromOptions;
    })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
    var ReadableStreamMessageReader = class extends AbstractMessageReader {
      constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = ral_1.default().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 1e4;
        this.nextMessageLength = -1;
        this.messageToken = 0;
      }
      set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = void 0;
        this.callback = callback;
        const result = this.readable.onData((data) => {
          this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
      }
      onData(data) {
        this.buffer.append(data);
        while (true) {
          if (this.nextMessageLength === -1) {
            const headers = this.buffer.tryReadHeaders();
            if (!headers) {
              return;
            }
            const contentLength = headers.get("Content-Length");
            if (!contentLength) {
              throw new Error("Header must provide a Content-Length property.");
            }
            const length = parseInt(contentLength);
            if (isNaN(length)) {
              throw new Error("Content-Length value must be a number.");
            }
            this.nextMessageLength = length;
          }
          const body = this.buffer.tryReadBody(this.nextMessageLength);
          if (body === void 0) {
            this.setPartialMessageTimer();
            return;
          }
          this.clearPartialMessageTimer();
          this.nextMessageLength = -1;
          let p;
          if (this.options.contentDecoder !== void 0) {
            p = this.options.contentDecoder.decode(body);
          } else {
            p = Promise.resolve(body);
          }
          p.then((value) => {
            this.options.contentTypeDecoder.decode(value, this.options).then((msg) => {
              this.callback(msg);
            }, (error) => {
              this.fireError(error);
            });
          }, (error) => {
            this.fireError(error);
          });
        }
      }
      clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
          ral_1.default().timer.clearTimeout(this.partialMessageTimer);
          this.partialMessageTimer = void 0;
        }
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = ral_1.default().timer.setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    };
    exports2.ReadableStreamMessageReader = ReadableStreamMessageReader;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/semaphore.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Semaphore = void 0;
    var ral_1 = require_ral();
    var Semaphore = class {
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
      }
      lock(thunk) {
        return new Promise((resolve3, reject) => {
          this._waiting.push({ thunk, resolve: resolve3, reject });
          this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        ral_1.default().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
          throw new Error(`To many thunks active`);
        }
        try {
          const result = next.thunk();
          if (result instanceof Promise) {
            result.then((value) => {
              this._active--;
              next.resolve(value);
              this.runNext();
            }, (err) => {
              this._active--;
              next.reject(err);
              this.runNext();
            });
          } else {
            this._active--;
            next.resolve(result);
            this.runNext();
          }
        } catch (err) {
          this._active--;
          next.reject(err);
          this.runNext();
        }
      }
    };
    exports2.Semaphore = Semaphore;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = void 0;
    var ral_1 = require_ral();
    var Is2 = require_is2();
    var semaphore_1 = require_semaphore();
    var events_1 = require_events();
    var ContentLength = "Content-Length: ";
    var CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is(value) {
        let candidate = value;
        return candidate && Is2.func(candidate.dispose) && Is2.func(candidate.onClose) && Is2.func(candidate.onError) && Is2.func(candidate.write);
      }
      MessageWriter2.is = is;
    })(MessageWriter = exports2.MessageWriter || (exports2.MessageWriter = {}));
    var AbstractMessageWriter = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageWriter = AbstractMessageWriter;
    var ResolvedMessageWriterOptions;
    (function(ResolvedMessageWriterOptions2) {
      function fromOptions(options) {
        var _a, _b;
        if (options === void 0 || typeof options === "string") {
          return { charset: options !== null && options !== void 0 ? options : "utf-8", contentTypeEncoder: ral_1.default().applicationJson.encoder };
        } else {
          return { charset: (_a = options.charset) !== null && _a !== void 0 ? _a : "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: (_b = options.contentTypeEncoder) !== null && _b !== void 0 ? _b : ral_1.default().applicationJson.encoder };
        }
      }
      ResolvedMessageWriterOptions2.fromOptions = fromOptions;
    })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
    var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
      constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
      }
      async write(msg) {
        return this.writeSemaphore.lock(async () => {
          const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
            if (this.options.contentEncoder !== void 0) {
              return this.options.contentEncoder.encode(buffer);
            } else {
              return buffer;
            }
          });
          return payload.then((buffer) => {
            const headers = [];
            headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
            headers.push(CRLF);
            return this.doWrite(msg, headers, buffer);
          }, (error) => {
            this.fireError(error);
            throw error;
          });
        });
      }
      async doWrite(msg, headers, data) {
        try {
          await this.writable.write(headers.join(""), "ascii");
          return this.writable.write(data);
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
        this.writable.end();
      }
    };
    exports2.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LRUCache = exports2.LinkedMap = exports2.Touch = void 0;
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.AsOld = Touch2.First;
      Touch2.Last = 2;
      Touch2.AsNew = Touch2.Last;
    })(Touch = exports2.Touch || (exports2.Touch = {}));
    var LinkedMap = class {
      constructor() {
        this[Symbol.toStringTag] = "LinkedMap";
        this._map = /* @__PURE__ */ new Map();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state = 0;
      }
      clear() {
        this._map.clear();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state++;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      get first() {
        var _a;
        return (_a = this._head) === null || _a === void 0 ? void 0 : _a.value;
      }
      get last() {
        var _a;
        return (_a = this._tail) === null || _a === void 0 ? void 0 : _a.value;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        if (touch !== Touch.None) {
          this.touch(item, touch);
        }
        return item.value;
      }
      set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
          item.value = value;
          if (touch !== Touch.None) {
            this.touch(item, touch);
          }
        } else {
          item = { key, value, next: void 0, previous: void 0 };
          switch (touch) {
            case Touch.None:
              this.addItemLast(item);
              break;
            case Touch.First:
              this.addItemFirst(item);
              break;
            case Touch.Last:
              this.addItemLast(item);
              break;
            default:
              this.addItemLast(item);
              break;
          }
          this._map.set(key, item);
          this._size++;
        }
        return this;
      }
      delete(key) {
        return !!this.remove(key);
      }
      remove(key) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          current = current.next;
        }
      }
      keys() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]() {
            return iterator;
          },
          next() {
            if (map._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.key, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      values() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]() {
            return iterator;
          },
          next() {
            if (map._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.value, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      entries() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]() {
            return iterator;
          },
          next() {
            if (map._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: [current.key, current.value], done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      trimOld(newSize) {
        if (newSize >= this.size) {
          return;
        }
        if (newSize === 0) {
          this.clear();
          return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
          this._map.delete(current.key);
          current = current.next;
          currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
          current.previous = void 0;
        }
        this._state++;
      }
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
        this._state++;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
          item.previous = this._tail;
          this._tail.next = item;
        }
        this._tail = item;
        this._state++;
      }
      removeItem(item) {
        if (item === this._head && item === this._tail) {
          this._head = void 0;
          this._tail = void 0;
        } else if (item === this._head) {
          if (!item.next) {
            throw new Error("Invalid list");
          }
          item.next.previous = void 0;
          this._head = item.next;
        } else if (item === this._tail) {
          if (!item.previous) {
            throw new Error("Invalid list");
          }
          item.previous.next = void 0;
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
        item.next = void 0;
        item.previous = void 0;
        this._state++;
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._tail) {
            previous.next = void 0;
            this._tail = previous;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.previous = void 0;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
          this._state++;
        } else if (touch === Touch.Last) {
          if (item === this._tail) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._head) {
            next.previous = void 0;
            this._head = next;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.next = void 0;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
          this._state++;
        }
      }
      toJSON() {
        const data = [];
        this.forEach((value, key) => {
          data.push([key, value]);
        });
        return data;
      }
      fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
          this.set(key, value);
        }
      }
    };
    exports2.LinkedMap = LinkedMap;
    var LRUCache = class extends LinkedMap {
      constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
      }
      get limit() {
        return this._limit;
      }
      set limit(limit) {
        this._limit = limit;
        this.checkTrim();
      }
      get ratio() {
        return this._ratio;
      }
      set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
      }
      get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
      }
      peek(key) {
        return super.get(key, Touch.None);
      }
      set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
      }
      checkTrim() {
        if (this.size > this._limit) {
          this.trimOld(Math.round(this._limit * this._ratio));
        }
      }
    };
    exports2.LRUCache = LRUCache;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.ConnectionOptions = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.ConnectionStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.Trace = exports2.NullLogger = exports2.ProgressType = void 0;
    var ral_1 = require_ral();
    var Is2 = require_is2();
    var messages_1 = require_messages();
    var linkedMap_1 = require_linkedMap();
    var events_1 = require_events();
    var cancellation_1 = require_cancellation();
    var CancelNotification;
    (function(CancelNotification2) {
      CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
    })(CancelNotification || (CancelNotification = {}));
    var ProgressNotification;
    (function(ProgressNotification2) {
      ProgressNotification2.type = new messages_1.NotificationType("$/progress");
    })(ProgressNotification || (ProgressNotification = {}));
    var ProgressType = class {
      constructor() {
      }
    };
    exports2.ProgressType = ProgressType;
    var StarRequestHandler;
    (function(StarRequestHandler2) {
      function is(value) {
        return Is2.func(value);
      }
      StarRequestHandler2.is = is;
    })(StarRequestHandler || (StarRequestHandler = {}));
    exports2.NullLogger = Object.freeze({
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      },
      log: () => {
      }
    });
    var Trace;
    (function(Trace2) {
      Trace2[Trace2["Off"] = 0] = "Off";
      Trace2[Trace2["Messages"] = 1] = "Messages";
      Trace2[Trace2["Verbose"] = 2] = "Verbose";
    })(Trace = exports2.Trace || (exports2.Trace = {}));
    (function(Trace2) {
      function fromString(value) {
        if (!Is2.string(value)) {
          return Trace2.Off;
        }
        value = value.toLowerCase();
        switch (value) {
          case "off":
            return Trace2.Off;
          case "messages":
            return Trace2.Messages;
          case "verbose":
            return Trace2.Verbose;
          default:
            return Trace2.Off;
        }
      }
      Trace2.fromString = fromString;
      function toString(value) {
        switch (value) {
          case Trace2.Off:
            return "off";
          case Trace2.Messages:
            return "messages";
          case Trace2.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      Trace2.toString = toString;
    })(Trace = exports2.Trace || (exports2.Trace = {}));
    var TraceFormat;
    (function(TraceFormat2) {
      TraceFormat2["Text"] = "text";
      TraceFormat2["JSON"] = "json";
    })(TraceFormat = exports2.TraceFormat || (exports2.TraceFormat = {}));
    (function(TraceFormat2) {
      function fromString(value) {
        value = value.toLowerCase();
        if (value === "json") {
          return TraceFormat2.JSON;
        } else {
          return TraceFormat2.Text;
        }
      }
      TraceFormat2.fromString = fromString;
    })(TraceFormat = exports2.TraceFormat || (exports2.TraceFormat = {}));
    var SetTraceNotification;
    (function(SetTraceNotification2) {
      SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
    })(SetTraceNotification = exports2.SetTraceNotification || (exports2.SetTraceNotification = {}));
    var LogTraceNotification;
    (function(LogTraceNotification2) {
      LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
    })(LogTraceNotification = exports2.LogTraceNotification || (exports2.LogTraceNotification = {}));
    var ConnectionErrors;
    (function(ConnectionErrors2) {
      ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
      ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
      ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
    })(ConnectionErrors = exports2.ConnectionErrors || (exports2.ConnectionErrors = {}));
    var ConnectionError = class extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ConnectionError.prototype);
      }
    };
    exports2.ConnectionError = ConnectionError;
    var ConnectionStrategy;
    (function(ConnectionStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.cancelUndispatched);
      }
      ConnectionStrategy2.is = is;
    })(ConnectionStrategy = exports2.ConnectionStrategy || (exports2.ConnectionStrategy = {}));
    var CancellationReceiverStrategy;
    (function(CancellationReceiverStrategy2) {
      CancellationReceiverStrategy2.Message = Object.freeze({
        createCancellationTokenSource(_) {
          return new cancellation_1.CancellationTokenSource();
        }
      });
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.createCancellationTokenSource);
      }
      CancellationReceiverStrategy2.is = is;
    })(CancellationReceiverStrategy = exports2.CancellationReceiverStrategy || (exports2.CancellationReceiverStrategy = {}));
    var CancellationSenderStrategy;
    (function(CancellationSenderStrategy2) {
      CancellationSenderStrategy2.Message = Object.freeze({
        sendCancellation(conn, id2) {
          conn.sendNotification(CancelNotification.type, { id: id2 });
        },
        cleanup(_) {
        }
      });
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.sendCancellation) && Is2.func(candidate.cleanup);
      }
      CancellationSenderStrategy2.is = is;
    })(CancellationSenderStrategy = exports2.CancellationSenderStrategy || (exports2.CancellationSenderStrategy = {}));
    var CancellationStrategy;
    (function(CancellationStrategy2) {
      CancellationStrategy2.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
      });
      function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
      }
      CancellationStrategy2.is = is;
    })(CancellationStrategy = exports2.CancellationStrategy || (exports2.CancellationStrategy = {}));
    var ConnectionOptions;
    (function(ConnectionOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy));
      }
      ConnectionOptions2.is = is;
    })(ConnectionOptions = exports2.ConnectionOptions || (exports2.ConnectionOptions = {}));
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["New"] = 1] = "New";
      ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
      ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
      ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
    })(ConnectionState || (ConnectionState = {}));
    function createMessageConnection(messageReader, messageWriter, _logger, options) {
      const logger = _logger !== void 0 ? _logger : exports2.NullLogger;
      let sequenceNumber = 0;
      let notificationSquenceNumber = 0;
      let unknownResponseSquenceNumber = 0;
      const version = "2.0";
      let starRequestHandler = void 0;
      const requestHandlers = /* @__PURE__ */ Object.create(null);
      let starNotificationHandler = void 0;
      const notificationHandlers = /* @__PURE__ */ Object.create(null);
      const progressHandlers = /* @__PURE__ */ new Map();
      let timer;
      let messageQueue = new linkedMap_1.LinkedMap();
      let responsePromises = /* @__PURE__ */ Object.create(null);
      let requestTokens = /* @__PURE__ */ Object.create(null);
      let trace = Trace.Off;
      let traceFormat = TraceFormat.Text;
      let tracer;
      let state = ConnectionState.New;
      const errorEmitter = new events_1.Emitter();
      const closeEmitter = new events_1.Emitter();
      const unhandledNotificationEmitter = new events_1.Emitter();
      const unhandledProgressEmitter = new events_1.Emitter();
      const disposeEmitter = new events_1.Emitter();
      const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
      function createRequestQueueKey(id2) {
        if (id2 === null) {
          throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return "req-" + id2.toString();
      }
      function createResponseQueueKey(id2) {
        if (id2 === null) {
          return "res-unknown-" + (++unknownResponseSquenceNumber).toString();
        } else {
          return "res-" + id2.toString();
        }
      }
      function createNotificationQueueKey() {
        return "not-" + (++notificationSquenceNumber).toString();
      }
      function addMessageToQueue(queue, message) {
        if (messages_1.isRequestMessage(message)) {
          queue.set(createRequestQueueKey(message.id), message);
        } else if (messages_1.isResponseMessage(message)) {
          queue.set(createResponseQueueKey(message.id), message);
        } else {
          queue.set(createNotificationQueueKey(), message);
        }
      }
      function cancelUndispatched(_message) {
        return void 0;
      }
      function isListening() {
        return state === ConnectionState.Listening;
      }
      function isClosed() {
        return state === ConnectionState.Closed;
      }
      function isDisposed() {
        return state === ConnectionState.Disposed;
      }
      function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
          state = ConnectionState.Closed;
          closeEmitter.fire(void 0);
        }
      }
      function readErrorHandler(error) {
        errorEmitter.fire([error, void 0, void 0]);
      }
      function writeErrorHandler(data) {
        errorEmitter.fire(data);
      }
      messageReader.onClose(closeHandler);
      messageReader.onError(readErrorHandler);
      messageWriter.onClose(closeHandler);
      messageWriter.onError(writeErrorHandler);
      function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
          return;
        }
        timer = ral_1.default().timer.setImmediate(() => {
          timer = void 0;
          processMessageQueue();
        });
      }
      function processMessageQueue() {
        if (messageQueue.size === 0) {
          return;
        }
        const message = messageQueue.shift();
        try {
          if (messages_1.isRequestMessage(message)) {
            handleRequest(message);
          } else if (messages_1.isNotificationMessage(message)) {
            handleNotification(message);
          } else if (messages_1.isResponseMessage(message)) {
            handleResponse(message);
          } else {
            handleInvalidMessage(message);
          }
        } finally {
          triggerMessageQueue();
        }
      }
      const callback = (message) => {
        try {
          if (messages_1.isNotificationMessage(message) && message.method === CancelNotification.type.method) {
            const key = createRequestQueueKey(message.params.id);
            const toCancel = messageQueue.get(key);
            if (messages_1.isRequestMessage(toCancel)) {
              const strategy = options === null || options === void 0 ? void 0 : options.connectionStrategy;
              const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
              if (response && (response.error !== void 0 || response.result !== void 0)) {
                messageQueue.delete(key);
                response.id = toCancel.id;
                traceSendingResponse(response, message.method, Date.now());
                messageWriter.write(response);
                return;
              }
            }
          }
          addMessageToQueue(messageQueue, message);
        } finally {
          triggerMessageQueue();
        }
      };
      function handleRequest(requestMessage) {
        if (isDisposed()) {
          return;
        }
        function reply(resultOrError, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id
          };
          if (resultOrError instanceof messages_1.ResponseError) {
            message.error = resultOrError.toJson();
          } else {
            message.result = resultOrError === void 0 ? null : resultOrError;
          }
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message);
        }
        function replyError(error, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            error: error.toJson()
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message);
        }
        function replySuccess(result, method, startTime2) {
          if (result === void 0) {
            result = null;
          }
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            result
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message);
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers[requestMessage.method];
        let type;
        let requestHandler;
        if (element) {
          type = element.type;
          requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
          const tokenKey = String(requestMessage.id);
          const cancellationSource = cancellationStrategy.receiver.createCancellationTokenSource(tokenKey);
          requestTokens[tokenKey] = cancellationSource;
          try {
            let handlerResult;
            if (requestHandler) {
              if (requestMessage.params === void 0) {
                if (type !== void 0 && type.numberOfParams !== 0) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but recevied none.`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(cancellationSource.token);
              } else if (Array.isArray(requestMessage.params)) {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
              }
            } else if (starRequestHandler) {
              handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
            }
            const promise = handlerResult;
            if (!handlerResult) {
              delete requestTokens[tokenKey];
              replySuccess(handlerResult, requestMessage.method, startTime);
            } else if (promise.then) {
              promise.then((resultOrError) => {
                delete requestTokens[tokenKey];
                reply(resultOrError, requestMessage.method, startTime);
              }, (error) => {
                delete requestTokens[tokenKey];
                if (error instanceof messages_1.ResponseError) {
                  replyError(error, requestMessage.method, startTime);
                } else if (error && Is2.string(error.message)) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                } else {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
              });
            } else {
              delete requestTokens[tokenKey];
              reply(handlerResult, requestMessage.method, startTime);
            }
          } catch (error) {
            delete requestTokens[tokenKey];
            if (error instanceof messages_1.ResponseError) {
              reply(error, requestMessage.method, startTime);
            } else if (error && Is2.string(error.message)) {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
            } else {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
            }
          }
        } else {
          replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
      }
      function handleResponse(responseMessage) {
        if (isDisposed()) {
          return;
        }
        if (responseMessage.id === null) {
          if (responseMessage.error) {
            logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
          } else {
            logger.error(`Received response message without id. No further error information provided.`);
          }
        } else {
          const key = String(responseMessage.id);
          const responsePromise = responsePromises[key];
          traceReceivedResponse(responseMessage, responsePromise);
          if (responsePromise) {
            delete responsePromises[key];
            try {
              if (responseMessage.error) {
                const error = responseMessage.error;
                responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
              } else if (responseMessage.result !== void 0) {
                responsePromise.resolve(responseMessage.result);
              } else {
                throw new Error("Should never happen.");
              }
            } catch (error) {
              if (error.message) {
                logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
              } else {
                logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
              }
            }
          }
        }
      }
      function handleNotification(message) {
        if (isDisposed()) {
          return;
        }
        let type = void 0;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
          notificationHandler = (params) => {
            const id2 = params.id;
            const source = requestTokens[String(id2)];
            if (source) {
              source.cancel();
            }
          };
        } else {
          const element = notificationHandlers[message.method];
          if (element) {
            notificationHandler = element.handler;
            type = element.type;
          }
        }
        if (notificationHandler || starNotificationHandler) {
          try {
            traceReceivedNotification(message);
            if (notificationHandler) {
              if (message.params === void 0) {
                if (type !== void 0) {
                  if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but recevied none.`);
                  }
                }
                notificationHandler();
              } else if (Array.isArray(message.params)) {
                if (type !== void 0) {
                  if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                  }
                  if (type.numberOfParams !== message.params.length) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${message.params.length} argumennts`);
                  }
                }
                notificationHandler(...message.params);
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                }
                notificationHandler(message.params);
              }
            } else if (starNotificationHandler) {
              starNotificationHandler(message.method, message.params);
            }
          } catch (error) {
            if (error.message) {
              logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
            } else {
              logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
            }
          }
        } else {
          unhandledNotificationEmitter.fire(message);
        }
      }
      function handleInvalidMessage(message) {
        if (!message) {
          logger.error("Received empty message.");
          return;
        }
        logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
        const responseMessage = message;
        if (Is2.string(responseMessage.id) || Is2.number(responseMessage.id)) {
          const key = String(responseMessage.id);
          const responseHandler = responsePromises[key];
          if (responseHandler) {
            responseHandler.reject(new Error("The received response has neither a result nor an error property."));
          }
        }
      }
      function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose && message.params) {
            data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
          }
          tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("send-request", message);
        }
      }
      function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.params) {
              data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Sending notification '${message.method}'.`, data);
        } else {
          logLSPMessage("send-notification", message);
        }
      }
      function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.error && message.error.data) {
              data = `Error data: ${JSON.stringify(message.error.data, null, 4)}

`;
            } else {
              if (message.result) {
                data = `Result: ${JSON.stringify(message.result, null, 4)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        } else {
          logLSPMessage("send-response", message);
        }
      }
      function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose && message.params) {
            data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
          }
          tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("receive-request", message);
        }
      }
      function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.params) {
              data = `Params: ${JSON.stringify(message.params, null, 4)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Received notification '${message.method}'.`, data);
        } else {
          logLSPMessage("receive-notification", message);
        }
      }
      function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose) {
            if (message.error && message.error.data) {
              data = `Error data: ${JSON.stringify(message.error.data, null, 4)}

`;
            } else {
              if (message.result) {
                data = `Result: ${JSON.stringify(message.result, null, 4)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          if (responsePromise) {
            const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
            tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
          } else {
            tracer.log(`Received response ${message.id} without active response promise.`, data);
          }
        } else {
          logLSPMessage("receive-response", message);
        }
      }
      function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
          return;
        }
        const lspMessage = {
          isLSPMessage: true,
          type,
          message,
          timestamp: Date.now()
        };
        tracer.log(lspMessage);
      }
      function throwIfClosedOrDisposed() {
        if (isClosed()) {
          throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
        }
        if (isDisposed()) {
          throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
        }
      }
      function throwIfListening() {
        if (isListening()) {
          throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
        }
      }
      function throwIfNotListening() {
        if (!isListening()) {
          throw new Error("Call listen() first.");
        }
      }
      function undefinedToNull(param) {
        if (param === void 0) {
          return null;
        } else {
          return param;
        }
      }
      function nullToUndefined(param) {
        if (param === null) {
          return void 0;
        } else {
          return param;
        }
      }
      function isNamedParam(param) {
        return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
      }
      function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
          case messages_1.ParameterStructures.auto:
            if (isNamedParam(param)) {
              return nullToUndefined(param);
            } else {
              return [undefinedToNull(param)];
            }
            break;
          case messages_1.ParameterStructures.byName:
            if (!isNamedParam(param)) {
              throw new Error(`Recevied parameters by name but param is not an object literal.`);
            }
            return nullToUndefined(param);
          case messages_1.ParameterStructures.byPosition:
            return [undefinedToNull(param)];
          default:
            throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
      }
      function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
          case 0:
            result = void 0;
            break;
          case 1:
            result = computeSingleParam(type.parameterStructures, params[0]);
            break;
          default:
            result = [];
            for (let i = 0; i < params.length && i < numberOfParams; i++) {
              result.push(undefinedToNull(params[i]));
            }
            if (params.length < numberOfParams) {
              for (let i = params.length; i < numberOfParams; i++) {
                result.push(null);
              }
            }
            break;
        }
        return result;
      }
      const connection2 = {
        sendNotification: (type, ...args) => {
          throwIfClosedOrDisposed();
          let method;
          let messageParams;
          if (Is2.string(type)) {
            method = type;
            const first = args[0];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Recevied ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
          }
          const notificationMessage = {
            jsonrpc: version,
            method,
            params: messageParams
          };
          traceSendingNotification(notificationMessage);
          messageWriter.write(notificationMessage);
        },
        onNotification: (type, handler) => {
          throwIfClosedOrDisposed();
          let method;
          if (Is2.func(type)) {
            starNotificationHandler = type;
          } else if (handler) {
            if (Is2.string(type)) {
              method = type;
              notificationHandlers[type] = { type: void 0, handler };
            } else {
              method = type.method;
              notificationHandlers[type.method] = { type, handler };
            }
          }
          return {
            dispose: () => {
              if (method !== void 0) {
                delete notificationHandlers[method];
              } else {
                starNotificationHandler = void 0;
              }
            }
          };
        },
        onProgress: (_type, token, handler) => {
          if (progressHandlers.has(token)) {
            throw new Error(`Progress handler for token ${token} already registered`);
          }
          progressHandlers.set(token, handler);
          return {
            dispose: () => {
              progressHandlers.delete(token);
            }
          };
        },
        sendProgress: (_type, token, value) => {
          connection2.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
          throwIfClosedOrDisposed();
          throwIfNotListening();
          let method;
          let messageParams;
          let token = void 0;
          if (Is2.string(type)) {
            method = type;
            const first = args[0];
            const last = args[args.length - 1];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            if (cancellation_1.CancellationToken.is(last)) {
              paramEnd = paramEnd - 1;
              token = last;
            }
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Recevied ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
            const numberOfParams = type.numberOfParams;
            token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
          }
          const id2 = sequenceNumber++;
          let disposable;
          if (token) {
            disposable = token.onCancellationRequested(() => {
              cancellationStrategy.sender.sendCancellation(connection2, id2);
            });
          }
          const result = new Promise((resolve3, reject) => {
            const requestMessage = {
              jsonrpc: version,
              id: id2,
              method,
              params: messageParams
            };
            const resolveWithCleanup = (r) => {
              resolve3(r);
              cancellationStrategy.sender.cleanup(id2);
              disposable === null || disposable === void 0 ? void 0 : disposable.dispose();
            };
            const rejectWithCleanup = (r) => {
              reject(r);
              cancellationStrategy.sender.cleanup(id2);
              disposable === null || disposable === void 0 ? void 0 : disposable.dispose();
            };
            let responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
            traceSendingRequest(requestMessage);
            try {
              messageWriter.write(requestMessage);
            } catch (e) {
              responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : "Unknown reason"));
              responsePromise = null;
            }
            if (responsePromise) {
              responsePromises[String(id2)] = responsePromise;
            }
          });
          return result;
        },
        onRequest: (type, handler) => {
          throwIfClosedOrDisposed();
          let method = null;
          if (StarRequestHandler.is(type)) {
            method = void 0;
            starRequestHandler = type;
          } else if (Is2.string(type)) {
            method = null;
            if (handler !== void 0) {
              method = type;
              requestHandlers[type] = { handler, type: void 0 };
            }
          } else {
            if (handler !== void 0) {
              method = type.method;
              requestHandlers[type.method] = { type, handler };
            }
          }
          return {
            dispose: () => {
              if (method === null) {
                return;
              }
              if (method !== void 0) {
                delete requestHandlers[method];
              } else {
                starRequestHandler = void 0;
              }
            }
          };
        },
        trace: (_value, _tracer, sendNotificationOrTraceOptions) => {
          let _sendNotification = false;
          let _traceFormat = TraceFormat.Text;
          if (sendNotificationOrTraceOptions !== void 0) {
            if (Is2.boolean(sendNotificationOrTraceOptions)) {
              _sendNotification = sendNotificationOrTraceOptions;
            } else {
              _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
              _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
            }
          }
          trace = _value;
          traceFormat = _traceFormat;
          if (trace === Trace.Off) {
            tracer = void 0;
          } else {
            tracer = _tracer;
          }
          if (_sendNotification && !isClosed() && !isDisposed()) {
            connection2.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
          }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
          messageWriter.end();
        },
        dispose: () => {
          if (isDisposed()) {
            return;
          }
          state = ConnectionState.Disposed;
          disposeEmitter.fire(void 0);
          const error = new Error("Connection got disposed.");
          Object.keys(responsePromises).forEach((key) => {
            responsePromises[key].reject(error);
          });
          responsePromises = /* @__PURE__ */ Object.create(null);
          requestTokens = /* @__PURE__ */ Object.create(null);
          messageQueue = new linkedMap_1.LinkedMap();
          if (Is2.func(messageWriter.dispose)) {
            messageWriter.dispose();
          }
          if (Is2.func(messageReader.dispose)) {
            messageReader.dispose();
          }
        },
        listen: () => {
          throwIfClosedOrDisposed();
          throwIfListening();
          state = ConnectionState.Listening;
          messageReader.listen(callback);
        },
        inspect: () => {
          ral_1.default().console.log("inspect");
        }
      };
      connection2.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        tracer.log(params.message, trace === Trace.Verbose ? params.verbose : void 0);
      });
      connection2.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
          handler(params.value);
        } else {
          unhandledProgressEmitter.fire(params);
        }
      });
      return connection2;
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/common/api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.Trace = exports2.ProgressType = exports2.createMessageConnection = exports2.NullLogger = exports2.ConnectionOptions = exports2.ConnectionStrategy = exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = exports2.CancellationToken = exports2.CancellationTokenSource = exports2.Emitter = exports2.Event = exports2.Disposable = exports2.ParameterStructures = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.ErrorCodes = exports2.ResponseError = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType0 = exports2.RequestType = exports2.RAL = void 0;
    exports2.CancellationStrategy = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports2, "RequestType", { enumerable: true, get: function() {
      return messages_1.RequestType;
    } });
    Object.defineProperty(exports2, "RequestType0", { enumerable: true, get: function() {
      return messages_1.RequestType0;
    } });
    Object.defineProperty(exports2, "RequestType1", { enumerable: true, get: function() {
      return messages_1.RequestType1;
    } });
    Object.defineProperty(exports2, "RequestType2", { enumerable: true, get: function() {
      return messages_1.RequestType2;
    } });
    Object.defineProperty(exports2, "RequestType3", { enumerable: true, get: function() {
      return messages_1.RequestType3;
    } });
    Object.defineProperty(exports2, "RequestType4", { enumerable: true, get: function() {
      return messages_1.RequestType4;
    } });
    Object.defineProperty(exports2, "RequestType5", { enumerable: true, get: function() {
      return messages_1.RequestType5;
    } });
    Object.defineProperty(exports2, "RequestType6", { enumerable: true, get: function() {
      return messages_1.RequestType6;
    } });
    Object.defineProperty(exports2, "RequestType7", { enumerable: true, get: function() {
      return messages_1.RequestType7;
    } });
    Object.defineProperty(exports2, "RequestType8", { enumerable: true, get: function() {
      return messages_1.RequestType8;
    } });
    Object.defineProperty(exports2, "RequestType9", { enumerable: true, get: function() {
      return messages_1.RequestType9;
    } });
    Object.defineProperty(exports2, "ResponseError", { enumerable: true, get: function() {
      return messages_1.ResponseError;
    } });
    Object.defineProperty(exports2, "ErrorCodes", { enumerable: true, get: function() {
      return messages_1.ErrorCodes;
    } });
    Object.defineProperty(exports2, "NotificationType", { enumerable: true, get: function() {
      return messages_1.NotificationType;
    } });
    Object.defineProperty(exports2, "NotificationType0", { enumerable: true, get: function() {
      return messages_1.NotificationType0;
    } });
    Object.defineProperty(exports2, "NotificationType1", { enumerable: true, get: function() {
      return messages_1.NotificationType1;
    } });
    Object.defineProperty(exports2, "NotificationType2", { enumerable: true, get: function() {
      return messages_1.NotificationType2;
    } });
    Object.defineProperty(exports2, "NotificationType3", { enumerable: true, get: function() {
      return messages_1.NotificationType3;
    } });
    Object.defineProperty(exports2, "NotificationType4", { enumerable: true, get: function() {
      return messages_1.NotificationType4;
    } });
    Object.defineProperty(exports2, "NotificationType5", { enumerable: true, get: function() {
      return messages_1.NotificationType5;
    } });
    Object.defineProperty(exports2, "NotificationType6", { enumerable: true, get: function() {
      return messages_1.NotificationType6;
    } });
    Object.defineProperty(exports2, "NotificationType7", { enumerable: true, get: function() {
      return messages_1.NotificationType7;
    } });
    Object.defineProperty(exports2, "NotificationType8", { enumerable: true, get: function() {
      return messages_1.NotificationType8;
    } });
    Object.defineProperty(exports2, "NotificationType9", { enumerable: true, get: function() {
      return messages_1.NotificationType9;
    } });
    Object.defineProperty(exports2, "ParameterStructures", { enumerable: true, get: function() {
      return messages_1.ParameterStructures;
    } });
    var disposable_1 = require_disposable();
    Object.defineProperty(exports2, "Disposable", { enumerable: true, get: function() {
      return disposable_1.Disposable;
    } });
    var events_1 = require_events();
    Object.defineProperty(exports2, "Event", { enumerable: true, get: function() {
      return events_1.Event;
    } });
    Object.defineProperty(exports2, "Emitter", { enumerable: true, get: function() {
      return events_1.Emitter;
    } });
    var cancellation_1 = require_cancellation();
    Object.defineProperty(exports2, "CancellationTokenSource", { enumerable: true, get: function() {
      return cancellation_1.CancellationTokenSource;
    } });
    Object.defineProperty(exports2, "CancellationToken", { enumerable: true, get: function() {
      return cancellation_1.CancellationToken;
    } });
    var messageReader_1 = require_messageReader();
    Object.defineProperty(exports2, "MessageReader", { enumerable: true, get: function() {
      return messageReader_1.MessageReader;
    } });
    Object.defineProperty(exports2, "AbstractMessageReader", { enumerable: true, get: function() {
      return messageReader_1.AbstractMessageReader;
    } });
    Object.defineProperty(exports2, "ReadableStreamMessageReader", { enumerable: true, get: function() {
      return messageReader_1.ReadableStreamMessageReader;
    } });
    var messageWriter_1 = require_messageWriter();
    Object.defineProperty(exports2, "MessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.MessageWriter;
    } });
    Object.defineProperty(exports2, "AbstractMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.AbstractMessageWriter;
    } });
    Object.defineProperty(exports2, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.WriteableStreamMessageWriter;
    } });
    var connection_1 = require_connection();
    Object.defineProperty(exports2, "ConnectionStrategy", { enumerable: true, get: function() {
      return connection_1.ConnectionStrategy;
    } });
    Object.defineProperty(exports2, "ConnectionOptions", { enumerable: true, get: function() {
      return connection_1.ConnectionOptions;
    } });
    Object.defineProperty(exports2, "NullLogger", { enumerable: true, get: function() {
      return connection_1.NullLogger;
    } });
    Object.defineProperty(exports2, "createMessageConnection", { enumerable: true, get: function() {
      return connection_1.createMessageConnection;
    } });
    Object.defineProperty(exports2, "ProgressType", { enumerable: true, get: function() {
      return connection_1.ProgressType;
    } });
    Object.defineProperty(exports2, "Trace", { enumerable: true, get: function() {
      return connection_1.Trace;
    } });
    Object.defineProperty(exports2, "TraceFormat", { enumerable: true, get: function() {
      return connection_1.TraceFormat;
    } });
    Object.defineProperty(exports2, "SetTraceNotification", { enumerable: true, get: function() {
      return connection_1.SetTraceNotification;
    } });
    Object.defineProperty(exports2, "LogTraceNotification", { enumerable: true, get: function() {
      return connection_1.LogTraceNotification;
    } });
    Object.defineProperty(exports2, "ConnectionErrors", { enumerable: true, get: function() {
      return connection_1.ConnectionErrors;
    } });
    Object.defineProperty(exports2, "ConnectionError", { enumerable: true, get: function() {
      return connection_1.ConnectionError;
    } });
    Object.defineProperty(exports2, "CancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationReceiverStrategy;
    } });
    Object.defineProperty(exports2, "CancellationSenderStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationSenderStrategy;
    } });
    Object.defineProperty(exports2, "CancellationStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationStrategy;
    } });
    var ral_1 = require_ral();
    exports2.RAL = ral_1.default;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/node/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.createServerSocketTransport = exports2.createClientSocketTransport = exports2.createServerPipeTransport = exports2.createClientPipeTransport = exports2.generateRandomPipeName = exports2.StreamMessageWriter = exports2.StreamMessageReader = exports2.SocketMessageWriter = exports2.SocketMessageReader = exports2.IPCMessageWriter = exports2.IPCMessageReader = void 0;
    var ril_1 = require_ril();
    ril_1.default.install();
    var api_1 = require_api();
    var path6 = require("path");
    var os = require("os");
    var crypto_1 = require("crypto");
    var net_1 = require("net");
    __exportStar(require_api(), exports2);
    var IPCMessageReader = class extends api_1.AbstractMessageReader {
      constructor(process2) {
        super();
        this.process = process2;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose());
      }
      listen(callback) {
        this.process.on("message", callback);
        return api_1.Disposable.create(() => this.process.off("message", callback));
      }
    };
    exports2.IPCMessageReader = IPCMessageReader;
    var IPCMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(process2) {
        super();
        this.process = process2;
        this.errorCount = 0;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose);
      }
      write(msg) {
        try {
          if (typeof this.process.send === "function") {
            this.process.send(msg, void 0, void 0, (error) => {
              if (error) {
                this.errorCount++;
                this.handleError(error, msg);
              } else {
                this.errorCount = 0;
              }
            });
          }
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.IPCMessageWriter = IPCMessageWriter;
    var SocketMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(socket, encoding = "utf-8") {
        super(ril_1.default().stream.asReadableStream(socket), encoding);
      }
    };
    exports2.SocketMessageReader = SocketMessageReader;
    var SocketMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(socket, options) {
        super(ril_1.default().stream.asWritableStream(socket), options);
        this.socket = socket;
      }
      dispose() {
        super.dispose();
        this.socket.destroy();
      }
    };
    exports2.SocketMessageWriter = SocketMessageWriter;
    var StreamMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(readble, encoding) {
        super(ril_1.default().stream.asReadableStream(readble), encoding);
      }
    };
    exports2.StreamMessageReader = StreamMessageReader;
    var StreamMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(writable, options) {
        super(ril_1.default().stream.asWritableStream(writable), options);
      }
    };
    exports2.StreamMessageWriter = StreamMessageWriter;
    var XDG_RUNTIME_DIR = process.env["XDG_RUNTIME_DIR"];
    var safeIpcPathLengths = /* @__PURE__ */ new Map([
      ["linux", 107],
      ["darwin", 103]
    ]);
    function generateRandomPipeName() {
      const randomSuffix = crypto_1.randomBytes(21).toString("hex");
      if (process.platform === "win32") {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
      }
      let result;
      if (XDG_RUNTIME_DIR) {
        result = path6.join(XDG_RUNTIME_DIR, `vscode-ipc-${randomSuffix}.sock`);
      } else {
        result = path6.join(os.tmpdir(), `vscode-${randomSuffix}.sock`);
      }
      const limit = safeIpcPathLengths.get(process.platform);
      if (limit !== void 0 && result.length >= limit) {
        ril_1.default().console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} characters.`);
      }
      return result;
    }
    exports2.generateRandomPipeName = generateRandomPipeName;
    function createClientPipeTransport(pipeName, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve3, _reject) => {
        connectResolve = resolve3;
      });
      return new Promise((resolve3, reject) => {
        let server = net_1.createServer((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(pipeName, () => {
          server.removeListener("error", reject);
          resolve3({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientPipeTransport = createClientPipeTransport;
    function createServerPipeTransport(pipeName, encoding = "utf-8") {
      const socket = net_1.createConnection(pipeName);
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerPipeTransport = createServerPipeTransport;
    function createClientSocketTransport(port, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve3, _reject) => {
        connectResolve = resolve3;
      });
      return new Promise((resolve3, reject) => {
        const server = net_1.createServer((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(port, "127.0.0.1", () => {
          server.removeListener("error", reject);
          resolve3({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientSocketTransport = createClientSocketTransport;
    function createServerSocketTransport(port, encoding = "utf-8") {
      const socket = net_1.createConnection(port, "127.0.0.1");
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerSocketTransport = createServerSocketTransport;
    function isReadableStream(value) {
      const candidate = value;
      return candidate.read !== void 0 && candidate.addListener !== void 0;
    }
    function isWritableStream(value) {
      const candidate = value;
      return candidate.write !== void 0 && candidate.addListener !== void 0;
    }
    function createMessageConnection(input, output, logger, options) {
      if (!logger) {
        logger = api_1.NullLogger;
      }
      const reader = isReadableStream(input) ? new StreamMessageReader(input) : input;
      const writer = isWritableStream(output) ? new StreamMessageWriter(output) : output;
      if (api_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return api_1.createMessageConnection(reader, writer, logger, options);
    }
    exports2.createMessageConnection = createMessageConnection;
  }
});

// node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/vscode-jsonrpc@6.0.0/node_modules/vscode-jsonrpc/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main();
  }
});

// node_modules/.pnpm/vscode-languageserver-types@3.16.0/node_modules/vscode-languageserver-types/lib/esm/main.js
var main_exports = {};
__export(main_exports, {
  AnnotatedTextEdit: () => AnnotatedTextEdit,
  ChangeAnnotation: () => ChangeAnnotation,
  ChangeAnnotationIdentifier: () => ChangeAnnotationIdentifier,
  CodeAction: () => CodeAction,
  CodeActionContext: () => CodeActionContext,
  CodeActionKind: () => CodeActionKind,
  CodeDescription: () => CodeDescription,
  CodeLens: () => CodeLens,
  Color: () => Color,
  ColorInformation: () => ColorInformation,
  ColorPresentation: () => ColorPresentation,
  Command: () => Command,
  CompletionItem: () => CompletionItem,
  CompletionItemKind: () => CompletionItemKind,
  CompletionItemTag: () => CompletionItemTag,
  CompletionList: () => CompletionList,
  CreateFile: () => CreateFile,
  DeleteFile: () => DeleteFile,
  Diagnostic: () => Diagnostic,
  DiagnosticRelatedInformation: () => DiagnosticRelatedInformation,
  DiagnosticSeverity: () => DiagnosticSeverity,
  DiagnosticTag: () => DiagnosticTag,
  DocumentHighlight: () => DocumentHighlight,
  DocumentHighlightKind: () => DocumentHighlightKind,
  DocumentLink: () => DocumentLink,
  DocumentSymbol: () => DocumentSymbol,
  EOL: () => EOL,
  FoldingRange: () => FoldingRange,
  FoldingRangeKind: () => FoldingRangeKind,
  FormattingOptions: () => FormattingOptions,
  Hover: () => Hover,
  InsertReplaceEdit: () => InsertReplaceEdit,
  InsertTextFormat: () => InsertTextFormat,
  InsertTextMode: () => InsertTextMode,
  Location: () => Location,
  LocationLink: () => LocationLink,
  MarkedString: () => MarkedString,
  MarkupContent: () => MarkupContent,
  MarkupKind: () => MarkupKind,
  OptionalVersionedTextDocumentIdentifier: () => OptionalVersionedTextDocumentIdentifier,
  ParameterInformation: () => ParameterInformation,
  Position: () => Position,
  Range: () => Range,
  RenameFile: () => RenameFile,
  SelectionRange: () => SelectionRange,
  SignatureInformation: () => SignatureInformation,
  SymbolInformation: () => SymbolInformation,
  SymbolKind: () => SymbolKind,
  SymbolTag: () => SymbolTag,
  TextDocument: () => TextDocument,
  TextDocumentEdit: () => TextDocumentEdit,
  TextDocumentIdentifier: () => TextDocumentIdentifier,
  TextDocumentItem: () => TextDocumentItem,
  TextEdit: () => TextEdit,
  VersionedTextDocumentIdentifier: () => VersionedTextDocumentIdentifier,
  WorkspaceChange: () => WorkspaceChange,
  WorkspaceEdit: () => WorkspaceEdit,
  integer: () => integer,
  uinteger: () => uinteger
});
var integer, uinteger, Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity, DiagnosticTag, CodeDescription, Diagnostic, Command, TextEdit, ChangeAnnotation, ChangeAnnotationIdentifier, AnnotatedTextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, TextEditChangeImpl, ChangeAnnotations, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, OptionalVersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, MarkupContent, CompletionItemKind, InsertTextFormat, CompletionItemTag, InsertReplaceEdit, InsertTextMode, CompletionItem, CompletionList, MarkedString, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolTag, SymbolInformation, DocumentSymbol, CodeActionKind, CodeActionContext, CodeAction, CodeLens, FormattingOptions, DocumentLink, SelectionRange, EOL, TextDocument, FullTextDocument, Is;
var init_main = __esm({
  "node_modules/.pnpm/vscode-languageserver-types@3.16.0/node_modules/vscode-languageserver-types/lib/esm/main.js"() {
    "use strict";
    (function(integer2) {
      integer2.MIN_VALUE = -2147483648;
      integer2.MAX_VALUE = 2147483647;
    })(integer || (integer = {}));
    (function(uinteger2) {
      uinteger2.MIN_VALUE = 0;
      uinteger2.MAX_VALUE = 2147483647;
    })(uinteger || (uinteger = {}));
    (function(Position5) {
      function create(line, character) {
        if (line === Number.MAX_VALUE) {
          line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
          character = uinteger.MAX_VALUE;
        }
        return { line, character };
      }
      Position5.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
      }
      Position5.is = is;
    })(Position || (Position = {}));
    (function(Range5) {
      function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
          return { start: Position.create(one, two), end: Position.create(three, four) };
        } else if (Position.is(one) && Position.is(two)) {
          return { start: one, end: two };
        } else {
          throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
      }
      Range5.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
      }
      Range5.is = is;
    })(Range || (Range = {}));
    (function(Location3) {
      function create(uri, range) {
        return { uri, range };
      }
      Location3.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
      }
      Location3.is = is;
    })(Location || (Location = {}));
    (function(LocationLink2) {
      function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
      }
      LocationLink2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
      }
      LocationLink2.is = is;
    })(LocationLink || (LocationLink = {}));
    (function(Color2) {
      function create(red, green, blue, alpha) {
        return {
          red,
          green,
          blue,
          alpha
        };
      }
      Color2.create = create;
      function is(value) {
        var candidate = value;
        return Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
      }
      Color2.is = is;
    })(Color || (Color = {}));
    (function(ColorInformation2) {
      function create(range, color) {
        return {
          range,
          color
        };
      }
      ColorInformation2.create = create;
      function is(value) {
        var candidate = value;
        return Range.is(candidate.range) && Color.is(candidate.color);
      }
      ColorInformation2.is = is;
    })(ColorInformation || (ColorInformation = {}));
    (function(ColorPresentation2) {
      function create(label, textEdit, additionalTextEdits) {
        return {
          label,
          textEdit,
          additionalTextEdits
        };
      }
      ColorPresentation2.create = create;
      function is(value) {
        var candidate = value;
        return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
      }
      ColorPresentation2.is = is;
    })(ColorPresentation || (ColorPresentation = {}));
    (function(FoldingRangeKind2) {
      FoldingRangeKind2["Comment"] = "comment";
      FoldingRangeKind2["Imports"] = "imports";
      FoldingRangeKind2["Region"] = "region";
    })(FoldingRangeKind || (FoldingRangeKind = {}));
    (function(FoldingRange2) {
      function create(startLine, endLine, startCharacter, endCharacter, kind) {
        var result = {
          startLine,
          endLine
        };
        if (Is.defined(startCharacter)) {
          result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
          result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
          result.kind = kind;
        }
        return result;
      }
      FoldingRange2.create = create;
      function is(value) {
        var candidate = value;
        return Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
      }
      FoldingRange2.is = is;
    })(FoldingRange || (FoldingRange = {}));
    (function(DiagnosticRelatedInformation2) {
      function create(location, message) {
        return {
          location,
          message
        };
      }
      DiagnosticRelatedInformation2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
      }
      DiagnosticRelatedInformation2.is = is;
    })(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
    (function(DiagnosticSeverity3) {
      DiagnosticSeverity3.Error = 1;
      DiagnosticSeverity3.Warning = 2;
      DiagnosticSeverity3.Information = 3;
      DiagnosticSeverity3.Hint = 4;
    })(DiagnosticSeverity || (DiagnosticSeverity = {}));
    (function(DiagnosticTag2) {
      DiagnosticTag2.Unnecessary = 1;
      DiagnosticTag2.Deprecated = 2;
    })(DiagnosticTag || (DiagnosticTag = {}));
    (function(CodeDescription2) {
      function is(value) {
        var candidate = value;
        return candidate !== void 0 && candidate !== null && Is.string(candidate.href);
      }
      CodeDescription2.is = is;
    })(CodeDescription || (CodeDescription = {}));
    (function(Diagnostic3) {
      function create(range, message, severity, code, source, relatedInformation) {
        var result = { range, message };
        if (Is.defined(severity)) {
          result.severity = severity;
        }
        if (Is.defined(code)) {
          result.code = code;
        }
        if (Is.defined(source)) {
          result.source = source;
        }
        if (Is.defined(relatedInformation)) {
          result.relatedInformation = relatedInformation;
        }
        return result;
      }
      Diagnostic3.create = create;
      function is(value) {
        var _a;
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
      }
      Diagnostic3.is = is;
    })(Diagnostic || (Diagnostic = {}));
    (function(Command2) {
      function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        var result = { title, command };
        if (Is.defined(args) && args.length > 0) {
          result.arguments = args;
        }
        return result;
      }
      Command2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
      }
      Command2.is = is;
    })(Command || (Command = {}));
    (function(TextEdit2) {
      function replace(range, newText) {
        return { range, newText };
      }
      TextEdit2.replace = replace;
      function insert(position, newText) {
        return { range: { start: position, end: position }, newText };
      }
      TextEdit2.insert = insert;
      function del(range) {
        return { range, newText: "" };
      }
      TextEdit2.del = del;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
      }
      TextEdit2.is = is;
    })(TextEdit || (TextEdit = {}));
    (function(ChangeAnnotation2) {
      function create(label, needsConfirmation, description) {
        var result = { label };
        if (needsConfirmation !== void 0) {
          result.needsConfirmation = needsConfirmation;
        }
        if (description !== void 0) {
          result.description = description;
        }
        return result;
      }
      ChangeAnnotation2.create = create;
      function is(value) {
        var candidate = value;
        return candidate !== void 0 && Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
      }
      ChangeAnnotation2.is = is;
    })(ChangeAnnotation || (ChangeAnnotation = {}));
    (function(ChangeAnnotationIdentifier2) {
      function is(value) {
        var candidate = value;
        return typeof candidate === "string";
      }
      ChangeAnnotationIdentifier2.is = is;
    })(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
    (function(AnnotatedTextEdit2) {
      function replace(range, newText, annotation) {
        return { range, newText, annotationId: annotation };
      }
      AnnotatedTextEdit2.replace = replace;
      function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText, annotationId: annotation };
      }
      AnnotatedTextEdit2.insert = insert;
      function del(range, annotation) {
        return { range, newText: "", annotationId: annotation };
      }
      AnnotatedTextEdit2.del = del;
      function is(value) {
        var candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      AnnotatedTextEdit2.is = is;
    })(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
    (function(TextDocumentEdit2) {
      function create(textDocument, edits) {
        return { textDocument, edits };
      }
      TextDocumentEdit2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
      }
      TextDocumentEdit2.is = is;
    })(TextDocumentEdit || (TextDocumentEdit = {}));
    (function(CreateFile2) {
      function create(uri, options, annotation) {
        var result = {
          kind: "create",
          uri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
          result.options = options;
        }
        if (annotation !== void 0) {
          result.annotationId = annotation;
        }
        return result;
      }
      CreateFile2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      CreateFile2.is = is;
    })(CreateFile || (CreateFile = {}));
    (function(RenameFile2) {
      function create(oldUri, newUri, options, annotation) {
        var result = {
          kind: "rename",
          oldUri,
          newUri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
          result.options = options;
        }
        if (annotation !== void 0) {
          result.annotationId = annotation;
        }
        return result;
      }
      RenameFile2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      RenameFile2.is = is;
    })(RenameFile || (RenameFile = {}));
    (function(DeleteFile2) {
      function create(uri, options, annotation) {
        var result = {
          kind: "delete",
          uri
        };
        if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
          result.options = options;
        }
        if (annotation !== void 0) {
          result.annotationId = annotation;
        }
        return result;
      }
      DeleteFile2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      DeleteFile2.is = is;
    })(DeleteFile || (DeleteFile = {}));
    (function(WorkspaceEdit2) {
      function is(value) {
        var candidate = value;
        return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
          if (Is.string(change.kind)) {
            return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
          } else {
            return TextDocumentEdit.is(change);
          }
        }));
      }
      WorkspaceEdit2.is = is;
    })(WorkspaceEdit || (WorkspaceEdit = {}));
    TextEditChangeImpl = function() {
      function TextEditChangeImpl2(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
      }
      TextEditChangeImpl2.prototype.insert = function(position, newText, annotation) {
        var edit2;
        var id2;
        if (annotation === void 0) {
          edit2 = TextEdit.insert(position, newText);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id2 = annotation;
          edit2 = AnnotatedTextEdit.insert(position, newText, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id2 = this.changeAnnotations.manage(annotation);
          edit2 = AnnotatedTextEdit.insert(position, newText, id2);
        }
        this.edits.push(edit2);
        if (id2 !== void 0) {
          return id2;
        }
      };
      TextEditChangeImpl2.prototype.replace = function(range, newText, annotation) {
        var edit2;
        var id2;
        if (annotation === void 0) {
          edit2 = TextEdit.replace(range, newText);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id2 = annotation;
          edit2 = AnnotatedTextEdit.replace(range, newText, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id2 = this.changeAnnotations.manage(annotation);
          edit2 = AnnotatedTextEdit.replace(range, newText, id2);
        }
        this.edits.push(edit2);
        if (id2 !== void 0) {
          return id2;
        }
      };
      TextEditChangeImpl2.prototype.delete = function(range, annotation) {
        var edit2;
        var id2;
        if (annotation === void 0) {
          edit2 = TextEdit.del(range);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id2 = annotation;
          edit2 = AnnotatedTextEdit.del(range, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id2 = this.changeAnnotations.manage(annotation);
          edit2 = AnnotatedTextEdit.del(range, id2);
        }
        this.edits.push(edit2);
        if (id2 !== void 0) {
          return id2;
        }
      };
      TextEditChangeImpl2.prototype.add = function(edit2) {
        this.edits.push(edit2);
      };
      TextEditChangeImpl2.prototype.all = function() {
        return this.edits;
      };
      TextEditChangeImpl2.prototype.clear = function() {
        this.edits.splice(0, this.edits.length);
      };
      TextEditChangeImpl2.prototype.assertChangeAnnotations = function(value) {
        if (value === void 0) {
          throw new Error("Text edit change is not configured to manage change annotations.");
        }
      };
      return TextEditChangeImpl2;
    }();
    ChangeAnnotations = function() {
      function ChangeAnnotations2(annotations) {
        this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
      }
      ChangeAnnotations2.prototype.all = function() {
        return this._annotations;
      };
      Object.defineProperty(ChangeAnnotations2.prototype, "size", {
        get: function() {
          return this._size;
        },
        enumerable: false,
        configurable: true
      });
      ChangeAnnotations2.prototype.manage = function(idOrAnnotation, annotation) {
        var id2;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
          id2 = idOrAnnotation;
        } else {
          id2 = this.nextId();
          annotation = idOrAnnotation;
        }
        if (this._annotations[id2] !== void 0) {
          throw new Error("Id " + id2 + " is already in use.");
        }
        if (annotation === void 0) {
          throw new Error("No annotation provided for id " + id2);
        }
        this._annotations[id2] = annotation;
        this._size++;
        return id2;
      };
      ChangeAnnotations2.prototype.nextId = function() {
        this._counter++;
        return this._counter.toString();
      };
      return ChangeAnnotations2;
    }();
    WorkspaceChange = function() {
      function WorkspaceChange2(workspaceEdit) {
        var _this = this;
        this._textEditChanges = /* @__PURE__ */ Object.create(null);
        if (workspaceEdit !== void 0) {
          this._workspaceEdit = workspaceEdit;
          if (workspaceEdit.documentChanges) {
            this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
            workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            workspaceEdit.documentChanges.forEach(function(change) {
              if (TextDocumentEdit.is(change)) {
                var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                _this._textEditChanges[change.textDocument.uri] = textEditChange;
              }
            });
          } else if (workspaceEdit.changes) {
            Object.keys(workspaceEdit.changes).forEach(function(key) {
              var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
              _this._textEditChanges[key] = textEditChange;
            });
          }
        } else {
          this._workspaceEdit = {};
        }
      }
      Object.defineProperty(WorkspaceChange2.prototype, "edit", {
        get: function() {
          this.initDocumentChanges();
          if (this._changeAnnotations !== void 0) {
            if (this._changeAnnotations.size === 0) {
              this._workspaceEdit.changeAnnotations = void 0;
            } else {
              this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            }
          }
          return this._workspaceEdit;
        },
        enumerable: false,
        configurable: true
      });
      WorkspaceChange2.prototype.getTextEditChange = function(key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
          this.initDocumentChanges();
          if (this._workspaceEdit.documentChanges === void 0) {
            throw new Error("Workspace edit is not configured for document changes.");
          }
          var textDocument = { uri: key.uri, version: key.version };
          var result = this._textEditChanges[textDocument.uri];
          if (!result) {
            var edits = [];
            var textDocumentEdit = {
              textDocument,
              edits
            };
            this._workspaceEdit.documentChanges.push(textDocumentEdit);
            result = new TextEditChangeImpl(edits, this._changeAnnotations);
            this._textEditChanges[textDocument.uri] = result;
          }
          return result;
        } else {
          this.initChanges();
          if (this._workspaceEdit.changes === void 0) {
            throw new Error("Workspace edit is not configured for normal text edit changes.");
          }
          var result = this._textEditChanges[key];
          if (!result) {
            var edits = [];
            this._workspaceEdit.changes[key] = edits;
            result = new TextEditChangeImpl(edits);
            this._textEditChanges[key] = result;
          }
          return result;
        }
      };
      WorkspaceChange2.prototype.initDocumentChanges = function() {
        if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
          this._changeAnnotations = new ChangeAnnotations();
          this._workspaceEdit.documentChanges = [];
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      };
      WorkspaceChange2.prototype.initChanges = function() {
        if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
          this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
        }
      };
      WorkspaceChange2.prototype.createFile = function(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        var operation;
        var id2;
        if (annotation === void 0) {
          operation = CreateFile.create(uri, options);
        } else {
          id2 = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = CreateFile.create(uri, options, id2);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id2 !== void 0) {
          return id2;
        }
      };
      WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        var operation;
        var id2;
        if (annotation === void 0) {
          operation = RenameFile.create(oldUri, newUri, options);
        } else {
          id2 = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = RenameFile.create(oldUri, newUri, options, id2);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id2 !== void 0) {
          return id2;
        }
      };
      WorkspaceChange2.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        var operation;
        var id2;
        if (annotation === void 0) {
          operation = DeleteFile.create(uri, options);
        } else {
          id2 = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = DeleteFile.create(uri, options, id2);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id2 !== void 0) {
          return id2;
        }
      };
      return WorkspaceChange2;
    }();
    (function(TextDocumentIdentifier2) {
      function create(uri) {
        return { uri };
      }
      TextDocumentIdentifier2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
      }
      TextDocumentIdentifier2.is = is;
    })(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
    (function(VersionedTextDocumentIdentifier2) {
      function create(uri, version) {
        return { uri, version };
      }
      VersionedTextDocumentIdentifier2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
      }
      VersionedTextDocumentIdentifier2.is = is;
    })(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
    (function(OptionalVersionedTextDocumentIdentifier2) {
      function create(uri, version) {
        return { uri, version };
      }
      OptionalVersionedTextDocumentIdentifier2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
      }
      OptionalVersionedTextDocumentIdentifier2.is = is;
    })(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
    (function(TextDocumentItem2) {
      function create(uri, languageId, version, text) {
        return { uri, languageId, version, text };
      }
      TextDocumentItem2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
      }
      TextDocumentItem2.is = is;
    })(TextDocumentItem || (TextDocumentItem = {}));
    (function(MarkupKind3) {
      MarkupKind3.PlainText = "plaintext";
      MarkupKind3.Markdown = "markdown";
    })(MarkupKind || (MarkupKind = {}));
    (function(MarkupKind3) {
      function is(value) {
        var candidate = value;
        return candidate === MarkupKind3.PlainText || candidate === MarkupKind3.Markdown;
      }
      MarkupKind3.is = is;
    })(MarkupKind || (MarkupKind = {}));
    (function(MarkupContent2) {
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
      }
      MarkupContent2.is = is;
    })(MarkupContent || (MarkupContent = {}));
    (function(CompletionItemKind4) {
      CompletionItemKind4.Text = 1;
      CompletionItemKind4.Method = 2;
      CompletionItemKind4.Function = 3;
      CompletionItemKind4.Constructor = 4;
      CompletionItemKind4.Field = 5;
      CompletionItemKind4.Variable = 6;
      CompletionItemKind4.Class = 7;
      CompletionItemKind4.Interface = 8;
      CompletionItemKind4.Module = 9;
      CompletionItemKind4.Property = 10;
      CompletionItemKind4.Unit = 11;
      CompletionItemKind4.Value = 12;
      CompletionItemKind4.Enum = 13;
      CompletionItemKind4.Keyword = 14;
      CompletionItemKind4.Snippet = 15;
      CompletionItemKind4.Color = 16;
      CompletionItemKind4.File = 17;
      CompletionItemKind4.Reference = 18;
      CompletionItemKind4.Folder = 19;
      CompletionItemKind4.EnumMember = 20;
      CompletionItemKind4.Constant = 21;
      CompletionItemKind4.Struct = 22;
      CompletionItemKind4.Event = 23;
      CompletionItemKind4.Operator = 24;
      CompletionItemKind4.TypeParameter = 25;
    })(CompletionItemKind || (CompletionItemKind = {}));
    (function(InsertTextFormat2) {
      InsertTextFormat2.PlainText = 1;
      InsertTextFormat2.Snippet = 2;
    })(InsertTextFormat || (InsertTextFormat = {}));
    (function(CompletionItemTag2) {
      CompletionItemTag2.Deprecated = 1;
    })(CompletionItemTag || (CompletionItemTag = {}));
    (function(InsertReplaceEdit2) {
      function create(newText, insert, replace) {
        return { newText, insert, replace };
      }
      InsertReplaceEdit2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
      }
      InsertReplaceEdit2.is = is;
    })(InsertReplaceEdit || (InsertReplaceEdit = {}));
    (function(InsertTextMode2) {
      InsertTextMode2.asIs = 1;
      InsertTextMode2.adjustIndentation = 2;
    })(InsertTextMode || (InsertTextMode = {}));
    (function(CompletionItem4) {
      function create(label) {
        return { label };
      }
      CompletionItem4.create = create;
    })(CompletionItem || (CompletionItem = {}));
    (function(CompletionList2) {
      function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
      }
      CompletionList2.create = create;
    })(CompletionList || (CompletionList = {}));
    (function(MarkedString2) {
      function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
      }
      MarkedString2.fromPlainText = fromPlainText;
      function is(value) {
        var candidate = value;
        return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
      }
      MarkedString2.is = is;
    })(MarkedString || (MarkedString = {}));
    (function(Hover2) {
      function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
      }
      Hover2.is = is;
    })(Hover || (Hover = {}));
    (function(ParameterInformation3) {
      function create(label, documentation) {
        return documentation ? { label, documentation } : { label };
      }
      ParameterInformation3.create = create;
    })(ParameterInformation || (ParameterInformation = {}));
    (function(SignatureInformation3) {
      function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          parameters[_i - 2] = arguments[_i];
        }
        var result = { label };
        if (Is.defined(documentation)) {
          result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
          result.parameters = parameters;
        } else {
          result.parameters = [];
        }
        return result;
      }
      SignatureInformation3.create = create;
    })(SignatureInformation || (SignatureInformation = {}));
    (function(DocumentHighlightKind2) {
      DocumentHighlightKind2.Text = 1;
      DocumentHighlightKind2.Read = 2;
      DocumentHighlightKind2.Write = 3;
    })(DocumentHighlightKind || (DocumentHighlightKind = {}));
    (function(DocumentHighlight2) {
      function create(range, kind) {
        var result = { range };
        if (Is.number(kind)) {
          result.kind = kind;
        }
        return result;
      }
      DocumentHighlight2.create = create;
    })(DocumentHighlight || (DocumentHighlight = {}));
    (function(SymbolKind2) {
      SymbolKind2.File = 1;
      SymbolKind2.Module = 2;
      SymbolKind2.Namespace = 3;
      SymbolKind2.Package = 4;
      SymbolKind2.Class = 5;
      SymbolKind2.Method = 6;
      SymbolKind2.Property = 7;
      SymbolKind2.Field = 8;
      SymbolKind2.Constructor = 9;
      SymbolKind2.Enum = 10;
      SymbolKind2.Interface = 11;
      SymbolKind2.Function = 12;
      SymbolKind2.Variable = 13;
      SymbolKind2.Constant = 14;
      SymbolKind2.String = 15;
      SymbolKind2.Number = 16;
      SymbolKind2.Boolean = 17;
      SymbolKind2.Array = 18;
      SymbolKind2.Object = 19;
      SymbolKind2.Key = 20;
      SymbolKind2.Null = 21;
      SymbolKind2.EnumMember = 22;
      SymbolKind2.Struct = 23;
      SymbolKind2.Event = 24;
      SymbolKind2.Operator = 25;
      SymbolKind2.TypeParameter = 26;
    })(SymbolKind || (SymbolKind = {}));
    (function(SymbolTag2) {
      SymbolTag2.Deprecated = 1;
    })(SymbolTag || (SymbolTag = {}));
    (function(SymbolInformation2) {
      function create(name, kind, range, uri, containerName) {
        var result = {
          name,
          kind,
          location: { uri, range }
        };
        if (containerName) {
          result.containerName = containerName;
        }
        return result;
      }
      SymbolInformation2.create = create;
    })(SymbolInformation || (SymbolInformation = {}));
    (function(DocumentSymbol2) {
      function create(name, detail, kind, range, selectionRange, children) {
        var result = {
          name,
          detail,
          kind,
          range,
          selectionRange
        };
        if (children !== void 0) {
          result.children = children;
        }
        return result;
      }
      DocumentSymbol2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
      }
      DocumentSymbol2.is = is;
    })(DocumentSymbol || (DocumentSymbol = {}));
    (function(CodeActionKind2) {
      CodeActionKind2.Empty = "";
      CodeActionKind2.QuickFix = "quickfix";
      CodeActionKind2.Refactor = "refactor";
      CodeActionKind2.RefactorExtract = "refactor.extract";
      CodeActionKind2.RefactorInline = "refactor.inline";
      CodeActionKind2.RefactorRewrite = "refactor.rewrite";
      CodeActionKind2.Source = "source";
      CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
      CodeActionKind2.SourceFixAll = "source.fixAll";
    })(CodeActionKind || (CodeActionKind = {}));
    (function(CodeActionContext2) {
      function create(diagnostics, only) {
        var result = { diagnostics };
        if (only !== void 0 && only !== null) {
          result.only = only;
        }
        return result;
      }
      CodeActionContext2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
      }
      CodeActionContext2.is = is;
    })(CodeActionContext || (CodeActionContext = {}));
    (function(CodeAction2) {
      function create(title, kindOrCommandOrEdit, kind) {
        var result = { title };
        var checkKind = true;
        if (typeof kindOrCommandOrEdit === "string") {
          checkKind = false;
          result.kind = kindOrCommandOrEdit;
        } else if (Command.is(kindOrCommandOrEdit)) {
          result.command = kindOrCommandOrEdit;
        } else {
          result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== void 0) {
          result.kind = kind;
        }
        return result;
      }
      CodeAction2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
      }
      CodeAction2.is = is;
    })(CodeAction || (CodeAction = {}));
    (function(CodeLens2) {
      function create(range, data) {
        var result = { range };
        if (Is.defined(data)) {
          result.data = data;
        }
        return result;
      }
      CodeLens2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
      }
      CodeLens2.is = is;
    })(CodeLens || (CodeLens = {}));
    (function(FormattingOptions2) {
      function create(tabSize, insertSpaces) {
        return { tabSize, insertSpaces };
      }
      FormattingOptions2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
      }
      FormattingOptions2.is = is;
    })(FormattingOptions || (FormattingOptions = {}));
    (function(DocumentLink2) {
      function create(range, target, data) {
        return { range, target, data };
      }
      DocumentLink2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
      }
      DocumentLink2.is = is;
    })(DocumentLink || (DocumentLink = {}));
    (function(SelectionRange2) {
      function create(range, parent) {
        return { range, parent };
      }
      SelectionRange2.create = create;
      function is(value) {
        var candidate = value;
        return candidate !== void 0 && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
      }
      SelectionRange2.is = is;
    })(SelectionRange || (SelectionRange = {}));
    EOL = ["\n", "\r\n", "\r"];
    (function(TextDocument3) {
      function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
      }
      TextDocument3.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
      }
      TextDocument3.is = is;
      function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort2(edits, function(a, b) {
          var diff = a.range.start.line - b.range.start.line;
          if (diff === 0) {
            return a.range.start.character - b.range.start.character;
          }
          return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
          var e = sortedEdits[i];
          var startOffset = document.offsetAt(e.range.start);
          var endOffset = document.offsetAt(e.range.end);
          if (endOffset <= lastModifiedOffset) {
            text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
          } else {
            throw new Error("Overlapping edit");
          }
          lastModifiedOffset = startOffset;
        }
        return text;
      }
      TextDocument3.applyEdits = applyEdits;
      function mergeSort2(data, compare) {
        if (data.length <= 1) {
          return data;
        }
        var p = data.length / 2 | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort2(left, compare);
        mergeSort2(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
          var ret = compare(left[leftIdx], right[rightIdx]);
          if (ret <= 0) {
            data[i++] = left[leftIdx++];
          } else {
            data[i++] = right[rightIdx++];
          }
        }
        while (leftIdx < left.length) {
          data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
          data[i++] = right[rightIdx++];
        }
        return data;
      }
    })(TextDocument || (TextDocument = {}));
    FullTextDocument = function() {
      function FullTextDocument3(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = void 0;
      }
      Object.defineProperty(FullTextDocument3.prototype, "uri", {
        get: function() {
          return this._uri;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FullTextDocument3.prototype, "languageId", {
        get: function() {
          return this._languageId;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FullTextDocument3.prototype, "version", {
        get: function() {
          return this._version;
        },
        enumerable: false,
        configurable: true
      });
      FullTextDocument3.prototype.getText = function(range) {
        if (range) {
          var start = this.offsetAt(range.start);
          var end = this.offsetAt(range.end);
          return this._content.substring(start, end);
        }
        return this._content;
      };
      FullTextDocument3.prototype.update = function(event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = void 0;
      };
      FullTextDocument3.prototype.getLineOffsets = function() {
        if (this._lineOffsets === void 0) {
          var lineOffsets = [];
          var text = this._content;
          var isLineStart = true;
          for (var i = 0; i < text.length; i++) {
            if (isLineStart) {
              lineOffsets.push(i);
              isLineStart = false;
            }
            var ch = text.charAt(i);
            isLineStart = ch === "\r" || ch === "\n";
            if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
              i++;
            }
          }
          if (isLineStart && text.length > 0) {
            lineOffsets.push(text.length);
          }
          this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
      };
      FullTextDocument3.prototype.positionAt = function(offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
          return Position.create(0, offset);
        }
        while (low < high) {
          var mid = Math.floor((low + high) / 2);
          if (lineOffsets[mid] > offset) {
            high = mid;
          } else {
            low = mid + 1;
          }
        }
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
      };
      FullTextDocument3.prototype.offsetAt = function(position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
          return this._content.length;
        } else if (position.line < 0) {
          return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
      };
      Object.defineProperty(FullTextDocument3.prototype, "lineCount", {
        get: function() {
          return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
      });
      return FullTextDocument3;
    }();
    (function(Is2) {
      var toString = Object.prototype.toString;
      function defined(value) {
        return typeof value !== "undefined";
      }
      Is2.defined = defined;
      function undefined2(value) {
        return typeof value === "undefined";
      }
      Is2.undefined = undefined2;
      function boolean(value) {
        return value === true || value === false;
      }
      Is2.boolean = boolean;
      function string(value) {
        return toString.call(value) === "[object String]";
      }
      Is2.string = string;
      function number(value) {
        return toString.call(value) === "[object Number]";
      }
      Is2.number = number;
      function numberRange(value, min, max) {
        return toString.call(value) === "[object Number]" && min <= value && value <= max;
      }
      Is2.numberRange = numberRange;
      function integer2(value) {
        return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
      }
      Is2.integer = integer2;
      function uinteger2(value) {
        return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
      }
      Is2.uinteger = uinteger2;
      function func(value) {
        return toString.call(value) === "[object Function]";
      }
      Is2.func = func;
      function objectLiteral(value) {
        return value !== null && typeof value === "object";
      }
      Is2.objectLiteral = objectLiteral;
      function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
      }
      Is2.typedArray = typedArray;
    })(Is || (Is = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/messages.js
var require_messages2 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProtocolNotificationType = exports2.ProtocolNotificationType0 = exports2.ProtocolRequestType = exports2.ProtocolRequestType0 = exports2.RegistrationType = void 0;
    var vscode_jsonrpc_1 = require_main();
    var RegistrationType = class {
      constructor(method) {
        this.method = method;
      }
    };
    exports2.RegistrationType = RegistrationType;
    var ProtocolRequestType0 = class extends vscode_jsonrpc_1.RequestType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolRequestType0 = ProtocolRequestType0;
    var ProtocolRequestType = class extends vscode_jsonrpc_1.RequestType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports2.ProtocolRequestType = ProtocolRequestType;
    var ProtocolNotificationType0 = class extends vscode_jsonrpc_1.NotificationType0 {
      constructor(method) {
        super(method);
      }
    };
    exports2.ProtocolNotificationType0 = ProtocolNotificationType0;
    var ProtocolNotificationType = class extends vscode_jsonrpc_1.NotificationType {
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports2.ProtocolNotificationType = ProtocolNotificationType;
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js
var require_is3 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.objectLiteral = exports2.typedArray = exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    exports2.typedArray = typedArray;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    exports2.objectLiteral = objectLiteral;
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js
var require_protocol_implementation = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ImplementationRequest = void 0;
    var messages_1 = require_messages2();
    var ImplementationRequest;
    (function(ImplementationRequest2) {
      ImplementationRequest2.method = "textDocument/implementation";
      ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
    })(ImplementationRequest = exports2.ImplementationRequest || (exports2.ImplementationRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypeDefinitionRequest = void 0;
    var messages_1 = require_messages2();
    var TypeDefinitionRequest;
    (function(TypeDefinitionRequest2) {
      TypeDefinitionRequest2.method = "textDocument/typeDefinition";
      TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
    })(TypeDefinitionRequest = exports2.TypeDefinitionRequest || (exports2.TypeDefinitionRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolders.js
var require_protocol_workspaceFolders = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = void 0;
    var messages_1 = require_messages2();
    var WorkspaceFoldersRequest;
    (function(WorkspaceFoldersRequest2) {
      WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0("workspace/workspaceFolders");
    })(WorkspaceFoldersRequest = exports2.WorkspaceFoldersRequest || (exports2.WorkspaceFoldersRequest = {}));
    var DidChangeWorkspaceFoldersNotification;
    (function(DidChangeWorkspaceFoldersNotification2) {
      DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType("workspace/didChangeWorkspaceFolders");
    })(DidChangeWorkspaceFoldersNotification = exports2.DidChangeWorkspaceFoldersNotification || (exports2.DidChangeWorkspaceFoldersNotification = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js
var require_protocol_configuration = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigurationRequest = void 0;
    var messages_1 = require_messages2();
    var ConfigurationRequest;
    (function(ConfigurationRequest2) {
      ConfigurationRequest2.type = new messages_1.ProtocolRequestType("workspace/configuration");
    })(ConfigurationRequest = exports2.ConfigurationRequest || (exports2.ConfigurationRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ColorPresentationRequest = exports2.DocumentColorRequest = void 0;
    var messages_1 = require_messages2();
    var DocumentColorRequest;
    (function(DocumentColorRequest2) {
      DocumentColorRequest2.method = "textDocument/documentColor";
      DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
    })(DocumentColorRequest = exports2.DocumentColorRequest || (exports2.DocumentColorRequest = {}));
    var ColorPresentationRequest;
    (function(ColorPresentationRequest2) {
      ColorPresentationRequest2.type = new messages_1.ProtocolRequestType("textDocument/colorPresentation");
    })(ColorPresentationRequest = exports2.ColorPresentationRequest || (exports2.ColorPresentationRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FoldingRangeRequest = exports2.FoldingRangeKind = void 0;
    var messages_1 = require_messages2();
    var FoldingRangeKind2;
    (function(FoldingRangeKind3) {
      FoldingRangeKind3["Comment"] = "comment";
      FoldingRangeKind3["Imports"] = "imports";
      FoldingRangeKind3["Region"] = "region";
    })(FoldingRangeKind2 = exports2.FoldingRangeKind || (exports2.FoldingRangeKind = {}));
    var FoldingRangeRequest;
    (function(FoldingRangeRequest2) {
      FoldingRangeRequest2.method = "textDocument/foldingRange";
      FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
    })(FoldingRangeRequest = exports2.FoldingRangeRequest || (exports2.FoldingRangeRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js
var require_protocol_declaration = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DeclarationRequest = void 0;
    var messages_1 = require_messages2();
    var DeclarationRequest;
    (function(DeclarationRequest2) {
      DeclarationRequest2.method = "textDocument/declaration";
      DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
    })(DeclarationRequest = exports2.DeclarationRequest || (exports2.DeclarationRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SelectionRangeRequest = void 0;
    var messages_1 = require_messages2();
    var SelectionRangeRequest;
    (function(SelectionRangeRequest2) {
      SelectionRangeRequest2.method = "textDocument/selectionRange";
      SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
    })(SelectionRangeRequest = exports2.SelectionRangeRequest || (exports2.SelectionRangeRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js
var require_protocol_progress = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCreateRequest = exports2.WorkDoneProgress = void 0;
    var vscode_jsonrpc_1 = require_main();
    var messages_1 = require_messages2();
    var WorkDoneProgress;
    (function(WorkDoneProgress2) {
      WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
      function is(value) {
        return value === WorkDoneProgress2.type;
      }
      WorkDoneProgress2.is = is;
    })(WorkDoneProgress = exports2.WorkDoneProgress || (exports2.WorkDoneProgress = {}));
    var WorkDoneProgressCreateRequest;
    (function(WorkDoneProgressCreateRequest2) {
      WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType("window/workDoneProgress/create");
    })(WorkDoneProgressCreateRequest = exports2.WorkDoneProgressCreateRequest || (exports2.WorkDoneProgressCreateRequest = {}));
    var WorkDoneProgressCancelNotification;
    (function(WorkDoneProgressCancelNotification2) {
      WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType("window/workDoneProgress/cancel");
    })(WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCancelNotification || (exports2.WorkDoneProgressCancelNotification = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js
var require_protocol_callHierarchy = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyIncomingCallsRequest = exports2.CallHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var CallHierarchyPrepareRequest;
    (function(CallHierarchyPrepareRequest2) {
      CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
      CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
    })(CallHierarchyPrepareRequest = exports2.CallHierarchyPrepareRequest || (exports2.CallHierarchyPrepareRequest = {}));
    var CallHierarchyIncomingCallsRequest;
    (function(CallHierarchyIncomingCallsRequest2) {
      CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
      CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
    })(CallHierarchyIncomingCallsRequest = exports2.CallHierarchyIncomingCallsRequest || (exports2.CallHierarchyIncomingCallsRequest = {}));
    var CallHierarchyOutgoingCallsRequest;
    (function(CallHierarchyOutgoingCallsRequest2) {
      CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
      CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
    })(CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyOutgoingCallsRequest || (exports2.CallHierarchyOutgoingCallsRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js
var require_protocol_semanticTokens = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticTokensRefreshRequest = exports2.SemanticTokensRangeRequest = exports2.SemanticTokensDeltaRequest = exports2.SemanticTokensRequest = exports2.SemanticTokensRegistrationType = exports2.TokenFormat = exports2.SemanticTokens = exports2.SemanticTokenModifiers = exports2.SemanticTokenTypes = void 0;
    var messages_1 = require_messages2();
    var SemanticTokenTypes;
    (function(SemanticTokenTypes2) {
      SemanticTokenTypes2["namespace"] = "namespace";
      SemanticTokenTypes2["type"] = "type";
      SemanticTokenTypes2["class"] = "class";
      SemanticTokenTypes2["enum"] = "enum";
      SemanticTokenTypes2["interface"] = "interface";
      SemanticTokenTypes2["struct"] = "struct";
      SemanticTokenTypes2["typeParameter"] = "typeParameter";
      SemanticTokenTypes2["parameter"] = "parameter";
      SemanticTokenTypes2["variable"] = "variable";
      SemanticTokenTypes2["property"] = "property";
      SemanticTokenTypes2["enumMember"] = "enumMember";
      SemanticTokenTypes2["event"] = "event";
      SemanticTokenTypes2["function"] = "function";
      SemanticTokenTypes2["method"] = "method";
      SemanticTokenTypes2["macro"] = "macro";
      SemanticTokenTypes2["keyword"] = "keyword";
      SemanticTokenTypes2["modifier"] = "modifier";
      SemanticTokenTypes2["comment"] = "comment";
      SemanticTokenTypes2["string"] = "string";
      SemanticTokenTypes2["number"] = "number";
      SemanticTokenTypes2["regexp"] = "regexp";
      SemanticTokenTypes2["operator"] = "operator";
    })(SemanticTokenTypes = exports2.SemanticTokenTypes || (exports2.SemanticTokenTypes = {}));
    var SemanticTokenModifiers;
    (function(SemanticTokenModifiers2) {
      SemanticTokenModifiers2["declaration"] = "declaration";
      SemanticTokenModifiers2["definition"] = "definition";
      SemanticTokenModifiers2["readonly"] = "readonly";
      SemanticTokenModifiers2["static"] = "static";
      SemanticTokenModifiers2["deprecated"] = "deprecated";
      SemanticTokenModifiers2["abstract"] = "abstract";
      SemanticTokenModifiers2["async"] = "async";
      SemanticTokenModifiers2["modification"] = "modification";
      SemanticTokenModifiers2["documentation"] = "documentation";
      SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
    })(SemanticTokenModifiers = exports2.SemanticTokenModifiers || (exports2.SemanticTokenModifiers = {}));
    var SemanticTokens;
    (function(SemanticTokens2) {
      function is(value) {
        const candidate = value;
        return candidate !== void 0 && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
      }
      SemanticTokens2.is = is;
    })(SemanticTokens = exports2.SemanticTokens || (exports2.SemanticTokens = {}));
    var TokenFormat;
    (function(TokenFormat2) {
      TokenFormat2.Relative = "relative";
    })(TokenFormat = exports2.TokenFormat || (exports2.TokenFormat = {}));
    var SemanticTokensRegistrationType;
    (function(SemanticTokensRegistrationType2) {
      SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
      SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
    })(SemanticTokensRegistrationType = exports2.SemanticTokensRegistrationType || (exports2.SemanticTokensRegistrationType = {}));
    var SemanticTokensRequest;
    (function(SemanticTokensRequest2) {
      SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
      SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
    })(SemanticTokensRequest = exports2.SemanticTokensRequest || (exports2.SemanticTokensRequest = {}));
    var SemanticTokensDeltaRequest;
    (function(SemanticTokensDeltaRequest2) {
      SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
      SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
    })(SemanticTokensDeltaRequest = exports2.SemanticTokensDeltaRequest || (exports2.SemanticTokensDeltaRequest = {}));
    var SemanticTokensRangeRequest;
    (function(SemanticTokensRangeRequest2) {
      SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
      SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
    })(SemanticTokensRangeRequest = exports2.SemanticTokensRangeRequest || (exports2.SemanticTokensRangeRequest = {}));
    var SemanticTokensRefreshRequest;
    (function(SemanticTokensRefreshRequest2) {
      SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
      SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
    })(SemanticTokensRefreshRequest = exports2.SemanticTokensRefreshRequest || (exports2.SemanticTokensRefreshRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js
var require_protocol_showDocument = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShowDocumentRequest = void 0;
    var messages_1 = require_messages2();
    var ShowDocumentRequest;
    (function(ShowDocumentRequest2) {
      ShowDocumentRequest2.method = "window/showDocument";
      ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
    })(ShowDocumentRequest = exports2.ShowDocumentRequest || (exports2.ShowDocumentRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js
var require_protocol_linkedEditingRange = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinkedEditingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var LinkedEditingRangeRequest;
    (function(LinkedEditingRangeRequest2) {
      LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
      LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
    })(LinkedEditingRangeRequest = exports2.LinkedEditingRangeRequest || (exports2.LinkedEditingRangeRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js
var require_protocol_fileOperations = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WillDeleteFilesRequest = exports2.DidDeleteFilesNotification = exports2.DidRenameFilesNotification = exports2.WillRenameFilesRequest = exports2.DidCreateFilesNotification = exports2.WillCreateFilesRequest = exports2.FileOperationPatternKind = void 0;
    var messages_1 = require_messages2();
    var FileOperationPatternKind;
    (function(FileOperationPatternKind2) {
      FileOperationPatternKind2.file = "file";
      FileOperationPatternKind2.folder = "folder";
    })(FileOperationPatternKind = exports2.FileOperationPatternKind || (exports2.FileOperationPatternKind = {}));
    var WillCreateFilesRequest;
    (function(WillCreateFilesRequest2) {
      WillCreateFilesRequest2.method = "workspace/willCreateFiles";
      WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
    })(WillCreateFilesRequest = exports2.WillCreateFilesRequest || (exports2.WillCreateFilesRequest = {}));
    var DidCreateFilesNotification;
    (function(DidCreateFilesNotification2) {
      DidCreateFilesNotification2.method = "workspace/didCreateFiles";
      DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
    })(DidCreateFilesNotification = exports2.DidCreateFilesNotification || (exports2.DidCreateFilesNotification = {}));
    var WillRenameFilesRequest;
    (function(WillRenameFilesRequest2) {
      WillRenameFilesRequest2.method = "workspace/willRenameFiles";
      WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
    })(WillRenameFilesRequest = exports2.WillRenameFilesRequest || (exports2.WillRenameFilesRequest = {}));
    var DidRenameFilesNotification;
    (function(DidRenameFilesNotification2) {
      DidRenameFilesNotification2.method = "workspace/didRenameFiles";
      DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
    })(DidRenameFilesNotification = exports2.DidRenameFilesNotification || (exports2.DidRenameFilesNotification = {}));
    var DidDeleteFilesNotification;
    (function(DidDeleteFilesNotification2) {
      DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
      DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
    })(DidDeleteFilesNotification = exports2.DidDeleteFilesNotification || (exports2.DidDeleteFilesNotification = {}));
    var WillDeleteFilesRequest;
    (function(WillDeleteFilesRequest2) {
      WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
      WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
    })(WillDeleteFilesRequest = exports2.WillDeleteFilesRequest || (exports2.WillDeleteFilesRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js
var require_protocol_moniker = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = void 0;
    var messages_1 = require_messages2();
    var UniquenessLevel;
    (function(UniquenessLevel2) {
      UniquenessLevel2["document"] = "document";
      UniquenessLevel2["project"] = "project";
      UniquenessLevel2["group"] = "group";
      UniquenessLevel2["scheme"] = "scheme";
      UniquenessLevel2["global"] = "global";
    })(UniquenessLevel = exports2.UniquenessLevel || (exports2.UniquenessLevel = {}));
    var MonikerKind;
    (function(MonikerKind2) {
      MonikerKind2["import"] = "import";
      MonikerKind2["export"] = "export";
      MonikerKind2["local"] = "local";
    })(MonikerKind = exports2.MonikerKind || (exports2.MonikerKind = {}));
    var MonikerRequest;
    (function(MonikerRequest2) {
      MonikerRequest2.method = "textDocument/moniker";
      MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
    })(MonikerRequest = exports2.MonikerRequest || (exports2.MonikerRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.js
var require_protocol = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DocumentLinkRequest = exports2.CodeLensRefreshRequest = exports2.CodeLensResolveRequest = exports2.CodeLensRequest = exports2.WorkspaceSymbolRequest = exports2.CodeActionResolveRequest = exports2.CodeActionRequest = exports2.DocumentSymbolRequest = exports2.DocumentHighlightRequest = exports2.ReferencesRequest = exports2.DefinitionRequest = exports2.SignatureHelpRequest = exports2.SignatureHelpTriggerKind = exports2.HoverRequest = exports2.CompletionResolveRequest = exports2.CompletionRequest = exports2.CompletionTriggerKind = exports2.PublishDiagnosticsNotification = exports2.WatchKind = exports2.FileChangeType = exports2.DidChangeWatchedFilesNotification = exports2.WillSaveTextDocumentWaitUntilRequest = exports2.WillSaveTextDocumentNotification = exports2.TextDocumentSaveReason = exports2.DidSaveTextDocumentNotification = exports2.DidCloseTextDocumentNotification = exports2.DidChangeTextDocumentNotification = exports2.TextDocumentContentChangeEvent = exports2.DidOpenTextDocumentNotification = exports2.TextDocumentSyncKind = exports2.TelemetryEventNotification = exports2.LogMessageNotification = exports2.ShowMessageRequest = exports2.ShowMessageNotification = exports2.MessageType = exports2.DidChangeConfigurationNotification = exports2.ExitNotification = exports2.ShutdownRequest = exports2.InitializedNotification = exports2.InitializeError = exports2.InitializeRequest = exports2.WorkDoneProgressOptions = exports2.TextDocumentRegistrationOptions = exports2.StaticRegistrationOptions = exports2.FailureHandlingKind = exports2.ResourceOperationKind = exports2.UnregistrationRequest = exports2.RegistrationRequest = exports2.DocumentSelector = exports2.DocumentFilter = void 0;
    exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = exports2.WillDeleteFilesRequest = exports2.DidDeleteFilesNotification = exports2.WillRenameFilesRequest = exports2.DidRenameFilesNotification = exports2.WillCreateFilesRequest = exports2.DidCreateFilesNotification = exports2.FileOperationPatternKind = exports2.LinkedEditingRangeRequest = exports2.ShowDocumentRequest = exports2.SemanticTokensRegistrationType = exports2.SemanticTokensRefreshRequest = exports2.SemanticTokensRangeRequest = exports2.SemanticTokensDeltaRequest = exports2.SemanticTokensRequest = exports2.TokenFormat = exports2.SemanticTokens = exports2.SemanticTokenModifiers = exports2.SemanticTokenTypes = exports2.CallHierarchyPrepareRequest = exports2.CallHierarchyOutgoingCallsRequest = exports2.CallHierarchyIncomingCallsRequest = exports2.WorkDoneProgressCancelNotification = exports2.WorkDoneProgressCreateRequest = exports2.WorkDoneProgress = exports2.SelectionRangeRequest = exports2.DeclarationRequest = exports2.FoldingRangeRequest = exports2.ColorPresentationRequest = exports2.DocumentColorRequest = exports2.ConfigurationRequest = exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = exports2.TypeDefinitionRequest = exports2.ImplementationRequest = exports2.ApplyWorkspaceEditRequest = exports2.ExecuteCommandRequest = exports2.PrepareRenameRequest = exports2.RenameRequest = exports2.PrepareSupportDefaultBehavior = exports2.DocumentOnTypeFormattingRequest = exports2.DocumentRangeFormattingRequest = exports2.DocumentFormattingRequest = exports2.DocumentLinkResolveRequest = void 0;
    var Is2 = require_is3();
    var messages_1 = require_messages2();
    var protocol_implementation_1 = require_protocol_implementation();
    Object.defineProperty(exports2, "ImplementationRequest", { enumerable: true, get: function() {
      return protocol_implementation_1.ImplementationRequest;
    } });
    var protocol_typeDefinition_1 = require_protocol_typeDefinition();
    Object.defineProperty(exports2, "TypeDefinitionRequest", { enumerable: true, get: function() {
      return protocol_typeDefinition_1.TypeDefinitionRequest;
    } });
    var protocol_workspaceFolders_1 = require_protocol_workspaceFolders();
    Object.defineProperty(exports2, "WorkspaceFoldersRequest", { enumerable: true, get: function() {
      return protocol_workspaceFolders_1.WorkspaceFoldersRequest;
    } });
    Object.defineProperty(exports2, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function() {
      return protocol_workspaceFolders_1.DidChangeWorkspaceFoldersNotification;
    } });
    var protocol_configuration_1 = require_protocol_configuration();
    Object.defineProperty(exports2, "ConfigurationRequest", { enumerable: true, get: function() {
      return protocol_configuration_1.ConfigurationRequest;
    } });
    var protocol_colorProvider_1 = require_protocol_colorProvider();
    Object.defineProperty(exports2, "DocumentColorRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.DocumentColorRequest;
    } });
    Object.defineProperty(exports2, "ColorPresentationRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.ColorPresentationRequest;
    } });
    var protocol_foldingRange_1 = require_protocol_foldingRange();
    Object.defineProperty(exports2, "FoldingRangeRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRequest;
    } });
    var protocol_declaration_1 = require_protocol_declaration();
    Object.defineProperty(exports2, "DeclarationRequest", { enumerable: true, get: function() {
      return protocol_declaration_1.DeclarationRequest;
    } });
    var protocol_selectionRange_1 = require_protocol_selectionRange();
    Object.defineProperty(exports2, "SelectionRangeRequest", { enumerable: true, get: function() {
      return protocol_selectionRange_1.SelectionRangeRequest;
    } });
    var protocol_progress_1 = require_protocol_progress();
    Object.defineProperty(exports2, "WorkDoneProgress", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgress;
    } });
    Object.defineProperty(exports2, "WorkDoneProgressCreateRequest", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCreateRequest;
    } });
    Object.defineProperty(exports2, "WorkDoneProgressCancelNotification", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCancelNotification;
    } });
    var protocol_callHierarchy_1 = require_protocol_callHierarchy();
    Object.defineProperty(exports2, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
    } });
    Object.defineProperty(exports2, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
    } });
    Object.defineProperty(exports2, "CallHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
    } });
    var protocol_semanticTokens_1 = require_protocol_semanticTokens();
    Object.defineProperty(exports2, "SemanticTokenTypes", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokenTypes;
    } });
    Object.defineProperty(exports2, "SemanticTokenModifiers", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokenModifiers;
    } });
    Object.defineProperty(exports2, "SemanticTokens", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokens;
    } });
    Object.defineProperty(exports2, "TokenFormat", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.TokenFormat;
    } });
    Object.defineProperty(exports2, "SemanticTokensRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensDeltaRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRangeRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRangeRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRefreshRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
    } });
    Object.defineProperty(exports2, "SemanticTokensRegistrationType", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRegistrationType;
    } });
    var protocol_showDocument_1 = require_protocol_showDocument();
    Object.defineProperty(exports2, "ShowDocumentRequest", { enumerable: true, get: function() {
      return protocol_showDocument_1.ShowDocumentRequest;
    } });
    var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
    Object.defineProperty(exports2, "LinkedEditingRangeRequest", { enumerable: true, get: function() {
      return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
    } });
    var protocol_fileOperations_1 = require_protocol_fileOperations();
    Object.defineProperty(exports2, "FileOperationPatternKind", { enumerable: true, get: function() {
      return protocol_fileOperations_1.FileOperationPatternKind;
    } });
    Object.defineProperty(exports2, "DidCreateFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidCreateFilesNotification;
    } });
    Object.defineProperty(exports2, "WillCreateFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillCreateFilesRequest;
    } });
    Object.defineProperty(exports2, "DidRenameFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidRenameFilesNotification;
    } });
    Object.defineProperty(exports2, "WillRenameFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillRenameFilesRequest;
    } });
    Object.defineProperty(exports2, "DidDeleteFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidDeleteFilesNotification;
    } });
    Object.defineProperty(exports2, "WillDeleteFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillDeleteFilesRequest;
    } });
    var protocol_moniker_1 = require_protocol_moniker();
    Object.defineProperty(exports2, "UniquenessLevel", { enumerable: true, get: function() {
      return protocol_moniker_1.UniquenessLevel;
    } });
    Object.defineProperty(exports2, "MonikerKind", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerKind;
    } });
    Object.defineProperty(exports2, "MonikerRequest", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerRequest;
    } });
    var DocumentFilter;
    (function(DocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is2.string(candidate.language) || Is2.string(candidate.scheme) || Is2.string(candidate.pattern);
      }
      DocumentFilter2.is = is;
    })(DocumentFilter = exports2.DocumentFilter || (exports2.DocumentFilter = {}));
    var DocumentSelector;
    (function(DocumentSelector2) {
      function is(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (let elem of value) {
          if (!Is2.string(elem) && !DocumentFilter.is(elem)) {
            return false;
          }
        }
        return true;
      }
      DocumentSelector2.is = is;
    })(DocumentSelector = exports2.DocumentSelector || (exports2.DocumentSelector = {}));
    var RegistrationRequest;
    (function(RegistrationRequest2) {
      RegistrationRequest2.type = new messages_1.ProtocolRequestType("client/registerCapability");
    })(RegistrationRequest = exports2.RegistrationRequest || (exports2.RegistrationRequest = {}));
    var UnregistrationRequest;
    (function(UnregistrationRequest2) {
      UnregistrationRequest2.type = new messages_1.ProtocolRequestType("client/unregisterCapability");
    })(UnregistrationRequest = exports2.UnregistrationRequest || (exports2.UnregistrationRequest = {}));
    var ResourceOperationKind;
    (function(ResourceOperationKind2) {
      ResourceOperationKind2.Create = "create";
      ResourceOperationKind2.Rename = "rename";
      ResourceOperationKind2.Delete = "delete";
    })(ResourceOperationKind = exports2.ResourceOperationKind || (exports2.ResourceOperationKind = {}));
    var FailureHandlingKind;
    (function(FailureHandlingKind2) {
      FailureHandlingKind2.Abort = "abort";
      FailureHandlingKind2.Transactional = "transactional";
      FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
      FailureHandlingKind2.Undo = "undo";
    })(FailureHandlingKind = exports2.FailureHandlingKind || (exports2.FailureHandlingKind = {}));
    var StaticRegistrationOptions;
    (function(StaticRegistrationOptions2) {
      function hasId(value) {
        const candidate = value;
        return candidate && Is2.string(candidate.id) && candidate.id.length > 0;
      }
      StaticRegistrationOptions2.hasId = hasId;
    })(StaticRegistrationOptions = exports2.StaticRegistrationOptions || (exports2.StaticRegistrationOptions = {}));
    var TextDocumentRegistrationOptions;
    (function(TextDocumentRegistrationOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
      }
      TextDocumentRegistrationOptions2.is = is;
    })(TextDocumentRegistrationOptions = exports2.TextDocumentRegistrationOptions || (exports2.TextDocumentRegistrationOptions = {}));
    var WorkDoneProgressOptions;
    (function(WorkDoneProgressOptions2) {
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is2.boolean(candidate.workDoneProgress));
      }
      WorkDoneProgressOptions2.is = is;
      function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is2.boolean(candidate.workDoneProgress);
      }
      WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
    })(WorkDoneProgressOptions = exports2.WorkDoneProgressOptions || (exports2.WorkDoneProgressOptions = {}));
    var InitializeRequest;
    (function(InitializeRequest2) {
      InitializeRequest2.type = new messages_1.ProtocolRequestType("initialize");
    })(InitializeRequest = exports2.InitializeRequest || (exports2.InitializeRequest = {}));
    var InitializeError;
    (function(InitializeError2) {
      InitializeError2.unknownProtocolVersion = 1;
    })(InitializeError = exports2.InitializeError || (exports2.InitializeError = {}));
    var InitializedNotification;
    (function(InitializedNotification2) {
      InitializedNotification2.type = new messages_1.ProtocolNotificationType("initialized");
    })(InitializedNotification = exports2.InitializedNotification || (exports2.InitializedNotification = {}));
    var ShutdownRequest;
    (function(ShutdownRequest2) {
      ShutdownRequest2.type = new messages_1.ProtocolRequestType0("shutdown");
    })(ShutdownRequest = exports2.ShutdownRequest || (exports2.ShutdownRequest = {}));
    var ExitNotification;
    (function(ExitNotification2) {
      ExitNotification2.type = new messages_1.ProtocolNotificationType0("exit");
    })(ExitNotification = exports2.ExitNotification || (exports2.ExitNotification = {}));
    var DidChangeConfigurationNotification2;
    (function(DidChangeConfigurationNotification3) {
      DidChangeConfigurationNotification3.type = new messages_1.ProtocolNotificationType("workspace/didChangeConfiguration");
    })(DidChangeConfigurationNotification2 = exports2.DidChangeConfigurationNotification || (exports2.DidChangeConfigurationNotification = {}));
    var MessageType2;
    (function(MessageType3) {
      MessageType3.Error = 1;
      MessageType3.Warning = 2;
      MessageType3.Info = 3;
      MessageType3.Log = 4;
    })(MessageType2 = exports2.MessageType || (exports2.MessageType = {}));
    var ShowMessageNotification;
    (function(ShowMessageNotification2) {
      ShowMessageNotification2.type = new messages_1.ProtocolNotificationType("window/showMessage");
    })(ShowMessageNotification = exports2.ShowMessageNotification || (exports2.ShowMessageNotification = {}));
    var ShowMessageRequest2;
    (function(ShowMessageRequest3) {
      ShowMessageRequest3.type = new messages_1.ProtocolRequestType("window/showMessageRequest");
    })(ShowMessageRequest2 = exports2.ShowMessageRequest || (exports2.ShowMessageRequest = {}));
    var LogMessageNotification;
    (function(LogMessageNotification2) {
      LogMessageNotification2.type = new messages_1.ProtocolNotificationType("window/logMessage");
    })(LogMessageNotification = exports2.LogMessageNotification || (exports2.LogMessageNotification = {}));
    var TelemetryEventNotification;
    (function(TelemetryEventNotification2) {
      TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType("telemetry/event");
    })(TelemetryEventNotification = exports2.TelemetryEventNotification || (exports2.TelemetryEventNotification = {}));
    var TextDocumentSyncKind2;
    (function(TextDocumentSyncKind3) {
      TextDocumentSyncKind3.None = 0;
      TextDocumentSyncKind3.Full = 1;
      TextDocumentSyncKind3.Incremental = 2;
    })(TextDocumentSyncKind2 = exports2.TextDocumentSyncKind || (exports2.TextDocumentSyncKind = {}));
    var DidOpenTextDocumentNotification;
    (function(DidOpenTextDocumentNotification2) {
      DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
      DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
    })(DidOpenTextDocumentNotification = exports2.DidOpenTextDocumentNotification || (exports2.DidOpenTextDocumentNotification = {}));
    var TextDocumentContentChangeEvent2;
    (function(TextDocumentContentChangeEvent3) {
      function isIncremental(event) {
        let candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
      }
      TextDocumentContentChangeEvent3.isIncremental = isIncremental;
      function isFull(event) {
        let candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
      }
      TextDocumentContentChangeEvent3.isFull = isFull;
    })(TextDocumentContentChangeEvent2 = exports2.TextDocumentContentChangeEvent || (exports2.TextDocumentContentChangeEvent = {}));
    var DidChangeTextDocumentNotification;
    (function(DidChangeTextDocumentNotification2) {
      DidChangeTextDocumentNotification2.method = "textDocument/didChange";
      DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
    })(DidChangeTextDocumentNotification = exports2.DidChangeTextDocumentNotification || (exports2.DidChangeTextDocumentNotification = {}));
    var DidCloseTextDocumentNotification;
    (function(DidCloseTextDocumentNotification2) {
      DidCloseTextDocumentNotification2.method = "textDocument/didClose";
      DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
    })(DidCloseTextDocumentNotification = exports2.DidCloseTextDocumentNotification || (exports2.DidCloseTextDocumentNotification = {}));
    var DidSaveTextDocumentNotification;
    (function(DidSaveTextDocumentNotification2) {
      DidSaveTextDocumentNotification2.method = "textDocument/didSave";
      DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
    })(DidSaveTextDocumentNotification = exports2.DidSaveTextDocumentNotification || (exports2.DidSaveTextDocumentNotification = {}));
    var TextDocumentSaveReason;
    (function(TextDocumentSaveReason2) {
      TextDocumentSaveReason2.Manual = 1;
      TextDocumentSaveReason2.AfterDelay = 2;
      TextDocumentSaveReason2.FocusOut = 3;
    })(TextDocumentSaveReason = exports2.TextDocumentSaveReason || (exports2.TextDocumentSaveReason = {}));
    var WillSaveTextDocumentNotification;
    (function(WillSaveTextDocumentNotification2) {
      WillSaveTextDocumentNotification2.method = "textDocument/willSave";
      WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
    })(WillSaveTextDocumentNotification = exports2.WillSaveTextDocumentNotification || (exports2.WillSaveTextDocumentNotification = {}));
    var WillSaveTextDocumentWaitUntilRequest;
    (function(WillSaveTextDocumentWaitUntilRequest2) {
      WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
      WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
    })(WillSaveTextDocumentWaitUntilRequest = exports2.WillSaveTextDocumentWaitUntilRequest || (exports2.WillSaveTextDocumentWaitUntilRequest = {}));
    var DidChangeWatchedFilesNotification;
    (function(DidChangeWatchedFilesNotification2) {
      DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType("workspace/didChangeWatchedFiles");
    })(DidChangeWatchedFilesNotification = exports2.DidChangeWatchedFilesNotification || (exports2.DidChangeWatchedFilesNotification = {}));
    var FileChangeType;
    (function(FileChangeType2) {
      FileChangeType2.Created = 1;
      FileChangeType2.Changed = 2;
      FileChangeType2.Deleted = 3;
    })(FileChangeType = exports2.FileChangeType || (exports2.FileChangeType = {}));
    var WatchKind;
    (function(WatchKind2) {
      WatchKind2.Create = 1;
      WatchKind2.Change = 2;
      WatchKind2.Delete = 4;
    })(WatchKind = exports2.WatchKind || (exports2.WatchKind = {}));
    var PublishDiagnosticsNotification;
    (function(PublishDiagnosticsNotification2) {
      PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType("textDocument/publishDiagnostics");
    })(PublishDiagnosticsNotification = exports2.PublishDiagnosticsNotification || (exports2.PublishDiagnosticsNotification = {}));
    var CompletionTriggerKind;
    (function(CompletionTriggerKind2) {
      CompletionTriggerKind2.Invoked = 1;
      CompletionTriggerKind2.TriggerCharacter = 2;
      CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
    })(CompletionTriggerKind = exports2.CompletionTriggerKind || (exports2.CompletionTriggerKind = {}));
    var CompletionRequest;
    (function(CompletionRequest2) {
      CompletionRequest2.method = "textDocument/completion";
      CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
    })(CompletionRequest = exports2.CompletionRequest || (exports2.CompletionRequest = {}));
    var CompletionResolveRequest;
    (function(CompletionResolveRequest2) {
      CompletionResolveRequest2.method = "completionItem/resolve";
      CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
    })(CompletionResolveRequest = exports2.CompletionResolveRequest || (exports2.CompletionResolveRequest = {}));
    var HoverRequest;
    (function(HoverRequest2) {
      HoverRequest2.method = "textDocument/hover";
      HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
    })(HoverRequest = exports2.HoverRequest || (exports2.HoverRequest = {}));
    var SignatureHelpTriggerKind;
    (function(SignatureHelpTriggerKind2) {
      SignatureHelpTriggerKind2.Invoked = 1;
      SignatureHelpTriggerKind2.TriggerCharacter = 2;
      SignatureHelpTriggerKind2.ContentChange = 3;
    })(SignatureHelpTriggerKind = exports2.SignatureHelpTriggerKind || (exports2.SignatureHelpTriggerKind = {}));
    var SignatureHelpRequest;
    (function(SignatureHelpRequest2) {
      SignatureHelpRequest2.method = "textDocument/signatureHelp";
      SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
    })(SignatureHelpRequest = exports2.SignatureHelpRequest || (exports2.SignatureHelpRequest = {}));
    var DefinitionRequest;
    (function(DefinitionRequest2) {
      DefinitionRequest2.method = "textDocument/definition";
      DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
    })(DefinitionRequest = exports2.DefinitionRequest || (exports2.DefinitionRequest = {}));
    var ReferencesRequest;
    (function(ReferencesRequest2) {
      ReferencesRequest2.method = "textDocument/references";
      ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
    })(ReferencesRequest = exports2.ReferencesRequest || (exports2.ReferencesRequest = {}));
    var DocumentHighlightRequest;
    (function(DocumentHighlightRequest2) {
      DocumentHighlightRequest2.method = "textDocument/documentHighlight";
      DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
    })(DocumentHighlightRequest = exports2.DocumentHighlightRequest || (exports2.DocumentHighlightRequest = {}));
    var DocumentSymbolRequest;
    (function(DocumentSymbolRequest2) {
      DocumentSymbolRequest2.method = "textDocument/documentSymbol";
      DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
    })(DocumentSymbolRequest = exports2.DocumentSymbolRequest || (exports2.DocumentSymbolRequest = {}));
    var CodeActionRequest;
    (function(CodeActionRequest2) {
      CodeActionRequest2.method = "textDocument/codeAction";
      CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
    })(CodeActionRequest = exports2.CodeActionRequest || (exports2.CodeActionRequest = {}));
    var CodeActionResolveRequest;
    (function(CodeActionResolveRequest2) {
      CodeActionResolveRequest2.method = "codeAction/resolve";
      CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
    })(CodeActionResolveRequest = exports2.CodeActionResolveRequest || (exports2.CodeActionResolveRequest = {}));
    var WorkspaceSymbolRequest;
    (function(WorkspaceSymbolRequest2) {
      WorkspaceSymbolRequest2.method = "workspace/symbol";
      WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
    })(WorkspaceSymbolRequest = exports2.WorkspaceSymbolRequest || (exports2.WorkspaceSymbolRequest = {}));
    var CodeLensRequest;
    (function(CodeLensRequest2) {
      CodeLensRequest2.method = "textDocument/codeLens";
      CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
    })(CodeLensRequest = exports2.CodeLensRequest || (exports2.CodeLensRequest = {}));
    var CodeLensResolveRequest;
    (function(CodeLensResolveRequest2) {
      CodeLensResolveRequest2.method = "codeLens/resolve";
      CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
    })(CodeLensResolveRequest = exports2.CodeLensResolveRequest || (exports2.CodeLensResolveRequest = {}));
    var CodeLensRefreshRequest;
    (function(CodeLensRefreshRequest2) {
      CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
      CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
    })(CodeLensRefreshRequest = exports2.CodeLensRefreshRequest || (exports2.CodeLensRefreshRequest = {}));
    var DocumentLinkRequest;
    (function(DocumentLinkRequest2) {
      DocumentLinkRequest2.method = "textDocument/documentLink";
      DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
    })(DocumentLinkRequest = exports2.DocumentLinkRequest || (exports2.DocumentLinkRequest = {}));
    var DocumentLinkResolveRequest;
    (function(DocumentLinkResolveRequest2) {
      DocumentLinkResolveRequest2.method = "documentLink/resolve";
      DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
    })(DocumentLinkResolveRequest = exports2.DocumentLinkResolveRequest || (exports2.DocumentLinkResolveRequest = {}));
    var DocumentFormattingRequest;
    (function(DocumentFormattingRequest2) {
      DocumentFormattingRequest2.method = "textDocument/formatting";
      DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
    })(DocumentFormattingRequest = exports2.DocumentFormattingRequest || (exports2.DocumentFormattingRequest = {}));
    var DocumentRangeFormattingRequest;
    (function(DocumentRangeFormattingRequest2) {
      DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
      DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
    })(DocumentRangeFormattingRequest = exports2.DocumentRangeFormattingRequest || (exports2.DocumentRangeFormattingRequest = {}));
    var DocumentOnTypeFormattingRequest;
    (function(DocumentOnTypeFormattingRequest2) {
      DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
      DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
    })(DocumentOnTypeFormattingRequest = exports2.DocumentOnTypeFormattingRequest || (exports2.DocumentOnTypeFormattingRequest = {}));
    var PrepareSupportDefaultBehavior;
    (function(PrepareSupportDefaultBehavior2) {
      PrepareSupportDefaultBehavior2.Identifier = 1;
    })(PrepareSupportDefaultBehavior = exports2.PrepareSupportDefaultBehavior || (exports2.PrepareSupportDefaultBehavior = {}));
    var RenameRequest;
    (function(RenameRequest2) {
      RenameRequest2.method = "textDocument/rename";
      RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
    })(RenameRequest = exports2.RenameRequest || (exports2.RenameRequest = {}));
    var PrepareRenameRequest;
    (function(PrepareRenameRequest2) {
      PrepareRenameRequest2.method = "textDocument/prepareRename";
      PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
    })(PrepareRenameRequest = exports2.PrepareRenameRequest || (exports2.PrepareRenameRequest = {}));
    var ExecuteCommandRequest;
    (function(ExecuteCommandRequest2) {
      ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType("workspace/executeCommand");
    })(ExecuteCommandRequest = exports2.ExecuteCommandRequest || (exports2.ExecuteCommandRequest = {}));
    var ApplyWorkspaceEditRequest;
    (function(ApplyWorkspaceEditRequest2) {
      ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
    })(ApplyWorkspaceEditRequest = exports2.ApplyWorkspaceEditRequest || (exports2.ApplyWorkspaceEditRequest = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/connection.js
var require_connection2 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createProtocolConnection = void 0;
    var vscode_jsonrpc_1 = require_main();
    function createProtocolConnection(input, output, logger, options) {
      if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return vscode_jsonrpc_1.createMessageConnection(input, output, logger, options);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/api.js
var require_api2 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/common/api.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LSPErrorCodes = exports2.createProtocolConnection = void 0;
    __exportStar(require_main(), exports2);
    __exportStar((init_main(), __toCommonJS(main_exports)), exports2);
    __exportStar(require_messages2(), exports2);
    __exportStar(require_protocol(), exports2);
    var connection_1 = require_connection2();
    Object.defineProperty(exports2, "createProtocolConnection", { enumerable: true, get: function() {
      return connection_1.createProtocolConnection;
    } });
    var LSPErrorCodes;
    (function(LSPErrorCodes2) {
      LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
      LSPErrorCodes2.ContentModified = -32801;
      LSPErrorCodes2.RequestCancelled = -32800;
      LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
    })(LSPErrorCodes = exports2.LSPErrorCodes || (exports2.LSPErrorCodes = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/node/main.js
var require_main2 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createProtocolConnection = void 0;
    var node_1 = require_node();
    __exportStar(require_node(), exports2);
    __exportStar(require_api2(), exports2);
    function createProtocolConnection(input, output, logger, options) {
      return node_1.createMessageConnection(input, output, logger, options);
    }
    exports2.createProtocolConnection = createProtocolConnection;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/utils/uuid.js
var require_uuid = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/utils/uuid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateUuid = exports2.parse = exports2.isUUID = exports2.v4 = exports2.empty = void 0;
    var ValueUUID = class {
      constructor(_value) {
        this._value = _value;
      }
      asHex() {
        return this._value;
      }
      equals(other) {
        return this.asHex() === other.asHex();
      }
    };
    var V4UUID = class extends ValueUUID {
      constructor() {
        super([
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          "-",
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          "-",
          "4",
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          "-",
          V4UUID._oneOf(V4UUID._timeHighBits),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          "-",
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex(),
          V4UUID._randomHex()
        ].join(""));
      }
      static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
      }
      static _randomHex() {
        return V4UUID._oneOf(V4UUID._chars);
      }
    };
    V4UUID._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    V4UUID._timeHighBits = ["8", "9", "a", "b"];
    exports2.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
    function v4() {
      return new V4UUID();
    }
    exports2.v4 = v4;
    var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function isUUID(value) {
      return _UUIDPattern.test(value);
    }
    exports2.isUUID = isUUID;
    function parse2(value) {
      if (!isUUID(value)) {
        throw new Error("invalid uuid");
      }
      return new ValueUUID(value);
    }
    exports2.parse = parse2;
    function generateUuid() {
      return v4().asHex();
    }
    exports2.generateUuid = generateUuid;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/progress.js
var require_progress = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/progress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.attachPartialResult = exports2.ProgressFeature = exports2.attachWorkDone = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var uuid_1 = require_uuid();
    var WorkDoneProgressReporterImpl = class {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        WorkDoneProgressReporterImpl.Instances.set(this._token, this);
      }
      begin(title, percentage, message, cancellable) {
        let param = {
          kind: "begin",
          title,
          percentage,
          message,
          cancellable
        };
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      report(arg0, arg1) {
        let param = {
          kind: "report"
        };
        if (typeof arg0 === "number") {
          param.percentage = arg0;
          if (arg1 !== void 0) {
            param.message = arg1;
          }
        } else {
          param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      done() {
        WorkDoneProgressReporterImpl.Instances.delete(this._token);
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: "end" });
      }
    };
    WorkDoneProgressReporterImpl.Instances = /* @__PURE__ */ new Map();
    var WorkDoneProgressServerReporterImpl = class extends WorkDoneProgressReporterImpl {
      constructor(connection2, token) {
        super(connection2, token);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
        super.done();
      }
      cancel() {
        this._source.cancel();
      }
    };
    var NullProgressReporter = class {
      constructor() {
      }
      begin() {
      }
      report() {
      }
      done() {
      }
    };
    var NullProgressServerReporter = class extends NullProgressReporter {
      constructor() {
        super();
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
      }
      cancel() {
        this._source.cancel();
      }
    };
    function attachWorkDone(connection2, params) {
      if (params === void 0 || params.workDoneToken === void 0) {
        return new NullProgressReporter();
      }
      const token = params.workDoneToken;
      delete params.workDoneToken;
      return new WorkDoneProgressReporterImpl(connection2, token);
    }
    exports2.attachWorkDone = attachWorkDone;
    var ProgressFeature = (Base) => {
      return class extends Base {
        constructor() {
          super();
          this._progressSupported = false;
        }
        initialize(capabilities) {
          var _a;
          if (((_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.window) === null || _a === void 0 ? void 0 : _a.workDoneProgress) === true) {
            this._progressSupported = true;
            this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
              let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
              if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
                progress.cancel();
              }
            });
          }
        }
        attachWorkDoneProgress(token) {
          if (token === void 0) {
            return new NullProgressReporter();
          } else {
            return new WorkDoneProgressReporterImpl(this.connection, token);
          }
        }
        createWorkDoneProgress() {
          if (this._progressSupported) {
            const token = uuid_1.generateUuid();
            return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
              const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
              return result;
            });
          } else {
            return Promise.resolve(new NullProgressServerReporter());
          }
        }
      };
    };
    exports2.ProgressFeature = ProgressFeature;
    var ResultProgress;
    (function(ResultProgress2) {
      ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType();
    })(ResultProgress || (ResultProgress = {}));
    var ResultProgressReporterImpl = class {
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
      }
      report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
      }
    };
    function attachPartialResult(connection2, params) {
      if (params === void 0 || params.partialResultToken === void 0) {
        return void 0;
      }
      const token = params.partialResultToken;
      delete params.partialResultToken;
      return new ResultProgressReporterImpl(connection2, token);
    }
    exports2.attachPartialResult = attachPartialResult;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/configuration.js
var require_configuration = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConfigurationFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var Is2 = require_is();
    var ConfigurationFeature = (Base) => {
      return class extends Base {
        getConfiguration(arg) {
          if (!arg) {
            return this._getConfiguration({});
          } else if (Is2.string(arg)) {
            return this._getConfiguration({ section: arg });
          } else {
            return this._getConfiguration(arg);
          }
        }
        _getConfiguration(arg) {
          let params = {
            items: Array.isArray(arg) ? arg : [arg]
          };
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
            return Array.isArray(arg) ? result : result[0];
          });
        }
      };
    };
    exports2.ConfigurationFeature = ConfigurationFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/workspaceFolders.js
var require_workspaceFolders = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/workspaceFolders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WorkspaceFoldersFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var WorkspaceFoldersFeature = (Base) => {
      return class extends Base {
        initialize(capabilities) {
          let workspaceCapabilities = capabilities.workspace;
          if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
            this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
            this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
              this._onDidChangeWorkspaceFolders.fire(params.event);
            });
          }
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders) {
            throw new Error("Client doesn't support sending workspace folder change events.");
          }
          if (!this._unregistration) {
            this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
          }
          return this._onDidChangeWorkspaceFolders.event;
        }
      };
    };
    exports2.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/callHierarchy.js
var require_callHierarchy = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/callHierarchy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CallHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var CallHierarchyFeature = (Base) => {
      return class extends Base {
        get callHierarchy() {
          return {
            onPrepare: (handler) => {
              this.connection.onRequest(vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onIncomingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onOutgoingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.CallHierarchyFeature = CallHierarchyFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/semanticTokens.js
var require_semanticTokens = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/semanticTokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SemanticTokensBuilder = exports2.SemanticTokensFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var SemanticTokensFeature = (Base) => {
      return class extends Base {
        get semanticTokens() {
          return {
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onDelta: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onRange: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.SemanticTokensFeature = SemanticTokensFeature;
    var SemanticTokensBuilder = class {
      constructor() {
        this._prevData = void 0;
        this.initialize();
      }
      initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
      }
      push(line, char, length, tokenType, tokenModifiers) {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
          pushLine -= this._prevLine;
          if (pushLine === 0) {
            pushChar -= this._prevChar;
          }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
      }
      get id() {
        return this._id.toString();
      }
      previousResult(id2) {
        if (this.id === id2) {
          this._prevData = this._data;
        }
        this.initialize();
      }
      build() {
        this._prevData = void 0;
        return {
          resultId: this.id,
          data: this._data
        };
      }
      canBuildEdits() {
        return this._prevData !== void 0;
      }
      buildEdits() {
        if (this._prevData !== void 0) {
          const prevDataLength = this._prevData.length;
          const dataLength = this._data.length;
          let startIndex = 0;
          while (startIndex < dataLength && startIndex < prevDataLength && this._prevData[startIndex] === this._data[startIndex]) {
            startIndex++;
          }
          if (startIndex < dataLength && startIndex < prevDataLength) {
            let endIndex = 0;
            while (endIndex < dataLength && endIndex < prevDataLength && this._prevData[prevDataLength - 1 - endIndex] === this._data[dataLength - 1 - endIndex]) {
              endIndex++;
            }
            const newData = this._data.slice(startIndex, dataLength - endIndex);
            const result = {
              resultId: this.id,
              edits: [
                { start: startIndex, deleteCount: prevDataLength - endIndex - startIndex, data: newData }
              ]
            };
            return result;
          } else if (startIndex < dataLength) {
            return { resultId: this.id, edits: [
              { start: startIndex, deleteCount: 0, data: this._data.slice(startIndex) }
            ] };
          } else if (startIndex < prevDataLength) {
            return { resultId: this.id, edits: [
              { start: startIndex, deleteCount: prevDataLength - startIndex }
            ] };
          } else {
            return { resultId: this.id, edits: [] };
          }
        } else {
          return this.build();
        }
      }
    };
    exports2.SemanticTokensBuilder = SemanticTokensBuilder;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/showDocument.js
var require_showDocument = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/showDocument.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ShowDocumentFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var ShowDocumentFeature = (Base) => {
      return class extends Base {
        showDocument(params) {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
        }
      };
    };
    exports2.ShowDocumentFeature = ShowDocumentFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/fileOperations.js
var require_fileOperations = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/fileOperations.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FileOperationsFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var FileOperationsFeature = (Base) => {
      return class extends Base {
        onDidCreateFiles(handler) {
          this.connection.onNotification(vscode_languageserver_protocol_1.DidCreateFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onDidRenameFiles(handler) {
          this.connection.onNotification(vscode_languageserver_protocol_1.DidRenameFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onDidDeleteFiles(handler) {
          this.connection.onNotification(vscode_languageserver_protocol_1.DidDeleteFilesNotification.type, (params) => {
            handler(params);
          });
        }
        onWillCreateFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillCreateFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillRenameFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillRenameFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillDeleteFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillDeleteFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
      };
    };
    exports2.FileOperationsFeature = FileOperationsFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/linkedEditingRange.js
var require_linkedEditingRange = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/linkedEditingRange.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinkedEditingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var LinkedEditingRangeFeature = (Base) => {
      return class extends Base {
        onLinkedEditingRange(handler) {
          this.connection.onRequest(vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
          });
        }
      };
    };
    exports2.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/moniker.js
var require_moniker = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/moniker.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MonikerFeature = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var MonikerFeature = (Base) => {
      return class extends Base {
        get moniker() {
          return {
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.MonikerRequest.type;
              this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports2.MonikerFeature = MonikerFeature;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/server.js
var require_server = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/server.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createConnection = exports2.combineFeatures = exports2.combineLanguagesFeatures = exports2.combineWorkspaceFeatures = exports2.combineWindowFeatures = exports2.combineClientFeatures = exports2.combineTracerFeatures = exports2.combineTelemetryFeatures = exports2.combineConsoleFeatures = exports2._LanguagesImpl = exports2.BulkUnregistration = exports2.BulkRegistration = exports2.ErrorMessageTracker = exports2.TextDocuments = void 0;
    var vscode_languageserver_protocol_1 = require_main2();
    var Is2 = require_is();
    var UUID = require_uuid();
    var progress_1 = require_progress();
    var configuration_1 = require_configuration();
    var workspaceFolders_1 = require_workspaceFolders();
    var callHierarchy_1 = require_callHierarchy();
    var semanticTokens_1 = require_semanticTokens();
    var showDocument_1 = require_showDocument();
    var fileOperations_1 = require_fileOperations();
    var linkedEditingRange_1 = require_linkedEditingRange();
    var moniker_1 = require_moniker();
    function null2Undefined(value) {
      if (value === null) {
        return void 0;
      }
      return value;
    }
    var TextDocuments = class {
      constructor(configuration) {
        this._documents = /* @__PURE__ */ Object.create(null);
        this._configuration = configuration;
        this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
      }
      get onDidChangeContent() {
        return this._onDidChangeContent.event;
      }
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      get onWillSave() {
        return this._onWillSave.event;
      }
      onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
      }
      get onDidSave() {
        return this._onDidSave.event;
      }
      get onDidClose() {
        return this._onDidClose.event;
      }
      get(uri) {
        return this._documents[uri];
      }
      all() {
        return Object.keys(this._documents).map((key) => this._documents[key]);
      }
      keys() {
        return Object.keys(this._documents);
      }
      listen(connection2) {
        connection2.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Full;
        connection2.onDidOpenTextDocument((event) => {
          let td = event.textDocument;
          let document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
          this._documents[td.uri] = document;
          let toFire = Object.freeze({ document });
          this._onDidOpen.fire(toFire);
          this._onDidChangeContent.fire(toFire);
        });
        connection2.onDidChangeTextDocument((event) => {
          let td = event.textDocument;
          let changes = event.contentChanges;
          if (changes.length === 0) {
            return;
          }
          let document = this._documents[td.uri];
          const { version } = td;
          if (version === null || version === void 0) {
            throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
          }
          document = this._configuration.update(document, changes, version);
          this._documents[td.uri] = document;
          this._onDidChangeContent.fire(Object.freeze({ document }));
        });
        connection2.onDidCloseTextDocument((event) => {
          let document = this._documents[event.textDocument.uri];
          if (document) {
            delete this._documents[event.textDocument.uri];
            this._onDidClose.fire(Object.freeze({ document }));
          }
        });
        connection2.onWillSaveTextDocument((event) => {
          let document = this._documents[event.textDocument.uri];
          if (document) {
            this._onWillSave.fire(Object.freeze({ document, reason: event.reason }));
          }
        });
        connection2.onWillSaveTextDocumentWaitUntil((event, token) => {
          let document = this._documents[event.textDocument.uri];
          if (document && this._willSaveWaitUntil) {
            return this._willSaveWaitUntil(Object.freeze({ document, reason: event.reason }), token);
          } else {
            return [];
          }
        });
        connection2.onDidSaveTextDocument((event) => {
          let document = this._documents[event.textDocument.uri];
          if (document) {
            this._onDidSave.fire(Object.freeze({ document }));
          }
        });
      }
    };
    exports2.TextDocuments = TextDocuments;
    var ErrorMessageTracker = class {
      constructor() {
        this._messages = /* @__PURE__ */ Object.create(null);
      }
      add(message) {
        let count = this._messages[message];
        if (!count) {
          count = 0;
        }
        count++;
        this._messages[message] = count;
      }
      sendErrors(connection2) {
        Object.keys(this._messages).forEach((message) => {
          connection2.window.showErrorMessage(message);
        });
      }
    };
    exports2.ErrorMessageTracker = ErrorMessageTracker;
    var RemoteConsoleImpl = class {
      constructor() {
      }
      rawAttach(connection2) {
        this._rawConnection = connection2;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      fillServerCapabilities(_capabilities) {
      }
      initialize(_capabilities) {
      }
      error(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
      }
      warn(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
      }
      info(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
      }
      log(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
      }
      send(type, message) {
        if (this._rawConnection) {
          this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message });
        }
      }
    };
    var _RemoteWindowImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      showErrorMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showWarningMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showInformationMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
    };
    var RemoteWindowImpl = showDocument_1.ShowDocumentFeature(progress_1.ProgressFeature(_RemoteWindowImpl));
    var BulkRegistration;
    (function(BulkRegistration2) {
      function create() {
        return new BulkRegistrationImpl();
      }
      BulkRegistration2.create = create;
    })(BulkRegistration = exports2.BulkRegistration || (exports2.BulkRegistration = {}));
    var BulkRegistrationImpl = class {
      constructor() {
        this._registrations = [];
        this._registered = /* @__PURE__ */ new Set();
      }
      add(type, registerOptions) {
        const method = Is2.string(type) ? type : type.method;
        if (this._registered.has(method)) {
          throw new Error(`${method} is already added to this registration`);
        }
        const id2 = UUID.generateUuid();
        this._registrations.push({
          id: id2,
          method,
          registerOptions: registerOptions || {}
        });
        this._registered.add(method);
      }
      asRegistrationParams() {
        return {
          registrations: this._registrations
        };
      }
    };
    var BulkUnregistration;
    (function(BulkUnregistration2) {
      function create() {
        return new BulkUnregistrationImpl(void 0, []);
      }
      BulkUnregistration2.create = create;
    })(BulkUnregistration = exports2.BulkUnregistration || (exports2.BulkUnregistration = {}));
    var BulkUnregistrationImpl = class {
      constructor(_connection, unregistrations) {
        this._connection = _connection;
        this._unregistrations = /* @__PURE__ */ new Map();
        unregistrations.forEach((unregistration) => {
          this._unregistrations.set(unregistration.method, unregistration);
        });
      }
      get isAttached() {
        return !!this._connection;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
      }
      dispose() {
        let unregistrations = [];
        for (let unregistration of this._unregistrations.values()) {
          unregistrations.push(unregistration);
        }
        let params = {
          unregisterations: unregistrations
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(void 0, (_error) => {
          this._connection.console.info(`Bulk unregistration failed.`);
        });
      }
      disposeSingle(arg) {
        const method = Is2.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
          return false;
        }
        let params = {
          unregisterations: [unregistration]
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
          this._unregistrations.delete(method);
        }, (_error) => {
          this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
        });
        return true;
      }
    };
    var RemoteClientImpl = class {
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
          return this.registerMany(typeOrRegistrations);
        } else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
          return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        } else {
          return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
      }
      registerSingle1(unregistration, type, registerOptions) {
        const method = Is2.string(type) ? type : type.method;
        const id2 = UUID.generateUuid();
        let params = {
          registrations: [{ id: id2, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
          unregistration.attach(this.connection);
        }
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          unregistration.add({ id: id2, method });
          return unregistration;
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      registerSingle2(type, registerOptions) {
        const method = Is2.string(type) ? type : type.method;
        const id2 = UUID.generateUuid();
        let params = {
          registrations: [{ id: id2, method, registerOptions: registerOptions || {} }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          return vscode_languageserver_protocol_1.Disposable.create(() => {
            this.unregisterSingle(id2, method);
          });
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      unregisterSingle(id2, method) {
        let params = {
          unregisterations: [{ id: id2, method }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(void 0, (_error) => {
          this.connection.console.info(`Un-registering request handler for ${id2} failed.`);
        });
      }
      registerMany(registrations) {
        let params = registrations.asRegistrationParams();
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
          return new BulkUnregistrationImpl(this._connection, params.registrations.map((registration) => {
            return { id: registration.id, method: registration.method };
          }));
        }, (_error) => {
          this.connection.console.info(`Bulk registration failed.`);
          return Promise.reject(_error);
        });
      }
    };
    var _RemoteWorkspaceImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
          return value && !!value.edit;
        }
        let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
      }
    };
    var RemoteWorkspaceImpl = fileOperations_1.FileOperationsFeature(workspaceFolders_1.WorkspaceFoldersFeature(configuration_1.ConfigurationFeature(_RemoteWorkspaceImpl)));
    var TracerImpl = class {
      constructor() {
        this._trace = vscode_languageserver_protocol_1.Trace.Off;
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      set trace(value) {
        this._trace = value;
      }
      log(message, verbose) {
        if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
          return;
        }
        this.connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
          message,
          verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : void 0
        });
      }
    };
    var TelemetryImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      logEvent(data) {
        this.connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data);
      }
    };
    var _LanguagesImpl = class {
      constructor() {
      }
      attach(connection2) {
        this._connection = connection2;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return progress_1.attachWorkDone(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return progress_1.attachPartialResult(this.connection, params);
      }
    };
    exports2._LanguagesImpl = _LanguagesImpl;
    var LanguagesImpl = moniker_1.MonikerFeature(linkedEditingRange_1.LinkedEditingRangeFeature(semanticTokens_1.SemanticTokensFeature(callHierarchy_1.CallHierarchyFeature(_LanguagesImpl))));
    function combineConsoleFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineConsoleFeatures = combineConsoleFeatures;
    function combineTelemetryFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTelemetryFeatures = combineTelemetryFeatures;
    function combineTracerFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineTracerFeatures = combineTracerFeatures;
    function combineClientFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineClientFeatures = combineClientFeatures;
    function combineWindowFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWindowFeatures = combineWindowFeatures;
    function combineWorkspaceFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineWorkspaceFeatures = combineWorkspaceFeatures;
    function combineLanguagesFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    exports2.combineLanguagesFeatures = combineLanguagesFeatures;
    function combineFeatures(one, two) {
      function combine(one2, two2, func) {
        if (one2 && two2) {
          return func(one2, two2);
        } else if (one2) {
          return one2;
        } else {
          return two2;
        }
      }
      let result = {
        __brand: "features",
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures)
      };
      return result;
    }
    exports2.combineFeatures = combineFeatures;
    function createConnection2(connectionFactory, watchDog, factories) {
      const logger = factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl();
      const connection2 = connectionFactory(logger);
      logger.rawAttach(connection2);
      const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl();
      const telemetry = factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl();
      const client = factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl();
      const remoteWindow = factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl();
      const workspace = factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl();
      const languages = factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl();
      const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages];
      function asPromise(value) {
        if (value instanceof Promise) {
          return value;
        } else if (Is2.thenable(value)) {
          return new Promise((resolve3, reject) => {
            value.then((resolved) => resolve3(resolved), (error) => reject(error));
          });
        } else {
          return Promise.resolve(value);
        }
      }
      let shutdownHandler = void 0;
      let initializeHandler = void 0;
      let exitHandler = void 0;
      let protocolConnection = {
        listen: () => connection2.listen(),
        sendRequest: (type, ...params) => connection2.sendRequest(Is2.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection2.onRequest(type, handler),
        sendNotification: (type, param) => {
          const method = Is2.string(type) ? type : type.method;
          if (arguments.length === 1) {
            connection2.sendNotification(method);
          } else {
            connection2.sendNotification(method, param);
          }
        },
        onNotification: (type, handler) => connection2.onNotification(type, handler),
        onProgress: connection2.onProgress,
        sendProgress: connection2.sendProgress,
        onInitialize: (handler) => initializeHandler = handler,
        onInitialized: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
        onShutdown: (handler) => shutdownHandler = handler,
        onExit: (handler) => exitHandler = handler,
        get console() {
          return logger;
        },
        get telemetry() {
          return telemetry;
        },
        get tracer() {
          return tracer;
        },
        get client() {
          return client;
        },
        get window() {
          return remoteWindow;
        },
        get workspace() {
          return workspace;
        },
        get languages() {
          return languages;
        },
        onDidChangeConfiguration: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection2.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection2.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onCompletion: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCompletionResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onDeclaration: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDefinition: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onTypeDefinition: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onImplementation: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onReferences: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDocumentHighlight: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDocumentSymbol: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onWorkspaceSymbol: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCodeAction: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCodeActionResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onCodeLens: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onCodeLensResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onDocumentRangeFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onDocumentOnTypeFormatting: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        onPrepareRename: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onDocumentLinkResolve: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onColorPresentation: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onFoldingRanges: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onSelectionRanges: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), progress_1.attachPartialResult(connection2, params));
        }),
        onExecuteCommand: (handler) => connection2.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
          return handler(params, cancel, progress_1.attachWorkDone(connection2, params), void 0);
        }),
        dispose: () => connection2.dispose()
      };
      for (let remote of allRemotes) {
        remote.attach(protocolConnection);
      }
      connection2.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
        watchDog.initialize(params);
        if (Is2.string(params.trace)) {
          tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
        }
        for (let remote of allRemotes) {
          remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
          let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, progress_1.attachWorkDone(connection2, params), void 0);
          return asPromise(result).then((value) => {
            if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
              return value;
            }
            let result2 = value;
            if (!result2) {
              result2 = { capabilities: {} };
            }
            let capabilities = result2.capabilities;
            if (!capabilities) {
              capabilities = {};
              result2.capabilities = capabilities;
            }
            if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
              capabilities.textDocumentSync = Is2.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            } else if (!Is2.number(capabilities.textDocumentSync) && !Is2.number(capabilities.textDocumentSync.change)) {
              capabilities.textDocumentSync.change = Is2.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            }
            for (let remote of allRemotes) {
              remote.fillServerCapabilities(capabilities);
            }
            return result2;
          });
        } else {
          let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
          for (let remote of allRemotes) {
            remote.fillServerCapabilities(result.capabilities);
          }
          return result;
        }
      });
      connection2.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
        watchDog.shutdownReceived = true;
        if (shutdownHandler) {
          return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
        } else {
          return void 0;
        }
      });
      connection2.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
        try {
          if (exitHandler) {
            exitHandler();
          }
        } finally {
          if (watchDog.shutdownReceived) {
            watchDog.exit(0);
          } else {
            watchDog.exit(1);
          }
        }
      });
      connection2.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
      });
      return protocolConnection;
    }
    exports2.createConnection = createConnection2;
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/node/files.js
var require_files = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/node/files.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveModulePath = exports2.FileSystem = exports2.resolveGlobalYarnPath = exports2.resolveGlobalNodePath = exports2.resolve = exports2.uriToFilePath = void 0;
    var url = require("url");
    var path6 = require("path");
    var fs2 = require("fs");
    var child_process_1 = require("child_process");
    function uriToFilePath(uri) {
      let parsed = url.parse(uri);
      if (parsed.protocol !== "file:" || !parsed.path) {
        return void 0;
      }
      let segments = parsed.path.split("/");
      for (var i = 0, len = segments.length; i < len; i++) {
        segments[i] = decodeURIComponent(segments[i]);
      }
      if (process.platform === "win32" && segments.length > 1) {
        let first = segments[0];
        let second = segments[1];
        if (first.length === 0 && second.length > 1 && second[1] === ":") {
          segments.shift();
        }
      }
      return path6.normalize(segments.join("/"));
    }
    exports2.uriToFilePath = uriToFilePath;
    function isWindows() {
      return process.platform === "win32";
    }
    function resolve3(moduleName, nodePath, cwd2, tracer) {
      const nodePathKey = "NODE_PATH";
      const app = [
        "var p = process;",
        "p.on('message',function(m){",
        "if(m.c==='e'){",
        "p.exit(0);",
        "}",
        "else if(m.c==='rs'){",
        "try{",
        "var r=require.resolve(m.a);",
        "p.send({c:'r',s:true,r:r});",
        "}",
        "catch(err){",
        "p.send({c:'r',s:false});",
        "}",
        "}",
        "});"
      ].join("");
      return new Promise((resolve4, reject) => {
        let env = process.env;
        let newEnv = /* @__PURE__ */ Object.create(null);
        Object.keys(env).forEach((key) => newEnv[key] = env[key]);
        if (nodePath && fs2.existsSync(nodePath)) {
          if (newEnv[nodePathKey]) {
            newEnv[nodePathKey] = nodePath + path6.delimiter + newEnv[nodePathKey];
          } else {
            newEnv[nodePathKey] = nodePath;
          }
          if (tracer) {
            tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
          }
        }
        newEnv["ELECTRON_RUN_AS_NODE"] = "1";
        try {
          let cp = child_process_1.fork("", [], {
            cwd: cwd2,
            env: newEnv,
            execArgv: ["-e", app]
          });
          if (cp.pid === void 0) {
            reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
            return;
          }
          cp.on("error", (error) => {
            reject(error);
          });
          cp.on("message", (message2) => {
            if (message2.c === "r") {
              cp.send({ c: "e" });
              if (message2.s) {
                resolve4(message2.r);
              } else {
                reject(new Error(`Failed to resolve module: ${moduleName}`));
              }
            }
          });
          let message = {
            c: "rs",
            a: moduleName
          };
          cp.send(message);
        } catch (error) {
          reject(error);
        }
      });
    }
    exports2.resolve = resolve3;
    function resolveGlobalNodePath(tracer) {
      let npmCommand = "npm";
      const env = /* @__PURE__ */ Object.create(null);
      Object.keys(process.env).forEach((key) => env[key] = process.env[key]);
      env["NO_UPDATE_NOTIFIER"] = "true";
      const options = {
        encoding: "utf8",
        env
      };
      if (isWindows()) {
        npmCommand = "npm.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let stdout = child_process_1.spawnSync(npmCommand, ["config", "get", "prefix"], options).stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'npm config get prefix' didn't return a value.`);
          }
          return void 0;
        }
        let prefix = stdout.trim();
        if (tracer) {
          tracer(`'npm config get prefix' value is: ${prefix}`);
        }
        if (prefix.length > 0) {
          if (isWindows()) {
            return path6.join(prefix, "node_modules");
          } else {
            return path6.join(prefix, "lib", "node_modules");
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalNodePath = resolveGlobalNodePath;
    function resolveGlobalYarnPath(tracer) {
      let yarnCommand = "yarn";
      let options = {
        encoding: "utf8"
      };
      if (isWindows()) {
        yarnCommand = "yarn.cmd";
        options.shell = true;
      }
      let handler = () => {
      };
      try {
        process.on("SIGPIPE", handler);
        let results = child_process_1.spawnSync(yarnCommand, ["global", "dir", "--json"], options);
        let stdout = results.stdout;
        if (!stdout) {
          if (tracer) {
            tracer(`'yarn global dir' didn't return a value.`);
            if (results.stderr) {
              tracer(results.stderr);
            }
          }
          return void 0;
        }
        let lines = stdout.trim().split(/\r?\n/);
        for (let line of lines) {
          try {
            let yarn = JSON.parse(line);
            if (yarn.type === "log") {
              return path6.join(yarn.data, "node_modules");
            }
          } catch (e) {
          }
        }
        return void 0;
      } catch (err) {
        return void 0;
      } finally {
        process.removeListener("SIGPIPE", handler);
      }
    }
    exports2.resolveGlobalYarnPath = resolveGlobalYarnPath;
    var FileSystem;
    (function(FileSystem2) {
      let _isCaseSensitive = void 0;
      function isCaseSensitive() {
        if (_isCaseSensitive !== void 0) {
          return _isCaseSensitive;
        }
        if (process.platform === "win32") {
          _isCaseSensitive = false;
        } else {
          _isCaseSensitive = !fs2.existsSync(__filename.toUpperCase()) || !fs2.existsSync(__filename.toLowerCase());
        }
        return _isCaseSensitive;
      }
      FileSystem2.isCaseSensitive = isCaseSensitive;
      function isParent(parent, child) {
        if (isCaseSensitive()) {
          return path6.normalize(child).indexOf(path6.normalize(parent)) === 0;
        } else {
          return path6.normalize(child).toLowerCase().indexOf(path6.normalize(parent).toLowerCase()) === 0;
        }
      }
      FileSystem2.isParent = isParent;
    })(FileSystem = exports2.FileSystem || (exports2.FileSystem = {}));
    function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
      if (nodePath) {
        if (!path6.isAbsolute(nodePath)) {
          nodePath = path6.join(workspaceRoot, nodePath);
        }
        return resolve3(moduleName, nodePath, nodePath, tracer).then((value) => {
          if (FileSystem.isParent(nodePath, value)) {
            return value;
          } else {
            return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
          }
        }).then(void 0, (_error) => {
          return resolve3(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
        });
      } else {
        return resolve3(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
      }
    }
    exports2.resolveModulePath = resolveModulePath;
  }
});

// node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/node.js
var require_node2 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver-protocol@3.16.0/node_modules/vscode-languageserver-protocol/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main2();
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/api.js
var require_api3 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/common/api.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProposedFeatures = exports2.SemanticTokensBuilder = void 0;
    var semanticTokens_1 = require_semanticTokens();
    Object.defineProperty(exports2, "SemanticTokensBuilder", { enumerable: true, get: function() {
      return semanticTokens_1.SemanticTokensBuilder;
    } });
    __exportStar(require_main2(), exports2);
    __exportStar(require_server(), exports2);
    var ProposedFeatures2;
    (function(ProposedFeatures3) {
      ProposedFeatures3.all = {
        __brand: "features"
      };
    })(ProposedFeatures2 = exports2.ProposedFeatures || (exports2.ProposedFeatures = {}));
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/node/main.js
var require_main3 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createConnection = exports2.Files = void 0;
    var Is2 = require_is();
    var server_1 = require_server();
    var fm = require_files();
    var node_1 = require_node2();
    __exportStar(require_node2(), exports2);
    __exportStar(require_api3(), exports2);
    var Files;
    (function(Files2) {
      Files2.uriToFilePath = fm.uriToFilePath;
      Files2.resolveGlobalNodePath = fm.resolveGlobalNodePath;
      Files2.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
      Files2.resolve = fm.resolve;
      Files2.resolveModulePath = fm.resolveModulePath;
    })(Files = exports2.Files || (exports2.Files = {}));
    var _protocolConnection;
    function endProtocolConnection() {
      if (_protocolConnection === void 0) {
        return;
      }
      try {
        _protocolConnection.end();
      } catch (_err) {
      }
    }
    var _shutdownReceived = false;
    var exitTimer = void 0;
    function setupExitTimer() {
      const argName = "--clientProcessId";
      function runTimer(value) {
        try {
          let processId = parseInt(value);
          if (!isNaN(processId)) {
            exitTimer = setInterval(() => {
              try {
                process.kill(processId, 0);
              } catch (ex) {
                endProtocolConnection();
                process.exit(_shutdownReceived ? 0 : 1);
              }
            }, 3e3);
          }
        } catch (e) {
        }
      }
      for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (arg === argName && i + 1 < process.argv.length) {
          runTimer(process.argv[i + 1]);
          return;
        } else {
          let args = arg.split("=");
          if (args[0] === argName) {
            runTimer(args[1]);
          }
        }
      }
    }
    setupExitTimer();
    var watchDog = {
      initialize: (params) => {
        const processId = params.processId;
        if (Is2.number(processId) && exitTimer === void 0) {
          setInterval(() => {
            try {
              process.kill(processId, 0);
            } catch (ex) {
              process.exit(_shutdownReceived ? 0 : 1);
            }
          }, 3e3);
        }
      },
      get shutdownReceived() {
        return _shutdownReceived;
      },
      set shutdownReceived(value) {
        _shutdownReceived = value;
      },
      exit: (code) => {
        endProtocolConnection();
        process.exit(code);
      }
    };
    function createConnection2(arg1, arg2, arg3, arg4) {
      let factories;
      let input;
      let output;
      let options;
      if (arg1 !== void 0 && arg1.__brand === "features") {
        factories = arg1;
        arg1 = arg2;
        arg2 = arg3;
        arg3 = arg4;
      }
      if (node_1.ConnectionStrategy.is(arg1) || node_1.ConnectionOptions.is(arg1)) {
        options = arg1;
      } else {
        input = arg1;
        output = arg2;
        options = arg3;
      }
      return _createConnection(input, output, options, factories);
    }
    exports2.createConnection = createConnection2;
    function _createConnection(input, output, options, factories) {
      if (!input && !output && process.argv.length > 2) {
        let port = void 0;
        let pipeName = void 0;
        let argv = process.argv.slice(2);
        for (let i = 0; i < argv.length; i++) {
          let arg = argv[i];
          if (arg === "--node-ipc") {
            input = new node_1.IPCMessageReader(process);
            output = new node_1.IPCMessageWriter(process);
            break;
          } else if (arg === "--stdio") {
            input = process.stdin;
            output = process.stdout;
            break;
          } else if (arg === "--socket") {
            port = parseInt(argv[i + 1]);
            break;
          } else if (arg === "--pipe") {
            pipeName = argv[i + 1];
            break;
          } else {
            var args = arg.split("=");
            if (args[0] === "--socket") {
              port = parseInt(args[1]);
              break;
            } else if (args[0] === "--pipe") {
              pipeName = args[1];
              break;
            }
          }
        }
        if (port) {
          let transport = node_1.createServerSocketTransport(port);
          input = transport[0];
          output = transport[1];
        } else if (pipeName) {
          let transport = node_1.createServerPipeTransport(pipeName);
          input = transport[0];
          output = transport[1];
        }
      }
      var commandLineMessage = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
      if (!input) {
        throw new Error("Connection input stream is not set. " + commandLineMessage);
      }
      if (!output) {
        throw new Error("Connection output stream is not set. " + commandLineMessage);
      }
      if (Is2.func(input.read) && Is2.func(input.on)) {
        let inputStream = input;
        inputStream.on("end", () => {
          endProtocolConnection();
          process.exit(_shutdownReceived ? 0 : 1);
        });
        inputStream.on("close", () => {
          endProtocolConnection();
          process.exit(_shutdownReceived ? 0 : 1);
        });
      }
      const connectionFactory = (logger) => {
        const result = node_1.createProtocolConnection(input, output, logger, options);
        return result;
      };
      return server_1.createConnection(connectionFactory, watchDog, factories);
    }
  }
});

// node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/node.js
var require_node3 = __commonJS({
  "node_modules/.pnpm/vscode-languageserver@7.0.0/node_modules/vscode-languageserver/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main3();
  }
});

// node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js"(exports2) {
    var pathModule = require("path");
    var isWindows = process.platform === "win32";
    var fs2 = require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports2.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs2.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache)
              cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id2 = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id2)) {
              linkTarget = seenLinks[id2];
            }
          }
          if (linkTarget === null) {
            fs2.statSync(base);
            linkTarget = fs2.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base] = resolvedLink;
          if (!isWindows)
            seenLinks[id2] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p;
      return p;
    };
    exports2.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstat(base, function(err) {
            if (err)
              return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache)
            cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs2.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err)
          return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id2 = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id2)) {
            return gotTarget(null, seenLinks[id2], base);
          }
        }
        fs2.stat(base, function(err2) {
          if (err2)
            return cb(err2);
          fs2.readlink(base, function(err3, target) {
            if (!isWindows)
              seenLinks[id2] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js"(exports2, module2) {
    module2.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs2 = require("fs");
    var origRealpath = fs2.realpath;
    var origRealpathSync = fs2.realpathSync;
    var version = process.version;
    var ok = /^v[0-5]\./.test(version);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs2.realpath = realpath;
      fs2.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs2.realpath = origRealpath;
      fs2.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js"(exports2, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js"(exports2, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js"(exports2, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n2;
      if (isSequence) {
        n2 = m.body.split(/\.\./);
      } else {
        n2 = parseCommaParts(m.body);
        if (n2.length === 1) {
          n2 = expand(n2[0], false).map(embrace);
          if (n2.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n2[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n2[0]);
        var y = numeric(n2[1]);
        var width = Math.max(n2[0].length, n2[1].length);
        var incr = n2.length == 3 ? Math.abs(numeric(n2[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n2.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n2, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/.pnpm/minimatch@3.1.2/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/.pnpm/minimatch@3.1.2/node_modules/minimatch/minimatch.js"(exports2, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path6 = function() {
      try {
        return require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path6.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path6.sep !== "/") {
        pattern = pattern.split(path6.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = function debug() {
          console.error.apply(console, arguments);
        };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse2;
    var SUBPARSE = {};
    function parse2(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n2 = negativeLists.length - 1; n2 > -1; n2--) {
        var nl = negativeLists[n2];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined")
        partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path6.sep !== "/") {
        f = f.split(path6.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util2 = require("util");
      if (typeof util2.inherits !== "function")
        throw "";
      module2.exports = util2.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util2;
  }
});

// node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js"(exports2, module2) {
    "use strict";
    function posix(path6) {
      return path6.charAt(0) === "/";
    }
    function win32(path6) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path6);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win32 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win32;
  }
});

// node_modules/.pnpm/glob@7.2.3/node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/glob@7.2.3/node_modules/glob/common.js"(exports2) {
    exports2.setopts = setopts;
    exports2.ownProp = ownProp;
    exports2.makeAbs = makeAbs;
    exports2.finish = finish;
    exports2.mark = mark;
    exports2.isIgnored = isIgnored;
    exports2.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs2 = require("fs");
    var path6 = require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.fs = options.fs || fs2;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd2 = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd2;
      else {
        self.cwd = path6.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd2;
      }
      self.root = options.root || path6.resolve(self.cwd, "/");
      self.root = path6.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      if (process.platform === "win32")
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = false;
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c = self.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path6.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path6.resolve(self.cwd, f);
      } else {
        abs = path6.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path7) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path7) || !!(item.gmatcher && item.gmatcher.match(path7));
      });
    }
    function childrenIgnored(self, path7) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path7));
      });
    }
  }
});

// node_modules/.pnpm/glob@7.2.3/node_modules/glob/sync.js
var require_sync = __commonJS({
  "node_modules/.pnpm/glob@7.2.3/node_modules/glob/sync.js"(exports2, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util2 = require("util");
    var path6 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n2 = this.minimatch.set.length;
      this.matches = new Array(n2);
      for (var i = 0; i < n2; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert.ok(this instanceof GlobSync);
      var n2 = 0;
      while (typeof pattern[n2] === "string") {
        n2++;
      }
      var prefix;
      switch (n2) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n2).join("/");
          break;
      }
      var remain = pattern.slice(n2);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path6.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            throw error;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path6.join(this.root, prefix);
        } else {
          prefix = path6.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = this.fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js"(exports2, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/.pnpm/once@1.4.0/node_modules/once/once.js"(exports2, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js"(exports2, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// node_modules/.pnpm/glob@7.2.3/node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/.pnpm/glob@7.2.3/node_modules/glob/glob.js"(exports2, module2) {
    module2.exports = glob;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = require("events").EventEmitter;
    var path6 = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util2 = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n2 = this.minimatch.set.length;
      this.matches = new Array(n2);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n2 === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n2; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n2 = this.matches.length;
      if (n2 === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n2 === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n2 = found.length;
      if (n2 === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        rp.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n2 === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n2 = 0;
      while (typeof pattern[n2] === "string") {
        n2++;
      }
      var prefix;
      switch (n2) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n2).join("/");
          break;
      }
      var remain = pattern.slice(n2);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path6.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self = this;
      self.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            this.emit("error", error);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path6.join(this.root, prefix);
        } else {
          prefix = path6.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self.fs.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat);
    };
  }
});

// node_modules/.pnpm/rimraf@3.0.2/node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/.pnpm/rimraf@3.0.2/node_modules/rimraf/rimraf.js"(exports2, module2) {
    var assert = require("assert");
    var path6 = require("path");
    var fs2 = require("fs");
    var glob = void 0;
    try {
      glob = require_glob();
    } catch (_err) {
    }
    var defaultGlobOpts = {
      nosort: true,
      silent: true
    };
    var timeout = 0;
    var isWindows = process.platform === "win32";
    var defaults = (options) => {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs2[m];
        m = m + "Sync";
        options[m] = options[m] || fs2[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
      options.emfileWait = options.emfileWait || 1e3;
      if (options.glob === false) {
        options.disableGlob = true;
      }
      if (options.disableGlob !== true && glob === void 0) {
        throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
      }
      options.disableGlob = options.disableGlob || false;
      options.glob = options.glob || defaultGlobOpts;
    };
    var rimraf = (p, options, cb) => {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.equal(typeof p, "string", "rimraf: path should be a string");
      assert.equal(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.equal(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      let busyTries = 0;
      let errState = null;
      let n2 = 0;
      const next = (er) => {
        errState = errState || er;
        if (--n2 === 0)
          cb(errState);
      };
      const afterGlob = (er, results) => {
        if (er)
          return cb(er);
        n2 = results.length;
        if (n2 === 0)
          return cb();
        results.forEach((p2) => {
          const CB = (er2) => {
            if (er2) {
              if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
                busyTries++;
                return setTimeout(() => rimraf_(p2, options, CB), busyTries * 100);
              }
              if (er2.code === "EMFILE" && timeout < options.emfileWait) {
                return setTimeout(() => rimraf_(p2, options, CB), timeout++);
              }
              if (er2.code === "ENOENT")
                er2 = null;
            }
            timeout = 0;
            next(er2);
          };
          rimraf_(p2, options, CB);
        });
      };
      if (options.disableGlob || !glob.hasMagic(p))
        return afterGlob(null, [p]);
      options.lstat(p, (er, stat) => {
        if (!er)
          return afterGlob(null, [p]);
        glob(p, options.glob, afterGlob);
      });
    };
    var rimraf_ = (p, options, cb) => {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT")
          return cb(null);
        if (er && er.code === "EPERM" && isWindows)
          fixWinEPERM(p, options, er, cb);
        if (st && st.isDirectory())
          return rmdir(p, options, er, cb);
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT")
              return cb(null);
            if (er2.code === "EPERM")
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            if (er2.code === "EISDIR")
              return rmdir(p, options, er2, cb);
          }
          return cb(er2);
        });
      });
    };
    var fixWinEPERM = (p, options, er, cb) => {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.chmod(p, 438, (er2) => {
        if (er2)
          cb(er2.code === "ENOENT" ? null : er);
        else
          options.stat(p, (er3, stats) => {
            if (er3)
              cb(er3.code === "ENOENT" ? null : er);
            else if (stats.isDirectory())
              rmdir(p, options, er, cb);
            else
              options.unlink(p, cb);
          });
      });
    };
    var fixWinEPERMSync = (p, options, er) => {
      assert(p);
      assert(options);
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT")
          return;
        else
          throw er;
      }
      let stats;
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT")
          return;
        else
          throw er;
      }
      if (stats.isDirectory())
        rmdirSync(p, options, er);
      else
        options.unlinkSync(p);
    };
    var rmdir = (p, options, originalEr, cb) => {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
          rmkids(p, options, cb);
        else if (er && er.code === "ENOTDIR")
          cb(originalEr);
        else
          cb(er);
      });
    };
    var rmkids = (p, options, cb) => {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n2 = files.length;
        if (n2 === 0)
          return options.rmdir(p, cb);
        let errState;
        files.forEach((f) => {
          rimraf(path6.join(p, f), options, (er2) => {
            if (errState)
              return;
            if (er2)
              return cb(errState = er2);
            if (--n2 === 0)
              options.rmdir(p, cb);
          });
        });
      });
    };
    var rimrafSync = (p, options) => {
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.equal(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.equal(typeof options, "object", "rimraf: options should be object");
      let results;
      if (options.disableGlob || !glob.hasMagic(p)) {
        results = [p];
      } else {
        try {
          options.lstatSync(p);
          results = [p];
        } catch (er) {
          results = glob.sync(p, options.glob);
        }
      }
      if (!results.length)
        return;
      for (let i = 0; i < results.length; i++) {
        const p2 = results[i];
        let st;
        try {
          st = options.lstatSync(p2);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM" && isWindows)
            fixWinEPERMSync(p2, options, er);
        }
        try {
          if (st && st.isDirectory())
            rmdirSync(p2, options, null);
          else
            options.unlinkSync(p2);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM")
            return isWindows ? fixWinEPERMSync(p2, options, er) : rmdirSync(p2, options, er);
          if (er.code !== "EISDIR")
            throw er;
          rmdirSync(p2, options, er);
        }
      }
    };
    var rmdirSync = (p, options, originalEr) => {
      assert(p);
      assert(options);
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "ENOTDIR")
          throw originalEr;
        if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
          rmkidsSync(p, options);
      }
    };
    var rmkidsSync = (p, options) => {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path6.join(p, f), options));
      const retries = isWindows ? 100 : 1;
      let i = 0;
      do {
        let threw = true;
        try {
          const ret = options.rmdirSync(p, options);
          threw = false;
          return ret;
        } finally {
          if (++i < retries && threw)
            continue;
        }
      } while (true);
    };
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/.pnpm/tmp@0.2.1/node_modules/tmp/lib/tmp.js
var require_tmp = __commonJS({
  "node_modules/.pnpm/tmp@0.2.1/node_modules/tmp/lib/tmp.js"(exports2, module2) {
    var fs2 = require("fs");
    var os = require("os");
    var path6 = require("path");
    var crypto = require("crypto");
    var _c = { fs: fs2.constants, os: os.constants };
    var rimraf = require_rimraf();
    var RANDOM_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var TEMPLATE_PATTERN = /XXXXXX/;
    var DEFAULT_TRIES = 3;
    var CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR);
    var IS_WIN32 = os.platform() === "win32";
    var EBADF = _c.EBADF || _c.os.errno.EBADF;
    var ENOENT = _c.ENOENT || _c.os.errno.ENOENT;
    var DIR_MODE = 448;
    var FILE_MODE = 384;
    var EXIT = "exit";
    var _removeObjects = [];
    var FN_RMDIR_SYNC = fs2.rmdirSync.bind(fs2);
    var FN_RIMRAF_SYNC = rimraf.sync;
    var _gracefulCleanup = false;
    function tmpName(options, callback) {
      const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      try {
        _assertAndSanitizeOptions(opts);
      } catch (err) {
        return cb(err);
      }
      let tries = opts.tries;
      (function _getUniqueName() {
        try {
          const name = _generateTmpName(opts);
          fs2.stat(name, function(err) {
            if (!err) {
              if (tries-- > 0)
                return _getUniqueName();
              return cb(new Error("Could not get a unique tmp filename, max tries reached " + name));
            }
            cb(null, name);
          });
        } catch (err) {
          cb(err);
        }
      })();
    }
    function tmpNameSync(options) {
      const args = _parseArguments(options), opts = args[0];
      _assertAndSanitizeOptions(opts);
      let tries = opts.tries;
      do {
        const name = _generateTmpName(opts);
        try {
          fs2.statSync(name);
        } catch (e) {
          return name;
        }
      } while (tries-- > 0);
      throw new Error("Could not get a unique tmp filename, max tries reached");
    }
    function file(options, callback) {
      const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      tmpName(opts, function _tmpNameCreated(err, name) {
        if (err)
          return cb(err);
        fs2.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err2, fd) {
          if (err2)
            return cb(err2);
          if (opts.discardDescriptor) {
            return fs2.close(fd, function _discardCallback(possibleErr) {
              return cb(possibleErr, name, void 0, _prepareTmpFileRemoveCallback(name, -1, opts, false));
            });
          } else {
            const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
            cb(null, name, fd, _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, false));
          }
        });
      });
    }
    function fileSync(options) {
      const args = _parseArguments(options), opts = args[0];
      const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
      const name = tmpNameSync(opts);
      var fd = fs2.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
      if (opts.discardDescriptor) {
        fs2.closeSync(fd);
        fd = void 0;
      }
      return {
        name,
        fd,
        removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, true)
      };
    }
    function dir(options, callback) {
      const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      tmpName(opts, function _tmpNameCreated(err, name) {
        if (err)
          return cb(err);
        fs2.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err2) {
          if (err2)
            return cb(err2);
          cb(null, name, _prepareTmpDirRemoveCallback(name, opts, false));
        });
      });
    }
    function dirSync(options) {
      const args = _parseArguments(options), opts = args[0];
      const name = tmpNameSync(opts);
      fs2.mkdirSync(name, opts.mode || DIR_MODE);
      return {
        name,
        removeCallback: _prepareTmpDirRemoveCallback(name, opts, true)
      };
    }
    function _removeFileAsync(fdPath, next) {
      const _handler = function(err) {
        if (err && !_isENOENT(err)) {
          return next(err);
        }
        next();
      };
      if (0 <= fdPath[0])
        fs2.close(fdPath[0], function() {
          fs2.unlink(fdPath[1], _handler);
        });
      else
        fs2.unlink(fdPath[1], _handler);
    }
    function _removeFileSync(fdPath) {
      let rethrownException = null;
      try {
        if (0 <= fdPath[0])
          fs2.closeSync(fdPath[0]);
      } catch (e) {
        if (!_isEBADF(e) && !_isENOENT(e))
          throw e;
      } finally {
        try {
          fs2.unlinkSync(fdPath[1]);
        } catch (e) {
          if (!_isENOENT(e))
            rethrownException = e;
        }
      }
      if (rethrownException !== null) {
        throw rethrownException;
      }
    }
    function _prepareTmpFileRemoveCallback(name, fd, opts, sync) {
      const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name], sync);
      const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], sync, removeCallbackSync);
      if (!opts.keep)
        _removeObjects.unshift(removeCallbackSync);
      return sync ? removeCallbackSync : removeCallback;
    }
    function _prepareTmpDirRemoveCallback(name, opts, sync) {
      const removeFunction = opts.unsafeCleanup ? rimraf : fs2.rmdir.bind(fs2);
      const removeFunctionSync = opts.unsafeCleanup ? FN_RIMRAF_SYNC : FN_RMDIR_SYNC;
      const removeCallbackSync = _prepareRemoveCallback(removeFunctionSync, name, sync);
      const removeCallback = _prepareRemoveCallback(removeFunction, name, sync, removeCallbackSync);
      if (!opts.keep)
        _removeObjects.unshift(removeCallbackSync);
      return sync ? removeCallbackSync : removeCallback;
    }
    function _prepareRemoveCallback(removeFunction, fileOrDirName, sync, cleanupCallbackSync) {
      let called = false;
      return function _cleanupCallback(next) {
        if (!called) {
          const toRemove = cleanupCallbackSync || _cleanupCallback;
          const index = _removeObjects.indexOf(toRemove);
          if (index >= 0)
            _removeObjects.splice(index, 1);
          called = true;
          if (sync || removeFunction === FN_RMDIR_SYNC || removeFunction === FN_RIMRAF_SYNC) {
            return removeFunction(fileOrDirName);
          } else {
            return removeFunction(fileOrDirName, next || function() {
            });
          }
        }
      };
    }
    function _garbageCollector() {
      if (!_gracefulCleanup)
        return;
      while (_removeObjects.length) {
        try {
          _removeObjects[0]();
        } catch (e) {
        }
      }
    }
    function _randomChars(howMany) {
      let value = [], rnd = null;
      try {
        rnd = crypto.randomBytes(howMany);
      } catch (e) {
        rnd = crypto.pseudoRandomBytes(howMany);
      }
      for (var i = 0; i < howMany; i++) {
        value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
      }
      return value.join("");
    }
    function _isBlank(s) {
      return s === null || _isUndefined(s) || !s.trim();
    }
    function _isUndefined(obj) {
      return typeof obj === "undefined";
    }
    function _parseArguments(options, callback) {
      if (typeof options === "function") {
        return [{}, options];
      }
      if (_isUndefined(options)) {
        return [{}, callback];
      }
      const actualOptions = {};
      for (const key of Object.getOwnPropertyNames(options)) {
        actualOptions[key] = options[key];
      }
      return [actualOptions, callback];
    }
    function _generateTmpName(opts) {
      const tmpDir = opts.tmpdir;
      if (!_isUndefined(opts.name))
        return path6.join(tmpDir, opts.dir, opts.name);
      if (!_isUndefined(opts.template))
        return path6.join(tmpDir, opts.dir, opts.template).replace(TEMPLATE_PATTERN, _randomChars(6));
      const name = [
        opts.prefix ? opts.prefix : "tmp",
        "-",
        process.pid,
        "-",
        _randomChars(12),
        opts.postfix ? "-" + opts.postfix : ""
      ].join("");
      return path6.join(tmpDir, opts.dir, name);
    }
    function _assertAndSanitizeOptions(options) {
      options.tmpdir = _getTmpDir(options);
      const tmpDir = options.tmpdir;
      if (!_isUndefined(options.name))
        _assertIsRelative(options.name, "name", tmpDir);
      if (!_isUndefined(options.dir))
        _assertIsRelative(options.dir, "dir", tmpDir);
      if (!_isUndefined(options.template)) {
        _assertIsRelative(options.template, "template", tmpDir);
        if (!options.template.match(TEMPLATE_PATTERN))
          throw new Error(`Invalid template, found "${options.template}".`);
      }
      if (!_isUndefined(options.tries) && isNaN(options.tries) || options.tries < 0)
        throw new Error(`Invalid tries, found "${options.tries}".`);
      options.tries = _isUndefined(options.name) ? options.tries || DEFAULT_TRIES : 1;
      options.keep = !!options.keep;
      options.detachDescriptor = !!options.detachDescriptor;
      options.discardDescriptor = !!options.discardDescriptor;
      options.unsafeCleanup = !!options.unsafeCleanup;
      options.dir = _isUndefined(options.dir) ? "" : path6.relative(tmpDir, _resolvePath(options.dir, tmpDir));
      options.template = _isUndefined(options.template) ? void 0 : path6.relative(tmpDir, _resolvePath(options.template, tmpDir));
      options.template = _isBlank(options.template) ? void 0 : path6.relative(options.dir, options.template);
      options.name = _isUndefined(options.name) ? void 0 : _sanitizeName(options.name);
      options.prefix = _isUndefined(options.prefix) ? "" : options.prefix;
      options.postfix = _isUndefined(options.postfix) ? "" : options.postfix;
    }
    function _resolvePath(name, tmpDir) {
      const sanitizedName = _sanitizeName(name);
      if (sanitizedName.startsWith(tmpDir)) {
        return path6.resolve(sanitizedName);
      } else {
        return path6.resolve(path6.join(tmpDir, sanitizedName));
      }
    }
    function _sanitizeName(name) {
      if (_isBlank(name)) {
        return name;
      }
      return name.replace(/["']/g, "");
    }
    function _assertIsRelative(name, option, tmpDir) {
      if (option === "name") {
        if (path6.isAbsolute(name))
          throw new Error(`${option} option must not contain an absolute path, found "${name}".`);
        let basename2 = path6.basename(name);
        if (basename2 === ".." || basename2 === "." || basename2 !== name)
          throw new Error(`${option} option must not contain a path, found "${name}".`);
      } else {
        if (path6.isAbsolute(name) && !name.startsWith(tmpDir)) {
          throw new Error(`${option} option must be relative to "${tmpDir}", found "${name}".`);
        }
        let resolvedPath = _resolvePath(name, tmpDir);
        if (!resolvedPath.startsWith(tmpDir))
          throw new Error(`${option} option must be relative to "${tmpDir}", found "${resolvedPath}".`);
      }
    }
    function _isEBADF(error) {
      return _isExpectedError(error, -EBADF, "EBADF");
    }
    function _isENOENT(error) {
      return _isExpectedError(error, -ENOENT, "ENOENT");
    }
    function _isExpectedError(error, errno, code) {
      return IS_WIN32 ? error.code === code : error.code === code && error.errno === errno;
    }
    function setGracefulCleanup() {
      _gracefulCleanup = true;
    }
    function _getTmpDir(options) {
      return path6.resolve(_sanitizeName(options && options.tmpdir || os.tmpdir()));
    }
    process.addListener(EXIT, _garbageCollector);
    Object.defineProperty(module2.exports, "tmpdir", {
      enumerable: true,
      configurable: false,
      get: function() {
        return _getTmpDir();
      }
    });
    module2.exports.dir = dir;
    module2.exports.dirSync = dirSync;
    module2.exports.file = file;
    module2.exports.fileSync = fileSync;
    module2.exports.tmpName = tmpName;
    module2.exports.tmpNameSync = tmpNameSync;
    module2.exports.setGracefulCleanup = setGracefulCleanup;
  }
});

// node_modules/.pnpm/tmp-promise@3.0.3/node_modules/tmp-promise/index.js
var require_tmp_promise = __commonJS({
  "node_modules/.pnpm/tmp-promise@3.0.3/node_modules/tmp-promise/index.js"(exports2, module2) {
    "use strict";
    var { promisify: promisify2 } = require("util");
    var tmp = require_tmp();
    module2.exports.fileSync = tmp.fileSync;
    var fileWithOptions = promisify2(
      (options, cb) => tmp.file(
        options,
        (err, path6, fd, cleanup) => err ? cb(err) : cb(void 0, { path: path6, fd, cleanup: promisify2(cleanup) })
      )
    );
    module2.exports.file = async (options) => fileWithOptions(options);
    module2.exports.withFile = async function withFile2(fn, options) {
      const { path: path6, fd, cleanup } = await module2.exports.file(options);
      try {
        return await fn({ path: path6, fd });
      } finally {
        await cleanup();
      }
    };
    module2.exports.dirSync = tmp.dirSync;
    var dirWithOptions = promisify2(
      (options, cb) => tmp.dir(
        options,
        (err, path6, cleanup) => err ? cb(err) : cb(void 0, { path: path6, cleanup: promisify2(cleanup) })
      )
    );
    module2.exports.dir = async (options) => dirWithOptions(options);
    module2.exports.withDir = async function withDir(fn, options) {
      const { path: path6, cleanup } = await module2.exports.dir(options);
      try {
        return await fn({ path: path6 });
      } finally {
        await cleanup();
      }
    };
    module2.exports.tmpNameSync = tmp.tmpNameSync;
    module2.exports.tmpName = promisify2(tmp.tmpName);
    module2.exports.tmpdir = tmp.tmpdir;
    module2.exports.setGracefulCleanup = tmp.setGracefulCleanup;
  }
});

// node_modules/.pnpm/shell-quote@1.7.4/node_modules/shell-quote/index.js
var require_shell_quote = __commonJS({
  "node_modules/.pnpm/shell-quote@1.7.4/node_modules/shell-quote/index.js"(exports2) {
    "use strict";
    exports2.quote = function(xs) {
      return xs.map(function(s) {
        if (s && typeof s === "object") {
          return s.op.replace(/(.)/g, "\\$1");
        } else if (/["\s]/.test(s) && !/'/.test(s)) {
          return "'" + s.replace(/(['\\])/g, "\\$1") + "'";
        } else if (/["'\s]/.test(s)) {
          return '"' + s.replace(/(["\\$`!])/g, "\\$1") + '"';
        }
        return String(s).replace(/([A-Za-z]:)?([#!"$&'()*,:;<=>?@[\\\]^`{|}])/g, "$1\\$2");
      }).join(" ");
    };
    var CONTROL = "(?:" + [
      "\\|\\|",
      "\\&\\&",
      ";;",
      "\\|\\&",
      "\\<\\(",
      ">>",
      ">\\&",
      "[&;()|<>]"
    ].join("|") + ")";
    var META = "|&;()<> \\t";
    var BAREWORD = `(\\\\['"` + META + `]|[^\\s'"` + META + "])+";
    var SINGLE_QUOTE = '"((\\\\"|[^"])*?)"';
    var DOUBLE_QUOTE = "'((\\\\'|[^'])*?)'";
    var TOKEN = "";
    for (i = 0; i < 4; i++) {
      TOKEN += (Math.pow(16, 8) * Math.random()).toString(16);
    }
    var i;
    function parse2(s, env, opts) {
      var chunker = new RegExp([
        "(" + CONTROL + ")",
        "(" + BAREWORD + "|" + SINGLE_QUOTE + "|" + DOUBLE_QUOTE + ")*"
      ].join("|"), "g");
      var match = s.match(chunker).filter(Boolean);
      if (!match) {
        return [];
      }
      if (!env) {
        env = {};
      }
      if (!opts) {
        opts = {};
      }
      var commented = false;
      function getVar(_, pre, key) {
        var r = typeof env === "function" ? env(key) : env[key];
        if (r === void 0 && key != "") {
          r = "";
        } else if (r === void 0) {
          r = "$";
        }
        if (typeof r === "object") {
          return pre + TOKEN + JSON.stringify(r) + TOKEN;
        }
        return pre + r;
      }
      return match.map(function(s2, j) {
        if (commented) {
          return void 0;
        }
        if (RegExp("^" + CONTROL + "$").test(s2)) {
          return { op: s2 };
        }
        var SQ = "'";
        var DQ = '"';
        var DS = "$";
        var BS = opts.escape || "\\";
        var quote2 = false;
        var esc = false;
        var out = "";
        var isGlob = false;
        var i2;
        function parseEnvVar() {
          i2 += 1;
          var varend;
          var varname;
          if (s2.charAt(i2) === "{") {
            i2 += 1;
            if (s2.charAt(i2) === "}") {
              throw new Error("Bad substitution: " + s2.substr(i2 - 2, 3));
            }
            varend = s2.indexOf("}", i2);
            if (varend < 0) {
              throw new Error("Bad substitution: " + s2.substr(i2));
            }
            varname = s2.substr(i2, varend - i2);
            i2 = varend;
          } else if (/[*@#?$!_-]/.test(s2.charAt(i2))) {
            varname = s2.charAt(i2);
            i2 += 1;
          } else {
            varend = s2.substr(i2).match(/[^\w\d_]/);
            if (!varend) {
              varname = s2.substr(i2);
              i2 = s2.length;
            } else {
              varname = s2.substr(i2, varend.index);
              i2 += varend.index - 1;
            }
          }
          return getVar(null, "", varname);
        }
        for (i2 = 0; i2 < s2.length; i2++) {
          var c = s2.charAt(i2);
          isGlob = isGlob || !quote2 && (c === "*" || c === "?");
          if (esc) {
            out += c;
            esc = false;
          } else if (quote2) {
            if (c === quote2) {
              quote2 = false;
            } else if (quote2 == SQ) {
              out += c;
            } else {
              if (c === BS) {
                i2 += 1;
                c = s2.charAt(i2);
                if (c === DQ || c === BS || c === DS) {
                  out += c;
                } else {
                  out += BS + c;
                }
              } else if (c === DS) {
                out += parseEnvVar();
              } else {
                out += c;
              }
            }
          } else if (c === DQ || c === SQ) {
            quote2 = c;
          } else if (RegExp("^" + CONTROL + "$").test(c)) {
            return { op: s2 };
          } else if (/^#$/.test(c)) {
            commented = true;
            if (out.length) {
              return [out, { comment: s2.slice(i2 + 1) + match.slice(j + 1).join(" ") }];
            }
            return [{ comment: s2.slice(i2 + 1) + match.slice(j + 1).join(" ") }];
          } else if (c === BS) {
            esc = true;
          } else if (c === DS) {
            out += parseEnvVar();
          } else {
            out += c;
          }
        }
        if (isGlob) {
          return { op: "glob", pattern: out };
        }
        return out;
      }).reduce(function(prev, arg) {
        if (arg === void 0) {
          return prev;
        }
        return prev.concat(arg);
      }, []);
    }
    exports2.parse = function(s, env, opts) {
      var mapped = parse2(s, env, opts);
      if (typeof env !== "function") {
        return mapped;
      }
      return mapped.reduce(function(acc, s2) {
        if (typeof s2 === "object") {
          return acc.concat(s2);
        }
        var xs = s2.split(RegExp("(" + TOKEN + ".*?" + TOKEN + ")", "g"));
        if (xs.length === 1) {
          return acc.concat(xs[0]);
        }
        return acc.concat(xs.filter(Boolean).map(function(x) {
          if (RegExp("^" + TOKEN).test(x)) {
            return JSON.parse(x.split(TOKEN)[1]);
          }
          return x;
        }));
      }, []);
    };
  }
});

// node_modules/.pnpm/tree-sitter@0.20.1/node_modules/tree-sitter/index.js
var require_tree_sitter = __commonJS({
  "node_modules/.pnpm/tree-sitter@0.20.1/node_modules/tree-sitter/index.js"(exports, module) {
    var binding;
    try {
      binding = require("./build/Release/tree_sitter_runtime_binding");
    } catch (e) {
      try {
        binding = require("./build/Debug/tree_sitter_runtime_binding");
      } catch (_) {
        throw e;
      }
    }
    var util = require("util");
    var { Query, Parser, NodeMethods, Tree, TreeCursor } = binding;
    var { rootNode, edit } = Tree.prototype;
    Object.defineProperty(Tree.prototype, "rootNode", {
      get() {
        return unmarshalNode(rootNode.call(this), this);
      }
    });
    Tree.prototype.edit = function(arg) {
      edit.call(
        this,
        arg.startPosition.row,
        arg.startPosition.column,
        arg.oldEndPosition.row,
        arg.oldEndPosition.column,
        arg.newEndPosition.row,
        arg.newEndPosition.column,
        arg.startIndex,
        arg.oldEndIndex,
        arg.newEndIndex
      );
    };
    Tree.prototype.walk = function() {
      return this.rootNode.walk();
    };
    var SyntaxNode = class {
      constructor(tree) {
        this.tree = tree;
      }
      [util.inspect.custom]() {
        return this.constructor.name + " {\n  type: " + this.type + ",\n  startPosition: " + pointToString(this.startPosition) + ",\n  endPosition: " + pointToString(this.endPosition) + ",\n  childCount: " + this.childCount + ",\n}";
      }
      get type() {
        marshalNode(this);
        return NodeMethods.type(this.tree);
      }
      get typeId() {
        marshalNode(this);
        return NodeMethods.typeId(this.tree);
      }
      get isNamed() {
        marshalNode(this);
        return NodeMethods.isNamed(this.tree);
      }
      get text() {
        return this.tree.getText(this);
      }
      get startPosition() {
        marshalNode(this);
        NodeMethods.startPosition(this.tree);
        return unmarshalPoint();
      }
      get endPosition() {
        marshalNode(this);
        NodeMethods.endPosition(this.tree);
        return unmarshalPoint();
      }
      get startIndex() {
        marshalNode(this);
        return NodeMethods.startIndex(this.tree);
      }
      get endIndex() {
        marshalNode(this);
        return NodeMethods.endIndex(this.tree);
      }
      get parent() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.parent(this.tree), this.tree);
      }
      get children() {
        marshalNode(this);
        return unmarshalNodes(NodeMethods.children(this.tree), this.tree);
      }
      get namedChildren() {
        marshalNode(this);
        return unmarshalNodes(NodeMethods.namedChildren(this.tree), this.tree);
      }
      get childCount() {
        marshalNode(this);
        return NodeMethods.childCount(this.tree);
      }
      get namedChildCount() {
        marshalNode(this);
        return NodeMethods.namedChildCount(this.tree);
      }
      get firstChild() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.firstChild(this.tree), this.tree);
      }
      get firstNamedChild() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.firstNamedChild(this.tree), this.tree);
      }
      get lastChild() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.lastChild(this.tree), this.tree);
      }
      get lastNamedChild() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.lastNamedChild(this.tree), this.tree);
      }
      get nextSibling() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.nextSibling(this.tree), this.tree);
      }
      get nextNamedSibling() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.nextNamedSibling(this.tree), this.tree);
      }
      get previousSibling() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.previousSibling(this.tree), this.tree);
      }
      get previousNamedSibling() {
        marshalNode(this);
        return unmarshalNode(NodeMethods.previousNamedSibling(this.tree), this.tree);
      }
      hasChanges() {
        marshalNode(this);
        return NodeMethods.hasChanges(this.tree);
      }
      hasError() {
        marshalNode(this);
        return NodeMethods.hasError(this.tree);
      }
      isMissing() {
        marshalNode(this);
        return NodeMethods.isMissing(this.tree);
      }
      toString() {
        marshalNode(this);
        return NodeMethods.toString(this.tree);
      }
      child(index) {
        marshalNode(this);
        return unmarshalNode(NodeMethods.child(this.tree, index), this.tree);
      }
      namedChild(index) {
        marshalNode(this);
        return unmarshalNode(NodeMethods.namedChild(this.tree, index), this.tree);
      }
      firstChildForIndex(index) {
        marshalNode(this);
        return unmarshalNode(NodeMethods.firstChildForIndex(this.tree, index), this.tree);
      }
      firstNamedChildForIndex(index) {
        marshalNode(this);
        return unmarshalNode(NodeMethods.firstNamedChildForIndex(this.tree, index), this.tree);
      }
      namedDescendantForIndex(start, end) {
        marshalNode(this);
        if (end == null)
          end = start;
        return unmarshalNode(NodeMethods.namedDescendantForIndex(this.tree, start, end), this.tree);
      }
      descendantForIndex(start, end) {
        marshalNode(this);
        if (end == null)
          end = start;
        return unmarshalNode(NodeMethods.descendantForIndex(this.tree, start, end), this.tree);
      }
      descendantsOfType(types, start, end) {
        marshalNode(this);
        if (typeof types === "string")
          types = [types];
        return unmarshalNodes(NodeMethods.descendantsOfType(this.tree, types, start, end), this.tree);
      }
      namedDescendantForPosition(start, end) {
        marshalNode(this);
        if (end == null)
          end = start;
        return unmarshalNode(NodeMethods.namedDescendantForPosition(this.tree, start, end), this.tree);
      }
      descendantForPosition(start, end) {
        marshalNode(this);
        if (end == null)
          end = start;
        return unmarshalNode(NodeMethods.descendantForPosition(this.tree, start, end), this.tree);
      }
      closest(types) {
        marshalNode(this);
        if (typeof types === "string")
          types = [types];
        return unmarshalNode(NodeMethods.closest(this.tree, types), this.tree);
      }
      walk() {
        marshalNode(this);
        const cursor = NodeMethods.walk(this.tree);
        cursor.tree = this.tree;
        return cursor;
      }
    };
    var { parse, parseTextBuffer, parseTextBufferSync, setLanguage } = Parser.prototype;
    var languageSymbol = Symbol("parser.language");
    Parser.prototype.setLanguage = function(language2) {
      setLanguage.call(this, language2);
      this[languageSymbol] = language2;
      if (!language2.nodeSubclasses) {
        initializeLanguageNodeClasses(language2);
      }
      return this;
    };
    Parser.prototype.getLanguage = function(language2) {
      return this[languageSymbol] || null;
    };
    Parser.prototype.parse = function(input, oldTree, { bufferSize, includedRanges } = {}) {
      let getText, treeInput = input;
      if (typeof input === "string") {
        const inputString = input;
        input = (offset, position) => inputString.slice(offset);
        getText = getTextFromString;
      } else {
        getText = getTextFromFunction;
      }
      const tree = parse.call(
        this,
        input,
        oldTree,
        bufferSize,
        includedRanges
      );
      if (tree) {
        tree.input = treeInput;
        tree.getText = getText;
        tree.language = this.getLanguage();
      }
      return tree;
    };
    Parser.prototype.parseTextBuffer = function(buffer, oldTree, { syncTimeoutMicros, includedRanges } = {}) {
      let tree;
      let resolveTreePromise;
      const treePromise = new Promise((resolve3) => {
        resolveTreePromise = resolve3;
      });
      const snapshot = buffer.getSnapshot();
      parseTextBuffer.call(
        this,
        (result) => {
          tree = result;
          snapshot.destroy();
          if (tree) {
            tree.input = buffer;
            tree.getText = getTextFromTextBuffer;
            tree.language = this.getLanguage();
          }
          resolveTreePromise(tree);
        },
        snapshot,
        oldTree,
        includedRanges,
        syncTimeoutMicros
      );
      return tree || treePromise;
    };
    Parser.prototype.parseTextBufferSync = function(buffer, oldTree, { includedRanges } = {}) {
      const snapshot = buffer.getSnapshot();
      const tree = parseTextBufferSync.call(this, snapshot, oldTree, includedRanges);
      if (tree) {
        tree.input = buffer;
        tree.getText = getTextFromTextBuffer;
        tree.language = this.getLanguage();
      }
      snapshot.destroy();
      return tree;
    };
    var { startPosition, endPosition, currentNode, reset } = TreeCursor.prototype;
    Object.defineProperties(TreeCursor.prototype, {
      currentNode: {
        get() {
          return unmarshalNode(currentNode.call(this), this.tree);
        }
      },
      startPosition: {
        get() {
          startPosition.call(this);
          return unmarshalPoint();
        }
      },
      endPosition: {
        get() {
          endPosition.call(this);
          return unmarshalPoint();
        }
      },
      nodeText: {
        get() {
          return this.tree.getText(this);
        }
      }
    });
    TreeCursor.prototype.reset = function(node) {
      marshalNode(node);
      reset.call(this);
    };
    var { _matches, _captures } = Query.prototype;
    var PREDICATE_STEP_TYPE = {
      DONE: 0,
      CAPTURE: 1,
      STRING: 2
    };
    var ZERO_POINT = { row: 0, column: 0 };
    Query.prototype._init = function() {
      const predicateDescriptions = this._getPredicates();
      const patternCount = predicateDescriptions.length;
      const setProperties = new Array(patternCount);
      const assertedProperties = new Array(patternCount);
      const refutedProperties = new Array(patternCount);
      const predicates = new Array(patternCount);
      const FIRST = 0;
      const SECOND = 2;
      const THIRD = 4;
      for (let i = 0; i < predicateDescriptions.length; i++) {
        predicates[i] = [];
        for (let j = 0; j < predicateDescriptions[i].length; j++) {
          const steps = predicateDescriptions[i][j];
          const stepsLength = steps.length / 2;
          if (steps[FIRST] !== PREDICATE_STEP_TYPE.STRING) {
            throw new Error("Predicates must begin with a literal value");
          }
          const operator = steps[FIRST + 1];
          let isPositive = true;
          switch (operator) {
            case "not-eq?":
              isPositive = false;
            case "eq?":
              if (stepsLength !== 3)
                throw new Error(
                  `Wrong number of arguments to \`#eq?\` predicate. Expected 2, got ${stepsLength - 1}`
                );
              if (steps[SECOND] !== PREDICATE_STEP_TYPE.CAPTURE)
                throw new Error(
                  `First argument of \`#eq?\` predicate must be a capture. Got "${steps[SECOND + 1]}"`
                );
              if (steps[THIRD] === PREDICATE_STEP_TYPE.CAPTURE) {
                const captureName1 = steps[SECOND + 1];
                const captureName2 = steps[THIRD + 1];
                predicates[i].push(function(captures) {
                  let node1, node2;
                  for (const c of captures) {
                    if (c.name === captureName1)
                      node1 = c.node;
                    if (c.name === captureName2)
                      node2 = c.node;
                  }
                  if (node1 === void 0 || node2 === void 0)
                    return true;
                  return node1.text === node2.text === isPositive;
                });
              } else {
                const captureName2 = steps[SECOND + 1];
                const stringValue = steps[THIRD + 1];
                predicates[i].push(function(captures) {
                  for (const c of captures) {
                    if (c.name === captureName2) {
                      return c.node.text === stringValue === isPositive;
                    }
                    ;
                  }
                  return true;
                });
              }
              break;
            case "match?":
              if (stepsLength !== 3)
                throw new Error(
                  `Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${stepsLength - 1}.`
                );
              if (steps[SECOND] !== PREDICATE_STEP_TYPE.CAPTURE)
                throw new Error(
                  `First argument of \`#match?\` predicate must be a capture. Got "${steps[SECOND + 1]}".`
                );
              if (steps[THIRD] !== PREDICATE_STEP_TYPE.STRING)
                throw new Error(
                  `Second argument of \`#match?\` predicate must be a string. Got @${steps[THIRD + 1]}.`
                );
              const captureName = steps[SECOND + 1];
              const regex = new RegExp(steps[THIRD + 1]);
              predicates[i].push(function(captures) {
                for (const c of captures) {
                  if (c.name === captureName)
                    return regex.test(c.node.text);
                }
                return true;
              });
              break;
            case "set!":
              if (stepsLength < 2 || stepsLength > 3)
                throw new Error(
                  `Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${stepsLength - 1}.`
                );
              if (steps.some((s, i2) => i2 % 2 !== 1 && s !== PREDICATE_STEP_TYPE.STRING))
                throw new Error(
                  `Arguments to \`#set!\` predicate must be a strings.".`
                );
              if (!setProperties[i])
                setProperties[i] = {};
              setProperties[i][steps[SECOND + 1]] = steps[THIRD] ? steps[THIRD + 1] : null;
              break;
            case "is?":
            case "is-not?":
              if (stepsLength < 2 || stepsLength > 3)
                throw new Error(
                  `Wrong number of arguments to \`#${operator}\` predicate. Expected 1 or 2. Got ${stepsLength - 1}.`
                );
              if (steps.some((s, i2) => i2 % 2 !== 1 && s !== PREDICATE_STEP_TYPE.STRING))
                throw new Error(
                  `Arguments to \`#${operator}\` predicate must be a strings.".`
                );
              const properties = operator === "is?" ? assertedProperties : refutedProperties;
              if (!properties[i])
                properties[i] = {};
              properties[i][steps[SECOND + 1]] = steps[THIRD] ? steps[THIRD + 1] : null;
              break;
            default:
              throw new Error(`Unknown query predicate \`#${steps[FIRST + 1]}\``);
          }
        }
      }
      this.predicates = Object.freeze(predicates);
      this.setProperties = Object.freeze(setProperties);
      this.assertedProperties = Object.freeze(assertedProperties);
      this.refutedProperties = Object.freeze(refutedProperties);
    };
    Query.prototype.matches = function(rootNode2, startPosition2 = ZERO_POINT, endPosition2 = ZERO_POINT) {
      marshalNode(rootNode2);
      const [returnedMatches, returnedNodes] = _matches.call(
        this,
        rootNode2.tree,
        startPosition2.row,
        startPosition2.column,
        endPosition2.row,
        endPosition2.column
      );
      const nodes = unmarshalNodes(returnedNodes, rootNode2.tree);
      const results = [];
      let i = 0;
      let nodeIndex = 0;
      while (i < returnedMatches.length) {
        const patternIndex = returnedMatches[i++];
        const captures = [];
        while (i < returnedMatches.length && typeof returnedMatches[i] === "string") {
          const captureName = returnedMatches[i++];
          captures.push({
            name: captureName,
            node: nodes[nodeIndex++]
          });
        }
        if (this.predicates[patternIndex].every((p) => p(captures))) {
          const result = { pattern: patternIndex, captures };
          const setProperties = this.setProperties[patternIndex];
          const assertedProperties = this.assertedProperties[patternIndex];
          const refutedProperties = this.refutedProperties[patternIndex];
          if (setProperties)
            result.setProperties = setProperties;
          if (assertedProperties)
            result.assertedProperties = assertedProperties;
          if (refutedProperties)
            result.refutedProperties = refutedProperties;
          results.push(result);
        }
      }
      return results;
    };
    Query.prototype.captures = function(rootNode2, startPosition2 = ZERO_POINT, endPosition2 = ZERO_POINT) {
      marshalNode(rootNode2);
      const [returnedMatches, returnedNodes] = _captures.call(
        this,
        rootNode2.tree,
        startPosition2.row,
        startPosition2.column,
        endPosition2.row,
        endPosition2.column
      );
      const nodes = unmarshalNodes(returnedNodes, rootNode2.tree);
      const results = [];
      let i = 0;
      let nodeIndex = 0;
      while (i < returnedMatches.length) {
        const patternIndex = returnedMatches[i++];
        const captureIndex = returnedMatches[i++];
        const captures = [];
        while (i < returnedMatches.length && typeof returnedMatches[i] === "string") {
          const captureName = returnedMatches[i++];
          captures.push({
            name: captureName,
            node: nodes[nodeIndex++]
          });
        }
        if (this.predicates[patternIndex].every((p) => p(captures))) {
          const result = captures[captureIndex];
          const setProperties = this.setProperties[patternIndex];
          const assertedProperties = this.assertedProperties[patternIndex];
          const refutedProperties = this.refutedProperties[patternIndex];
          if (setProperties)
            result.setProperties = setProperties;
          if (assertedProperties)
            result.assertedProperties = assertedProperties;
          if (refutedProperties)
            result.refutedProperties = refutedProperties;
          results.push(result);
        }
      }
      return results;
    };
    function getTextFromString(node) {
      return this.input.substring(node.startIndex, node.endIndex);
    }
    function getTextFromFunction({ startIndex, endIndex }) {
      const { input } = this;
      let result = "";
      const goalLength = endIndex - startIndex;
      while (result.length < goalLength) {
        const text = input(startIndex + result.length);
        result += text;
      }
      return result.substr(0, goalLength);
    }
    function getTextFromTextBuffer({ startPosition: startPosition2, endPosition: endPosition2 }) {
      return this.input.getTextInRange({ start: startPosition2, end: endPosition2 });
    }
    var { pointTransferArray } = binding;
    var NODE_FIELD_COUNT = 6;
    var ERROR_TYPE_ID = 65535;
    function getID(buffer, offset) {
      const low = BigInt(buffer[offset]);
      const high = BigInt(buffer[offset + 1]);
      return (high << 32n) + low;
    }
    function unmarshalNode(value, tree, offset = 0, cache = null) {
      if (typeof value === "object") {
        const node = value;
        return node;
      }
      const nodeTypeId = value;
      const NodeClass = nodeTypeId === ERROR_TYPE_ID ? SyntaxNode : tree.language.nodeSubclasses[nodeTypeId];
      const { nodeTransferArray } = binding;
      const id2 = getID(nodeTransferArray, offset);
      if (id2 === 0n) {
        return null;
      }
      let cachedResult;
      if (cache && (cachedResult = cache.get(id2)))
        return cachedResult;
      const result = new NodeClass(tree);
      for (let i = 0; i < NODE_FIELD_COUNT; i++) {
        result[i] = nodeTransferArray[offset + i];
      }
      if (cache)
        cache.set(id2, result);
      else
        tree._cacheNode(result);
      return result;
    }
    function unmarshalNodes(nodes, tree) {
      const cache = /* @__PURE__ */ new Map();
      let offset = 0;
      for (let i = 0, { length } = nodes; i < length; i++) {
        const node = unmarshalNode(nodes[i], tree, offset, cache);
        if (node !== nodes[i]) {
          nodes[i] = node;
          offset += NODE_FIELD_COUNT;
        }
      }
      tree._cacheNodes(Array.from(cache.values()));
      return nodes;
    }
    function marshalNode(node) {
      const { nodeTransferArray } = binding;
      for (let i = 0; i < NODE_FIELD_COUNT; i++) {
        nodeTransferArray[i] = node[i];
      }
    }
    function unmarshalPoint() {
      return { row: pointTransferArray[0], column: pointTransferArray[1] };
    }
    function pointToString(point) {
      return `{row: ${point.row}, column: ${point.column}}`;
    }
    function initializeLanguageNodeClasses(language) {
      const nodeTypeNamesById = binding.getNodeTypeNamesById(language);
      const nodeFieldNamesById = binding.getNodeFieldNamesById(language);
      const nodeTypeInfo = language.nodeTypeInfo || [];
      const nodeSubclasses = [];
      for (let id = 0, n = nodeTypeNamesById.length; id < n; id++) {
        nodeSubclasses[id] = SyntaxNode;
        const typeName = nodeTypeNamesById[id];
        if (!typeName)
          continue;
        const typeInfo = nodeTypeInfo.find((info) => info.named && info.type === typeName);
        if (!typeInfo)
          continue;
        const fieldNames = [];
        let classBody = "\n";
        if (typeInfo.fields) {
          for (const fieldName in typeInfo.fields) {
            const fieldId = nodeFieldNamesById.indexOf(fieldName);
            if (fieldId === -1)
              continue;
            if (typeInfo.fields[fieldName].multiple) {
              const getterName = camelCase(fieldName) + "Nodes";
              fieldNames.push(getterName);
              classBody += `
            get ${getterName}() {
              marshalNode(this);
              return unmarshalNodes(NodeMethods.childNodesForFieldId(this.tree, ${fieldId}), this.tree);
            }
          `.replace(/\s+/g, " ") + "\n";
            } else {
              const getterName = camelCase(fieldName, false) + "Node";
              fieldNames.push(getterName);
              classBody += `
            get ${getterName}() {
              marshalNode(this);
              return unmarshalNode(NodeMethods.childNodeForFieldId(this.tree, ${fieldId}), this.tree);
            }
          `.replace(/\s+/g, " ") + "\n";
            }
          }
        }
        const className = camelCase(typeName, true) + "Node";
        const nodeSubclass = eval(`class ${className} extends SyntaxNode {${classBody}}; ${className}`);
        nodeSubclass.prototype.type = typeName;
        nodeSubclass.prototype.fields = Object.freeze(fieldNames.sort());
        nodeSubclasses[id] = nodeSubclass;
      }
      language.nodeSubclasses = nodeSubclasses;
    }
    function camelCase(name, upperCase) {
      name = name.replace(/_(\w)/g, (match, letter) => letter.toUpperCase());
      if (upperCase)
        name = name[0].toUpperCase() + name.slice(1);
      return name;
    }
    module.exports = Parser;
    module.exports.Query = Query;
    module.exports.Tree = Tree;
    module.exports.SyntaxNode = SyntaxNode;
    module.exports.TreeCursor = TreeCursor;
  }
});

// node_modules/.pnpm/github.com+alannotnerd+tree-sitter-teal@46f6a41a89885e2d6782a1947fa3418de780a91f/node_modules/tree-sitter-teal/src/node-types.json
var require_node_types = __commonJS({
  "node_modules/.pnpm/github.com+alannotnerd+tree-sitter-teal@46f6a41a89885e2d6782a1947fa3418de780a91f/node_modules/tree-sitter-teal/src/node-types.json"(exports2, module2) {
    module2.exports = [
      {
        type: "anon_function",
        named: true,
        fields: {
          body: {
            multiple: false,
            required: true,
            types: [
              {
                type: "function_body",
                named: true
              }
            ]
          },
          signature: {
            multiple: false,
            required: true,
            types: [
              {
                type: "function_signature",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "anon_record",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "record_body",
              named: true
            },
            {
              type: "typeargs",
              named: true
            }
          ]
        }
      },
      {
        type: "arg",
        named: true,
        fields: {
          name: {
            multiple: false,
            required: false,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "arguments",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "arg",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "bin_op",
        named: true,
        fields: {
          op: {
            multiple: false,
            required: true,
            types: [
              {
                type: "op",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_type",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "boolean",
        named: true,
        fields: {}
      },
      {
        type: "do_statement",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "else_block",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "elseif_block",
        named: true,
        fields: {
          condition: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "enum_body",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "string",
              named: true
            }
          ]
        }
      },
      {
        type: "enum_declaration",
        named: true,
        fields: {
          name: {
            multiple: false,
            required: true,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          scope: {
            multiple: false,
            required: true,
            types: [
              {
                type: "global",
                named: false
              },
              {
                type: "local",
                named: false
              }
            ]
          }
        },
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "enum_body",
              named: true
            }
          ]
        }
      },
      {
        type: "for_body",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "for_statement",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "for_body",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "function_body",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "function_call",
        named: true,
        fields: {
          arguments: {
            multiple: false,
            required: true,
            types: [
              {
                type: "arguments",
                named: true
              }
            ]
          },
          called_object: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "method_index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "function_name",
        named: true,
        fields: {
          base: {
            multiple: false,
            required: true,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          entry: {
            multiple: true,
            required: false,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          method: {
            multiple: false,
            required: false,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "function_signature",
        named: true,
        fields: {
          arguments: {
            multiple: false,
            required: true,
            types: [
              {
                type: "arguments",
                named: true
              }
            ]
          },
          return_type: {
            multiple: false,
            required: false,
            types: [
              {
                type: "return_type",
                named: true
              }
            ]
          },
          typeargs: {
            multiple: false,
            required: false,
            types: [
              {
                type: "typeargs",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "function_statement",
        named: true,
        fields: {
          body: {
            multiple: false,
            required: true,
            types: [
              {
                type: "function_body",
                named: true
              }
            ]
          },
          name: {
            multiple: false,
            required: true,
            types: [
              {
                type: "function_name",
                named: true
              },
              {
                type: "identifier",
                named: true
              }
            ]
          },
          scope: {
            multiple: false,
            required: false,
            types: [
              {
                type: "global",
                named: false
              },
              {
                type: "local",
                named: false
              }
            ]
          },
          signature: {
            multiple: false,
            required: true,
            types: [
              {
                type: "function_signature",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "function_type",
        named: true,
        fields: {
          arguments: {
            multiple: false,
            required: false,
            types: [
              {
                type: "arguments",
                named: true
              }
            ]
          },
          return_type: {
            multiple: false,
            required: false,
            types: [
              {
                type: "return_type",
                named: true
              }
            ]
          },
          typeargs: {
            multiple: false,
            required: false,
            types: [
              {
                type: "typeargs",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "goto",
        named: true,
        fields: {},
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "identifier",
              named: true
            }
          ]
        }
      },
      {
        type: "if_statement",
        named: true,
        fields: {
          condition: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "else_block",
              named: true
            },
            {
              type: "elseif_block",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "index",
        named: true,
        fields: {
          expr_key: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "[",
                named: false
              },
              {
                type: "]",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          },
          key: {
            multiple: true,
            required: false,
            types: [
              {
                type: ".",
                named: false
              },
              {
                type: "identifier",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "metamethod",
        named: true,
        fields: {
          name: {
            multiple: false,
            required: true,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          type: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "method_index",
        named: true,
        fields: {
          key: {
            multiple: false,
            required: true,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "number",
        named: true,
        fields: {}
      },
      {
        type: "program",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "shebang_comment",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "record_array_type",
        named: true,
        fields: {},
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "record_body",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "metamethod",
              named: true
            },
            {
              type: "record_array_type",
              named: true
            },
            {
              type: "record_entry",
              named: true
            },
            {
              type: "userdata",
              named: true
            }
          ]
        }
      },
      {
        type: "record_declaration",
        named: true,
        fields: {
          name: {
            multiple: false,
            required: true,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          scope: {
            multiple: false,
            required: true,
            types: [
              {
                type: "global",
                named: false
              },
              {
                type: "local",
                named: false
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "record_body",
              named: true
            },
            {
              type: "typeargs",
              named: true
            }
          ]
        }
      },
      {
        type: "record_entry",
        named: true,
        fields: {
          key: {
            multiple: false,
            required: false,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          string_key: {
            multiple: false,
            required: false,
            types: [
              {
                type: "string",
                named: true
              }
            ]
          },
          type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          },
          typeargs: {
            multiple: false,
            required: false,
            types: [
              {
                type: "typeargs",
                named: true
              }
            ]
          },
          value: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_record",
                named: true
              },
              {
                type: "enum",
                named: false
              },
              {
                type: "enum_body",
                named: true
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "record_body",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "repeat_statement",
        named: true,
        fields: {
          condition: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "return_statement",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "return_type",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            },
            {
              type: "variadic_type",
              named: true
            }
          ]
        }
      },
      {
        type: "simple_type",
        named: true,
        fields: {},
        children: {
          multiple: false,
          required: false,
          types: [
            {
              type: "typeargs",
              named: true
            }
          ]
        }
      },
      {
        type: "string",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "escape_sequence",
              named: true
            },
            {
              type: "format_specifier",
              named: true
            }
          ]
        }
      },
      {
        type: "table_constructor",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "table_entry",
              named: true
            }
          ]
        }
      },
      {
        type: "table_entry",
        named: true,
        fields: {
          expr_key: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          },
          key: {
            multiple: false,
            required: false,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          },
          type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: ":",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          },
          value: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "table_type",
        named: true,
        fields: {
          key_type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          },
          tuple_type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          },
          value_type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "type_annotation",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "type_cast",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_type",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_tuple",
              named: true
            },
            {
              type: "type_union",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "type_declaration",
        named: true,
        fields: {
          scope: {
            multiple: false,
            required: false,
            types: [
              {
                type: "global",
                named: false
              },
              {
                type: "local",
                named: false
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "anon_record",
              named: true
            },
            {
              type: "enum_body",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "function_type",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_name",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "type_index",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "identifier",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "typeargs",
              named: true
            }
          ]
        }
      },
      {
        type: "type_tuple",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "type_union",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "typeargs",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "unary_op",
        named: true,
        fields: {
          op: {
            multiple: false,
            required: true,
            types: [
              {
                type: "op",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "var",
        named: true,
        fields: {
          attribute: {
            multiple: false,
            required: false,
            types: [
              {
                type: "attribute",
                named: true
              }
            ]
          },
          name: {
            multiple: false,
            required: false,
            types: [
              {
                type: "identifier",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: false,
          required: false,
          types: [
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            }
          ]
        }
      },
      {
        type: "var_assignment",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "var",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "var_declaration",
        named: true,
        fields: {
          scope: {
            multiple: false,
            required: true,
            types: [
              {
                type: "global",
                named: false
              },
              {
                type: "local",
                named: false
              }
            ]
          },
          type_annotation: {
            multiple: false,
            required: false,
            types: [
              {
                type: "type_annotation",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: true,
          required: true,
          types: [
            {
              type: "anon_function",
              named: true
            },
            {
              type: "bin_op",
              named: true
            },
            {
              type: "boolean",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "identifier",
              named: true
            },
            {
              type: "index",
              named: true
            },
            {
              type: "nil",
              named: true
            },
            {
              type: "number",
              named: true
            },
            {
              type: "string",
              named: true
            },
            {
              type: "table_constructor",
              named: true
            },
            {
              type: "type_cast",
              named: true
            },
            {
              type: "unary_op",
              named: true
            },
            {
              type: "var",
              named: true
            },
            {
              type: "varargs",
              named: true
            }
          ]
        }
      },
      {
        type: "varargs",
        named: true,
        fields: {
          type: {
            multiple: true,
            required: false,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "function_type",
                named: true
              },
              {
                type: "simple_type",
                named: true
              },
              {
                type: "table_type",
                named: true
              },
              {
                type: "type_index",
                named: true
              },
              {
                type: "type_union",
                named: true
              }
            ]
          }
        }
      },
      {
        type: "variadic_type",
        named: true,
        fields: {},
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "function_type",
              named: true
            },
            {
              type: "simple_type",
              named: true
            },
            {
              type: "table_type",
              named: true
            },
            {
              type: "type_index",
              named: true
            },
            {
              type: "type_union",
              named: true
            }
          ]
        }
      },
      {
        type: "while_body",
        named: true,
        fields: {},
        children: {
          multiple: true,
          required: false,
          types: [
            {
              type: "break",
              named: true
            },
            {
              type: "do_statement",
              named: true
            },
            {
              type: "enum_declaration",
              named: true
            },
            {
              type: "for_statement",
              named: true
            },
            {
              type: "function_call",
              named: true
            },
            {
              type: "function_statement",
              named: true
            },
            {
              type: "goto",
              named: true
            },
            {
              type: "if_statement",
              named: true
            },
            {
              type: "label",
              named: true
            },
            {
              type: "record_declaration",
              named: true
            },
            {
              type: "repeat_statement",
              named: true
            },
            {
              type: "return_statement",
              named: true
            },
            {
              type: "type_declaration",
              named: true
            },
            {
              type: "var_assignment",
              named: true
            },
            {
              type: "var_declaration",
              named: true
            },
            {
              type: "while_statement",
              named: true
            }
          ]
        }
      },
      {
        type: "while_statement",
        named: true,
        fields: {
          condition: {
            multiple: true,
            required: true,
            types: [
              {
                type: "(",
                named: false
              },
              {
                type: ")",
                named: false
              },
              {
                type: "anon_function",
                named: true
              },
              {
                type: "bin_op",
                named: true
              },
              {
                type: "boolean",
                named: true
              },
              {
                type: "function_call",
                named: true
              },
              {
                type: "identifier",
                named: true
              },
              {
                type: "index",
                named: true
              },
              {
                type: "nil",
                named: true
              },
              {
                type: "number",
                named: true
              },
              {
                type: "string",
                named: true
              },
              {
                type: "table_constructor",
                named: true
              },
              {
                type: "type_cast",
                named: true
              },
              {
                type: "unary_op",
                named: true
              },
              {
                type: "varargs",
                named: true
              }
            ]
          }
        },
        children: {
          multiple: false,
          required: true,
          types: [
            {
              type: "while_body",
              named: true
            }
          ]
        }
      },
      {
        type: "%",
        named: false
      },
      {
        type: "(",
        named: false
      },
      {
        type: ")",
        named: false
      },
      {
        type: ",",
        named: false
      },
      {
        type: ".",
        named: false
      },
      {
        type: "...",
        named: false
      },
      {
        type: ":",
        named: false
      },
      {
        type: "::",
        named: false
      },
      {
        type: ";",
        named: false
      },
      {
        type: "<",
        named: false
      },
      {
        type: "=",
        named: false
      },
      {
        type: ">",
        named: false
      },
      {
        type: "[",
        named: false
      },
      {
        type: "]",
        named: false
      },
      {
        type: "as",
        named: false
      },
      {
        type: "attribute",
        named: true
      },
      {
        type: "break",
        named: true
      },
      {
        type: "comment",
        named: true
      },
      {
        type: "do",
        named: false
      },
      {
        type: "else",
        named: false
      },
      {
        type: "elseif",
        named: false
      },
      {
        type: "end",
        named: false
      },
      {
        type: "enum",
        named: false
      },
      {
        type: "escape_sequence",
        named: true
      },
      {
        type: "false",
        named: false
      },
      {
        type: "for",
        named: false
      },
      {
        type: "format_specifier",
        named: true
      },
      {
        type: "function",
        named: false
      },
      {
        type: "global",
        named: false
      },
      {
        type: "goto",
        named: false
      },
      {
        type: "identifier",
        named: true
      },
      {
        type: "if",
        named: false
      },
      {
        type: "in",
        named: false
      },
      {
        type: "label",
        named: true
      },
      {
        type: "local",
        named: false
      },
      {
        type: "metamethod",
        named: false
      },
      {
        type: "name",
        named: false
      },
      {
        type: "nil",
        named: true
      },
      {
        type: "op",
        named: true
      },
      {
        type: "record",
        named: false
      },
      {
        type: "repeat",
        named: false
      },
      {
        type: "return",
        named: false
      },
      {
        type: "shebang_comment",
        named: true
      },
      {
        type: "then",
        named: false
      },
      {
        type: "true",
        named: false
      },
      {
        type: "type",
        named: false
      },
      {
        type: "type_name",
        named: true
      },
      {
        type: "until",
        named: false
      },
      {
        type: "userdata",
        named: true
      },
      {
        type: "while",
        named: false
      },
      {
        type: "{",
        named: false
      },
      {
        type: "|",
        named: false
      },
      {
        type: "}",
        named: false
      }
    ];
  }
});

// node_modules/.pnpm/github.com+alannotnerd+tree-sitter-teal@46f6a41a89885e2d6782a1947fa3418de780a91f/node_modules/tree-sitter-teal/bindings/node/index.js
var require_node4 = __commonJS({
  "node_modules/.pnpm/github.com+alannotnerd+tree-sitter-teal@46f6a41a89885e2d6782a1947fa3418de780a91f/node_modules/tree-sitter-teal/bindings/node/index.js"(exports2, module2) {
    try {
      module2.exports = require("../../build/Release/tree_sitter_teal_binding");
    } catch (error1) {
      if (error1.code !== "MODULE_NOT_FOUND") {
        throw error1;
      }
      try {
        module2.exports = require("../../build/Debug/tree_sitter_teal_binding");
      } catch (error2) {
        if (error2.code !== "MODULE_NOT_FOUND") {
          throw error2;
        }
        throw error1;
      }
    }
    try {
      module2.exports.nodeTypeInfo = require_node_types();
    } catch (_) {
    }
  }
});

// src/server/server.ts
var server_exports = {};
__export(server_exports, {
  getDocumentUri: () => getDocumentUri,
  getTypeInfoFromCache: () => getTypeInfoFromCache
});
module.exports = __toCommonJS(server_exports);
var import_node4 = __toESM(require_node3());

// node_modules/.pnpm/vscode-uri@3.0.6/node_modules/vscode-uri/lib/esm/index.js
var LIB;
(() => {
  "use strict";
  var t = { 470: (t2) => {
    function e2(t3) {
      if ("string" != typeof t3)
        throw new TypeError("Path must be a string. Received " + JSON.stringify(t3));
    }
    function r2(t3, e3) {
      for (var r3, n4 = "", o = 0, i = -1, a = 0, h = 0; h <= t3.length; ++h) {
        if (h < t3.length)
          r3 = t3.charCodeAt(h);
        else {
          if (47 === r3)
            break;
          r3 = 47;
        }
        if (47 === r3) {
          if (i === h - 1 || 1 === a)
            ;
          else if (i !== h - 1 && 2 === a) {
            if (n4.length < 2 || 2 !== o || 46 !== n4.charCodeAt(n4.length - 1) || 46 !== n4.charCodeAt(n4.length - 2)) {
              if (n4.length > 2) {
                var s = n4.lastIndexOf("/");
                if (s !== n4.length - 1) {
                  -1 === s ? (n4 = "", o = 0) : o = (n4 = n4.slice(0, s)).length - 1 - n4.lastIndexOf("/"), i = h, a = 0;
                  continue;
                }
              } else if (2 === n4.length || 1 === n4.length) {
                n4 = "", o = 0, i = h, a = 0;
                continue;
              }
            }
            e3 && (n4.length > 0 ? n4 += "/.." : n4 = "..", o = 2);
          } else
            n4.length > 0 ? n4 += "/" + t3.slice(i + 1, h) : n4 = t3.slice(i + 1, h), o = h - i - 1;
          i = h, a = 0;
        } else
          46 === r3 && -1 !== a ? ++a : a = -1;
      }
      return n4;
    }
    var n3 = { resolve: function() {
      for (var t3, n4 = "", o = false, i = arguments.length - 1; i >= -1 && !o; i--) {
        var a;
        i >= 0 ? a = arguments[i] : (void 0 === t3 && (t3 = process.cwd()), a = t3), e2(a), 0 !== a.length && (n4 = a + "/" + n4, o = 47 === a.charCodeAt(0));
      }
      return n4 = r2(n4, !o), o ? n4.length > 0 ? "/" + n4 : "/" : n4.length > 0 ? n4 : ".";
    }, normalize: function(t3) {
      if (e2(t3), 0 === t3.length)
        return ".";
      var n4 = 47 === t3.charCodeAt(0), o = 47 === t3.charCodeAt(t3.length - 1);
      return 0 !== (t3 = r2(t3, !n4)).length || n4 || (t3 = "."), t3.length > 0 && o && (t3 += "/"), n4 ? "/" + t3 : t3;
    }, isAbsolute: function(t3) {
      return e2(t3), t3.length > 0 && 47 === t3.charCodeAt(0);
    }, join: function() {
      if (0 === arguments.length)
        return ".";
      for (var t3, r3 = 0; r3 < arguments.length; ++r3) {
        var o = arguments[r3];
        e2(o), o.length > 0 && (void 0 === t3 ? t3 = o : t3 += "/" + o);
      }
      return void 0 === t3 ? "." : n3.normalize(t3);
    }, relative: function(t3, r3) {
      if (e2(t3), e2(r3), t3 === r3)
        return "";
      if ((t3 = n3.resolve(t3)) === (r3 = n3.resolve(r3)))
        return "";
      for (var o = 1; o < t3.length && 47 === t3.charCodeAt(o); ++o)
        ;
      for (var i = t3.length, a = i - o, h = 1; h < r3.length && 47 === r3.charCodeAt(h); ++h)
        ;
      for (var s = r3.length - h, c = a < s ? a : s, f = -1, u = 0; u <= c; ++u) {
        if (u === c) {
          if (s > c) {
            if (47 === r3.charCodeAt(h + u))
              return r3.slice(h + u + 1);
            if (0 === u)
              return r3.slice(h + u);
          } else
            a > c && (47 === t3.charCodeAt(o + u) ? f = u : 0 === u && (f = 0));
          break;
        }
        var l = t3.charCodeAt(o + u);
        if (l !== r3.charCodeAt(h + u))
          break;
        47 === l && (f = u);
      }
      var p = "";
      for (u = o + f + 1; u <= i; ++u)
        u !== i && 47 !== t3.charCodeAt(u) || (0 === p.length ? p += ".." : p += "/..");
      return p.length > 0 ? p + r3.slice(h + f) : (h += f, 47 === r3.charCodeAt(h) && ++h, r3.slice(h));
    }, _makeLong: function(t3) {
      return t3;
    }, dirname: function(t3) {
      if (e2(t3), 0 === t3.length)
        return ".";
      for (var r3 = t3.charCodeAt(0), n4 = 47 === r3, o = -1, i = true, a = t3.length - 1; a >= 1; --a)
        if (47 === (r3 = t3.charCodeAt(a))) {
          if (!i) {
            o = a;
            break;
          }
        } else
          i = false;
      return -1 === o ? n4 ? "/" : "." : n4 && 1 === o ? "//" : t3.slice(0, o);
    }, basename: function(t3, r3) {
      if (void 0 !== r3 && "string" != typeof r3)
        throw new TypeError('"ext" argument must be a string');
      e2(t3);
      var n4, o = 0, i = -1, a = true;
      if (void 0 !== r3 && r3.length > 0 && r3.length <= t3.length) {
        if (r3.length === t3.length && r3 === t3)
          return "";
        var h = r3.length - 1, s = -1;
        for (n4 = t3.length - 1; n4 >= 0; --n4) {
          var c = t3.charCodeAt(n4);
          if (47 === c) {
            if (!a) {
              o = n4 + 1;
              break;
            }
          } else
            -1 === s && (a = false, s = n4 + 1), h >= 0 && (c === r3.charCodeAt(h) ? -1 == --h && (i = n4) : (h = -1, i = s));
        }
        return o === i ? i = s : -1 === i && (i = t3.length), t3.slice(o, i);
      }
      for (n4 = t3.length - 1; n4 >= 0; --n4)
        if (47 === t3.charCodeAt(n4)) {
          if (!a) {
            o = n4 + 1;
            break;
          }
        } else
          -1 === i && (a = false, i = n4 + 1);
      return -1 === i ? "" : t3.slice(o, i);
    }, extname: function(t3) {
      e2(t3);
      for (var r3 = -1, n4 = 0, o = -1, i = true, a = 0, h = t3.length - 1; h >= 0; --h) {
        var s = t3.charCodeAt(h);
        if (47 !== s)
          -1 === o && (i = false, o = h + 1), 46 === s ? -1 === r3 ? r3 = h : 1 !== a && (a = 1) : -1 !== r3 && (a = -1);
        else if (!i) {
          n4 = h + 1;
          break;
        }
      }
      return -1 === r3 || -1 === o || 0 === a || 1 === a && r3 === o - 1 && r3 === n4 + 1 ? "" : t3.slice(r3, o);
    }, format: function(t3) {
      if (null === t3 || "object" != typeof t3)
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t3);
      return function(t4, e3) {
        var r3 = e3.dir || e3.root, n4 = e3.base || (e3.name || "") + (e3.ext || "");
        return r3 ? r3 === e3.root ? r3 + n4 : r3 + "/" + n4 : n4;
      }(0, t3);
    }, parse: function(t3) {
      e2(t3);
      var r3 = { root: "", dir: "", base: "", ext: "", name: "" };
      if (0 === t3.length)
        return r3;
      var n4, o = t3.charCodeAt(0), i = 47 === o;
      i ? (r3.root = "/", n4 = 1) : n4 = 0;
      for (var a = -1, h = 0, s = -1, c = true, f = t3.length - 1, u = 0; f >= n4; --f)
        if (47 !== (o = t3.charCodeAt(f)))
          -1 === s && (c = false, s = f + 1), 46 === o ? -1 === a ? a = f : 1 !== u && (u = 1) : -1 !== a && (u = -1);
        else if (!c) {
          h = f + 1;
          break;
        }
      return -1 === a || -1 === s || 0 === u || 1 === u && a === s - 1 && a === h + 1 ? -1 !== s && (r3.base = r3.name = 0 === h && i ? t3.slice(1, s) : t3.slice(h, s)) : (0 === h && i ? (r3.name = t3.slice(1, a), r3.base = t3.slice(1, s)) : (r3.name = t3.slice(h, a), r3.base = t3.slice(h, s)), r3.ext = t3.slice(a, s)), h > 0 ? r3.dir = t3.slice(0, h - 1) : i && (r3.dir = "/"), r3;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    n3.posix = n3, t2.exports = n3;
  } }, e = {};
  function r(n3) {
    var o = e[n3];
    if (void 0 !== o)
      return o.exports;
    var i = e[n3] = { exports: {} };
    return t[n3](i, i.exports, r), i.exports;
  }
  r.d = (t2, e2) => {
    for (var n3 in e2)
      r.o(e2, n3) && !r.o(t2, n3) && Object.defineProperty(t2, n3, { enumerable: true, get: e2[n3] });
  }, r.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r.r = (t2) => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
  };
  var n2 = {};
  (() => {
    var t2;
    if (r.r(n2), r.d(n2, { URI: () => p, Utils: () => _ }), "object" == typeof process)
      t2 = "win32" === process.platform;
    else if ("object" == typeof navigator) {
      var e2 = navigator.userAgent;
      t2 = e2.indexOf("Windows") >= 0;
    }
    var o, i, a = (o = function(t3, e3) {
      return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
        t4.__proto__ = e4;
      } || function(t4, e4) {
        for (var r2 in e4)
          Object.prototype.hasOwnProperty.call(e4, r2) && (t4[r2] = e4[r2]);
      }, o(t3, e3);
    }, function(t3, e3) {
      if ("function" != typeof e3 && null !== e3)
        throw new TypeError("Class extends value " + String(e3) + " is not a constructor or null");
      function r2() {
        this.constructor = t3;
      }
      o(t3, e3), t3.prototype = null === e3 ? Object.create(e3) : (r2.prototype = e3.prototype, new r2());
    }), h = /^\w[\w\d+.-]*$/, s = /^\//, c = /^\/\//, f = "", u = "/", l = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, p = function() {
      function e3(t3, e4, r2, n3, o2, i2) {
        void 0 === i2 && (i2 = false), "object" == typeof t3 ? (this.scheme = t3.scheme || f, this.authority = t3.authority || f, this.path = t3.path || f, this.query = t3.query || f, this.fragment = t3.fragment || f) : (this.scheme = function(t4, e5) {
          return t4 || e5 ? t4 : "file";
        }(t3, i2), this.authority = e4 || f, this.path = function(t4, e5) {
          switch (t4) {
            case "https":
            case "http":
            case "file":
              e5 ? e5[0] !== u && (e5 = u + e5) : e5 = u;
          }
          return e5;
        }(this.scheme, r2 || f), this.query = n3 || f, this.fragment = o2 || f, function(t4, e5) {
          if (!t4.scheme && e5)
            throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(t4.authority, '", path: "').concat(t4.path, '", query: "').concat(t4.query, '", fragment: "').concat(t4.fragment, '"}'));
          if (t4.scheme && !h.test(t4.scheme))
            throw new Error("[UriError]: Scheme contains illegal characters.");
          if (t4.path) {
            if (t4.authority) {
              if (!s.test(t4.path))
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            } else if (c.test(t4.path))
              throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
          }
        }(this, i2));
      }
      return e3.isUri = function(t3) {
        return t3 instanceof e3 || !!t3 && "string" == typeof t3.authority && "string" == typeof t3.fragment && "string" == typeof t3.path && "string" == typeof t3.query && "string" == typeof t3.scheme && "string" == typeof t3.fsPath && "function" == typeof t3.with && "function" == typeof t3.toString;
      }, Object.defineProperty(e3.prototype, "fsPath", { get: function() {
        return b(this, false);
      }, enumerable: false, configurable: true }), e3.prototype.with = function(t3) {
        if (!t3)
          return this;
        var e4 = t3.scheme, r2 = t3.authority, n3 = t3.path, o2 = t3.query, i2 = t3.fragment;
        return void 0 === e4 ? e4 = this.scheme : null === e4 && (e4 = f), void 0 === r2 ? r2 = this.authority : null === r2 && (r2 = f), void 0 === n3 ? n3 = this.path : null === n3 && (n3 = f), void 0 === o2 ? o2 = this.query : null === o2 && (o2 = f), void 0 === i2 ? i2 = this.fragment : null === i2 && (i2 = f), e4 === this.scheme && r2 === this.authority && n3 === this.path && o2 === this.query && i2 === this.fragment ? this : new d(e4, r2, n3, o2, i2);
      }, e3.parse = function(t3, e4) {
        void 0 === e4 && (e4 = false);
        var r2 = l.exec(t3);
        return r2 ? new d(r2[2] || f, x(r2[4] || f), x(r2[5] || f), x(r2[7] || f), x(r2[9] || f), e4) : new d(f, f, f, f, f);
      }, e3.file = function(e4) {
        var r2 = f;
        if (t2 && (e4 = e4.replace(/\\/g, u)), e4[0] === u && e4[1] === u) {
          var n3 = e4.indexOf(u, 2);
          -1 === n3 ? (r2 = e4.substring(2), e4 = u) : (r2 = e4.substring(2, n3), e4 = e4.substring(n3) || u);
        }
        return new d("file", r2, e4, f, f);
      }, e3.from = function(t3) {
        return new d(t3.scheme, t3.authority, t3.path, t3.query, t3.fragment);
      }, e3.prototype.toString = function(t3) {
        return void 0 === t3 && (t3 = false), C(this, t3);
      }, e3.prototype.toJSON = function() {
        return this;
      }, e3.revive = function(t3) {
        if (t3) {
          if (t3 instanceof e3)
            return t3;
          var r2 = new d(t3);
          return r2._formatted = t3.external, r2._fsPath = t3._sep === g ? t3.fsPath : null, r2;
        }
        return t3;
      }, e3;
    }(), g = t2 ? 1 : void 0, d = function(t3) {
      function e3() {
        var e4 = null !== t3 && t3.apply(this, arguments) || this;
        return e4._formatted = null, e4._fsPath = null, e4;
      }
      return a(e3, t3), Object.defineProperty(e3.prototype, "fsPath", { get: function() {
        return this._fsPath || (this._fsPath = b(this, false)), this._fsPath;
      }, enumerable: false, configurable: true }), e3.prototype.toString = function(t4) {
        return void 0 === t4 && (t4 = false), t4 ? C(this, true) : (this._formatted || (this._formatted = C(this, false)), this._formatted);
      }, e3.prototype.toJSON = function() {
        var t4 = { $mid: 1 };
        return this._fsPath && (t4.fsPath = this._fsPath, t4._sep = g), this._formatted && (t4.external = this._formatted), this.path && (t4.path = this.path), this.scheme && (t4.scheme = this.scheme), this.authority && (t4.authority = this.authority), this.query && (t4.query = this.query), this.fragment && (t4.fragment = this.fragment), t4;
      }, e3;
    }(p), v = ((i = {})[58] = "%3A", i[47] = "%2F", i[63] = "%3F", i[35] = "%23", i[91] = "%5B", i[93] = "%5D", i[64] = "%40", i[33] = "%21", i[36] = "%24", i[38] = "%26", i[39] = "%27", i[40] = "%28", i[41] = "%29", i[42] = "%2A", i[43] = "%2B", i[44] = "%2C", i[59] = "%3B", i[61] = "%3D", i[32] = "%20", i);
    function y(t3, e3) {
      for (var r2 = void 0, n3 = -1, o2 = 0; o2 < t3.length; o2++) {
        var i2 = t3.charCodeAt(o2);
        if (i2 >= 97 && i2 <= 122 || i2 >= 65 && i2 <= 90 || i2 >= 48 && i2 <= 57 || 45 === i2 || 46 === i2 || 95 === i2 || 126 === i2 || e3 && 47 === i2)
          -1 !== n3 && (r2 += encodeURIComponent(t3.substring(n3, o2)), n3 = -1), void 0 !== r2 && (r2 += t3.charAt(o2));
        else {
          void 0 === r2 && (r2 = t3.substr(0, o2));
          var a2 = v[i2];
          void 0 !== a2 ? (-1 !== n3 && (r2 += encodeURIComponent(t3.substring(n3, o2)), n3 = -1), r2 += a2) : -1 === n3 && (n3 = o2);
        }
      }
      return -1 !== n3 && (r2 += encodeURIComponent(t3.substring(n3))), void 0 !== r2 ? r2 : t3;
    }
    function m(t3) {
      for (var e3 = void 0, r2 = 0; r2 < t3.length; r2++) {
        var n3 = t3.charCodeAt(r2);
        35 === n3 || 63 === n3 ? (void 0 === e3 && (e3 = t3.substr(0, r2)), e3 += v[n3]) : void 0 !== e3 && (e3 += t3[r2]);
      }
      return void 0 !== e3 ? e3 : t3;
    }
    function b(e3, r2) {
      var n3;
      return n3 = e3.authority && e3.path.length > 1 && "file" === e3.scheme ? "//".concat(e3.authority).concat(e3.path) : 47 === e3.path.charCodeAt(0) && (e3.path.charCodeAt(1) >= 65 && e3.path.charCodeAt(1) <= 90 || e3.path.charCodeAt(1) >= 97 && e3.path.charCodeAt(1) <= 122) && 58 === e3.path.charCodeAt(2) ? r2 ? e3.path.substr(1) : e3.path[1].toLowerCase() + e3.path.substr(2) : e3.path, t2 && (n3 = n3.replace(/\//g, "\\")), n3;
    }
    function C(t3, e3) {
      var r2 = e3 ? m : y, n3 = "", o2 = t3.scheme, i2 = t3.authority, a2 = t3.path, h2 = t3.query, s2 = t3.fragment;
      if (o2 && (n3 += o2, n3 += ":"), (i2 || "file" === o2) && (n3 += u, n3 += u), i2) {
        var c2 = i2.indexOf("@");
        if (-1 !== c2) {
          var f2 = i2.substr(0, c2);
          i2 = i2.substr(c2 + 1), -1 === (c2 = f2.indexOf(":")) ? n3 += r2(f2, false) : (n3 += r2(f2.substr(0, c2), false), n3 += ":", n3 += r2(f2.substr(c2 + 1), false)), n3 += "@";
        }
        -1 === (c2 = (i2 = i2.toLowerCase()).indexOf(":")) ? n3 += r2(i2, false) : (n3 += r2(i2.substr(0, c2), false), n3 += i2.substr(c2));
      }
      if (a2) {
        if (a2.length >= 3 && 47 === a2.charCodeAt(0) && 58 === a2.charCodeAt(2))
          (l2 = a2.charCodeAt(1)) >= 65 && l2 <= 90 && (a2 = "/".concat(String.fromCharCode(l2 + 32), ":").concat(a2.substr(3)));
        else if (a2.length >= 2 && 58 === a2.charCodeAt(1)) {
          var l2;
          (l2 = a2.charCodeAt(0)) >= 65 && l2 <= 90 && (a2 = "".concat(String.fromCharCode(l2 + 32), ":").concat(a2.substr(2)));
        }
        n3 += r2(a2, true);
      }
      return h2 && (n3 += "?", n3 += r2(h2, false)), s2 && (n3 += "#", n3 += e3 ? s2 : y(s2, false)), n3;
    }
    function A(t3) {
      try {
        return decodeURIComponent(t3);
      } catch (e3) {
        return t3.length > 3 ? t3.substr(0, 3) + A(t3.substr(3)) : t3;
      }
    }
    var w = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function x(t3) {
      return t3.match(w) ? t3.replace(w, function(t4) {
        return A(t4);
      }) : t3;
    }
    var _, O = r(470), P = function(t3, e3, r2) {
      if (r2 || 2 === arguments.length)
        for (var n3, o2 = 0, i2 = e3.length; o2 < i2; o2++)
          !n3 && o2 in e3 || (n3 || (n3 = Array.prototype.slice.call(e3, 0, o2)), n3[o2] = e3[o2]);
      return t3.concat(n3 || Array.prototype.slice.call(e3));
    }, j = O.posix || O, U = "/";
    !function(t3) {
      t3.joinPath = function(t4) {
        for (var e3 = [], r2 = 1; r2 < arguments.length; r2++)
          e3[r2 - 1] = arguments[r2];
        return t4.with({ path: j.join.apply(j, P([t4.path], e3, false)) });
      }, t3.resolvePath = function(t4) {
        for (var e3 = [], r2 = 1; r2 < arguments.length; r2++)
          e3[r2 - 1] = arguments[r2];
        var n3 = t4.path, o2 = false;
        n3[0] !== U && (n3 = U + n3, o2 = true);
        var i2 = j.resolve.apply(j, P([n3], e3, false));
        return o2 && i2[0] === U && !t4.authority && (i2 = i2.substring(1)), t4.with({ path: i2 });
      }, t3.dirname = function(t4) {
        if (0 === t4.path.length || t4.path === U)
          return t4;
        var e3 = j.dirname(t4.path);
        return 1 === e3.length && 46 === e3.charCodeAt(0) && (e3 = ""), t4.with({ path: e3 });
      }, t3.basename = function(t4) {
        return j.basename(t4.path);
      }, t3.extname = function(t4) {
        return j.extname(t4.path);
      };
    }(_ || (_ = {}));
  })(), LIB = n2;
})();
var { URI, Utils } = LIB;

// src/server/server.ts
var path5 = __toESM(require("path"));

// src/server/teal.ts
var import_tmp_promise = __toESM(require_tmp_promise());
var import_child_process = require("child_process");

// src/server/file-utils.ts
var import_fs = require("fs");
var import_util = require("util");
var fs = __toESM(require("fs"));
var path = require("path");
function fileExists(filePath) {
  return new Promise((resolve3, reject) => {
    (0, import_fs.access)(filePath, import_fs.constants.F_OK, function(error) {
      resolve3(error === null);
    });
  });
}
var writeFile = (0, import_util.promisify)(fs.write);
var fileSystemRoot = path.parse(process.cwd()).root;
var cwd = path.resolve(process.cwd());
async function upwardSearch(dir, fileName, maxDepth) {
  const tryPath = path.join(dir, fileName);
  if (await fileExists(tryPath)) {
    return tryPath;
  }
  const resolvedDir = path.resolve(dir);
  if (resolvedDir === cwd) {
    return void 0;
  }
  if (resolvedDir === fileSystemRoot) {
    return void 0;
  }
  if (maxDepth === 0) {
    return void 0;
  }
  return upwardSearch(path.dirname(dir), fileName, maxDepth - 1);
}

// src/server/major-minor-patch.ts
var MajorMinorPatch = class {
  constructor(major, minor, patch) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }
  compareTo(v) {
    if (this.major > v.major)
      return 1;
    if (this.major < v.major)
      return -1;
    if (this.minor > v.minor)
      return 1;
    if (this.minor < v.minor)
      return -1;
    if (this.patch > v.patch)
      return 1;
    if (this.patch < v.patch)
      return -1;
    return 0;
  }
  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
};

// src/server/teal.ts
var import_shell_quote = __toESM(require_shell_quote());
var path2 = require("path");
var Teal;
((Teal3) => {
  class TLNotFoundError extends Error {
  }
  Teal3.TmpBufferPrefix = "__tl__tmp__check-";
  ;
  let TLCommand;
  ((TLCommand2) => {
    TLCommand2["Check"] = "check";
    TLCommand2["Types"] = "types";
    TLCommand2["Version"] = "--version";
  })(TLCommand = Teal3.TLCommand || (Teal3.TLCommand = {}));
  ;
  ;
  ;
  ;
  ;
  function le(vy, vx, y, x) {
    return vy < y || vy == y && vx <= x;
  }
  function find(symbols, y, x) {
    let len = symbols.length;
    let left = 0;
    let mid = 0;
    let right = len - 1;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      const sym = symbols[mid];
      if (le(sym[0], sym[1], y, x)) {
        if (mid == len - 1) {
          return mid;
        } else {
          const nextSym = symbols[mid + 1];
          if (!le(nextSym[0], nextSym[1], y, x)) {
            return mid;
          }
        }
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }
  function symbolsInScope(typeReport, y, x) {
    let result = /* @__PURE__ */ new Map();
    let symIndex = find(typeReport.symbols, y, x);
    const globals = typeReport.globals;
    for (const [str, typeId] of Object.entries(globals)) {
      result.set(str, {
        identifier: str,
        typeId
      });
    }
    const symbols = typeReport.symbols;
    while (symIndex >= 0) {
      let sym = symbols[symIndex];
      if (sym[2] == "@{") {
        symIndex = symIndex - 1;
      } else if (sym[2] == "@}") {
        symIndex = sym[3];
      } else {
        result.set(sym[2], {
          y: sym[0],
          x: sym[1],
          identifier: sym[2],
          typeId: sym[3]
        });
        symIndex = symIndex - 1;
      }
    }
    return result;
  }
  Teal3.symbolsInScope = symbolsInScope;
  async function runCommandOnText(command, text, projectRoot) {
    try {
      return await (0, import_tmp_promise.withFile)(async ({ path: path6, fd }) => {
        await writeFile(fd, text);
        try {
          let result = await runCommand(command, path6, projectRoot);
          return result;
        } catch (error) {
          throw error;
        }
      }, { prefix: Teal3.TmpBufferPrefix });
    } catch (error) {
      throw error;
    }
  }
  Teal3.runCommandOnText = runCommandOnText;
  Teal3.tlNotFoundErrorMessage = "Could not find the tl executable. Please make sure that it is available in the PATH.";
  async function runCommand(command, filePath, cwd2) {
    let child;
    let isWindows = process.platform == "win32";
    let args = [command, "--quiet"];
    if (filePath !== void 0) {
      if (isWindows) {
        filePath = (0, import_shell_quote.quote)([filePath]);
      }
      args.push(filePath);
    }
    child = (0, import_child_process.spawn)("tl", args, {
      shell: isWindows,
      cwd: cwd2
    });
    return await new Promise(async function(resolve3, reject) {
      let stdout = "";
      let stderr = "";
      child.on("error", function(error) {
        if (error.code === "ENOENT") {
          reject(new TLNotFoundError(Teal3.tlNotFoundErrorMessage));
        } else {
          reject(error);
        }
      });
      child.on("close", function(exitCode) {
        resolve3({ filePath: filePath ? filePath : null, stdout, stderr });
      });
      for await (const chunk of child.stdout) {
        stdout += chunk;
      }
      for await (const chunk of child.stderr) {
        stderr += chunk;
      }
    });
  }
  Teal3.runCommand = runCommand;
  async function getVersion() {
    let commandResult;
    try {
      commandResult = await Teal3.runCommand("--version" /* Version */);
    } catch (e) {
      return null;
    }
    const majorMinorPatch = commandResult.stdout.match(/(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/);
    if (majorMinorPatch === null) {
      return null;
    }
    const groups = majorMinorPatch.groups;
    return new MajorMinorPatch(
      Number.parseInt(groups.major),
      Number.parseInt(groups.minor),
      Number.parseInt(groups.patch)
    );
  }
  Teal3.getVersion = getVersion;
  function prettifyTypeStr(type) {
    let result = type.replace(/<any type>/gm, "any");
    result = result.replace(/@a/gm, "T");
    result = result.replace(/@b/gm, "U");
    result = result.replace(/\band\b/gm, "&");
    return result;
  }
  Teal3.prettifyTypeStr = prettifyTypeStr;
})(Teal || (Teal = {}));

// src/server/tree-sitter-document.ts
var import_tree_sitter = __toESM(require_tree_sitter());
var import_path = __toESM(require("path"));
var import_tree_sitter_teal = __toESM(require_node4());
var import_node = __toESM(require_node3());

// node_modules/.pnpm/vscode-languageserver-textdocument@1.0.7/node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var FullTextDocument2 = class {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      const start = this.offsetAt(range.start);
      const end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(changes, version) {
    for (let change of changes) {
      if (FullTextDocument2.isIncremental(change)) {
        const range = getWellformedRange(change.range);
        const startOffset = this.offsetAt(range.start);
        const endOffset = this.offsetAt(range.end);
        this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
        const startLine = Math.max(range.start.line, 0);
        const endLine = Math.max(range.end.line, 0);
        let lineOffsets = this._lineOffsets;
        const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
        if (endLine - startLine === addedLineOffsets.length) {
          for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
            lineOffsets[i + startLine + 1] = addedLineOffsets[i];
          }
        } else {
          if (addedLineOffsets.length < 1e4) {
            lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
          } else {
            this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
          }
        }
        const diff = change.text.length - (endOffset - startOffset);
        if (diff !== 0) {
          for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
            lineOffsets[i] = lineOffsets[i] + diff;
          }
        }
      } else if (FullTextDocument2.isFull(change)) {
        this._content = change.text;
        this._lineOffsets = void 0;
      } else {
        throw new Error("Unknown change event received");
      }
    }
    this._version = version;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      this._lineOffsets = computeLineOffsets(this._content, true);
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    let lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return { line: 0, character: offset };
    }
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    let line = low - 1;
    return { line, character: offset - lineOffsets[line] };
  }
  offsetAt(position) {
    let lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    let lineOffset = lineOffsets[position.line];
    let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(event) {
    let candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
  }
  static isFull(event) {
    let candidate = event;
    return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
  }
};
var TextDocument2;
(function(TextDocument3) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument2(uri, languageId, version, content);
  }
  TextDocument3.create = create;
  function update(document, changes, version) {
    if (document instanceof FullTextDocument2) {
      document.update(changes, version);
      return document;
    } else {
      throw new Error("TextDocument.update: document must be created by TextDocument.create");
    }
  }
  TextDocument3.update = update;
  function applyEdits(document, edits) {
    let text = document.getText();
    let sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
      let diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = 0;
    const spans = [];
    for (const e of sortedEdits) {
      let startOffset = document.offsetAt(e.range.start);
      if (startOffset < lastModifiedOffset) {
        throw new Error("Overlapping edit");
      } else if (startOffset > lastModifiedOffset) {
        spans.push(text.substring(lastModifiedOffset, startOffset));
      }
      if (e.newText.length) {
        spans.push(e.newText);
      }
      lastModifiedOffset = document.offsetAt(e.range.end);
    }
    spans.push(text.substr(lastModifiedOffset));
    return spans.join("");
  }
  TextDocument3.applyEdits = applyEdits;
})(TextDocument2 || (TextDocument2 = {}));
function mergeSort(data, compare) {
  if (data.length <= 1) {
    return data;
  }
  const p = data.length / 2 | 0;
  const left = data.slice(0, p);
  const right = data.slice(p);
  mergeSort(left, compare);
  mergeSort(right, compare);
  let leftIdx = 0;
  let rightIdx = 0;
  let i = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    let ret = compare(left[leftIdx], right[rightIdx]);
    if (ret <= 0) {
      data[i++] = left[leftIdx++];
    } else {
      data[i++] = right[rightIdx++];
    }
  }
  while (leftIdx < left.length) {
    data[i++] = left[leftIdx++];
  }
  while (rightIdx < right.length) {
    data[i++] = right[rightIdx++];
  }
  return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
  const result = isAtLineStart ? [textOffset] : [];
  for (let i = 0; i < text.length; i++) {
    let ch = text.charCodeAt(i);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
        i++;
      }
      result.push(textOffset + i + 1);
    }
  }
  return result;
}
function getWellformedRange(range) {
  const start = range.start;
  const end = range.end;
  if (start.line > end.line || start.line === end.line && start.character > end.character) {
    return { start: end, end: start };
  }
  return range;
}
function getWellformedEdit(textEdit) {
  const range = getWellformedRange(textEdit.range);
  if (range !== textEdit.range) {
    return { newText: textEdit.newText, range };
  }
  return textEdit;
}

// src/server/tree-sitter-document.ts
var TreeSitterDocument = class {
  get uri() {
    return this._uri;
  }
  get isInit() {
    return this._isInit;
  }
  constructor() {
    this._parser = null;
    this._tree = null;
    this._document = null;
    this._uri = "";
    this._isInit = false;
  }
  async init(uri, text) {
    this._parser = new import_tree_sitter.default();
    this._parser.setLanguage(import_tree_sitter_teal.default);
    this._document = TextDocument2.create(uri, "teal", 1, text);
    this._tree = this._parser.parse(text);
    this._uri = uri;
    this._isInit = true;
  }
  edit(edits) {
    if (this._tree === null || this._parser === null || this._document === null) {
      console.log("[Warning]", "Some edits have been lost!");
      return;
    }
    if (edits.length === 0) {
      return;
    }
    for (const edit2 of edits) {
      if ("range" in edit2) {
        const startIndex = this._document.offsetAt(edit2.range.start);
        const oldEndIndex = this._document.offsetAt(edit2.range.end);
        const newEndIndex = startIndex + edit2.text.length;
        const startPosition2 = positionToPoint(edit2.range.start);
        const oldEndPosition = positionToPoint(edit2.range.end);
        const extent = getExtent(edit2.text);
        let newEndPosition = { row: 0, column: 0 };
        newEndPosition.row = startPosition2.row + extent.row;
        if (extent.row > 0) {
          newEndPosition.column = extent.column;
        } else {
          newEndPosition.column = startPosition2.column + extent.column;
        }
        const delta = {
          startIndex,
          oldEndIndex,
          newEndIndex,
          startPosition: startPosition2,
          oldEndPosition,
          newEndPosition
        };
        this._tree.edit(delta);
        this._document = TextDocument2.update(this._document, [edit2], this._document.version + 1);
        this._tree = this._parser.parse(this._document.getText(), this._tree);
      } else {
        console.log("[INFO] Rebuilding whole syntax tree");
        this._document = TextDocument2.update(this._document, [edit2], this._document.version + 1);
        this._tree = this._parser.parse(edit2.text);
      }
    }
  }
  getText(range) {
    if (this._document === null) {
      return "";
    }
    return this._document.getText(range);
  }
  getFilePath() {
    return URI.parse(this._uri).fsPath;
  }
  getDirectory() {
    return import_path.default.dirname(this.getFilePath());
  }
  getFileName() {
    return import_path.default.basename(this.getFilePath());
  }
  async getProjectRoot() {
    const fileDir = import_path.default.dirname(this.getFilePath());
    const configLocation = await upwardSearch(fileDir, "tlconfig.lua", 20);
    if (configLocation === void 0) {
      return void 0;
    }
    return import_path.default.dirname(configLocation);
  }
  getWordRangeAtPosition(position) {
    const identifierRegex = /[a-zA-Z0-9_]/;
    const line = this.getText(import_node.Range.create(position.line, 0, position.line + 1, 0));
    let start = position.character;
    let end = position.character;
    if (!identifierRegex.test(line[Math.max(0, position.character - 1)]) && !identifierRegex.test(line[end])) {
      return null;
    }
    while (start > 0 && identifierRegex.test(line[start - 1])) {
      start--;
    }
    while (end < line.length && identifierRegex.test(line[end])) {
      end++;
    }
    return import_node.Range.create(position.line, start, position.line, end);
  }
  getNodeAtPosition(position) {
    if (this._tree === null) {
      return null;
    }
    return smallestDescendantForPosition(this._tree.rootNode, position);
  }
  dumpTree() {
    if (this._tree === null) {
      return "";
    }
    return this._tree.rootNode.toString();
  }
};
function getExtent(text) {
  let lines = text.split("\n");
  return { row: lines.length - 1, column: lines[lines.length - 1].length };
}
function positionToPoint(pos) {
  return {
    row: pos.line,
    column: pos.character
  };
}
function positionInNode(pos, node) {
  return pos.line >= node.startPosition.row && pos.line <= node.endPosition.row && !(pos.line === node.startPosition.row && pos.character < node.startPosition.column || pos.line === node.endPosition.row && pos.character > node.endPosition.column);
}
function positionAfterNode(pos, node) {
  return pos.line >= node.endPosition.row && (pos.line > node.endPosition.row || pos.character > node.endPosition.column);
}
function nodeLength(node) {
  return node.endIndex - node.startIndex;
}
function smallestDescendantForPosition(rootNode2, position) {
  if (rootNode2.namedChildren.length === 0) {
    return rootNode2;
  }
  let min = rootNode2;
  for (let i = 0; i < rootNode2.namedChildren.length; ++i) {
    const child = rootNode2.namedChildren[i];
    if (positionInNode(position, child)) {
      const smallestSubChildren = smallestDescendantForPosition(child, position);
      if (nodeLength(smallestSubChildren) <= nodeLength(min)) {
        min = smallestSubChildren;
      }
    }
  }
  let sibling = rootNode2.nextNamedSibling;
  while (sibling !== null) {
    if (positionInNode(position, sibling)) {
      const smallestSubChildren = smallestDescendantForPosition(sibling, position);
      if (nodeLength(smallestSubChildren) <= nodeLength(min)) {
        min = smallestSubChildren;
      }
    }
    sibling = sibling.nextNamedSibling;
  }
  return min;
}

// src/server/diagnostics.ts
var path4 = __toESM(require("path"));
var import_node2 = __toESM(require_node3());
var import_os = require("os");
var TealLS;
((TealLS2) => {
  async function validateTextDocument2(textDocument) {
    const projectRoot = await textDocument.getProjectRoot();
    const checkResult = await Teal.runCommandOnText(Teal.TLCommand.Check, textDocument.getText(), projectRoot);
    const crashPattern = /stack traceback:/m;
    if (crashPattern.test(checkResult.stderr)) {
      throw new Error(checkResult.stderr);
    }
    const warningCountPattern = /^\d+ warning(s)?:$/;
    const errorCountPattern = /^\d+ error(s)?:$/;
    const errorMessagePattern = /(?<fileName>^.*?):(?<lineNumber>\d+):((?<columnNumber>\d+):)? (?<errorMessage>.+)$/;
    let diagnosticsByPath = /* @__PURE__ */ new Map();
    diagnosticsByPath.set(textDocument.uri, []);
    async function execPattern(compilerOutput2, severity) {
      let syntaxError = errorMessagePattern.exec(compilerOutput2);
      if (syntaxError !== null) {
        const groups = syntaxError.groups;
        let errorPath = path4.resolve(projectRoot != null ? projectRoot : "", groups.fileName);
        let errorURI = getDocumentUri(textDocument, errorPath);
        let lineNumber = Number.parseInt(groups.lineNumber) - 1;
        let columnNumber = 0;
        if (groups.columnNumber !== void 0) {
          columnNumber = Number.parseInt(groups.columnNumber) - 1;
        }
        let errorMessage = groups.errorMessage;
        errorMessage = errorMessage.replace(errorPath, textDocument.getFilePath());
        let range = import_node2.Range.create(lineNumber, columnNumber, lineNumber, columnNumber);
        let diagnostic = {
          severity,
          range,
          message: errorMessage,
          source: "tl check"
        };
        let arr = diagnosticsByPath.get(errorURI);
        if (arr) {
          arr.push(diagnostic);
        } else {
          diagnosticsByPath.set(errorURI, [diagnostic]);
        }
      }
    }
    let compilerOutput = checkResult.stderr.split(import_os.EOL);
    let warningSection = false;
    for (let line of compilerOutput) {
      if (warningCountPattern.test(line)) {
        warningSection = true;
      } else if (errorCountPattern.test(line)) {
        warningSection = false;
      } else {
        await execPattern(line, warningSection ? import_node2.DiagnosticSeverity.Warning : import_node2.DiagnosticSeverity.Error);
      }
    }
    return diagnosticsByPath;
  }
  TealLS2.validateTextDocument = validateTextDocument2;
})(TealLS || (TealLS = {}));

// src/server/text-utils.ts
function isEmptyOrSpaces(str) {
  return str == null || str.trim() === "";
}

// src/server/intellisense.ts
var import_node3 = __toESM(require_node3());
function findNodeAbove(baseNode, type) {
  let ptr = baseNode;
  while (ptr !== null) {
    if (type.includes(ptr.type)) {
      return ptr;
    }
    ptr = ptr.parent;
  }
  return null;
}
function findNodeBeforeOrBelow(rootNode2, type, ignore = []) {
  for (let i = 0; i < rootNode2.namedChildren.length; ++i) {
    const child = rootNode2.namedChildren[i];
    if (type.includes(child.type) && !ignore.includes(child.type)) {
      return child;
    }
    let subChild = findNodeBeforeOrBelow(child, type, ignore);
    if (subChild !== null) {
      return subChild;
    }
  }
  let sibling = rootNode2.previousNamedSibling;
  while (sibling !== null) {
    if (type.includes(sibling.type) && !ignore.includes(sibling.type)) {
      return sibling;
    }
    sibling = sibling.previousNamedSibling;
  }
  return null;
}
function descendantsOfTypes(rootNode2, type, ignore = []) {
  let result = [];
  if (type.includes(rootNode2.type)) {
    result.push(rootNode2);
  }
  for (let i = 0; i < rootNode2.namedChildren.length; ++i) {
    const child = rootNode2.namedChildren[i];
    if (!ignore.includes(child.type)) {
      let subChildren = descendantsOfTypes(child, type, ignore);
      if (subChildren.length > 0) {
        result = result.concat(subChildren);
      }
    }
  }
  return result;
}
function findIndexRootAtPosition(document, line, column) {
  const nodeAtPosition = document.getNodeAtPosition({ line, character: column });
  if (nodeAtPosition === null) {
    return null;
  }
  let indexRoot;
  const isConfusedForOp = nodeAtPosition.type === "op" && nodeAtPosition.startPosition.column === column - 1 && nodeAtPosition.endPosition.column === column + 1;
  if (nodeAtPosition.type === "ERROR" || isConfusedForOp) {
    indexRoot = findNodeBeforeOrBelow(nodeAtPosition, ["index", "method_index", "identifier", "table_entry", "type_annotation", "arg", "simple_type", "type_index"]);
    if (indexRoot !== null && indexRoot.type === "table_entry") {
      indexRoot = indexRoot.childForFieldName("value");
    } else if (indexRoot !== null && indexRoot.type === "type_annotation") {
      indexRoot = findNodeBeforeOrBelow(indexRoot, ["simple_type", "type_index"]);
    } else if (indexRoot !== null && indexRoot.type === "arg") {
      indexRoot = findNodeBeforeOrBelow(indexRoot, ["simple_type", "type_index"]);
    }
  } else {
    indexRoot = findNodeAbove(nodeAtPosition, ["index", "method_index", "type_index"]);
  }
  return indexRoot;
}
function getSymbolParts(node, row, column) {
  const result = [];
  descendantsOfTypes(node, ["identifier", "simple_type"], ["arguments"]).forEach((x) => {
    if (positionAfterNode({ line: row, character: column }, x)) {
      result.push(x.text);
    }
  });
  return result;
}
function getTypeById(typeInfo2, typeId) {
  var _a, _b;
  let typeDefinition = (_b = (_a = typeInfo2.json) == null ? void 0 : _a["types"]) == null ? void 0 : _b[typeId];
  if (typeDefinition === void 0) {
    return null;
  }
  return typeDefinition;
}
function getTargetType(type, key, typeInfo2) {
  var _a, _b, _c, _d, _e;
  let targetTypeId;
  if (type["t"] === 131080) {
    targetTypeId = (_a = type.fields) == null ? void 0 : _a[key];
  } else if (type["t"] === 268435456) {
    while (type.ref !== void 0) {
      type = getTypeById(typeInfo2, type.ref);
    }
    targetTypeId = (_b = type.fields) == null ? void 0 : _b[key];
  } else if (type["t"] === 65544) {
    targetTypeId = type.elements;
  } else if (type["t"] === 262152) {
    targetTypeId = type.values;
  } else if (type["t"] === 196616) {
    targetTypeId = (_c = type.fields) == null ? void 0 : _c[key];
    if (targetTypeId === void 0) {
      targetTypeId = type.elements;
    }
  } else if (type["t"] === 524296) {
  } else if (type["t"] === 32) {
    targetTypeId = (_d = type.rets[0]) == null ? void 0 : _d[0];
  } else if (type["t"] === 8) {
    targetTypeId = (_e = typeInfo2.json["globals"]) == null ? void 0 : _e["string"];
  }
  if (targetTypeId === void 0) {
    return null;
  }
  let targetType = getTypeById(typeInfo2, targetTypeId);
  while (targetType.ref !== void 0) {
    targetType = getTypeById(typeInfo2, targetType.ref);
  }
  return targetType;
}
function autoCompleteIndex(indexRoot, typeInfo2, symbolsInScope, position) {
  let result = [];
  const symbolParts = getSymbolParts(indexRoot, position.line, position.character);
  if (symbolParts.length === 0) {
    return [];
  }
  let rootSymbol = symbolsInScope.get(symbolParts[0]);
  if (rootSymbol === void 0) {
    return [];
  }
  let rootType = getTypeById(typeInfo2, rootSymbol.typeId);
  if (rootType === null) {
    return [];
  }
  while (rootType.ref !== void 0) {
    rootType = getTypeById(typeInfo2, rootType.ref);
  }
  let typeRef = rootType;
  for (let x = 1; x < symbolParts.length; ++x) {
    const key = symbolParts[x];
    let targetType = getTargetType(typeRef, key, typeInfo2);
    if (targetType === null) {
      return [];
    }
    typeRef = targetType;
  }
  if (typeRef.fields === void 0) {
    const retType = getTargetType(typeRef, "", typeInfo2);
    if (retType !== null) {
      typeRef = retType;
    }
  }
  if (typeRef.fields !== void 0) {
    for (const [identifier, typeId] of Object.entries(typeRef.fields)) {
      const completionItem = makeTypeItem(typeInfo2, typeId, identifier);
      if (completionItem !== null) {
        result.push(completionItem);
      }
    }
  }
  return result;
}
function makeTypeItem(typeInfo2, typeId, label) {
  let typeDefinition = getTypeById(typeInfo2, typeId);
  if (typeDefinition === null || typeDefinition["str"] === void 0) {
    return null;
  }
  let kind = import_node3.CompletionItemKind.Variable;
  if (typeDefinition["ref"] !== void 0) {
    kind = import_node3.CompletionItemKind.Variable;
  } else if (typeDefinition["str"].startsWith("function(") || typeDefinition["str"].startsWith("function<")) {
    kind = import_node3.CompletionItemKind.Function;
  } else if (typeDefinition["enums"] !== void 0) {
    kind = import_node3.CompletionItemKind.Enum;
  } else if (typeDefinition["str"].startsWith("type record")) {
    kind = import_node3.CompletionItemKind.Class;
  }
  const detail = Teal.prettifyTypeStr(typeDefinition.str);
  return {
    label,
    kind,
    data: typeDefinition,
    detail,
    commitCharacters: ["("]
  };
}
async function autoComplete(document, position, typeInfo2) {
  let symbols = Teal.symbolsInScope(typeInfo2.json, position.line + 1, position.character + 1);
  const indexRoot = findIndexRootAtPosition(document, position.line, position.character);
  if (indexRoot !== null) {
    const results = autoCompleteIndex(indexRoot, typeInfo2, symbols, position);
    return results;
  }
  let nodeAtPosition = document.getNodeAtPosition(position);
  if (nodeAtPosition === null) {
    return [];
  }
  const isType = findNodeAbove(nodeAtPosition, ["type_annotation", "type", "table_type", "type_cast", "return_type", "simple_type"]) !== null;
  let result = [];
  function makeBasicItem(str, kind) {
    return {
      label: str,
      kind
    };
  }
  result = [
    "true",
    "false",
    "nil",
    "break",
    "goto",
    "do",
    "end",
    "while",
    "repeat",
    "until",
    "if",
    "then",
    "elseif",
    "else",
    "for",
    "in",
    "function",
    "local",
    "global",
    "record",
    "enum",
    "type",
    "userdata"
  ].map((x) => makeBasicItem(x, import_node3.CompletionItemKind.Keyword));
  result = result.concat([
    "any",
    "number",
    "string",
    "boolean",
    "thread",
    "nil",
    "integer"
  ].map((x) => makeBasicItem(x, import_node3.CompletionItemKind.Interface)));
  for (const [symbolIdentifier, symbol] of symbols) {
    const completionItem = makeTypeItem(typeInfo2, symbol.typeId, symbolIdentifier);
    if (completionItem !== null) {
      result.push(completionItem);
    }
  }
  if (isType === true) {
    result = result.filter(
      (x) => x.kind !== import_node3.CompletionItemKind.Variable && x.kind !== import_node3.CompletionItemKind.Function && x.kind !== import_node3.CompletionItemKind.Keyword
    );
  } else {
    result = result.filter(
      (x) => x.kind !== import_node3.CompletionItemKind.Interface
    );
  }
  return result;
}

// src/server/server.ts
var documents = /* @__PURE__ */ new Map();
var connection = (0, import_node4.createConnection)(import_node4.ProposedFeatures.all);
var hasConfigurationCapability = false;
var hasWorkspaceFolderCapability = false;
connection.onInitialize((params) => {
  let capabilities = params.capabilities;
  hasConfigurationCapability = capabilities.workspace !== void 0 && capabilities.workspace.configuration === true;
  hasWorkspaceFolderCapability = capabilities.workspace !== void 0 && capabilities.workspace.workspaceFolders === true;
  return {
    capabilities: {
      definitionProvider: true,
      typeDefinitionProvider: true,
      textDocumentSync: {
        openClose: true,
        change: import_node4.TextDocumentSyncKind.Incremental
      },
      hoverProvider: true,
      signatureHelpProvider: {
        triggerCharacters: ["(", ","]
      },
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: [".", ":"]
      }
    }
  };
});
connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    connection.client.register(import_node4.DidChangeConfigurationNotification.type, void 0);
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});
var defaultSettings = {};
var globalSettings = defaultSettings;
var settingsCache = /* @__PURE__ */ new Map();
var typesCommandCache = /* @__PURE__ */ new Map();
async function verifyMinimumTLVersion() {
  const tlVersion = await Teal.getVersion();
  if (tlVersion !== null) {
    const targetVersion = new MajorMinorPatch(0, 12, 0);
    console.log(`tl version: ${tlVersion.major}.${tlVersion.minor}.${tlVersion.patch}`);
    if (tlVersion.compareTo(targetVersion) === -1) {
      showErrorMessage(`[Warning]
You are using an outdated version of the tl compiler. Please upgrade tl to v${targetVersion.toString()} or later.`);
    }
    return true;
  } else {
    console.log("[Error] tl version is null");
    showErrorMessage(`[Error]
${Teal.tlNotFoundErrorMessage}

Type-checking has been disabled for this file.`);
    return false;
  }
}
connection.onDidChangeConfiguration((change) => {
  if (hasConfigurationCapability) {
    settingsCache.clear();
  } else {
    globalSettings = change.settings.teal || defaultSettings;
  }
  documents.forEach(async function(x) {
    const validVersion = await verifyMinimumTLVersion();
    if (validVersion) {
      validateTextDocument(x.uri);
    }
  });
  typesCommandCache.clear();
});
async function getDocumentSettings(uri) {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = settingsCache.get(uri);
  if (result === void 0) {
    result = await connection.workspace.getConfiguration({
      scopeUri: uri,
      section: "teal"
    });
    if (result === void 0) {
      return null;
    }
    settingsCache.set(uri, result);
  }
  return result;
}
function debounce(threshold, fn) {
  let deferTimers = {};
  return function(arg) {
    clearTimeout(deferTimers[arg]);
    deferTimers[arg] = setTimeout(fn, threshold, arg);
  };
}
function throttle(threshold, fn) {
  let running = {};
  let retrigger = {};
  return function callback(arg) {
    if (running[arg]) {
      retrigger[arg] = true;
      return;
    }
    running[arg] = true;
    retrigger[arg] = false;
    const beforeCall = new Date().getTime();
    fn(arg).then(() => {
      const afterCall = new Date().getTime();
      const waitTime = Math.max(0, threshold - (afterCall - beforeCall));
      const postCall = function() {
        running[arg] = false;
        if (retrigger[arg]) {
          callback(arg);
        }
      };
      if (waitTime === 0) {
        postCall();
      } else {
        setTimeout(postCall, waitTime);
      }
    });
  };
}
async function _feedTypeInfoCache(uri) {
  const textDocument = documents.get(uri);
  if (textDocument === void 0) {
    return null;
  }
  const settings = await getDocumentSettings(textDocument.uri);
  const documentText = textDocument.getText();
  let typesCmdResult;
  try {
    typesCmdResult = await Teal.runCommandOnText(Teal.TLCommand.Types, documentText, await textDocument.getProjectRoot());
  } catch (error) {
    showErrorMessage("[Error]\n" + error.message);
    return null;
  }
  ;
  if (typesCmdResult === null) {
    return null;
  }
  if (isEmptyOrSpaces(typesCmdResult.stdout)) {
    if (!isEmptyOrSpaces(typesCmdResult.stderr)) {
      showErrorMessage(typesCmdResult.stderr);
    } else {
      showErrorMessage("[Error]\n`tl types` has returned an empty response.");
    }
    return null;
  }
  try {
    var json = JSON.parse(typesCmdResult.stdout);
  } catch {
    showErrorMessage("[Error]\n`tl types` has returned an invalid JSON response.");
    return null;
  }
  ;
  const result = {
    ioInfo: typesCmdResult,
    json
  };
  typesCommandCache.set(uri, result);
}
var feedTypeInfoCache = throttle(250, _feedTypeInfoCache);
function getTypeInfoFromCache(uri) {
  const cachedResult = typesCommandCache.get(uri);
  if (cachedResult === void 0) {
    return null;
  }
  return cachedResult;
}
connection.onDidOpenTextDocument(async (params) => {
  const validVersion = await verifyMinimumTLVersion();
  if (!validVersion) {
    return;
  }
  const treeSitterDocument = new TreeSitterDocument();
  await treeSitterDocument.init(params.textDocument.uri, params.textDocument.text);
  documents.set(params.textDocument.uri, treeSitterDocument);
  validateTextDocument(params.textDocument.uri);
  feedTypeInfoCache(params.textDocument.uri);
});
connection.onDidChangeTextDocument((params) => {
  const uri = params.textDocument.uri;
  const document = documents.get(uri);
  if (document === void 0) {
    return;
  }
  document.edit(params.contentChanges);
  validateTextDocument(uri);
  feedTypeInfoCache(uri);
});
connection.onDidCloseTextDocument((params) => {
  const uri = params.textDocument.uri;
  settingsCache.delete(uri);
  typesCommandCache.delete(uri);
  documents.delete(uri);
});
connection.onDidSaveTextDocument((params) => {
});
async function showErrorMessage(message, ...actions) {
  let params = { type: import_node4.MessageType.Error, message, actions };
  return await connection.sendRequest(import_node4.ShowMessageRequest.type, params);
}
connection.onDidChangeWatchedFiles((_change) => {
  for (let [uri, document] of documents) {
    validateTextDocument(uri);
    feedTypeInfoCache(uri);
  }
});
function getDocumentUri(textDocument, pathToCheck) {
  if (path5.basename(pathToCheck).startsWith(Teal.TmpBufferPrefix)) {
    return textDocument.uri;
  }
  return URI.file(pathToCheck).toString();
}
async function _validateTextDocument(uri) {
  const textDocument = documents.get(uri);
  if (textDocument === void 0) {
    return;
  }
  let settings = await getDocumentSettings(textDocument.uri);
  try {
    const diagnosticsByPath = await TealLS.validateTextDocument(textDocument);
    for (let [uri2, diagnostics] of diagnosticsByPath.entries()) {
      connection.sendDiagnostics({ uri: uri2, diagnostics });
    }
  } catch (error) {
    console.log("Error while reading diagnostics:", error);
    showErrorMessage("[Error]\n" + error.message);
    connection.sendDiagnostics({ uri, diagnostics: [] });
    return;
  }
}
var validateTextDocument = debounce(500, _validateTextDocument);
connection.onCompletion((params) => {
  const document = documents.get(params.textDocument.uri);
  if (document === void 0) {
    return null;
  }
  const position = params.position;
  const typeInfo2 = getTypeInfoFromCache(document.uri);
  if (typeInfo2 === null) {
    return null;
  }
  return autoComplete(document, position, typeInfo2);
});
async function signatureHelp(textDocumentPosition, token) {
  return null;
}
connection.onSignatureHelp(signatureHelp);
function findTokenBeforePosition(tokens, document, position) {
  const spacePattern = /\s/;
  const line = document.getText(import_node4.Range.create(position.line, 0, position.line + 1, 0));
  let start = position.character - 1;
  while (start >= 0) {
    if (tokens.includes(line[start])) {
      return import_node4.Position.create(position.line, start);
    } else if (!spacePattern.test(line[start])) {
      return null;
    }
    start--;
  }
  return null;
}
async function getTypeInfoAtPosition(uri, position) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const textDocument = documents.get(uri);
  if (textDocument === void 0) {
    return null;
  }
  const typeInfo2 = getTypeInfoFromCache(uri);
  if (typeInfo2 === null) {
    return null;
  }
  const tmpPath = typeInfo2.ioInfo.filePath;
  const typesJson = typeInfo2.json;
  let wordRange = textDocument.getWordRangeAtPosition(position);
  if (wordRange === null) {
    return null;
  }
  ;
  let typeId = (_c = (_b = (_a = typesJson == null ? void 0 : typesJson["by_pos"]) == null ? void 0 : _a[tmpPath]) == null ? void 0 : _b[position.line + 1]) == null ? void 0 : _c[wordRange.start.character + 1];
  if (typeId === void 0) {
    let index = findTokenBeforePosition([".", ":"], textDocument, wordRange.start);
    if (index !== null) {
      typeId = (_f = (_e = (_d = typesJson == null ? void 0 : typesJson["by_pos"]) == null ? void 0 : _d[tmpPath]) == null ? void 0 : _e[position.line + 1]) == null ? void 0 : _f[index.character + 1];
    }
  }
  if (typeId === void 0) {
    return null;
  }
  let typeDefinition = (_g = typesJson == null ? void 0 : typesJson["types"]) == null ? void 0 : _g[typeId];
  if (typeDefinition === void 0) {
    return null;
  }
  let typeName2 = typeDefinition["str"];
  let typeRef = typeDefinition["ref"];
  if (typeRef !== void 0) {
    typeDefinition = typesJson["types"][typeRef];
    if (typeDefinition["str"] === "type record" && typeName2 !== void 0) {
      typeName2 = "record " + typeName2;
    } else if (typeDefinition["enums"] !== void 0) {
      typeName2 = typeDefinition["str"].replace(/^type /, "enum ");
    } else {
      typeName2 = `type ${typeName2} = ${typeDefinition["str"].replace(/^type /, "")}`;
    }
  }
  if (typeName2 === void 0) {
    return null;
  }
  let destinationLocation = null;
  let destinationY = typeDefinition["y"];
  let destinationX = typeDefinition["x"];
  if (destinationY !== void 0 && destinationX !== void 0) {
    let destinationRange = import_node4.Range.create(destinationY - 1, destinationX - 1, destinationY - 1, destinationX - 1);
    let typeFile = typeDefinition["file"];
    if (typeFile === void 0) {
      typeFile = tmpPath;
    }
    typeFile = path5.resolve((_h = await textDocument.getProjectRoot()) != null ? _h : "", typeFile);
    let destinationUri = getDocumentUri(textDocument, typeFile);
    if (destinationUri !== null) {
      destinationLocation = import_node4.Location.create(destinationUri, destinationRange);
    }
  }
  return {
    location: destinationLocation,
    name: Teal.prettifyTypeStr(typeName2)
  };
}
connection.onDefinition(async function(params) {
  const typeAtCursor = await getTypeInfoAtPosition(params.textDocument.uri, params.position);
  if (typeAtCursor === null) {
    return null;
  }
  return typeAtCursor.location;
});
connection.onTypeDefinition(async function(params) {
  const typeAtCursor = await getTypeInfoAtPosition(params.textDocument.uri, params.position);
  if (typeAtCursor === null) {
    return null;
  }
  return typeAtCursor.location;
});
connection.onHover(async function(params) {
  const typeAtCursor = await getTypeInfoAtPosition(params.textDocument.uri, params.position);
  if (typeAtCursor === null) {
    return null;
  }
  return {
    contents: {
      kind: import_node4.MarkupKind.Markdown,
      value: "```teal\n" + typeAtCursor.name + "\n```"
    }
  };
});
connection.listen();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDocumentUri,
  getTypeInfoFromCache
});
/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */
