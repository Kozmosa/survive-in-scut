import {
  Fragment,
  computed,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  resolveComponent,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toRef,
  toValue,
  unref,
  useTemplateRef,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withDirectives
} from "./chunk-LE5NDSFD.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-ZSMWDLMK.js";

// node_modules/recaptcha-v3/dist/ReCaptchaInstance.js
var require_ReCaptchaInstance = __commonJS({
  "node_modules/recaptcha-v3/dist/ReCaptchaInstance.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve) {
          resolve(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _2 = { label: 0, sent: function() {
        if (t2[0] & 1) throw t2[1];
        return t2[1];
      }, trys: [], ops: [] }, f2, y3, t2, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n2) {
        return function(v3) {
          return step([n2, v3]);
        };
      }
      function step(op) {
        if (f2) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_2 = 0)), _2) try {
          if (f2 = 1, y3 && (t2 = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t2 = y3["return"]) && t2.call(y3), 0) : y3.next) && !(t2 = t2.call(y3, op[1])).done) return t2;
          if (y3 = 0, t2) op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _2.label++;
              return { value: op[1], done: false };
            case 5:
              _2.label++;
              y3 = op[1];
              op = [0];
              continue;
            case 7:
              op = _2.ops.pop();
              _2.trys.pop();
              continue;
            default:
              if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _2.label = op[1];
                break;
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2];
                _2.ops.push(op);
                break;
              }
              if (t2[2]) _2.ops.pop();
              _2.trys.pop();
              continue;
          }
          op = body.call(thisArg, _2);
        } catch (e2) {
          op = [6, e2];
          y3 = 0;
        } finally {
          f2 = t2 = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = void 0;
    var ReCaptchaInstance = function() {
      function ReCaptchaInstance2(siteKey, recaptchaID, recaptcha) {
        this.siteKey = siteKey;
        this.recaptchaID = recaptchaID;
        this.recaptcha = recaptcha;
        this.styleContainer = null;
      }
      ReCaptchaInstance2.prototype.execute = function(action) {
        return __awaiter(this, void 0, void 0, function() {
          var _a3;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                if (!this.recaptcha.enterprise) return [3, 2];
                return [4, this.recaptcha.enterprise.execute(this.recaptchaID, { action })];
              case 1:
                _a3 = _b.sent();
                return [3, 4];
              case 2:
                return [4, this.recaptcha.execute(this.recaptchaID, { action })];
              case 3:
                _a3 = _b.sent();
                _b.label = 4;
              case 4:
                return [2, _a3];
            }
          });
        });
      };
      ReCaptchaInstance2.prototype.getSiteKey = function() {
        return this.siteKey;
      };
      ReCaptchaInstance2.prototype.hideBadge = function() {
        if (this.styleContainer !== null) {
          return;
        }
        this.styleContainer = document.createElement("style");
        this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}";
        document.head.appendChild(this.styleContainer);
      };
      ReCaptchaInstance2.prototype.showBadge = function() {
        if (this.styleContainer === null) {
          return;
        }
        document.head.removeChild(this.styleContainer);
        this.styleContainer = null;
      };
      return ReCaptchaInstance2;
    }();
    exports.ReCaptchaInstance = ReCaptchaInstance;
  }
});

// node_modules/recaptcha-v3/dist/ReCaptchaLoader.js
var require_ReCaptchaLoader = __commonJS({
  "node_modules/recaptcha-v3/dist/ReCaptchaLoader.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
          s2 = arguments[i];
          for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2))
            t2[p2] = s2[p2];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInstance = exports.load = void 0;
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    var ELoadingState;
    (function(ELoadingState2) {
      ELoadingState2[ELoadingState2["NOT_LOADED"] = 0] = "NOT_LOADED";
      ELoadingState2[ELoadingState2["LOADING"] = 1] = "LOADING";
      ELoadingState2[ELoadingState2["LOADED"] = 2] = "LOADED";
    })(ELoadingState || (ELoadingState = {}));
    var ReCaptchaLoader = function() {
      function ReCaptchaLoader2() {
      }
      ReCaptchaLoader2.load = function(siteKey, options) {
        if (options === void 0) {
          options = {};
        }
        if (typeof document === "undefined") {
          return Promise.reject(new Error("This is a library for the browser!"));
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADED) {
          if (ReCaptchaLoader2.instance.getSiteKey() === siteKey) {
            return Promise.resolve(ReCaptchaLoader2.instance);
          } else {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADING) {
          if (siteKey !== ReCaptchaLoader2.instanceSiteKey) {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
          return new Promise(function(resolve, reject) {
            ReCaptchaLoader2.successfulLoadingConsumers.push(function(instance) {
              return resolve(instance);
            });
            ReCaptchaLoader2.errorLoadingRunnable.push(function(reason) {
              return reject(reason);
            });
          });
        }
        ReCaptchaLoader2.instanceSiteKey = siteKey;
        ReCaptchaLoader2.setLoadingState(ELoadingState.LOADING);
        var loader = new ReCaptchaLoader2();
        return new Promise(function(resolve, reject) {
          loader.loadScript(siteKey, options.useRecaptchaNet || false, options.useEnterprise || false, options.renderParameters ? options.renderParameters : {}, options.customUrl).then(function() {
            ReCaptchaLoader2.setLoadingState(ELoadingState.LOADED);
            var widgetID = loader.doExplicitRender(grecaptcha, siteKey, options.explicitRenderParameters ? options.explicitRenderParameters : {}, options.useEnterprise || false);
            var instance = new ReCaptchaInstance_1.ReCaptchaInstance(siteKey, widgetID, grecaptcha);
            ReCaptchaLoader2.successfulLoadingConsumers.forEach(function(v3) {
              return v3(instance);
            });
            ReCaptchaLoader2.successfulLoadingConsumers = [];
            if (options.autoHideBadge) {
              instance.hideBadge();
            }
            ReCaptchaLoader2.instance = instance;
            resolve(instance);
          }).catch(function(error) {
            ReCaptchaLoader2.errorLoadingRunnable.forEach(function(v3) {
              return v3(error);
            });
            ReCaptchaLoader2.errorLoadingRunnable = [];
            reject(error);
          });
        });
      };
      ReCaptchaLoader2.getInstance = function() {
        return ReCaptchaLoader2.instance;
      };
      ReCaptchaLoader2.setLoadingState = function(state) {
        ReCaptchaLoader2.loadingState = state;
      };
      ReCaptchaLoader2.getLoadingState = function() {
        if (ReCaptchaLoader2.loadingState === null) {
          return ELoadingState.NOT_LOADED;
        } else {
          return ReCaptchaLoader2.loadingState;
        }
      };
      ReCaptchaLoader2.prototype.loadScript = function(siteKey, useRecaptchaNet, useEnterprise, renderParameters, customUrl) {
        var _this = this;
        if (useRecaptchaNet === void 0) {
          useRecaptchaNet = false;
        }
        if (useEnterprise === void 0) {
          useEnterprise = false;
        }
        if (renderParameters === void 0) {
          renderParameters = {};
        }
        if (customUrl === void 0) {
          customUrl = "";
        }
        var scriptElement = document.createElement("script");
        scriptElement.setAttribute("recaptcha-v3-script", "");
        scriptElement.setAttribute("async", "");
        scriptElement.setAttribute("defer", "");
        var scriptBase = "https://www.google.com/recaptcha/api.js";
        if (useRecaptchaNet) {
          if (useEnterprise) {
            scriptBase = "https://recaptcha.net/recaptcha/enterprise.js";
          } else {
            scriptBase = "https://recaptcha.net/recaptcha/api.js";
          }
        } else if (useEnterprise) {
          scriptBase = "https://www.google.com/recaptcha/enterprise.js";
        }
        if (customUrl) {
          scriptBase = customUrl;
        }
        if (renderParameters.render) {
          renderParameters.render = void 0;
        }
        var parametersQuery = this.buildQueryString(renderParameters);
        scriptElement.src = scriptBase + "?render=explicit" + parametersQuery;
        return new Promise(function(resolve, reject) {
          scriptElement.addEventListener("load", _this.waitForScriptToLoad(function() {
            resolve(scriptElement);
          }, useEnterprise), false);
          scriptElement.onerror = function(error) {
            ReCaptchaLoader2.setLoadingState(ELoadingState.NOT_LOADED);
            reject(error);
          };
          document.head.appendChild(scriptElement);
        });
      };
      ReCaptchaLoader2.prototype.buildQueryString = function(parameters) {
        var parameterKeys = Object.keys(parameters);
        if (parameterKeys.length < 1) {
          return "";
        }
        return "&" + Object.keys(parameters).filter(function(parameterKey) {
          return !!parameters[parameterKey];
        }).map(function(parameterKey) {
          return parameterKey + "=" + parameters[parameterKey];
        }).join("&");
      };
      ReCaptchaLoader2.prototype.waitForScriptToLoad = function(callback, useEnterprise) {
        var _this = this;
        return function() {
          if (window.grecaptcha === void 0) {
            setTimeout(function() {
              _this.waitForScriptToLoad(callback, useEnterprise);
            }, ReCaptchaLoader2.SCRIPT_LOAD_DELAY);
          } else {
            if (useEnterprise) {
              window.grecaptcha.enterprise.ready(function() {
                callback();
              });
            } else {
              window.grecaptcha.ready(function() {
                callback();
              });
            }
          }
        };
      };
      ReCaptchaLoader2.prototype.doExplicitRender = function(grecaptcha2, siteKey, parameters, isEnterprise) {
        var augmentedParameters = __assign({ sitekey: siteKey }, parameters);
        if (parameters.container) {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(parameters.container, augmentedParameters);
          } else {
            return grecaptcha2.render(parameters.container, augmentedParameters);
          }
        } else {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(augmentedParameters);
          } else {
            return grecaptcha2.render(augmentedParameters);
          }
        }
      };
      ReCaptchaLoader2.loadingState = null;
      ReCaptchaLoader2.instance = null;
      ReCaptchaLoader2.instanceSiteKey = null;
      ReCaptchaLoader2.successfulLoadingConsumers = [];
      ReCaptchaLoader2.errorLoadingRunnable = [];
      ReCaptchaLoader2.SCRIPT_LOAD_DELAY = 25;
      return ReCaptchaLoader2;
    }();
    exports.load = ReCaptchaLoader.load;
    exports.getInstance = ReCaptchaLoader.getInstance;
  }
});

// node_modules/recaptcha-v3/dist/ReCaptcha.js
var require_ReCaptcha = __commonJS({
  "node_modules/recaptcha-v3/dist/ReCaptcha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = exports.getInstance = exports.load = void 0;
    var ReCaptchaLoader_1 = require_ReCaptchaLoader();
    Object.defineProperty(exports, "load", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.load;
    } });
    Object.defineProperty(exports, "getInstance", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.getInstance;
    } });
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    Object.defineProperty(exports, "ReCaptchaInstance", { enumerable: true, get: function() {
      return ReCaptchaInstance_1.ReCaptchaInstance;
    } });
  }
});

// node_modules/@waline/api/dist/api.js
var m = { "Content-Type": "application/json" };
var s = (e2) => `${e2.replace(/\/?$/, "/")}api/`;
var c = (e2, n2 = "") => {
  if (typeof e2 == "object" && e2.errno) throw new TypeError(`${n2} failed with ${e2.errno}: ${e2.errmsg}`);
  return e2;
};
var p = ({ serverURL: e2, lang: n2, paths: o2, type: a, signal: t2 }) => fetch(`${s(e2)}article?path=${encodeURIComponent(o2.join(","))}&type=${encodeURIComponent(a.join(","))}&lang=${n2}`, { signal: t2 }).then((r2) => r2.json()).then((r2) => c(r2, "Get counter").data);
var d = ({ serverURL: e2, lang: n2, path: o2, type: a, action: t2 }) => fetch(`${s(e2)}article?lang=${n2}`, { method: "POST", headers: m, body: JSON.stringify({ path: o2, type: a, action: t2 }) }).then((r2) => r2.json()).then((r2) => c(r2, "Update counter").data);
var $ = ({ serverURL: e2, lang: n2, path: o2, page: a, pageSize: t2, sortBy: r2, signal: h2, token: i }) => {
  const l3 = {};
  return i && (l3.Authorization = `Bearer ${i}`), fetch(`${s(e2)}comment?path=${encodeURIComponent(o2)}&pageSize=${t2}&page=${a}&lang=${n2}&sortBy=${r2}`, { signal: h2, headers: l3 }).then((g) => g.json()).then((g) => c(g, "Get comment data").data);
};
var u = ({ serverURL: e2, lang: n2, token: o2, comment: a }) => {
  const t2 = { "Content-Type": "application/json" };
  return o2 && (t2.Authorization = `Bearer ${o2}`), fetch(`${s(e2)}comment?lang=${n2}`, { method: "POST", headers: t2, body: JSON.stringify(a) }).then((r2) => r2.json());
};
var y = ({ serverURL: e2, lang: n2, token: o2, objectId: a }) => fetch(`${s(e2)}comment/${a}?lang=${n2}`, { method: "DELETE", headers: { Authorization: `Bearer ${o2}` } }).then((t2) => t2.json()).then((t2) => c(t2, "Delete comment"));
var U = ({ serverURL: e2, lang: n2, token: o2, objectId: a, comment: t2 }) => fetch(`${s(e2)}comment/${a}?lang=${n2}`, { method: "PUT", headers: { ...m, Authorization: `Bearer ${o2}` }, body: JSON.stringify(t2) }).then((r2) => r2.json()).then((r2) => c(r2, "Update comment"));
var f = ({ serverURL: e2, lang: n2, paths: o2, signal: a }) => fetch(`${s(e2)}comment?type=count&url=${encodeURIComponent(o2.join(","))}&lang=${n2}`, { signal: a }).then((t2) => t2.json()).then((t2) => c(t2, "Get comment count").data);
var R = ({ lang: e2, serverURL: n2 }) => {
  const o2 = (window.innerWidth - 450) / 2, a = (window.innerHeight - 450) / 2, t2 = window.open(`${n2.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e2)}`, "_blank", `width=450,height=450,left=${o2},top=${a},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
  return t2 == null ? void 0 : t2.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((r2) => {
    const h2 = ({ data: i }) => {
      !i || typeof i != "object" || i.type !== "userInfo" || i.data.token && (t2 == null ? void 0 : t2.close(), window.removeEventListener("message", h2), r2(i.data));
    };
    window.addEventListener("message", h2);
  });
};
var j = ({ serverURL: e2, lang: n2, paths: o2, signal: a }) => p({ serverURL: e2, lang: n2, paths: o2, type: ["time"], signal: a });
var v = (e2) => d({ ...e2, type: "time", action: "inc" });
var w = ({ serverURL: e2, lang: n2, count: o2, signal: a, token: t2 }) => {
  const r2 = {};
  return t2 && (r2.Authorization = `Bearer ${t2}`), fetch(`${s(e2)}comment?type=recent&count=${o2}&lang=${n2}`, { signal: a, headers: r2 }).then((h2) => h2.json());
};
var C = ({ serverURL: e2, signal: n2, pageSize: o2, lang: a }) => fetch(`${s(e2)}user?pageSize=${o2}&lang=${a}`, { signal: n2 }).then((t2) => t2.json()).then((t2) => c(t2, "user list")).then((t2) => t2.data);

// node_modules/@vueuse/shared/dist/index.js
function tryOnScopeDispose(fn2, failSilently) {
  if (getCurrentScope()) {
    onScopeDispose(fn2, failSilently);
    return true;
  }
  return false;
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _window, _window2, _window3;
  return isClient && !!((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
}
function toRef2(...args) {
  if (args.length !== 1) return toRef(...args);
  const r2 = args[0];
  return typeof r2 === "function" ? readonly(customRef(() => ({
    get: r2,
    set: noop
  }))) : ref(r2);
}
function createFilterWrapper(filter, fn2) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn2.apply(this, args), {
        fn: fn2,
        thisArg: this,
        args
      })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke$1) => {
  return invoke$1();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer$1) => {
    clearTimeout(timer$1);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke$1) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer) _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = void 0;
      }
      return Promise.resolve(invoke$1());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke$1;
      if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
        if (timer) _clearTimeout(timer);
        maxTimer = void 0;
        resolve(lastInvoker());
      }, maxDuration);
      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer);
        maxTimer = void 0;
        resolve(invoke$1());
      }, duration);
    });
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter, options = {}) {
  const { initialState = "active" } = options;
  const isActive = toRef2(initialState === "active");
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value) extendFilter(...args);
  };
  return {
    isActive: readonly(isActive),
    pause,
    resume,
    eventFilter
  };
}
function identity(arg) {
  return arg;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn2) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    return cache[str] || (cache[str] = fn2(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function useDebounceFn(fn2, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn2);
}
function watchWithFilter(source, cb, options = {}) {
  const { eventFilter = bypassFilter, ...watchOptions } = options;
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function watchPausable(source, cb, options = {}) {
  const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
  return {
    stop: watchWithFilter(source, cb, {
      ...watchOptions,
      eventFilter
    }),
    pause,
    resume,
    isActive
  };
}
var pausableWatch = watchPausable;
function tryOnMounted(fn2, sync = true, target) {
  if (getLifeCycleTarget(target)) onMounted(fn2, target);
  else if (sync) fn2();
  else nextTick(fn2);
}
function tryOnUnmounted(fn2, target) {
  if (getLifeCycleTarget(target)) onUnmounted(fn2, target);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const { immediate = true, immediateCallback = false } = options;
  let timer = null;
  const isActive = shallowRef(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0) return;
    isActive.value = true;
    if (immediateCallback) cb();
    clean();
    if (isActive.value) timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient) resume();
  if (isRef(interval) || typeof interval === "function") tryOnScopeDispose(watch(interval, () => {
    if (isActive.value && isClient) resume();
  }));
  tryOnScopeDispose(pause);
  return {
    isActive: shallowReadonly(isActive),
    pause,
    resume
  };
}
function watchImmediate(source, cb, options) {
  return watch(source, cb, {
    ...options,
    immediate: true
  });
}

// node_modules/@vueuse/core/dist/index.js
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
  var _$el;
  const plain = toValue(elRef);
  return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
  const register = (el2, event, listener, options) => {
    el2.addEventListener(event, listener, options);
    return () => el2.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e2) => e2 != null);
    return test.every((e2) => typeof e2 !== "string") ? test : void 0;
  });
  return watchImmediate(() => {
    var _firstParamTargets$va, _firstParamTargets$va2;
    return [
      (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e2) => unrefElement(e2))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e2) => e2 != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options], _2, onCleanup) => {
    if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
    const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
    const cleanups = raw_targets.flatMap((el2) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el2, event, listener, optionsClone))));
    onCleanup(() => {
      cleanups.forEach((fn2) => fn2());
    });
  }, { flush: "post" });
}
function useRafFn(fn2, options = {}) {
  const { immediate = true, fpsLimit = void 0, window: window$1 = defaultWindow, once = false } = options;
  const isActive = shallowRef(false);
  const intervalLimit = computed(() => {
    return fpsLimit ? 1e3 / toValue(fpsLimit) : null;
  });
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp$1) {
    if (!isActive.value || !window$1) return;
    if (!previousFrameTimestamp) previousFrameTimestamp = timestamp$1;
    const delta = timestamp$1 - previousFrameTimestamp;
    if (intervalLimit.value && delta < intervalLimit.value) {
      rafId = window$1.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp$1;
    fn2({
      delta,
      timestamp: timestamp$1
    });
    if (once) {
      isActive.value = false;
      rafId = null;
      return;
    }
    rafId = window$1.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window$1) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window$1.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window$1) {
      window$1.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate) resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
  boolean: {
    read: (v3) => v3 === "true",
    write: (v3) => String(v3)
  },
  object: {
    read: (v3) => JSON.parse(v3),
    write: (v3) => JSON.stringify(v3)
  },
  number: {
    read: (v3) => Number.parseFloat(v3),
    write: (v3) => String(v3)
  },
  any: {
    read: (v3) => v3,
    write: (v3) => String(v3)
  },
  string: {
    read: (v3) => v3,
    write: (v3) => String(v3)
  },
  map: {
    read: (v3) => new Map(JSON.parse(v3)),
    write: (v3) => JSON.stringify(Array.from(v3.entries()))
  },
  set: {
    read: (v3) => new Set(JSON.parse(v3)),
    write: (v3) => JSON.stringify(Array.from(v3))
  },
  date: {
    read: (v3) => new Date(v3),
    write: (v3) => v3.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults$1, storage, options = {}) {
  var _options$serializer;
  const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window: window$1 = defaultWindow, eventFilter, onError = (e2) => {
    console.error(e2);
  }, initOnMounted } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults$1 === "function" ? defaults$1() : defaults$1);
  const keyComputed = computed(() => toValue(key));
  if (!storage) try {
    storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
  } catch (e2) {
    onError(e2);
  }
  if (!storage) return data;
  const rawInit = toValue(defaults$1);
  const type = guessSerializerType(rawInit);
  const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, (newValue) => write(newValue), {
    flush,
    deep,
    eventFilter
  });
  watch(keyComputed, () => update(), { flush });
  let firstMounted = false;
  const onStorageEvent = (ev) => {
    if (initOnMounted && !firstMounted) return;
    update(ev);
  };
  const onStorageCustomEvent = (ev) => {
    if (initOnMounted && !firstMounted) return;
    updateFromCustomEvent(ev);
  };
  if (window$1 && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window$1, "storage", onStorageEvent, { passive: true });
  else useEventListener(window$1, customStorageEventName, onStorageCustomEvent);
  if (initOnMounted) tryOnMounted(() => {
    firstMounted = true;
    update();
  });
  else update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window$1) {
      const payload = {
        key: keyComputed.value,
        oldValue,
        newValue,
        storageArea: storage
      };
      window$1.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
    }
  }
  function write(v3) {
    try {
      const oldValue = storage.getItem(keyComputed.value);
      if (v3 == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(keyComputed.value);
      } else {
        const serialized = serializer.write(v3);
        if (oldValue !== serialized) {
          storage.setItem(keyComputed.value, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e2) {
      onError(e2);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value)) return {
        ...rawInit,
        ...value
      };
      return value;
    } else if (typeof rawValue !== "string") return rawValue;
    else return serializer.read(rawValue);
  }
  function update(event) {
    if (event && event.storageArea !== storage) return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== keyComputed.value) return;
    pauseWatch();
    try {
      const serializedData = serializer.write(data.value);
      if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
    } catch (e2) {
      onError(e2);
    } finally {
      if (event) nextTick(resumeWatch);
      else resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
function useNow(options = {}) {
  const { controls: exposeControls = false, interval = "requestAnimationFrame", immediate = true } = options;
  const now = ref(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate }) : useIntervalFn(update, interval, { immediate });
  if (exposeControls) return {
    now,
    ...controls
  };
  else return now;
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
function useScriptTag(src, onLoaded = noop, options = {}) {
  const { immediate = true, manual = false, type = "text/javascript", async = true, crossOrigin, referrerPolicy, noModule, defer, document: document$1 = defaultDocument, attrs = {}, nonce = void 0 } = options;
  const scriptTag = shallowRef(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el$1) => {
      scriptTag.value = el$1;
      resolve(el$1);
      return el$1;
    };
    if (!document$1) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el2 = document$1.querySelector(`script[src="${toValue(src)}"]`);
    if (!el2) {
      el2 = document$1.createElement("script");
      el2.type = type;
      el2.async = async;
      el2.src = toValue(src);
      if (defer) el2.defer = defer;
      if (crossOrigin) el2.crossOrigin = crossOrigin;
      if (noModule) el2.noModule = noModule;
      if (referrerPolicy) el2.referrerPolicy = referrerPolicy;
      if (nonce) el2.nonce = nonce;
      Object.entries(attrs).forEach(([name, value]) => el2 === null || el2 === void 0 ? void 0 : el2.setAttribute(name, value));
      shouldAppend = true;
    } else if (el2.hasAttribute("data-loaded")) resolveWithElement(el2);
    const listenerOptions = { passive: true };
    useEventListener(el2, "error", (event) => reject(event), listenerOptions);
    useEventListener(el2, "abort", (event) => reject(event), listenerOptions);
    useEventListener(el2, "load", () => {
      el2.setAttribute("data-loaded", "true");
      onLoaded(el2);
      resolveWithElement(el2);
    }, listenerOptions);
    if (shouldAppend) el2 = document$1.head.appendChild(el2);
    if (!waitForScriptLoad) resolveWithElement(el2);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise) _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document$1) return;
    _promise = null;
    if (scriptTag.value) scriptTag.value = null;
    const el2 = document$1.querySelector(`script[src="${toValue(src)}"]`);
    if (el2) document$1.head.removeChild(el2);
  };
  if (immediate && !manual) tryOnMounted(load);
  if (!manual) tryOnUnmounted(unload);
  return {
    scriptTag,
    load,
    unload
  };
}
var _id = 0;
function useStyleTag(css, options = {}) {
  const isLoaded = shallowRef(false);
  const { document: document$1 = defaultDocument, immediate = true, manual = false, id = `vueuse_styletag_${++_id}` } = options;
  const cssRef = shallowRef(css);
  let stop = () => {
  };
  const load = () => {
    if (!document$1) return;
    const el2 = document$1.getElementById(id) || document$1.createElement("style");
    if (!el2.isConnected) {
      el2.id = id;
      if (options.nonce) el2.nonce = options.nonce;
      if (options.media) el2.media = options.media;
      document$1.head.appendChild(el2);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, (value) => {
      el2.textContent = value;
    }, { immediate: true });
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document$1 || !isLoaded.value) return;
    stop();
    document$1.head.removeChild(document$1.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);
  if (!manual) tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
var DEFAULT_UNITS = [
  {
    max: 6e4,
    value: 1e3,
    name: "second"
  },
  {
    max: 276e4,
    value: 6e4,
    name: "minute"
  },
  {
    max: 72e6,
    value: 36e5,
    name: "hour"
  },
  {
    max: 5184e5,
    value: 864e5,
    name: "day"
  },
  {
    max: 24192e5,
    value: 6048e5,
    name: "week"
  },
  {
    max: 28512e6,
    value: 2592e6,
    name: "month"
  },
  {
    max: Number.POSITIVE_INFINITY,
    value: 31536e6,
    name: "year"
  }
];
var _TransitionPresets = {
  easeInSine: [
    0.12,
    0,
    0.39,
    0
  ],
  easeOutSine: [
    0.61,
    1,
    0.88,
    1
  ],
  easeInOutSine: [
    0.37,
    0,
    0.63,
    1
  ],
  easeInQuad: [
    0.11,
    0,
    0.5,
    0
  ],
  easeOutQuad: [
    0.5,
    1,
    0.89,
    1
  ],
  easeInOutQuad: [
    0.45,
    0,
    0.55,
    1
  ],
  easeInCubic: [
    0.32,
    0,
    0.67,
    0
  ],
  easeOutCubic: [
    0.33,
    1,
    0.68,
    1
  ],
  easeInOutCubic: [
    0.65,
    0,
    0.35,
    1
  ],
  easeInQuart: [
    0.5,
    0,
    0.75,
    0
  ],
  easeOutQuart: [
    0.25,
    1,
    0.5,
    1
  ],
  easeInOutQuart: [
    0.76,
    0,
    0.24,
    1
  ],
  easeInQuint: [
    0.64,
    0,
    0.78,
    0
  ],
  easeOutQuint: [
    0.22,
    1,
    0.36,
    1
  ],
  easeInOutQuint: [
    0.83,
    0,
    0.17,
    1
  ],
  easeInExpo: [
    0.7,
    0,
    0.84,
    0
  ],
  easeOutExpo: [
    0.16,
    1,
    0.3,
    1
  ],
  easeInOutExpo: [
    0.87,
    0,
    0.13,
    1
  ],
  easeInCirc: [
    0.55,
    0,
    1,
    0.45
  ],
  easeOutCirc: [
    0,
    0.55,
    0.45,
    1
  ],
  easeInOutCirc: [
    0.85,
    0,
    0.15,
    1
  ],
  easeInBack: [
    0.36,
    0,
    0.66,
    -0.56
  ],
  easeOutBack: [
    0.34,
    1.56,
    0.64,
    1
  ],
  easeInOutBack: [
    0.68,
    -0.6,
    0.32,
    1.6
  ]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// node_modules/autosize/dist/autosize.esm.js
var e = /* @__PURE__ */ new Map();
function t(t2) {
  var o2 = e.get(t2);
  o2 && o2.destroy();
}
function o(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
}
var r = null;
"undefined" == typeof window ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return function(t4) {
      if (t4 && t4.nodeName && "TEXTAREA" === t4.nodeName && !e.has(t4)) {
        var o3, r2 = null, n2 = window.getComputedStyle(t4), i = (o3 = t4.value, function() {
          a({ testForHeightReduction: "" === o3 || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l3 = (function(o4) {
          t4.removeEventListener("autosize:destroy", l3), t4.removeEventListener("autosize:update", s2), t4.removeEventListener("input", i), window.removeEventListener("resize", s2), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }).bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l3), t4.addEventListener("autosize:update", s2), t4.addEventListener("input", i), window.addEventListener("resize", s2), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l3, update: s2 }), s2();
      }
      function a(e2) {
        var o4, i2, l4 = e2.restoreTextAlign, s3 = void 0 === l4 ? null : l4, d3 = e2.testForHeightReduction, u2 = void 0 === d3 || d3, c2 = n2.overflowY;
        if (0 !== t4.scrollHeight && ("vertical" === n2.resize ? t4.style.resize = "none" : "both" === n2.resize && (t4.style.resize = "horizontal"), u2 && (o4 = function(e3) {
          for (var t5 = []; e3 && e3.parentNode && e3.parentNode instanceof Element; ) e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        }(t4), t4.style.height = ""), i2 = "content-box" === n2.boxSizing ? t4.scrollHeight - (parseFloat(n2.paddingTop) + parseFloat(n2.paddingBottom)) : t4.scrollHeight + parseFloat(n2.borderTopWidth) + parseFloat(n2.borderBottomWidth), "none" !== n2.maxHeight && i2 > parseFloat(n2.maxHeight) ? ("hidden" === n2.overflowY && (t4.style.overflow = "scroll"), i2 = parseFloat(n2.maxHeight)) : "hidden" !== n2.overflowY && (t4.style.overflow = "hidden"), t4.style.height = i2 + "px", s3 && (t4.style.textAlign = s3), o4 && o4(), r2 !== i2 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i2), c2 !== n2.overflow && !s3)) {
          var v3 = n2.textAlign;
          "hidden" === n2.overflow && (t4.style.textAlign = "start" === v3 ? "end" : "start"), a({ restoreTextAlign: v3, testForHeightReduction: true });
        }
      }
      function s2() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    }(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// node_modules/@waline/client/node_modules/marked/lib/marked.esm.js
function L() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var T = L();
function G(l3) {
  T = l3;
}
var E = { exec: () => null };
function d2(l3, e2 = "") {
  let t2 = typeof l3 == "string" ? l3 : l3.source, n2 = { replace: (r2, i) => {
    let s2 = typeof i == "string" ? i : i.source;
    return s2 = s2.replace(m2.caret, "$1"), t2 = t2.replace(r2, s2), n2;
  }, getRegex: () => new RegExp(t2, e2) };
  return n2;
}
var be = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return false;
  }
})();
var m2 = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l3) => new RegExp(`^( {0,3}${l3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}#`), htmlBeginRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}<(?:[a-z].*>|!--)`, "i") };
var Re = /^(?:[ \t]*(?:\n|$))+/;
var Te = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Oe = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var we = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var F = /(?:[*+-]|\d{1,9}[.)])/;
var ie = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var oe = d2(ie).replace(/bull/g, F).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var ye = d2(ie).replace(/bull/g, F).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var j2 = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var Pe = /^[^\n]+/;
var Q = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var Se = d2(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Q).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var $e = d2(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, F).getRegex();
var v2 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var U2 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var _e = d2("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U2).replace("tag", v2).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var ae = d2(j2).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v2).getRegex();
var Le = d2(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ae).getRegex();
var K = { blockquote: Le, code: Te, def: Se, fences: Oe, heading: we, hr: I, html: _e, lheading: oe, list: $e, newline: Re, paragraph: ae, table: E, text: Pe };
var re = d2("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v2).getRegex();
var Me = { ...K, lheading: ye, table: re, paragraph: d2(j2).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v2).getRegex() };
var ze = { ...K, html: d2(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U2).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: E, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: d2(j2).replace("hr", I).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", oe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
var Ae = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var Ee = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var le = /^( {2,}|\\)\n(?!\s*$)/;
var Ie = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var D = /[\p{P}\p{S}]/u;
var W = /[\s\p{P}\p{S}]/u;
var ue = /[^\s\p{P}\p{S}]/u;
var Ce = d2(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, W).getRegex();
var pe = /(?!~)[\p{P}\p{S}]/u;
var Be = /(?!~)[\s\p{P}\p{S}]/u;
var qe = /(?:[^\s\p{P}\p{S}]|~)/u;
var ve = d2(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", be ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var ce = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var De = d2(ce, "u").replace(/punct/g, D).getRegex();
var He = d2(ce, "u").replace(/punct/g, pe).getRegex();
var he = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var Ze = d2(he, "gu").replace(/notPunctSpace/g, ue).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Ge = d2(he, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, Be).replace(/punct/g, pe).getRegex();
var Ne = d2("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ue).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Fe = d2(/\\(punct)/, "gu").replace(/punct/g, D).getRegex();
var je = d2(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var Qe = d2(U2).replace("(?:-->|$)", "-->").getRegex();
var Ue = d2("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Qe).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/;
var Ke = d2(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var de = d2(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", Q).getRegex();
var ke = d2(/^!?\[(ref)\](?:\[\])?/).replace("ref", Q).getRegex();
var We = d2("reflink|nolink(?!\\()", "g").replace("reflink", de).replace("nolink", ke).getRegex();
var se = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var X = { _backpedal: E, anyPunctuation: Fe, autolink: je, blockSkip: ve, br: le, code: Ee, del: E, emStrongLDelim: De, emStrongRDelimAst: Ze, emStrongRDelimUnd: Ne, escape: Ae, link: Ke, nolink: ke, punctuation: Ce, reflink: de, reflinkSearch: We, tag: Ue, text: Ie, url: E };
var Xe = { ...X, link: d2(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: d2(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
var N = { ...X, emStrongRDelimAst: Ge, emStrongLDelim: He, url: d2(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", se).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: d2(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", se).getRegex() };
var Je = { ...N, br: d2(le).replace("{2,}", "*").getRegex(), text: d2(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
var C2 = { normal: K, gfm: Me, pedantic: ze };
var M = { normal: X, gfm: N, breaks: Je, pedantic: Xe };
var Ve = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var ge = (l3) => Ve[l3];
function w2(l3, e2) {
  if (e2) {
    if (m2.escapeTest.test(l3)) return l3.replace(m2.escapeReplace, ge);
  } else if (m2.escapeTestNoEncode.test(l3)) return l3.replace(m2.escapeReplaceNoEncode, ge);
  return l3;
}
function J(l3) {
  try {
    l3 = encodeURI(l3).replace(m2.percentDecode, "%");
  } catch {
    return null;
  }
  return l3;
}
function V(l3, e2) {
  var _a3;
  let t2 = l3.replace(m2.findPipe, (i, s2, a) => {
    let o2 = false, p2 = s2;
    for (; --p2 >= 0 && a[p2] === "\\"; ) o2 = !o2;
    return o2 ? "|" : " |";
  }), n2 = t2.split(m2.splitPipe), r2 = 0;
  if (n2[0].trim() || n2.shift(), n2.length > 0 && !((_a3 = n2.at(-1)) == null ? void 0 : _a3.trim()) && n2.pop(), e2) if (n2.length > e2) n2.splice(e2);
  else for (; n2.length < e2; ) n2.push("");
  for (; r2 < n2.length; r2++) n2[r2] = n2[r2].trim().replace(m2.slashPipe, "|");
  return n2;
}
function z(l3, e2, t2) {
  let n2 = l3.length;
  if (n2 === 0) return "";
  let r2 = 0;
  for (; r2 < n2; ) {
    let i = l3.charAt(n2 - r2 - 1);
    if (i === e2 && !t2) r2++;
    else if (i !== e2 && t2) r2++;
    else break;
  }
  return l3.slice(0, n2 - r2);
}
function fe(l3, e2) {
  if (l3.indexOf(e2[1]) === -1) return -1;
  let t2 = 0;
  for (let n2 = 0; n2 < l3.length; n2++) if (l3[n2] === "\\") n2++;
  else if (l3[n2] === e2[0]) t2++;
  else if (l3[n2] === e2[1] && (t2--, t2 < 0)) return n2;
  return t2 > 0 ? -2 : -1;
}
function me(l3, e2, t2, n2, r2) {
  let i = e2.href, s2 = e2.title || null, a = l3[1].replace(r2.other.outputLinkReplace, "$1");
  n2.state.inLink = true;
  let o2 = { type: l3[0].charAt(0) === "!" ? "image" : "link", raw: t2, href: i, title: s2, text: a, tokens: n2.inlineTokens(a) };
  return n2.state.inLink = false, o2;
}
function Ye(l3, e2, t2) {
  let n2 = l3.match(t2.other.indentCodeCompensation);
  if (n2 === null) return e2;
  let r2 = n2[1];
  return e2.split(`
`).map((i) => {
    let s2 = i.match(t2.other.beginningSpace);
    if (s2 === null) return i;
    let [a] = s2;
    return a.length >= r2.length ? i.slice(r2.length) : i;
  }).join(`
`);
}
var y2 = class {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "rules");
    __publicField(this, "lexer");
    this.options = e2 || T;
  }
  space(e2) {
    let t2 = this.rules.block.newline.exec(e2);
    if (t2 && t2[0].length > 0) return { type: "space", raw: t2[0] };
  }
  code(e2) {
    let t2 = this.rules.block.code.exec(e2);
    if (t2) {
      let n2 = t2[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t2[0], codeBlockStyle: "indented", text: this.options.pedantic ? n2 : z(n2, `
`) };
    }
  }
  fences(e2) {
    let t2 = this.rules.block.fences.exec(e2);
    if (t2) {
      let n2 = t2[0], r2 = Ye(n2, t2[3] || "", this.rules);
      return { type: "code", raw: n2, lang: t2[2] ? t2[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t2[2], text: r2 };
    }
  }
  heading(e2) {
    let t2 = this.rules.block.heading.exec(e2);
    if (t2) {
      let n2 = t2[2].trim();
      if (this.rules.other.endingHash.test(n2)) {
        let r2 = z(n2, "#");
        (this.options.pedantic || !r2 || this.rules.other.endingSpaceChar.test(r2)) && (n2 = r2.trim());
      }
      return { type: "heading", raw: t2[0], depth: t2[1].length, text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  hr(e2) {
    let t2 = this.rules.block.hr.exec(e2);
    if (t2) return { type: "hr", raw: z(t2[0], `
`) };
  }
  blockquote(e2) {
    let t2 = this.rules.block.blockquote.exec(e2);
    if (t2) {
      let n2 = z(t2[0], `
`).split(`
`), r2 = "", i = "", s2 = [];
      for (; n2.length > 0; ) {
        let a = false, o2 = [], p2;
        for (p2 = 0; p2 < n2.length; p2++) if (this.rules.other.blockquoteStart.test(n2[p2])) o2.push(n2[p2]), a = true;
        else if (!a) o2.push(n2[p2]);
        else break;
        n2 = n2.slice(p2);
        let u2 = o2.join(`
`), c2 = u2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r2 = r2 ? `${r2}
${u2}` : u2, i = i ? `${i}
${c2}` : c2;
        let g = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(c2, s2, true), this.lexer.state.top = g, n2.length === 0) break;
        let h2 = s2.at(-1);
        if ((h2 == null ? void 0 : h2.type) === "code") break;
        if ((h2 == null ? void 0 : h2.type) === "blockquote") {
          let R2 = h2, f2 = R2.raw + `
` + n2.join(`
`), O = this.blockquote(f2);
          s2[s2.length - 1] = O, r2 = r2.substring(0, r2.length - R2.raw.length) + O.raw, i = i.substring(0, i.length - R2.text.length) + O.text;
          break;
        } else if ((h2 == null ? void 0 : h2.type) === "list") {
          let R2 = h2, f2 = R2.raw + `
` + n2.join(`
`), O = this.list(f2);
          s2[s2.length - 1] = O, r2 = r2.substring(0, r2.length - h2.raw.length) + O.raw, i = i.substring(0, i.length - R2.raw.length) + O.raw, n2 = f2.substring(s2.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r2, tokens: s2, text: i };
    }
  }
  list(e2) {
    let t2 = this.rules.block.list.exec(e2);
    if (t2) {
      let n2 = t2[1].trim(), r2 = n2.length > 1, i = { type: "list", raw: "", ordered: r2, start: r2 ? +n2.slice(0, -1) : "", loose: false, items: [] };
      n2 = r2 ? `\\d{1,9}\\${n2.slice(-1)}` : `\\${n2}`, this.options.pedantic && (n2 = r2 ? n2 : "[*+-]");
      let s2 = this.rules.other.listItemRegex(n2), a = false;
      for (; e2; ) {
        let p2 = false, u2 = "", c2 = "";
        if (!(t2 = s2.exec(e2)) || this.rules.block.hr.test(e2)) break;
        u2 = t2[0], e2 = e2.substring(u2.length);
        let g = t2[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (H) => " ".repeat(3 * H.length)), h2 = e2.split(`
`, 1)[0], R2 = !g.trim(), f2 = 0;
        if (this.options.pedantic ? (f2 = 2, c2 = g.trimStart()) : R2 ? f2 = t2[1].length + 1 : (f2 = t2[2].search(this.rules.other.nonSpaceChar), f2 = f2 > 4 ? 1 : f2, c2 = g.slice(f2), f2 += t2[1].length), R2 && this.rules.other.blankLine.test(h2) && (u2 += h2 + `
`, e2 = e2.substring(h2.length + 1), p2 = true), !p2) {
          let H = this.rules.other.nextBulletRegex(f2), ee = this.rules.other.hrRegex(f2), te = this.rules.other.fencesBeginRegex(f2), ne = this.rules.other.headingBeginRegex(f2), xe2 = this.rules.other.htmlBeginRegex(f2);
          for (; e2; ) {
            let Z = e2.split(`
`, 1)[0], A;
            if (h2 = Z, this.options.pedantic ? (h2 = h2.replace(this.rules.other.listReplaceNesting, "  "), A = h2) : A = h2.replace(this.rules.other.tabCharGlobal, "    "), te.test(h2) || ne.test(h2) || xe2.test(h2) || H.test(h2) || ee.test(h2)) break;
            if (A.search(this.rules.other.nonSpaceChar) >= f2 || !h2.trim()) c2 += `
` + A.slice(f2);
            else {
              if (R2 || g.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(g) || ne.test(g) || ee.test(g)) break;
              c2 += `
` + h2;
            }
            !R2 && !h2.trim() && (R2 = true), u2 += Z + `
`, e2 = e2.substring(Z.length + 1), g = A.slice(f2);
          }
        }
        i.loose || (a ? i.loose = true : this.rules.other.doubleBlankLine.test(u2) && (a = true));
        let O = null, Y;
        this.options.gfm && (O = this.rules.other.listIsTask.exec(c2), O && (Y = O[0] !== "[ ] ", c2 = c2.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: u2, task: !!O, checked: Y, loose: false, text: c2, tokens: [] }), i.raw += u2;
      }
      let o2 = i.items.at(-1);
      if (o2) o2.raw = o2.raw.trimEnd(), o2.text = o2.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let p2 = 0; p2 < i.items.length; p2++) if (this.lexer.state.top = false, i.items[p2].tokens = this.lexer.blockTokens(i.items[p2].text, []), !i.loose) {
        let u2 = i.items[p2].tokens.filter((g) => g.type === "space"), c2 = u2.length > 0 && u2.some((g) => this.rules.other.anyLine.test(g.raw));
        i.loose = c2;
      }
      if (i.loose) for (let p2 = 0; p2 < i.items.length; p2++) i.items[p2].loose = true;
      return i;
    }
  }
  html(e2) {
    let t2 = this.rules.block.html.exec(e2);
    if (t2) return { type: "html", block: true, raw: t2[0], pre: t2[1] === "pre" || t2[1] === "script" || t2[1] === "style", text: t2[0] };
  }
  def(e2) {
    let t2 = this.rules.block.def.exec(e2);
    if (t2) {
      let n2 = t2[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r2 = t2[2] ? t2[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t2[3] ? t2[3].substring(1, t2[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t2[3];
      return { type: "def", tag: n2, raw: t2[0], href: r2, title: i };
    }
  }
  table(e2) {
    var _a3;
    let t2 = this.rules.block.table.exec(e2);
    if (!t2 || !this.rules.other.tableDelimiter.test(t2[2])) return;
    let n2 = V(t2[1]), r2 = t2[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = ((_a3 = t2[3]) == null ? void 0 : _a3.trim()) ? t2[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s2 = { type: "table", raw: t2[0], header: [], align: [], rows: [] };
    if (n2.length === r2.length) {
      for (let a of r2) this.rules.other.tableAlignRight.test(a) ? s2.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s2.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s2.align.push("left") : s2.align.push(null);
      for (let a = 0; a < n2.length; a++) s2.header.push({ text: n2[a], tokens: this.lexer.inline(n2[a]), header: true, align: s2.align[a] });
      for (let a of i) s2.rows.push(V(a, s2.header.length).map((o2, p2) => ({ text: o2, tokens: this.lexer.inline(o2), header: false, align: s2.align[p2] })));
      return s2;
    }
  }
  lheading(e2) {
    let t2 = this.rules.block.lheading.exec(e2);
    if (t2) return { type: "heading", raw: t2[0], depth: t2[2].charAt(0) === "=" ? 1 : 2, text: t2[1], tokens: this.lexer.inline(t2[1]) };
  }
  paragraph(e2) {
    let t2 = this.rules.block.paragraph.exec(e2);
    if (t2) {
      let n2 = t2[1].charAt(t2[1].length - 1) === `
` ? t2[1].slice(0, -1) : t2[1];
      return { type: "paragraph", raw: t2[0], text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  text(e2) {
    let t2 = this.rules.block.text.exec(e2);
    if (t2) return { type: "text", raw: t2[0], text: t2[0], tokens: this.lexer.inline(t2[0]) };
  }
  escape(e2) {
    let t2 = this.rules.inline.escape.exec(e2);
    if (t2) return { type: "escape", raw: t2[0], text: t2[1] };
  }
  tag(e2) {
    let t2 = this.rules.inline.tag.exec(e2);
    if (t2) return !this.lexer.state.inLink && this.rules.other.startATag.test(t2[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t2[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t2[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t2[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t2[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t2[0] };
  }
  link(e2) {
    let t2 = this.rules.inline.link.exec(e2);
    if (t2) {
      let n2 = t2[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n2)) {
        if (!this.rules.other.endAngleBracket.test(n2)) return;
        let s2 = z(n2.slice(0, -1), "\\");
        if ((n2.length - s2.length) % 2 === 0) return;
      } else {
        let s2 = fe(t2[2], "()");
        if (s2 === -2) return;
        if (s2 > -1) {
          let o2 = (t2[0].indexOf("!") === 0 ? 5 : 4) + t2[1].length + s2;
          t2[2] = t2[2].substring(0, s2), t2[0] = t2[0].substring(0, o2).trim(), t2[3] = "";
        }
      }
      let r2 = t2[2], i = "";
      if (this.options.pedantic) {
        let s2 = this.rules.other.pedanticHrefTitle.exec(r2);
        s2 && (r2 = s2[1], i = s2[3]);
      } else i = t2[3] ? t2[3].slice(1, -1) : "";
      return r2 = r2.trim(), this.rules.other.startAngleBracket.test(r2) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n2) ? r2 = r2.slice(1) : r2 = r2.slice(1, -1)), me(t2, { href: r2 && r2.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t2[0], this.lexer, this.rules);
    }
  }
  reflink(e2, t2) {
    let n2;
    if ((n2 = this.rules.inline.reflink.exec(e2)) || (n2 = this.rules.inline.nolink.exec(e2))) {
      let r2 = (n2[2] || n2[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t2[r2.toLowerCase()];
      if (!i) {
        let s2 = n2[0].charAt(0);
        return { type: "text", raw: s2, text: s2 };
      }
      return me(n2, i, n2[0], this.lexer, this.rules);
    }
  }
  emStrong(e2, t2, n2 = "") {
    let r2 = this.rules.inline.emStrongLDelim.exec(e2);
    if (!r2 || r2[3] && n2.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r2[1] || r2[2] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
      let s2 = [...r2[0]].length - 1, a, o2, p2 = s2, u2 = 0, c2 = r2[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s2); (r2 = c2.exec(t2)) != null; ) {
        if (a = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !a) continue;
        if (o2 = [...a].length, r2[3] || r2[4]) {
          p2 += o2;
          continue;
        } else if ((r2[5] || r2[6]) && s2 % 3 && !((s2 + o2) % 3)) {
          u2 += o2;
          continue;
        }
        if (p2 -= o2, p2 > 0) continue;
        o2 = Math.min(o2, o2 + p2 + u2);
        let g = [...r2[0]][0].length, h2 = e2.slice(0, s2 + r2.index + g + o2);
        if (Math.min(s2, o2) % 2) {
          let f2 = h2.slice(1, -1);
          return { type: "em", raw: h2, text: f2, tokens: this.lexer.inlineTokens(f2) };
        }
        let R2 = h2.slice(2, -2);
        return { type: "strong", raw: h2, text: R2, tokens: this.lexer.inlineTokens(R2) };
      }
    }
  }
  codespan(e2) {
    let t2 = this.rules.inline.code.exec(e2);
    if (t2) {
      let n2 = t2[2].replace(this.rules.other.newLineCharGlobal, " "), r2 = this.rules.other.nonSpaceChar.test(n2), i = this.rules.other.startingSpaceChar.test(n2) && this.rules.other.endingSpaceChar.test(n2);
      return r2 && i && (n2 = n2.substring(1, n2.length - 1)), { type: "codespan", raw: t2[0], text: n2 };
    }
  }
  br(e2) {
    let t2 = this.rules.inline.br.exec(e2);
    if (t2) return { type: "br", raw: t2[0] };
  }
  del(e2) {
    let t2 = this.rules.inline.del.exec(e2);
    if (t2) return { type: "del", raw: t2[0], text: t2[2], tokens: this.lexer.inlineTokens(t2[2]) };
  }
  autolink(e2) {
    let t2 = this.rules.inline.autolink.exec(e2);
    if (t2) {
      let n2, r2;
      return t2[2] === "@" ? (n2 = t2[1], r2 = "mailto:" + n2) : (n2 = t2[1], r2 = n2), { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
    }
  }
  url(e2) {
    var _a3;
    let t2;
    if (t2 = this.rules.inline.url.exec(e2)) {
      let n2, r2;
      if (t2[2] === "@") n2 = t2[0], r2 = "mailto:" + n2;
      else {
        let i;
        do
          i = t2[0], t2[0] = ((_a3 = this.rules.inline._backpedal.exec(t2[0])) == null ? void 0 : _a3[0]) ?? "";
        while (i !== t2[0]);
        n2 = t2[0], t2[1] === "www." ? r2 = "http://" + t2[0] : r2 = t2[0];
      }
      return { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
    }
  }
  inlineText(e2) {
    let t2 = this.rules.inline.text.exec(e2);
    if (t2) {
      let n2 = this.lexer.state.inRawBlock;
      return { type: "text", raw: t2[0], text: t2[0], escaped: n2 };
    }
  }
};
var x = class l {
  constructor(e2) {
    __publicField(this, "tokens");
    __publicField(this, "options");
    __publicField(this, "state");
    __publicField(this, "tokenizer");
    __publicField(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e2 || T, this.options.tokenizer = this.options.tokenizer || new y2(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    let t2 = { other: m2, block: C2.normal, inline: M.normal };
    this.options.pedantic ? (t2.block = C2.pedantic, t2.inline = M.pedantic) : this.options.gfm && (t2.block = C2.gfm, this.options.breaks ? t2.inline = M.breaks : t2.inline = M.gfm), this.tokenizer.rules = t2;
  }
  static get rules() {
    return { block: C2, inline: M };
  }
  static lex(e2, t2) {
    return new l(t2).lex(e2);
  }
  static lexInline(e2, t2) {
    return new l(t2).inlineTokens(e2);
  }
  lex(e2) {
    e2 = e2.replace(m2.carriageReturn, `
`), this.blockTokens(e2, this.tokens);
    for (let t2 = 0; t2 < this.inlineQueue.length; t2++) {
      let n2 = this.inlineQueue[t2];
      this.inlineTokens(n2.src, n2.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e2, t2 = [], n2 = false) {
    var _a3, _b, _c;
    for (this.options.pedantic && (e2 = e2.replace(m2.tabCharGlobal, "    ").replace(m2.spaceLine, "")); e2; ) {
      let r2;
      if ((_b = (_a3 = this.options.extensions) == null ? void 0 : _a3.block) == null ? void 0 : _b.some((s2) => (r2 = s2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(r2.raw.length), t2.push(r2), true) : false)) continue;
      if (r2 = this.tokenizer.space(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        r2.raw.length === 1 && s2 !== void 0 ? s2.raw += `
` : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.code(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        (s2 == null ? void 0 : s2.type) === "paragraph" || (s2 == null ? void 0 : s2.type) === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.fences(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.heading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.hr(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.blockquote(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.list(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.html(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.def(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        (s2 == null ? void 0 : s2.type) === "paragraph" || (s2 == null ? void 0 : s2.type) === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.raw, this.inlineQueue.at(-1).src = s2.text) : this.tokens.links[r2.tag] || (this.tokens.links[r2.tag] = { href: r2.href, title: r2.title }, t2.push(r2));
        continue;
      }
      if (r2 = this.tokenizer.table(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.lheading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      let i = e2;
      if ((_c = this.options.extensions) == null ? void 0 : _c.startBlock) {
        let s2 = 1 / 0, a = e2.slice(1), o2;
        this.options.extensions.startBlock.forEach((p2) => {
          o2 = p2.call({ lexer: this }, a), typeof o2 == "number" && o2 >= 0 && (s2 = Math.min(s2, o2));
        }), s2 < 1 / 0 && s2 >= 0 && (i = e2.substring(0, s2 + 1));
      }
      if (this.state.top && (r2 = this.tokenizer.paragraph(i))) {
        let s2 = t2.at(-1);
        n2 && (s2 == null ? void 0 : s2.type) === "paragraph" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2), n2 = i.length !== e2.length, e2 = e2.substring(r2.raw.length);
        continue;
      }
      if (r2 = this.tokenizer.text(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        (s2 == null ? void 0 : s2.type) === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
        continue;
      }
      if (e2) {
        let s2 = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(s2);
          break;
        } else throw new Error(s2);
      }
    }
    return this.state.top = true, t2;
  }
  inline(e2, t2 = []) {
    return this.inlineQueue.push({ src: e2, tokens: t2 }), t2;
  }
  inlineTokens(e2, t2 = []) {
    var _a3, _b, _c, _d, _e2;
    let n2 = e2, r2 = null;
    if (this.tokens.links) {
      let o2 = Object.keys(this.tokens.links);
      if (o2.length > 0) for (; (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(n2)) != null; ) o2.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (n2 = n2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n2.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r2 = this.tokenizer.rules.inline.anyPunctuation.exec(n2)) != null; ) n2 = n2.slice(0, r2.index) + "++" + n2.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (r2 = this.tokenizer.rules.inline.blockSkip.exec(n2)) != null; ) i = r2[2] ? r2[2].length : 0, n2 = n2.slice(0, r2.index + i) + "[" + "a".repeat(r2[0].length - i - 2) + "]" + n2.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n2 = ((_b = (_a3 = this.options.hooks) == null ? void 0 : _a3.emStrongMask) == null ? void 0 : _b.call({ lexer: this }, n2)) ?? n2;
    let s2 = false, a = "";
    for (; e2; ) {
      s2 || (a = ""), s2 = false;
      let o2;
      if ((_d = (_c = this.options.extensions) == null ? void 0 : _c.inline) == null ? void 0 : _d.some((u2) => (o2 = u2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(o2.raw.length), t2.push(o2), true) : false)) continue;
      if (o2 = this.tokenizer.escape(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.tag(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.link(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.reflink(e2, this.tokens.links)) {
        e2 = e2.substring(o2.raw.length);
        let u2 = t2.at(-1);
        o2.type === "text" && (u2 == null ? void 0 : u2.type) === "text" ? (u2.raw += o2.raw, u2.text += o2.text) : t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.emStrong(e2, n2, a)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.codespan(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.br(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.del(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.autolink(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (!this.state.inLink && (o2 = this.tokenizer.url(e2))) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      let p2 = e2;
      if ((_e2 = this.options.extensions) == null ? void 0 : _e2.startInline) {
        let u2 = 1 / 0, c2 = e2.slice(1), g;
        this.options.extensions.startInline.forEach((h2) => {
          g = h2.call({ lexer: this }, c2), typeof g == "number" && g >= 0 && (u2 = Math.min(u2, g));
        }), u2 < 1 / 0 && u2 >= 0 && (p2 = e2.substring(0, u2 + 1));
      }
      if (o2 = this.tokenizer.inlineText(p2)) {
        e2 = e2.substring(o2.raw.length), o2.raw.slice(-1) !== "_" && (a = o2.raw.slice(-1)), s2 = true;
        let u2 = t2.at(-1);
        (u2 == null ? void 0 : u2.type) === "text" ? (u2.raw += o2.raw, u2.text += o2.text) : t2.push(o2);
        continue;
      }
      if (e2) {
        let u2 = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(u2);
          break;
        } else throw new Error(u2);
      }
    }
    return t2;
  }
};
var P = class {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "parser");
    this.options = e2 || T;
  }
  space(e2) {
    return "";
  }
  code({ text: e2, lang: t2, escaped: n2 }) {
    var _a3;
    let r2 = (_a3 = (t2 || "").match(m2.notSpaceStart)) == null ? void 0 : _a3[0], i = e2.replace(m2.endingNewline, "") + `
`;
    return r2 ? '<pre><code class="language-' + w2(r2) + '">' + (n2 ? i : w2(i, true)) + `</code></pre>
` : "<pre><code>" + (n2 ? i : w2(i, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e2 }) {
    return `<blockquote>
${this.parser.parse(e2)}</blockquote>
`;
  }
  html({ text: e2 }) {
    return e2;
  }
  def(e2) {
    return "";
  }
  heading({ tokens: e2, depth: t2 }) {
    return `<h${t2}>${this.parser.parseInline(e2)}</h${t2}>
`;
  }
  hr(e2) {
    return `<hr>
`;
  }
  list(e2) {
    let t2 = e2.ordered, n2 = e2.start, r2 = "";
    for (let a = 0; a < e2.items.length; a++) {
      let o2 = e2.items[a];
      r2 += this.listitem(o2);
    }
    let i = t2 ? "ol" : "ul", s2 = t2 && n2 !== 1 ? ' start="' + n2 + '"' : "";
    return "<" + i + s2 + `>
` + r2 + "</" + i + `>
`;
  }
  listitem(e2) {
    var _a3;
    let t2 = "";
    if (e2.task) {
      let n2 = this.checkbox({ checked: !!e2.checked });
      e2.loose ? ((_a3 = e2.tokens[0]) == null ? void 0 : _a3.type) === "paragraph" ? (e2.tokens[0].text = n2 + " " + e2.tokens[0].text, e2.tokens[0].tokens && e2.tokens[0].tokens.length > 0 && e2.tokens[0].tokens[0].type === "text" && (e2.tokens[0].tokens[0].text = n2 + " " + w2(e2.tokens[0].tokens[0].text), e2.tokens[0].tokens[0].escaped = true)) : e2.tokens.unshift({ type: "text", raw: n2 + " ", text: n2 + " ", escaped: true }) : t2 += n2 + " ";
    }
    return t2 += this.parser.parse(e2.tokens, !!e2.loose), `<li>${t2}</li>
`;
  }
  checkbox({ checked: e2 }) {
    return "<input " + (e2 ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e2 }) {
    return `<p>${this.parser.parseInline(e2)}</p>
`;
  }
  table(e2) {
    let t2 = "", n2 = "";
    for (let i = 0; i < e2.header.length; i++) n2 += this.tablecell(e2.header[i]);
    t2 += this.tablerow({ text: n2 });
    let r2 = "";
    for (let i = 0; i < e2.rows.length; i++) {
      let s2 = e2.rows[i];
      n2 = "";
      for (let a = 0; a < s2.length; a++) n2 += this.tablecell(s2[a]);
      r2 += this.tablerow({ text: n2 });
    }
    return r2 && (r2 = `<tbody>${r2}</tbody>`), `<table>
<thead>
` + t2 + `</thead>
` + r2 + `</table>
`;
  }
  tablerow({ text: e2 }) {
    return `<tr>
${e2}</tr>
`;
  }
  tablecell(e2) {
    let t2 = this.parser.parseInline(e2.tokens), n2 = e2.header ? "th" : "td";
    return (e2.align ? `<${n2} align="${e2.align}">` : `<${n2}>`) + t2 + `</${n2}>
`;
  }
  strong({ tokens: e2 }) {
    return `<strong>${this.parser.parseInline(e2)}</strong>`;
  }
  em({ tokens: e2 }) {
    return `<em>${this.parser.parseInline(e2)}</em>`;
  }
  codespan({ text: e2 }) {
    return `<code>${w2(e2, true)}</code>`;
  }
  br(e2) {
    return "<br>";
  }
  del({ tokens: e2 }) {
    return `<del>${this.parser.parseInline(e2)}</del>`;
  }
  link({ href: e2, title: t2, tokens: n2 }) {
    let r2 = this.parser.parseInline(n2), i = J(e2);
    if (i === null) return r2;
    e2 = i;
    let s2 = '<a href="' + e2 + '"';
    return t2 && (s2 += ' title="' + w2(t2) + '"'), s2 += ">" + r2 + "</a>", s2;
  }
  image({ href: e2, title: t2, text: n2, tokens: r2 }) {
    r2 && (n2 = this.parser.parseInline(r2, this.parser.textRenderer));
    let i = J(e2);
    if (i === null) return w2(n2);
    e2 = i;
    let s2 = `<img src="${e2}" alt="${n2}"`;
    return t2 && (s2 += ` title="${w2(t2)}"`), s2 += ">", s2;
  }
  text(e2) {
    return "tokens" in e2 && e2.tokens ? this.parser.parseInline(e2.tokens) : "escaped" in e2 && e2.escaped ? e2.text : w2(e2.text);
  }
};
var $2 = class {
  strong({ text: e2 }) {
    return e2;
  }
  em({ text: e2 }) {
    return e2;
  }
  codespan({ text: e2 }) {
    return e2;
  }
  del({ text: e2 }) {
    return e2;
  }
  html({ text: e2 }) {
    return e2;
  }
  text({ text: e2 }) {
    return e2;
  }
  link({ text: e2 }) {
    return "" + e2;
  }
  image({ text: e2 }) {
    return "" + e2;
  }
  br() {
    return "";
  }
};
var b = class l2 {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "renderer");
    __publicField(this, "textRenderer");
    this.options = e2 || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $2();
  }
  static parse(e2, t2) {
    return new l2(t2).parse(e2);
  }
  static parseInline(e2, t2) {
    return new l2(t2).parseInline(e2);
  }
  parse(e2, t2 = true) {
    var _a3, _b;
    let n2 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i = e2[r2];
      if ((_b = (_a3 = this.options.extensions) == null ? void 0 : _a3.renderers) == null ? void 0 : _b[i.type]) {
        let a = i, o2 = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o2 !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(a.type)) {
          n2 += o2 || "";
          continue;
        }
      }
      let s2 = i;
      switch (s2.type) {
        case "space": {
          n2 += this.renderer.space(s2);
          continue;
        }
        case "hr": {
          n2 += this.renderer.hr(s2);
          continue;
        }
        case "heading": {
          n2 += this.renderer.heading(s2);
          continue;
        }
        case "code": {
          n2 += this.renderer.code(s2);
          continue;
        }
        case "table": {
          n2 += this.renderer.table(s2);
          continue;
        }
        case "blockquote": {
          n2 += this.renderer.blockquote(s2);
          continue;
        }
        case "list": {
          n2 += this.renderer.list(s2);
          continue;
        }
        case "html": {
          n2 += this.renderer.html(s2);
          continue;
        }
        case "def": {
          n2 += this.renderer.def(s2);
          continue;
        }
        case "paragraph": {
          n2 += this.renderer.paragraph(s2);
          continue;
        }
        case "text": {
          let a = s2, o2 = this.renderer.text(a);
          for (; r2 + 1 < e2.length && e2[r2 + 1].type === "text"; ) a = e2[++r2], o2 += `
` + this.renderer.text(a);
          t2 ? n2 += this.renderer.paragraph({ type: "paragraph", raw: o2, text: o2, tokens: [{ type: "text", raw: o2, text: o2, escaped: true }] }) : n2 += o2;
          continue;
        }
        default: {
          let a = 'Token with "' + s2.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n2;
  }
  parseInline(e2, t2 = this.renderer) {
    var _a3, _b;
    let n2 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i = e2[r2];
      if ((_b = (_a3 = this.options.extensions) == null ? void 0 : _a3.renderers) == null ? void 0 : _b[i.type]) {
        let a = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (a !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n2 += a || "";
          continue;
        }
      }
      let s2 = i;
      switch (s2.type) {
        case "escape": {
          n2 += t2.text(s2);
          break;
        }
        case "html": {
          n2 += t2.html(s2);
          break;
        }
        case "link": {
          n2 += t2.link(s2);
          break;
        }
        case "image": {
          n2 += t2.image(s2);
          break;
        }
        case "strong": {
          n2 += t2.strong(s2);
          break;
        }
        case "em": {
          n2 += t2.em(s2);
          break;
        }
        case "codespan": {
          n2 += t2.codespan(s2);
          break;
        }
        case "br": {
          n2 += t2.br(s2);
          break;
        }
        case "del": {
          n2 += t2.del(s2);
          break;
        }
        case "text": {
          n2 += t2.text(s2);
          break;
        }
        default: {
          let a = 'Token with "' + s2.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n2;
  }
};
var _a;
var S = (_a = class {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "block");
    this.options = e2 || T;
  }
  preprocess(e2) {
    return e2;
  }
  postprocess(e2) {
    return e2;
  }
  processAllTokens(e2) {
    return e2;
  }
  emStrongMask(e2) {
    return e2;
  }
  provideLexer() {
    return this.block ? x.lex : x.lexInline;
  }
  provideParser() {
    return this.block ? b.parse : b.parseInline;
  }
}, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a);
var B = class {
  constructor(...e2) {
    __publicField(this, "defaults", L());
    __publicField(this, "options", this.setOptions);
    __publicField(this, "parse", this.parseMarkdown(true));
    __publicField(this, "parseInline", this.parseMarkdown(false));
    __publicField(this, "Parser", b);
    __publicField(this, "Renderer", P);
    __publicField(this, "TextRenderer", $2);
    __publicField(this, "Lexer", x);
    __publicField(this, "Tokenizer", y2);
    __publicField(this, "Hooks", S);
    this.use(...e2);
  }
  walkTokens(e2, t2) {
    var _a3, _b;
    let n2 = [];
    for (let r2 of e2) switch (n2 = n2.concat(t2.call(this, r2)), r2.type) {
      case "table": {
        let i = r2;
        for (let s2 of i.header) n2 = n2.concat(this.walkTokens(s2.tokens, t2));
        for (let s2 of i.rows) for (let a of s2) n2 = n2.concat(this.walkTokens(a.tokens, t2));
        break;
      }
      case "list": {
        let i = r2;
        n2 = n2.concat(this.walkTokens(i.items, t2));
        break;
      }
      default: {
        let i = r2;
        ((_b = (_a3 = this.defaults.extensions) == null ? void 0 : _a3.childTokens) == null ? void 0 : _b[i.type]) ? this.defaults.extensions.childTokens[i.type].forEach((s2) => {
          let a = i[s2].flat(1 / 0);
          n2 = n2.concat(this.walkTokens(a, t2));
        }) : i.tokens && (n2 = n2.concat(this.walkTokens(i.tokens, t2)));
      }
    }
    return n2;
  }
  use(...e2) {
    let t2 = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e2.forEach((n2) => {
      let r2 = { ...n2 };
      if (r2.async = this.defaults.async || r2.async || false, n2.extensions && (n2.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let s2 = t2.renderers[i.name];
          s2 ? t2.renderers[i.name] = function(...a) {
            let o2 = i.renderer.apply(this, a);
            return o2 === false && (o2 = s2.apply(this, a)), o2;
          } : t2.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s2 = t2[i.level];
          s2 ? s2.unshift(i.tokenizer) : t2[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t2.startBlock ? t2.startBlock.push(i.start) : t2.startBlock = [i.start] : i.level === "inline" && (t2.startInline ? t2.startInline.push(i.start) : t2.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t2.childTokens[i.name] = i.childTokens);
      }), r2.extensions = t2), n2.renderer) {
        let i = this.defaults.renderer || new P(this.defaults);
        for (let s2 in n2.renderer) {
          if (!(s2 in i)) throw new Error(`renderer '${s2}' does not exist`);
          if (["options", "parser"].includes(s2)) continue;
          let a = s2, o2 = n2.renderer[a], p2 = i[a];
          i[a] = (...u2) => {
            let c2 = o2.apply(i, u2);
            return c2 === false && (c2 = p2.apply(i, u2)), c2 || "";
          };
        }
        r2.renderer = i;
      }
      if (n2.tokenizer) {
        let i = this.defaults.tokenizer || new y2(this.defaults);
        for (let s2 in n2.tokenizer) {
          if (!(s2 in i)) throw new Error(`tokenizer '${s2}' does not exist`);
          if (["options", "rules", "lexer"].includes(s2)) continue;
          let a = s2, o2 = n2.tokenizer[a], p2 = i[a];
          i[a] = (...u2) => {
            let c2 = o2.apply(i, u2);
            return c2 === false && (c2 = p2.apply(i, u2)), c2;
          };
        }
        r2.tokenizer = i;
      }
      if (n2.hooks) {
        let i = this.defaults.hooks || new S();
        for (let s2 in n2.hooks) {
          if (!(s2 in i)) throw new Error(`hook '${s2}' does not exist`);
          if (["options", "block"].includes(s2)) continue;
          let a = s2, o2 = n2.hooks[a], p2 = i[a];
          S.passThroughHooks.has(s2) ? i[a] = (u2) => {
            if (this.defaults.async && S.passThroughHooksRespectAsync.has(s2)) return (async () => {
              let g = await o2.call(i, u2);
              return p2.call(i, g);
            })();
            let c2 = o2.call(i, u2);
            return p2.call(i, c2);
          } : i[a] = (...u2) => {
            if (this.defaults.async) return (async () => {
              let g = await o2.apply(i, u2);
              return g === false && (g = await p2.apply(i, u2)), g;
            })();
            let c2 = o2.apply(i, u2);
            return c2 === false && (c2 = p2.apply(i, u2)), c2;
          };
        }
        r2.hooks = i;
      }
      if (n2.walkTokens) {
        let i = this.defaults.walkTokens, s2 = n2.walkTokens;
        r2.walkTokens = function(a) {
          let o2 = [];
          return o2.push(s2.call(this, a)), i && (o2 = o2.concat(i.call(this, a))), o2;
        };
      }
      this.defaults = { ...this.defaults, ...r2 };
    }), this;
  }
  setOptions(e2) {
    return this.defaults = { ...this.defaults, ...e2 }, this;
  }
  lexer(e2, t2) {
    return x.lex(e2, t2 ?? this.defaults);
  }
  parser(e2, t2) {
    return b.parse(e2, t2 ?? this.defaults);
  }
  parseMarkdown(e2) {
    return (n2, r2) => {
      let i = { ...r2 }, s2 = { ...this.defaults, ...i }, a = this.onError(!!s2.silent, !!s2.async);
      if (this.defaults.async === true && i.async === false) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n2 > "u" || n2 === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof n2 != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n2) + ", string expected"));
      if (s2.hooks && (s2.hooks.options = s2, s2.hooks.block = e2), s2.async) return (async () => {
        let o2 = s2.hooks ? await s2.hooks.preprocess(n2) : n2, u2 = await (s2.hooks ? await s2.hooks.provideLexer() : e2 ? x.lex : x.lexInline)(o2, s2), c2 = s2.hooks ? await s2.hooks.processAllTokens(u2) : u2;
        s2.walkTokens && await Promise.all(this.walkTokens(c2, s2.walkTokens));
        let h2 = await (s2.hooks ? await s2.hooks.provideParser() : e2 ? b.parse : b.parseInline)(c2, s2);
        return s2.hooks ? await s2.hooks.postprocess(h2) : h2;
      })().catch(a);
      try {
        s2.hooks && (n2 = s2.hooks.preprocess(n2));
        let p2 = (s2.hooks ? s2.hooks.provideLexer() : e2 ? x.lex : x.lexInline)(n2, s2);
        s2.hooks && (p2 = s2.hooks.processAllTokens(p2)), s2.walkTokens && this.walkTokens(p2, s2.walkTokens);
        let c2 = (s2.hooks ? s2.hooks.provideParser() : e2 ? b.parse : b.parseInline)(p2, s2);
        return s2.hooks && (c2 = s2.hooks.postprocess(c2)), c2;
      } catch (o2) {
        return a(o2);
      }
    };
  }
  onError(e2, t2) {
    return (n2) => {
      if (n2.message += `
Please report this to https://github.com/markedjs/marked.`, e2) {
        let r2 = "<p>An error occurred:</p><pre>" + w2(n2.message + "", true) + "</pre>";
        return t2 ? Promise.resolve(r2) : r2;
      }
      if (t2) return Promise.reject(n2);
      throw n2;
    };
  }
};
var _ = new B();
function k(l3, e2) {
  return _.parse(l3, e2);
}
k.options = k.setOptions = function(l3) {
  return _.setOptions(l3), k.defaults = _.defaults, G(k.defaults), k;
};
k.getDefaults = L;
k.defaults = T;
k.use = function(...l3) {
  return _.use(...l3), k.defaults = _.defaults, G(k.defaults), k;
};
k.walkTokens = function(l3, e2) {
  return _.walkTokens(l3, e2);
};
k.parseInline = _.parseInline;
k.Parser = b;
k.parser = b.parse;
k.Renderer = P;
k.TextRenderer = $2;
k.Lexer = x;
k.lexer = x.lex;
k.Tokenizer = y2;
k.Hooks = S;
k.parse = k;
var Zt = k.options;
var Gt = k.setOptions;
var Nt = k.use;
var Ft = k.walkTokens;
var jt = k.parseInline;
var Ut = b.parse;
var Kt = x.lex;

// node_modules/marked-highlight/src/index.js
function markedHighlight(options) {
  if (typeof options === "function") {
    options = {
      highlight: options
    };
  }
  if (!options || typeof options.highlight !== "function") {
    throw new Error("Must provide highlight function");
  }
  if (typeof options.langPrefix !== "string") {
    options.langPrefix = "language-";
  }
  if (typeof options.emptyLangClass !== "string") {
    options.emptyLangClass = "";
  }
  return {
    async: !!options.async,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = getLang(token.lang);
      if (options.async) {
        return Promise.resolve(options.highlight(token.text, lang, token.lang || "")).then(updateToken(token));
      }
      const code = options.highlight(token.text, lang, token.lang || "");
      if (code instanceof Promise) {
        throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
      }
      updateToken(token)(code);
    },
    useNewRenderer: true,
    renderer: {
      code(code, infoString, escaped) {
        if (typeof code === "object") {
          escaped = code.escaped;
          infoString = code.lang;
          code = code.text;
        }
        const lang = getLang(infoString);
        const classValue = lang ? options.langPrefix + escape(lang) : options.emptyLangClass;
        const classAttr = classValue ? ` class="${classValue}"` : "";
        code = code.replace(/\n$/, "");
        return `<pre><code${classAttr}>${escaped ? code : escape(code, true)}
</code></pre>`;
      }
    }
  };
}
function getLang(lang) {
  return (lang || "").match(/\S*/)[0];
}
function updateToken(token) {
  return (code) => {
    if (typeof code === "string" && code !== token.text) {
      token.escaped = true;
      token.text = code;
    }
  };
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}

// node_modules/@waline/client/dist/slim.js
var import_recaptcha_v3 = __toESM(require_ReCaptcha());
var Zt2 = ["nick", "mail", "link"];
var Be2 = (e2) => e2.filter((l3) => Zt2.includes(l3));
var De2 = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
var Xt = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
var Yt = (e2) => new Promise((l3, t2) => {
  if (e2.size > 128e3) return t2(new Error("File too large! File size limit 128KB"));
  const a = new FileReader();
  a.readAsDataURL(e2), a.onload = () => l3(a.result), a.onerror = t2;
});
var Jt = (e2) => e2 ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>';
var Qt = (e2) => {
  const l3 = async (t2, a = {}) => fetch(`https://api.giphy.com/v1/gifs/${t2}?${new URLSearchParams({ lang: e2, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...a }).toString()}`).then((n2) => n2.json()).then(({ data: n2 }) => n2.map((o2) => ({ title: o2.title, src: o2.images.downsized_medium.url })));
  return { search: (t2) => l3("search", { q: t2, offset: "0" }), default: () => l3("trending", {}), more: (t2, a = 0) => l3("search", { q: t2, offset: a.toString() }) };
};
var ea = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
var ta = /</;
var aa = /(?:^|\s)\/\/(.+?)$/gm;
var la = /\/\*([\S\s]*?)\*\//gm;
var na = new RegExp(`(${ea.source}|${ta.source})|((?:${aa.source})|(?:${la.source}))`, "gmi");
var qe2 = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
var Ie2 = {};
var ia = (e2) => {
  let l3 = 0;
  return e2.replace(na, (t2, a, n2) => {
    if (n2) return `<span style="color: slategray">${n2}</span>`;
    if (a === "<") return "&lt;";
    let o2;
    Ie2[a] ? o2 = Ie2[a] : (o2 = qe2[l3], Ie2[a] = o2);
    const p2 = `<span style="color: #${o2}">${a}</span>`;
    return l3 = ++l3 % qe2.length, p2;
  });
};
var ra = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"];
var X2 = (e2) => Object.fromEntries(e2.map((l3, t2) => [ra[t2], l3]));
var oa = X2(["Benutzername", "Der Benutzername darf nicht weniger als 3 Bytes umfassen.", "E-Mail", "Bitte bestätigen Sie Ihre E-Mail-Adresse.", "Webseite", "Optional", "Kommentieren Sie hier...", "Noch keine Kommentare.", "Senden", "Gefällt mir", "Gefällt mir nicht mehr", "Antworten", "Antwort abbrechen", "Kommentare", "Aktualisieren", "Mehr laden...", "Vorschau", "Emoji", "Ein Bild hochladen", "Vor einigen Sekunden", "Vor einigen Minuten", "Vor einigen Stunden", "Vor einigen Tagen", "Gerade eben", "Hochladen läuft", "Anmelden", "Abmelden", "Admin", "Angeheftet", "Wörter", "Bitte geben Sie Kommentare zwischen $0 und $1 Wörtern ein! Aktuelle Anzahl der Wörter: $2", "Anonym", "Zwerge", "Hobbits", "Ents", "Magier", "Elfen", "Maïar", "GIF", "Nach einem GIF suchen", "Profil", "Genehmigt", "Ausstehend", "Spam", "Lösen", "Älteste", "Neueste", "Am beliebtesten", "Was denken Sie?"]);
var Oe2 = X2(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words!
 Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]);
var Ge2 = X2(["Nombre de usuario", "El nombre de usuario no puede tener menos de 3 bytes.", "Correo electrónico", "Por favor confirma tu dirección de correo electrónico.", "Sitio web", "Opcional", "Comenta aquí...", "Sin comentarios todavía.", "Enviar", "Like", "Anular like", "Responder", "Anular respuesta", "Comentarios", "Recargar", "Cargar Más...", "Previsualizar", "Emoji", "Subir Imagen", "segundos atrás", "minutos atrás", "horas atrás", "días atrás", "justo ahora", "Subiendo", "Iniciar sesión", "cerrar sesión", "Admin", "Fijado", "Palabras", `Por favor escriba entre $0 y $1 palabras!
 El número actual de palabras: $2`, "Anónimo", "Enanos", "Hobbits", "Ents", "Magos", "Elfos", "Maiar", "GIF", "Buscar GIF", "Perfil", "Aprobado", "Esperando", "Spam", "Desfijar", "Más antiguos", "Más recientes", "Más vistos", "¿Qué piensas?"]);
var Ke2 = X2(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "Répondre", "Annuler la réponse", "Commentaires", "Actualiser", "Charger plus...", "Aperçu", "Emoji", "Télécharger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "À l'instant", "Téléchargement en cours", "Connexion", "Déconnexion", "Admin", "Épinglé", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "Maïar", "GIF", "Rechercher un GIF", "Profil", "Approuvé", "En attente", "Indésirable", "Détacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?"]);
var Ze2 = X2(["Nickname", "Il nickname non può avere meno di 3 caratteri.", "E-mail", "Per favore conferma il tuo indirizzo e-mail.", "Sito web", "Facoltativo", "Scrivi un commento...", "Ancora nessun commento.", "Invia", "Mi piace", "Annulla mi piace", "Rispondi", "Annulla risposta", "Commenti", "Aggiorna", "Carica altri...", "Anteprima", "Emoji", "Carica immagine", "secondi fa", "minuti fa", "ore fa", "giorni fa", "adesso", "Caricamento in corso...", "Accedi", "Esci", "Admin", "In evidenza", "Parole", `Inserisci un commento tra $0 e $1 parole!
 Numero attuale di parole: $2`, "Anonimo", "Nano", "Hobbit", "Ent", "Mago", "Elfo", "Maiar", "GIF", "Cerca GIF", "Profilo", "Approvato", "In attesa", "Spam", "Rimuovi evidenza", "Più vecchi", "Più recenti", "Più popolari", "Cosa ne pensi?"]);
var Xe2 = X2(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", `コメントは $0 から $1 ワードの間でなければなりません!
 現在の単語番号: $2`, "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]);
var sa = X2(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar comentário com $0 a $1 palavras!
 Número de palavras atuais: $2`, "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]);
var Ye2 = X2(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", `Пожалуйста, введите комментарии от $0 до $1 слов!
Номер текущего слова: $2`, "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
var Je2 = X2(["Tên", "Tên không được nhỏ hơn 3 ký tự.", "E-Mail", "Vui lòng xác nhập địa chỉ email của bạn.", "Website", "Tùy chọn", "Hãy bình luận có văn hoá!", "Chưa có bình luận", "Gửi", "Thích", "Bỏ thích", "Trả lời", "Hủy bỏ", "bình luận", "Làm mới", "Tải thêm...", "Xem trước", "Emoji", "Tải lên hình ảnh", "giây trước", "phút trước", "giờ trước", "ngày trước", "Vừa xong", "Đang tải lên", "Đăng nhập", "đăng xuất", "Quản trị viên", "Dính", "từ", `Bình luận phải có độ dài giữa $0 và $1 từ!
 Số từ hiện tại: $2`, "Vô danh", "Người lùn", "Người tí hon", "Thần rừng", "Pháp sư", "Tiên tộc", "Maiar", "Ảnh GIF", "Tìm kiếm ảnh GIF", "thông tin cá nhân", "Đã được phê duyệt", "Đang chờ đợi", "Thư rác", "Không dính", "lâu đời nhất", "muộn nhất", "nóng nhất", "What do you think?"]);
var Qe2 = X2(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", `评论字数应在 $0 到 $1 字之间！
当前字数：$2`, "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]);
var ca = X2(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎留言", "來發留言吧~", "送出", "喜歡", "取消喜歡", "回覆", "取消回覆", "留言", "重整", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登入", "登出", "管理者", "置頂", "字", `留言字數應在 $0 到 $1 字之間！
目前字數：$2`, "匿名", "潛水", "冒泡", "吐槽", "活躍", "多話", "傳說", "表情包", "搜尋表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "最早", "最新", "熱門", "你認為這篇文章怎麼樣？"]);
var et = "en-US";
var fe2 = { zh: Qe2, "zh-cn": Qe2, "zh-tw": ca, en: Oe2, "en-us": Oe2, fr: Ke2, "fr-fr": Ke2, it: Ze2, "it-it": Ze2, jp: Xe2, "jp-jp": Xe2, "pt-br": sa, ru: Ye2, "ru-ru": Ye2, vi: Je2, "vi-vn": Je2, de: oa, es: Ge2, "es-mx": Ge2 };
var tt = (e2) => fe2[e2.toLowerCase()] || fe2[et.toLowerCase()];
var at = (e2) => Object.keys(fe2).includes(e2.toLowerCase()) ? e2 : et;
var lt = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" };
var ua = Object.keys(lt);
var we2 = Symbol("waline-config");
var nt = (e2) => {
  try {
    e2 = decodeURI(e2);
  } catch {
  }
  return e2;
};
var it = (e2 = "") => e2.replace(/\/$/u, "");
var rt = (e2) => /^(https?:)?\/\//.test(e2);
var ye2 = (e2) => {
  const l3 = it(e2);
  return rt(l3) ? l3 : `https://${l3}`;
};
var ma = (e2) => Array.isArray(e2) ? e2 : e2 ? [0, e2] : false;
var ce2 = (e2, l3) => e2 == null || e2 === true ? l3 : e2 === false ? null : e2;
var va = ({ serverURL: e2, path: l3 = location.pathname, lang: t2 = typeof navigator > "u" ? "en-US" : navigator.language, locale: a, meta: n2 = ["nick", "mail", "link"], requiredMeta: o2 = [], dark: p2 = false, pageSize: s2 = 10, wordLimit: g, noCopyright: u2 = false, login: w3 = "enable", recaptchaV3Key: v3 = "", turnstileKey: S2 = "", commentSorting: j3 = "latest", emoji: L2 = De2, imageUploader: C3, highlighter: x2, texRenderer: R2, search: d3, reaction: K2, ...Y }) => ({ serverURL: ye2(e2), path: nt(l3), lang: at(t2), locale: { ...tt(at(t2)), ...typeof a == "object" ? a : {} }, wordLimit: ma(g), meta: Be2(n2), requiredMeta: Be2(o2), dark: p2, pageSize: s2, commentSorting: j3, login: w3, noCopyright: u2, recaptchaV3Key: v3, turnstileKey: S2, ...Y, reaction: K2 === true ? Xt : K2 || null, imageUploader: ce2(C3, Yt), highlighter: ce2(x2, ia), texRenderer: ce2(R2, Jt), emoji: ce2(L2, De2), search: ce2(d3, Qt(t2)) });
var ie2 = (e2) => typeof e2 == "string";
var Ae2 = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}";
var da = (e2) => ie2(e2) ? e2 === "auto" ? `@media(prefers-color-scheme:dark){body${Ae2}}` : `${e2}${Ae2}` : e2 === true ? `:root${Ae2}` : "";
var Me2 = (e2, l3) => {
  let t2 = e2.toString();
  for (; t2.length < l3; ) t2 = "0" + t2;
  return t2;
};
var pa = (e2) => {
  const l3 = Me2(e2.getDate(), 2), t2 = Me2(e2.getMonth() + 1, 2);
  return `${Me2(e2.getFullYear(), 2)}-${t2}-${l3}`;
};
var ga = (e2, l3, t2) => {
  if (!e2) return "";
  const a = ie2(e2) ? new Date(e2.includes(" ") ? e2.replace(/-/g, "/") : e2) : e2, n2 = l3.getTime() - a.getTime(), o2 = Math.floor(n2 / (24 * 3600 * 1e3));
  if (o2 === 0) {
    const p2 = n2 % 864e5, s2 = Math.floor(p2 / (3600 * 1e3));
    if (s2 === 0) {
      const g = p2 % 36e5, u2 = Math.floor(g / (60 * 1e3));
      if (u2 === 0) {
        const w3 = g % 6e4;
        return `${Math.round(w3 / 1e3)} ${t2.seconds}`;
      }
      return `${u2} ${t2.minutes}`;
    }
    return `${s2} ${t2.hours}`;
  }
  return o2 < 0 ? t2.now : o2 < 8 ? `${o2} ${t2.days}` : pa(a);
};
var ha = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var fa = (e2) => ha.test(e2);
var wa = "WALINE_EMOJI";
var ot = useStorage(wa, {});
var ya = (e2) => /@[0-9]+\.[0-9]+\.[0-9]+/.test(e2);
var ba = (e2) => {
  const l3 = ya(e2);
  if (l3) {
    const t2 = ot.value[e2];
    if (t2) return Promise.resolve(t2);
  }
  return fetch(`${e2}/info.json`).then((t2) => t2.json()).then((t2) => {
    const a = { folder: e2, ...t2 };
    return l3 && (ot.value[e2] = a), a;
  });
};
var st = (e2, l3 = "", t2 = "", a = "") => `${l3 ? `${l3}/` : ""}${t2}${e2}${a ? `.${a}` : ""}`;
var ka = (e2) => Promise.all(e2 ? e2.map((l3) => ie2(l3) ? ba(it(l3)) : Promise.resolve(l3)) : []).then((l3) => {
  const t2 = { tabs: [], map: {} };
  return l3.forEach((a) => {
    const { name: n2, folder: o2, icon: p2, prefix: s2 = "", type: g, items: u2 } = a;
    t2.tabs.push({ name: n2, icon: st(p2, o2, s2, g), items: u2.map((w3) => {
      const v3 = `${s2}${w3}`;
      return t2.map[v3] = st(w3, o2, s2, g), v3;
    }) });
  }), t2;
});
var ct = (e2) => {
  e2.name !== "AbortError" && console.error(e2.message);
};
var Se2 = (e2) => e2 instanceof HTMLElement ? e2 : ie2(e2) ? document.querySelector(e2) : null;
var Ca = (e2) => e2.type.includes("image");
var ut = (e2) => {
  const l3 = Array.from(e2).find(Ca);
  return l3 ? l3.getAsFile() : null;
};
var $a = /\$.*?\$/;
var La = /^\$(.*?)\$/;
var Ea = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
var Ia = (e2) => [{ name: "blockMath", level: "block", tokenizer(l3) {
  const t2 = Ea.exec(l3);
  if (t2 !== null) return { type: "html", raw: t2[0], text: e2(true, t2[1]) };
} }, { name: "inlineMath", level: "inline", start(l3) {
  const t2 = l3.search($a);
  return t2 !== -1 ? t2 : l3.length;
}, tokenizer(l3) {
  const t2 = La.exec(l3);
  if (t2 !== null) return { type: "html", raw: t2[0], text: e2(false, t2[1]) };
} }];
var mt = (e2 = "", l3 = {}) => e2.replace(/:(.+?):/g, (t2, a) => l3[a] ? `<img class="wl-emoji" src="${l3[a]}" alt="${a}">` : t2);
var Aa = (e2, { emojiMap: l3, highlighter: t2, texRenderer: a }) => {
  const n2 = new B();
  if (n2.setOptions({ breaks: true }), t2 && n2.use(markedHighlight({ highlight: t2 })), a) {
    const o2 = Ia(a);
    n2.use({ extensions: o2 });
  }
  return n2.parse(mt(e2, l3));
};
var xe = (e2) => {
  const { path: l3 } = e2.dataset;
  return l3 != null && l3.length ? l3 : null;
};
var Ma = (e2) => e2.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);
var Sa = (e2) => e2.match(/[\u4E00-\u9FD5]/gu);
var xa = (e2) => {
  var l3, t2;
  return (((l3 = Ma(e2)) == null ? void 0 : l3.reduce((a, n2) => a + (["", ",", "."].includes(n2.trim()) ? 0 : n2.trim().split(/\s+/u).length), 0)) ?? 0) + (((t2 = Sa(e2)) == null ? void 0 : t2.length) ?? 0);
};
var Ra = async () => {
  const { userAgentData: e2 } = navigator;
  let l3 = navigator.userAgent;
  if ((e2 == null ? void 0 : e2.platform) !== "Windows") return l3;
  const { platformVersion: t2 } = await e2.getHighEntropyValues(["platformVersion"]);
  return t2 && parseInt(t2.split(".")[0]) >= 13 && (l3 = l3.replace("Windows NT 10.0", "Windows NT 11.0")), l3;
};
var vt = ({ serverURL: e2, path: l3 = window.location.pathname, selector: t2 = ".waline-comment-count", lang: a = navigator.language }) => {
  const n2 = new AbortController(), o2 = document.querySelectorAll(t2);
  return o2.length && f({ serverURL: ye2(e2), paths: Array.from(o2).map((p2) => nt(xe(p2) ?? l3)), lang: a, signal: n2.signal }).then((p2) => {
    o2.forEach((s2, g) => {
      s2.innerText = p2[g].toString();
    });
  }).catch(ct), n2.abort.bind(n2);
};
var dt = ({ size: e2 }) => h("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: e2, height: e2 }, [h("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), h("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
var ja = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
var za = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
var Ua = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), h("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
var Va = ({ active: e2 = false }) => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e2 ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`, fill: e2 ? "red" : "currentColor" })]);
var Ha = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), h("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
var _a2 = () => h("svg", { width: "16", height: "16", ariaHidden: "true" }, h("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
var Ta = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
var Fa = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
var Na = () => h("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, h("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
var Pa = () => h("svg", { class: "administrator-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, [h("path", { d: "M461.6 129.56C489.6 105.96 534.8 105.96 562.4 129.56L625.6 183.96C637.6 194.36 660.4 202.76 676 202.76H744C786.4 202.76 821.2 237.56 821.2 279.96V347.96C821.2 363.96 829.6 386.36 840 398.36L894.4 461.56C918 489.16 918 534.76 894.8 562.36L840.4 625.56C830 637.56 821.6 660.36 821.6 675.96V743.96C821.6 786.36 786.8 821.16 744.4 821.16H676.4C660.4 821.16 638 829.56 626 839.96L562.8 894.36C534.8 917.96 489.6 917.96 462 894.36L398.8 839.96C386.8 829.56 364 821.16 348.4 821.16H279.2C236.8 821.16 202 786.36 202 743.96V675.56C201.999 659.96 193.6 637.56 183.6 625.56L129.6 561.96C106.4 534.36 106.4 489.56 129.6 461.96L183.6 398.36C193.6 386.359 202 363.959 202 348.36V279.96C202 237.56 236.8 202.76 279.2 202.76H348.4C364 202.76 386.8 194.36 398.8 184.36L461.6 129.56ZM549.567 331.896C530.047 303.082 486.645 306.12 471.433 337.412L442.175 396.526C435.587 409.848 422.856 419.097 408.146 421.226L342.706 430.726C340.776 431 338.884 431.397 336.993 431.946C303.482 441.361 292.756 483.493 317.671 507.812L364.975 553.96C375.623 564.321 380.507 579.299 377.991 593.954L366.917 659.102C366.595 661.03 366.355 662.967 366.279 664.923C364.906 699.688 401.683 722.937 432.514 706.738L491.05 675.966C504.217 669.068 519.954 669.069 533.121 675.966L591.675 706.738C593.406 707.645 595.174 708.432 597.028 709.104C629.666 721.205 663.139 693.382 657.273 659.102L646.069 593.954C643.42 579.176 648.24 564.083 659.001 553.6L706.315 507.461C707.687 506.118 708.994 504.66 710.215 503.127C731.779 475.809 715.737 435.41 681.281 430.365L615.839 420.874C601.13 418.745 588.4 409.486 581.821 396.174L552.562 337.052C551.644 335.284 550.674 333.551 549.567 331.896Z", fill: "#f59831" })]);
var ue2 = ({ size: e2 = 100 }) => h("svg", { width: e2, height: e2, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, h("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, h("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
var Wa = () => h("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [h("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), h("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
var Ba = () => useStorage("WALINE_USER_META", { nick: "", mail: "", link: "" });
var Da = () => useStorage("WALINE_COMMENT_BOX_EDITOR", "");
var qa = "WALINE_LIKE";
var Oa = useStorage(qa, []);
var pt = () => Oa;
var Ga = "WALINE_REACTION";
var Ka = useStorage(Ga, {});
var Za = () => Ka;
var gt = {};
var Xa = (e2) => {
  const l3 = gt[e2] ?? (gt[e2] = (0, import_recaptcha_v3.load)(e2, { useRecaptchaNet: true, autoHideBadge: true }));
  return { execute: (t2) => l3.then((a) => a.execute(t2)) };
};
var Ya = (e2) => ({ execute: async (l3) => {
  const { load: t2 } = useScriptTag("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, { async: false });
  await t2();
  const a = window.turnstile;
  return new Promise((n2) => {
    a == null || a.ready(() => {
      a.render(".wl-captcha-container", { sitekey: e2, action: l3, size: "compact", callback: n2 });
    });
  });
} });
var Ja = "WALINE_USER";
var Qa = useStorage(Ja, {});
var be2 = () => Qa;
var el = { key: 0, class: "wl-reaction" };
var tl = ["textContent"];
var al = { class: "wl-reaction-list" };
var ll = ["onClick"];
var nl = { class: "wl-reaction-img" };
var il = ["src", "alt"];
var rl = ["textContent"];
var ol = ["textContent"];
var sl = defineComponent({ __name: "ArticleReaction", setup(e2) {
  const l3 = Za(), t2 = inject(we2), a = ref(-1), n2 = ref([]), o2 = computed(() => t2.value.locale), p2 = computed(() => {
    const { reaction: v3 } = t2.value;
    return v3 != null && v3.length ? v3 : null;
  }), s2 = computed(() => {
    var v3;
    const { path: S2 } = t2.value;
    return ((v3 = p2.value) == null ? void 0 : v3.map((j3, L2) => ({ icon: j3, desc: o2.value[`reaction${L2}`], active: l3.value[S2] === L2 }))) ?? null;
  });
  let g;
  const u2 = async () => {
    const { serverURL: v3, lang: S2, path: j3 } = t2.value;
    if (!p2.value) return;
    const L2 = new AbortController();
    g = L2.abort.bind(L2);
    const [C3] = await p({ serverURL: v3, lang: S2, paths: [j3], type: p2.value.map((x2, R2) => `reaction${R2}`), signal: L2.signal });
    n2.value = p2.value.map((x2, R2) => C3[`reaction${R2}`]);
  }, w3 = async (v3) => {
    if (a.value !== -1) return;
    const { serverURL: S2, lang: j3, path: L2 } = t2.value, C3 = l3.value[L2];
    a.value = v3, C3 !== void 0 && (await d({ serverURL: S2, lang: j3, path: L2, type: `reaction${C3}`, action: "desc" }), n2.value[C3] = Math.max(n2.value[C3] - 1, 0)), C3 !== v3 && (await d({ serverURL: S2, lang: j3, path: L2, type: `reaction${v3}` }), n2.value[v3] = (n2.value[v3] || 0) + 1), C3 === v3 ? delete l3.value[L2] : l3.value[L2] = v3, a.value = -1;
  };
  return onMounted(() => {
    watchImmediate(() => [t2.value.serverURL, t2.value.path], () => u2());
  }), onUnmounted(() => {
    g == null || g();
  }), (v3, S2) => s2.value ? (openBlock(), createElementBlock("div", el, [createBaseVNode("div", { class: "wl-reaction-title", textContent: toDisplayString(o2.value.reactionTitle) }, null, 8, tl), createBaseVNode("ul", al, [(openBlock(true), createElementBlock(Fragment, null, renderList(s2.value, ({ active: j3, icon: L2, desc: C3 }, x2) => (openBlock(), createElementBlock("li", { key: x2, class: normalizeClass(["wl-reaction-item", { active: j3 }]), onClick: (R2) => w3(x2) }, [createBaseVNode("div", nl, [createBaseVNode("img", { src: L2, alt: C3 }, null, 8, il), a.value === x2 ? (openBlock(), createBlock(unref(ue2), { key: 0, class: "wl-reaction-loading" })) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-reaction-votes", textContent: toDisplayString(n2.value[x2] || 0) }, null, 8, rl))]), createBaseVNode("div", { class: "wl-reaction-text", textContent: toDisplayString(C3) }, null, 8, ol)], 10, ll))), 128))])])) : createCommentVNode("v-if", true);
} });
var cl = ["data-index"];
var ul = ["src", "title", "onClick"];
var ml = defineComponent({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e2) {
  const l3 = e2;
  let t2 = null;
  const a = useTemplateRef("wall"), n2 = ref({}), o2 = ref([]), p2 = () => {
    const v3 = Math.floor((a.value.getBoundingClientRect().width + l3.gap) / (l3.columnWidth + l3.gap));
    return v3 > 0 ? v3 : 1;
  }, s2 = (v3) => new Array(v3).fill(null).map(() => []), g = async (v3) => {
    var S2;
    if (v3 >= l3.items.length) return;
    await nextTick();
    const j3 = Array.from(((S2 = a.value) == null ? void 0 : S2.children) ?? []).reduce((L2, C3) => C3.getBoundingClientRect().height < L2.getBoundingClientRect().height ? C3 : L2);
    o2.value[Number(j3.dataset.index)].push(v3), await g(v3 + 1);
  }, u2 = async (v3 = false) => {
    if (o2.value.length === p2() && !v3) return;
    o2.value = s2(p2());
    const S2 = window.scrollY;
    await g(0), window.scrollTo({ top: S2 });
  }, w3 = (v3) => {
    n2.value[v3.target.src] = true;
  };
  return onMounted(() => {
    u2(true), t2 = new ResizeObserver(() => {
      u2();
    }), t2.observe(a.value), watch(() => [l3.items], () => {
      n2.value = {}, u2(true);
    }), watch(() => [l3.columnWidth, l3.gap], () => {
      u2();
    });
  }), onBeforeUnmount(() => {
    t2.unobserve(a.value);
  }), (v3, S2) => (openBlock(), createElementBlock("div", { ref_key: "wall", ref: a, class: "wl-gallery", style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o2.value, (j3, L2) => (openBlock(), createElementBlock("div", { key: L2, class: "wl-gallery-column", "data-index": L2, style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(j3, (C3) => (openBlock(), createElementBlock(Fragment, { key: C3 }, [n2.value[e2.items[C3].src] ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(ue2), { key: 0, size: 36, style: { margin: "20px auto" } })), createBaseVNode("img", { class: "wl-gallery-item", src: e2.items[C3].src, title: e2.items[C3].title, loading: "lazy", onLoad: w3, onClick: (x2) => v3.$emit("insert", `![](${e2.items[C3].src})`) }, null, 40, ul)], 64))), 128))], 12, cl))), 128))], 4));
} });
var vl = { key: 0, class: "wl-login-info" };
var dl = { class: "wl-avatar" };
var pl = ["title"];
var gl = ["title"];
var hl = ["src"];
var fl = ["title", "textContent"];
var wl = { class: "wl-panel" };
var yl = ["for", "textContent"];
var bl = ["id", "onUpdate:modelValue", "name", "type"];
var kl = ["placeholder"];
var Cl = { class: "wl-preview" };
var $l = ["innerHTML"];
var Ll = { class: "wl-footer" };
var El = { class: "wl-actions" };
var Il = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
var Al = ["title"];
var Ml = ["title"];
var Sl = ["title", "aria-label"];
var xl = ["title"];
var Rl = { class: "wl-info" };
var jl = { class: "wl-text-number" };
var zl = { key: 0 };
var Ul = ["textContent"];
var Vl = ["textContent"];
var Hl = ["disabled"];
var _l = ["placeholder"];
var Tl = { key: 1, class: "wl-loading" };
var Fl = { key: 0, class: "wl-tab-wrapper" };
var Nl = ["title", "onClick"];
var Pl = ["src", "alt"];
var Wl = { key: 0, class: "wl-tabs" };
var Bl = ["onClick"];
var Dl = ["src", "alt", "title"];
var ql = ["title"];
var ht = defineComponent({ __name: "CommentBox", props: { edit: {}, rootId: {}, replyId: {}, replyUser: {} }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e2, { emit: l3 }) {
  const t2 = e2, a = l3, n2 = inject(we2), o2 = Da(), p2 = Ba(), s2 = be2(), g = ref({}), u2 = useTemplateRef("textarea"), w3 = useTemplateRef("image-uploader"), v3 = useTemplateRef("emoji-button"), S2 = useTemplateRef("emoji-popup"), j3 = useTemplateRef("gif-button"), L2 = useTemplateRef("gif-popup"), C3 = useTemplateRef("gif-search"), x2 = ref({ tabs: [], map: {} }), R2 = ref(0), d3 = ref(false), K2 = ref(false), Y = ref(false), A = ref(""), V2 = ref(0), T2 = reactive({ loading: true, list: [] }), le2 = ref(0), ee = ref(false), me2 = ref(""), f2 = ref(false), z2 = ref(false), y3 = computed(() => n2.value.locale), F2 = computed(() => !!s2.value.token), q2 = computed(() => n2.value.imageUploader !== null), O = (h2) => {
    const i = u2.value, k2 = i.selectionStart, _2 = i.selectionEnd || 0, b2 = i.scrollTop;
    o2.value = i.value.substring(0, k2) + h2 + i.value.substring(_2, i.value.length), i.focus(), i.selectionStart = k2 + h2.length, i.selectionEnd = k2 + h2.length, i.scrollTop = b2;
  }, re2 = ({ key: h2, ctrlKey: i, metaKey: k2 }) => {
    f2.value || (i || k2) && h2 === "Enter" && Re2();
  }, ve2 = async (h2) => {
    const i = `![${n2.value.locale.uploading} ${h2.name}]()`;
    O(i), f2.value = true;
    try {
      const k2 = await n2.value.imageUploader(h2);
      o2.value = o2.value.replace(i, `\r
![${h2.name}](${k2})`);
    } catch (k2) {
      alert(k2.message), o2.value = o2.value.replace(i, "");
    } finally {
      f2.value = false;
    }
  }, ke2 = (h2) => {
    var i;
    if ((i = h2.dataTransfer) != null && i.items) {
      const k2 = ut(h2.dataTransfer.items);
      k2 && q2.value && (ve2(k2), h2.preventDefault());
    }
  }, bt = (h2) => {
    if (h2.clipboardData) {
      const i = ut(h2.clipboardData.items);
      i && q2.value && ve2(i);
    }
  }, kt = () => {
    const h2 = w3.value;
    h2.files && q2.value && ve2(h2.files[0]).then(() => {
      h2.value = "";
    });
  }, Re2 = async () => {
    var h2;
    const { serverURL: i, lang: k2, login: _2, wordLimit: b2, requiredMeta: B2, recaptchaV3Key: N2, turnstileKey: J2 } = n2.value, H = { comment: me2.value, nick: p2.value.nick, mail: p2.value.mail, link: p2.value.link, url: n2.value.path, ua: await Ra() };
    if (!t2.edit) if (s2.value.token) H.nick = s2.value.display_name, H.mail = s2.value.email, H.link = s2.value.url;
    else {
      if (_2 === "force") return;
      if (B2.includes("nick") && !H.nick) {
        g.value.nick.focus(), alert(y3.value.nickError);
        return;
      }
      if (B2.includes("mail") && !H.mail || H.mail && !fa(H.mail)) {
        g.value.mail.focus(), alert(y3.value.mailError);
        return;
      }
      H.nick || (H.nick = y3.value.anonymous);
    }
    if (!H.comment) {
      u2.value.focus();
      return;
    }
    if (!ee.value) {
      alert(y3.value.wordHint.replace("$0", b2[0].toString()).replace("$1", b2[1].toString()).replace("$2", V2.value.toString()));
      return;
    }
    H.comment = mt(H.comment, x2.value.map), t2.replyId && t2.rootId && (H.pid = t2.replyId, H.rid = t2.rootId, H.at = t2.replyUser), f2.value = true;
    try {
      N2 && (H.recaptchaV3 = await Xa(N2).execute("social")), J2 && (H.turnstile = await Ya(J2).execute("social"));
      const de2 = { serverURL: i, lang: k2, token: s2.value.token, comment: H }, Ce2 = await (t2.edit ? U({ objectId: t2.edit.objectId, ...de2 }) : u(de2));
      if (f2.value = false, Ce2.errmsg) {
        alert(Ce2.errmsg);
        return;
      }
      a("submit", Ce2.data), o2.value = "", A.value = "", await nextTick(), t2.replyId && a("cancelReply"), (h2 = t2.edit) != null && h2.objectId && a("cancelEdit");
    } catch (de2) {
      f2.value = false, alert(de2.message);
    }
  }, Ct = (h2) => {
    h2.preventDefault();
    const { lang: i, serverURL: k2 } = n2.value;
    R({ serverURL: k2, lang: i }).then((_2) => {
      s2.value = _2, (_2.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(_2)), a("log");
    });
  }, $t = () => {
    s2.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), a("log");
  }, je2 = (h2) => {
    h2.preventDefault();
    const { lang: i, serverURL: k2 } = n2.value, _2 = 800, b2 = 800, B2 = (window.innerWidth - _2) / 2, N2 = (window.innerHeight - b2) / 2, J2 = new URLSearchParams({ lng: i, token: s2.value.token }), H = window.open(`${k2}/ui/profile?${J2.toString()}`, "_blank", `width=${_2},height=${b2},left=${B2},top=${N2},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    H == null || H.postMessage({ type: "TOKEN", data: s2.value.token }, "*");
  }, Lt = (h2) => {
    var i, k2, _2, b2;
    !((i = v3.value) != null && i.contains(h2.target)) && !((k2 = S2.value) != null && k2.contains(h2.target)) && (d3.value = false), !((_2 = j3.value) != null && _2.contains(h2.target)) && !((b2 = L2.value) != null && b2.contains(h2.target)) && (K2.value = false);
  }, ze2 = async (h2) => {
    var i;
    const { scrollTop: k2, clientHeight: _2, scrollHeight: b2 } = h2.target, B2 = (_2 + k2) / b2, N2 = n2.value.search, J2 = ((i = C3.value) == null ? void 0 : i.value) ?? "";
    B2 < 0.9 || T2.loading || z2.value || (T2.loading = true, (N2.more && T2.list.length ? await N2.more(J2, T2.list.length) : await N2.search(J2)).length ? T2.list = [...T2.list, ...N2.more && T2.list.length ? await N2.more(J2, T2.list.length) : await N2.search(J2)] : z2.value = true, T2.loading = false, setTimeout(() => {
      h2.target.scrollTop = k2;
    }, 50));
  }, Ue2 = useDebounceFn((h2) => {
    T2.list = [], z2.value = false, ze2(h2);
  }, 300);
  return useEventListener("click", Lt), useEventListener("message", ({ data: h2 }) => {
    (h2 == null ? void 0 : h2.type) === "profile" && (s2.value = { ...s2.value, ...h2.data }, [localStorage, sessionStorage].filter((i) => i.getItem("WALINE_USER")).forEach((i) => {
      i.setItem("WALINE_USER", JSON.stringify(s2));
    }));
  }), watchImmediate([n2, V2], ([h2, i]) => {
    const { wordLimit: k2 } = h2;
    k2 ? i < k2[0] && k2[0] !== 0 ? (le2.value = k2[0], ee.value = false) : i > k2[1] ? (le2.value = k2[1], ee.value = false) : (le2.value = k2[1], ee.value = true) : (le2.value = 0, ee.value = true);
  }), watch(K2, async (h2) => {
    var i;
    if (!h2) return;
    const k2 = n2.value.search;
    C3.value && (C3.value.value = ""), T2.loading = true, T2.list = await (((i = k2.default) == null ? void 0 : i.call(k2)) ?? k2.search("")), T2.loading = false;
  }), onMounted(() => {
    var h2;
    (h2 = t2.edit) != null && h2.objectId && (o2.value = t2.edit.orig), watchImmediate(() => o2.value, (i) => {
      const { highlighter: k2, texRenderer: _2 } = n2.value;
      me2.value = i, A.value = Aa(i, { emojiMap: x2.value.map, highlighter: k2, texRenderer: _2 }), V2.value = xa(i), i ? autosize_esm_default(u2.value) : autosize_esm_default.destroy(u2.value);
    }), watchImmediate(() => n2.value.emoji, async (i) => {
      x2.value = await ka(i);
    });
  }), (h2, i) => {
    var k2, _2;
    return openBlock(), createElementBlock("div", { key: unref(s2).token, class: "wl-comment" }, [unref(n2).login !== "disable" && F2.value && !((k2 = e2.edit) != null && k2.objectId) ? (openBlock(), createElementBlock("div", vl, [createBaseVNode("div", dl, [createBaseVNode("button", { type: "submit", class: "wl-logout-btn", title: y3.value.logout, onClick: $t }, [createVNode(unref(dt), { size: 14 })], 8, pl), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: y3.value.profile, onClick: je2 }, [createBaseVNode("img", { src: unref(s2).avatar, alt: "avatar" }, null, 8, hl)], 8, gl)]), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: y3.value.profile, onClick: je2, textContent: toDisplayString(unref(s2).display_name) }, null, 8, fl)])) : createCommentVNode("v-if", true), createBaseVNode("div", wl, [unref(n2).login !== "force" && unref(n2).meta.length && !F2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["wl-header", `item${unref(n2).meta.length}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(n2).meta, (b2) => (openBlock(), createElementBlock("div", { key: b2, class: "wl-header-item" }, [createBaseVNode("label", { for: `wl-${b2}`, textContent: toDisplayString(y3.value[b2] + (unref(n2).requiredMeta.includes(b2) || !unref(n2).requiredMeta.length ? "" : `(${y3.value.optional})`)) }, null, 8, yl), withDirectives(createBaseVNode("input", { id: `wl-${b2}`, ref_for: true, ref: (B2) => {
      B2 && (g.value[b2] = B2);
    }, "onUpdate:modelValue": (B2) => unref(p2)[b2] = B2, class: normalizeClass(["wl-input", `wl-${b2}`]), name: b2, type: b2 === "mail" ? "email" : "text" }, null, 10, bl), [[vModelDynamic, unref(p2)[b2]]])]))), 128))], 2)) : createCommentVNode("v-if", true), withDirectives(createBaseVNode("textarea", { id: "wl-edit", ref: "textarea", "onUpdate:modelValue": i[0] || (i[0] = (b2) => isRef(o2) ? o2.value = b2 : null), class: "wl-editor", placeholder: e2.replyUser ? `@${e2.replyUser}` : y3.value.placeholder, onKeydown: re2, onDrop: ke2, onPaste: bt }, null, 40, kl), [[vModelText, unref(o2)]]), withDirectives(createBaseVNode("div", Cl, [i[7] || (i[7] = createBaseVNode("hr", null, null, -1)), createBaseVNode("h4", null, toDisplayString(y3.value.preview) + ":", 1), createBaseVNode("div", { class: "wl-content", innerHTML: A.value }, null, 8, $l)], 512), [[vShow, Y.value]]), createBaseVNode("div", Ll, [createBaseVNode("div", El, [createBaseVNode("a", Il, [createVNode(unref(_a2))]), withDirectives(createBaseVNode("button", { ref: "emoji-button", type: "button", class: normalizeClass(["wl-action", { active: d3.value }]), title: y3.value.emoji, onClick: i[1] || (i[1] = (b2) => d3.value = !d3.value) }, [createVNode(unref(za))], 10, Al), [[vShow, x2.value.tabs.length]]), unref(n2).search ? (openBlock(), createElementBlock("button", { key: 0, ref: "gif-button", type: "button", class: normalizeClass(["wl-action", { active: K2.value }]), title: y3.value.gif, onClick: i[2] || (i[2] = (b2) => K2.value = !K2.value) }, [createVNode(unref(Wa))], 10, Ml)) : createCommentVNode("v-if", true), createBaseVNode("input", { id: "wl-image-upload", ref: "image-uploader", class: "upload", "aria-hidden": "true", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: kt }, null, 544), q2.value ? (openBlock(), createElementBlock("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: y3.value.uploadImage, "aria-label": y3.value.uploadImage }, [createVNode(unref(Ua))], 8, Sl)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-action", { active: Y.value }]), title: y3.value.preview, onClick: i[3] || (i[3] = (b2) => Y.value = !Y.value) }, [createVNode(unref(Ha))], 10, xl)]), createBaseVNode("div", Rl, [i[9] || (i[9] = createBaseVNode("div", { class: "wl-captcha-container" }, null, -1)), createBaseVNode("div", jl, [createTextVNode(toDisplayString(V2.value) + " ", 1), unref(n2).wordLimit ? (openBlock(), createElementBlock("span", zl, [i[8] || (i[8] = createTextVNode("  /  ", -1)), createBaseVNode("span", { class: normalizeClass({ illegal: !ee.value }), textContent: toDisplayString(le2.value) }, null, 10, Ul)])) : createCommentVNode("v-if", true), createTextVNode("  " + toDisplayString(y3.value.word), 1)]), unref(n2).login !== "disable" && !F2.value ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-btn", onClick: Ct, textContent: toDisplayString(y3.value.login) }, null, 8, Vl)) : createCommentVNode("v-if", true), unref(n2).login !== "force" || F2.value ? (openBlock(), createElementBlock("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: f2.value, onClick: Re2 }, [f2.value ? (openBlock(), createBlock(unref(ue2), { key: 0, size: 16 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(y3.value.submit), 1)], 64))], 8, Hl)) : createCommentVNode("v-if", true)]), createBaseVNode("div", { ref: "gif-popup", class: normalizeClass(["wl-gif-popup", { display: K2.value }]) }, [createBaseVNode("input", { ref: "gif-search", type: "text", placeholder: y3.value.gifSearchPlaceholder, onInput: i[4] || (i[4] = (...b2) => unref(Ue2) && unref(Ue2)(...b2)) }, null, 40, _l), T2.list.length ? (openBlock(), createBlock(ml, { key: 0, items: T2.list, "column-width": 200, gap: 6, onInsert: i[5] || (i[5] = (b2) => O(b2)), onScroll: ze2 }, null, 8, ["items"])) : createCommentVNode("v-if", true), T2.loading ? (openBlock(), createElementBlock("div", Tl, [createVNode(unref(ue2), { size: 30 })])) : createCommentVNode("v-if", true)], 2), createBaseVNode("div", { ref: "emoji-popup", class: normalizeClass(["wl-emoji-popup", { display: d3.value }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(x2.value.tabs, (b2, B2) => (openBlock(), createElementBlock(Fragment, { key: b2.name }, [B2 === R2.value ? (openBlock(), createElementBlock("div", Fl, [(openBlock(true), createElementBlock(Fragment, null, renderList(b2.items, (N2) => (openBlock(), createElementBlock("button", { key: N2, type: "button", title: N2, onClick: (J2) => O(`:${N2}:`) }, [d3.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji", src: x2.value.map[N2], alt: N2, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Pl)) : createCommentVNode("v-if", true)], 8, Nl))), 128))])) : createCommentVNode("v-if", true)], 64))), 128)), x2.value.tabs.length > 1 ? (openBlock(), createElementBlock("div", Wl, [(openBlock(true), createElementBlock(Fragment, null, renderList(x2.value.tabs, (b2, B2) => (openBlock(), createElementBlock("button", { key: b2.name, type: "button", class: normalizeClass(["wl-tab", { active: R2.value === B2 }]), onClick: (N2) => R2.value = B2 }, [createBaseVNode("img", { class: "wl-emoji", src: b2.icon, alt: b2.name, title: b2.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Dl)], 10, Bl))), 128))])) : createCommentVNode("v-if", true)], 2)])]), e2.replyId || (_2 = e2.edit) != null && _2.objectId ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-close", title: y3.value.cancelReply, onClick: i[6] || (i[6] = (b2) => e2.replyId ? a("cancelReply") : a("cancelEdit")) }, [createVNode(unref(dt), { size: 24 })], 8, ql)) : createCommentVNode("v-if", true)]);
  };
} });
var Ol = ["id"];
var Gl = { class: "wl-user", "aria-hidden": "true" };
var Kl = ["src"];
var Zl = { class: "wl-card" };
var Xl = { class: "wl-head" };
var Yl = ["href"];
var Jl = { key: 1, class: "wl-nick" };
var Ql = ["textContent"];
var en = ["textContent"];
var tn = ["textContent"];
var an = ["textContent"];
var ln = { class: "wl-comment-actions" };
var nn = ["title"];
var rn = ["title"];
var on = { class: "wl-meta", "aria-hidden": "true" };
var sn = ["data-value", "textContent"];
var cn = { key: 0, class: "wl-content" };
var un = { key: 0 };
var mn = ["href"];
var vn = ["innerHTML"];
var dn = { key: 1, class: "wl-admin-actions" };
var pn = { class: "wl-comment-status" };
var gn = ["disabled", "onClick", "textContent"];
var hn = { key: 3, class: "wl-quote" };
var fn = defineComponent({ __name: "CommentCard", props: { comment: {}, edit: {}, rootId: {}, reply: {} }, emits: ["log", "submit", "delete", "like", "sticky", "edit", "reply", "status"], setup(e2, { emit: l3 }) {
  const t2 = e2, a = l3, n2 = ["approved", "waiting", "spam"], o2 = inject(we2), p2 = pt(), s2 = useNow(), g = be2(), u2 = computed(() => o2.value.locale), w3 = computed(() => {
    const { link: R2 } = t2.comment;
    return R2 ? rt(R2) ? R2 : `https://${R2}` : "";
  }), v3 = computed(() => p2.value.includes(t2.comment.objectId)), S2 = computed(() => ga(new Date(t2.comment.time), s2.value, u2.value)), j3 = computed(() => g.value.type === "administrator"), L2 = computed(() => t2.comment.user_id && g.value.objectId === t2.comment.user_id), C3 = computed(() => {
    var R2;
    return t2.comment.objectId === ((R2 = t2.reply) == null ? void 0 : R2.objectId);
  }), x2 = computed(() => {
    var R2;
    return t2.comment.objectId === ((R2 = t2.edit) == null ? void 0 : R2.objectId);
  });
  return (R2, d3) => {
    var K2;
    const Y = resolveComponent("CommentCard", true);
    return openBlock(), createElementBlock("div", { id: e2.comment.objectId.toString(), class: "wl-card-item" }, [createBaseVNode("div", Gl, [e2.comment.avatar ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-user-avatar", src: e2.comment.avatar, alt: "" }, null, 8, Kl)) : createCommentVNode("v-if", true), e2.comment.type === "guest" ? (openBlock(), createBlock(unref(Na), { key: 1 })) : createCommentVNode("v-if", true), e2.comment.type === "administrator" ? (openBlock(), createBlock(unref(Pa), { key: 2 })) : createCommentVNode("v-if", true)]), createBaseVNode("div", Zl, [createBaseVNode("div", Xl, [w3.value ? (openBlock(), createElementBlock("a", { key: 0, class: "wl-nick", href: w3.value, target: "_blank", rel: "nofollow noopener noreferrer" }, toDisplayString(e2.comment.nick), 9, Yl)) : (openBlock(), createElementBlock("span", Jl, toDisplayString(e2.comment.nick), 1)), e2.comment.label ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-badge", textContent: toDisplayString(e2.comment.label) }, null, 8, Ql)) : createCommentVNode("v-if", true), e2.comment.sticky ? (openBlock(), createElementBlock("span", { key: 3, class: "wl-badge", textContent: toDisplayString(u2.value.sticky) }, null, 8, en)) : createCommentVNode("v-if", true), typeof e2.comment.level == "number" ? (openBlock(), createElementBlock("span", { key: 4, class: normalizeClass(`wl-badge level${e2.comment.level}`), textContent: toDisplayString(u2.value[`level${e2.comment.level}`] || `Level ${e2.comment.level}`) }, null, 10, tn)) : createCommentVNode("v-if", true), createBaseVNode("span", { class: "wl-time", textContent: toDisplayString(S2.value) }, null, 8, an), createBaseVNode("div", ln, [j3.value || L2.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("button", { type: "button", class: "wl-edit", onClick: d3[0] || (d3[0] = (A) => a("edit", e2.comment)) }, [createVNode(unref(Fa))]), createBaseVNode("button", { type: "button", class: "wl-delete", onClick: d3[1] || (d3[1] = (A) => a("delete", e2.comment)) }, [createVNode(unref(ja))])], 64)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: "wl-like", title: v3.value ? u2.value.cancelLike : u2.value.like, onClick: d3[2] || (d3[2] = (A) => a("like", e2.comment)) }, [createVNode(unref(Va), { active: v3.value }, null, 8, ["active"]), createTextVNode(" " + toDisplayString("like" in e2.comment ? e2.comment.like : ""), 1)], 8, nn), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-reply", { active: C3.value }]), title: C3.value ? u2.value.cancelReply : u2.value.reply, onClick: d3[3] || (d3[3] = (A) => a("reply", C3.value ? null : e2.comment)) }, [createVNode(unref(Ta))], 10, rn)])]), createBaseVNode("div", on, [(openBlock(), createElementBlock(Fragment, null, renderList(["addr", "browser", "os"], (A) => (openBlock(), createElementBlock(Fragment, null, [e2.comment[A] ? (openBlock(), createElementBlock("span", { key: A, class: normalizeClass(`wl-${A}`), "data-value": e2.comment[A], textContent: toDisplayString(e2.comment[A]) }, null, 10, sn)) : createCommentVNode("v-if", true)], 64))), 64))]), x2.value ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", cn, ["reply_user" in e2.comment && e2.comment.reply_user ? (openBlock(), createElementBlock("p", un, [createBaseVNode("a", { href: "#" + e2.comment.pid }, "@" + toDisplayString(e2.comment.reply_user.nick), 9, mn), d3[17] || (d3[17] = createBaseVNode("span", null, ": ", -1))])) : createCommentVNode("v-if", true), createBaseVNode("div", { innerHTML: e2.comment.comment }, null, 8, vn)])), j3.value && !x2.value ? (openBlock(), createElementBlock("div", dn, [createBaseVNode("span", pn, [(openBlock(), createElementBlock(Fragment, null, renderList(n2, (A) => createBaseVNode("button", { key: A, type: "submit", class: normalizeClass(`wl-btn wl-${A}`), disabled: e2.comment.status === A, onClick: (V2) => a("status", { status: A, comment: e2.comment }), textContent: toDisplayString(u2.value[A]) }, null, 10, gn)), 64))]), j3.value && !("rid" in e2.comment) ? (openBlock(), createElementBlock("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: d3[4] || (d3[4] = (A) => a("sticky", e2.comment)) }, toDisplayString(e2.comment.sticky ? u2.value.unsticky : u2.value.sticky), 1)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), C3.value || x2.value ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass({ "wl-reply-wrapper": C3.value, "wl-edit-wrapper": x2.value }) }, [createVNode(ht, { edit: e2.edit, "reply-id": (K2 = e2.reply) == null ? void 0 : K2.objectId, "reply-user": e2.comment.nick, "root-id": e2.rootId, onLog: d3[5] || (d3[5] = (A) => a("log")), onCancelReply: d3[6] || (d3[6] = (A) => a("reply", null)), onCancelEdit: d3[7] || (d3[7] = (A) => a("edit", null)), onSubmit: d3[8] || (d3[8] = (A) => a("submit", A)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : createCommentVNode("v-if", true), "children" in e2.comment ? (openBlock(), createElementBlock("div", hn, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.comment.children, (A) => (openBlock(), createBlock(Y, { key: A.objectId, comment: A, reply: e2.reply, edit: e2.edit, "root-id": e2.rootId, onLog: d3[9] || (d3[9] = (V2) => a("log")), onDelete: d3[10] || (d3[10] = (V2) => a("delete", V2)), onEdit: d3[11] || (d3[11] = (V2) => a("edit", V2)), onLike: d3[12] || (d3[12] = (V2) => a("like", V2)), onReply: d3[13] || (d3[13] = (V2) => a("reply", V2)), onStatus: d3[14] || (d3[14] = (V2) => a("status", V2)), onSticky: d3[15] || (d3[15] = (V2) => a("sticky", V2)), onSubmit: d3[16] || (d3[16] = (V2) => a("submit", V2)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : createCommentVNode("v-if", true)])], 8, Ol);
  };
} });
var ft = "3.8.0";
var wn = { "data-waline": "" };
var yn = { class: "wl-meta-head" };
var bn = { class: "wl-count" };
var kn = ["textContent"];
var Cn = { class: "wl-sort" };
var $n = ["onClick"];
var Ln = { class: "wl-cards" };
var En = { key: 1, class: "wl-operation" };
var In = ["textContent"];
var An = { key: 2, class: "wl-loading" };
var Mn = ["textContent"];
var Sn = { key: 4, class: "wl-operation" };
var xn = ["textContent"];
var Rn = { key: 5, class: "wl-power" };
var jn = defineComponent({ __name: "WalineComment", props: { serverURL: {}, path: {}, meta: {}, requiredMeta: {}, wordLimit: {}, pageSize: {}, lang: {}, locale: {}, commentSorting: {}, dark: { type: [String, Boolean] }, login: {}, noCopyright: { type: Boolean }, recaptchaV3Key: {}, turnstileKey: {}, reaction: { type: [Array, Boolean] }, emoji: {}, search: {}, highlighter: { type: Function }, imageUploader: { type: Function }, texRenderer: { type: Function } }, setup(e2) {
  const l3 = e2, t2 = be2(), a = pt(), n2 = ref("loading"), o2 = ref(0), p2 = ref(1), s2 = ref(0), g = computed(() => va(l3)), u2 = ref(g.value.commentSorting), w3 = ref([]), v3 = ref(null), S2 = ref(null), j3 = computed(() => da(g.value.dark)), L2 = computed(() => g.value.locale);
  useStyleTag(j3, { id: "waline-darkmode" });
  let C3 = null;
  const x2 = (f2) => {
    const { serverURL: z2, path: y3, pageSize: F2 } = g.value, q2 = new AbortController();
    n2.value = "loading", C3 == null || C3(), $({ serverURL: z2, lang: g.value.lang, path: y3, pageSize: F2, sortBy: lt[u2.value], page: f2, signal: q2.signal, token: t2.value.token }).then((O) => {
      n2.value = "success", o2.value = O.count, w3.value.push(...O.data), p2.value = f2, s2.value = O.totalPages;
    }).catch((O) => {
      O.name !== "AbortError" && (console.error(O.message), n2.value = "error");
    }), C3 = q2.abort.bind(q2);
  }, R2 = () => {
    x2(p2.value + 1);
  }, d3 = () => {
    o2.value = 0, w3.value = [], x2(1);
  }, K2 = (f2) => {
    u2.value !== f2 && (u2.value = f2, d3());
  }, Y = (f2) => {
    v3.value = f2;
  }, A = (f2) => {
    S2.value = f2;
  }, V2 = (f2) => {
    if (S2.value) S2.value.comment = f2.comment, S2.value.orig = f2.orig;
    else if ("rid" in f2) {
      const z2 = w3.value.find(({ objectId: y3 }) => y3 === f2.rid);
      if (!z2) return;
      Array.isArray(z2.children) || (z2.children = []), z2.children.push(f2);
    } else w3.value.unshift(f2), o2.value += 1;
  }, T2 = async ({ comment: f2, status: z2 }) => {
    if (f2.status === z2) return;
    const { serverURL: y3, lang: F2 } = g.value;
    await U({ serverURL: y3, lang: F2, token: t2.value.token, objectId: f2.objectId, comment: { status: z2 } }), f2.status = z2;
  }, le2 = async (f2) => {
    if ("rid" in f2) return;
    const { serverURL: z2, lang: y3 } = g.value;
    await U({ serverURL: z2, lang: y3, token: t2.value.token, objectId: f2.objectId, comment: { sticky: f2.sticky ? 0 : 1 } }), f2.sticky = !f2.sticky;
  }, ee = async ({ objectId: f2 }) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    const { serverURL: z2, lang: y3 } = g.value;
    await y({ serverURL: z2, lang: y3, token: t2.value.token, objectId: f2 }), w3.value.some((F2, q2) => F2.objectId === f2 ? (w3.value = w3.value.filter((O, re2) => re2 !== q2), true) : F2.children.some((O, re2) => O.objectId === f2 ? (w3.value[q2].children = F2.children.filter((ve2, ke2) => ke2 !== re2), true) : false));
  }, me2 = async (f2) => {
    const { serverURL: z2, lang: y3 } = g.value, { objectId: F2 } = f2, q2 = a.value.includes(F2);
    await U({ serverURL: z2, lang: y3, objectId: F2, token: t2.value.token, comment: { like: !q2 } }), q2 ? a.value = a.value.filter((O) => O !== F2) : (a.value = [...a.value, F2], a.value.length > 50 && (a.value = a.value.slice(-50))), f2.like = Math.max(0, (f2.like || 0) + (q2 ? -1 : 1));
  };
  return provide(we2, g), onMounted(() => {
    watchImmediate(() => [l3.serverURL, l3.path], () => {
      d3();
    });
  }), onUnmounted(() => {
    C3 == null || C3();
  }), (f2, z2) => (openBlock(), createElementBlock("div", wn, [createVNode(sl), !v3.value && !S2.value ? (openBlock(), createBlock(ht, { key: 0, onLog: d3, onSubmit: V2 })) : createCommentVNode("v-if", true), createBaseVNode("div", yn, [createBaseVNode("div", bn, [o2.value ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-num", textContent: toDisplayString(o2.value) }, null, 8, kn)) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString(L2.value.comment), 1)]), createBaseVNode("ul", Cn, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(ua), (y3) => (openBlock(), createElementBlock("li", { key: y3, class: normalizeClass([y3 === u2.value ? "active" : ""]), onClick: (F2) => K2(y3) }, toDisplayString(L2.value[y3]), 11, $n))), 128))])]), createBaseVNode("div", Ln, [(openBlock(true), createElementBlock(Fragment, null, renderList(w3.value, (y3) => (openBlock(), createBlock(fn, { key: y3.objectId, "root-id": y3.objectId, comment: y3, reply: v3.value, edit: S2.value, onLog: d3, onReply: Y, onEdit: A, onSubmit: V2, onStatus: T2, onDelete: ee, onSticky: le2, onLike: me2 }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), n2.value === "error" ? (openBlock(), createElementBlock("div", En, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: d3, textContent: toDisplayString(L2.value.refresh) }, null, 8, In)])) : n2.value === "loading" ? (openBlock(), createElementBlock("div", An, [createVNode(unref(ue2), { size: 30 })])) : w3.value.length ? p2.value < s2.value ? (openBlock(), createElementBlock("div", Sn, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: R2, textContent: toDisplayString(L2.value.more) }, null, 8, xn)])) : createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 3, class: "wl-empty", textContent: toDisplayString(L2.value.sofa) }, null, 8, Mn)), g.value.noCopyright ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", Rn, [z2[0] || (z2[0] = createTextVNode(" Powered by ", -1)), z2[1] || (z2[1] = createBaseVNode("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1)), createTextVNode(" v" + toDisplayString(unref(ft)), 1)]))]));
} });
var wt = (e2, l3) => {
  l3.forEach((t2, a) => {
    const n2 = e2[a].time;
    typeof n2 == "number" && (t2.innerText = n2.toString());
  });
};
var yt = ({ serverURL: e2, path: l3 = window.location.pathname, selector: t2 = ".waline-pageview-count", update: a = true, lang: n2 = navigator.language }) => {
  const o2 = new AbortController(), p2 = Array.from(document.querySelectorAll(t2)), s2 = (u2) => {
    const w3 = xe(u2);
    return w3 !== null && l3 !== w3;
  }, g = (u2) => j({ serverURL: ye2(e2), paths: u2.map((w3) => xe(w3) ?? l3), lang: n2, signal: o2.signal }).then((w3) => wt(w3, u2)).catch(ct);
  if (a) {
    const u2 = p2.filter((v3) => !s2(v3)), w3 = p2.filter(s2);
    v({ serverURL: ye2(e2), path: l3, lang: n2 }).then((v3) => wt(v3, u2)), w3.length && g(w3);
  } else g(p2);
  return o2.abort.bind(o2);
};
var zn = ({ el: e2 = "#waline", path: l3 = window.location.pathname, comment: t2 = false, pageview: a = false, ...n2 }) => {
  const o2 = e2 ? Se2(e2) : null;
  if (e2 && !o2) throw new Error("Option 'el' do not match any domElement!");
  if (!n2.serverURL) throw new Error("Option 'serverURL' is missing!");
  const p2 = reactive({ ...n2 }), s2 = reactive({ comment: t2, pageview: a, path: l3 }), g = () => {
    s2.comment && vt({ serverURL: p2.serverURL, path: s2.path, ...ie2(s2.comment) ? { selector: s2.comment } : {} });
  }, u2 = () => {
    s2.pageview && yt({ serverURL: p2.serverURL, path: s2.path, ...ie2(s2.pageview) ? { selector: s2.pageview } : {} });
  };
  let w3 = null;
  o2 && (w3 = createApp(() => h(jn, { path: s2.path, ...p2 })), w3.mount(o2));
  const v3 = watchEffect(g), S2 = watchEffect(u2);
  return { el: o2, update: ({ comment: j3, pageview: L2, path: C3 = window.location.pathname, ...x2 } = {}) => {
    Object.entries(x2).forEach(([R2, d3]) => {
      p2[R2] = d3;
    }), s2.path = C3, j3 !== void 0 && (s2.comment = j3), L2 !== void 0 && (s2.pageview = L2);
  }, destroy: () => {
    w3 == null || w3.unmount(), v3(), S2();
  } };
};
var Un = ({ el: e2, serverURL: l3, count: t2, lang: a = navigator.language }) => {
  const n2 = be2(), o2 = Se2(e2), p2 = new AbortController();
  return w({ serverURL: l3, count: t2, lang: a, signal: p2.signal, token: n2.value.token }).then((s2) => o2 && s2.length ? (o2.innerHTML = `<ul class="wl-recent-list">${s2.map((g) => `<li class="wl-recent-item"><a href="${g.url}">${g.nick}</a>：${g.comment}</li>`).join("")}</ul>`, { comments: s2, destroy: () => {
    p2.abort(), o2.innerHTML = "";
  } }) : { comments: s2, destroy: () => p2.abort() });
};
var Vn = ({ el: e2, serverURL: l3, count: t2, locale: a, lang: n2 = navigator.language, mode: o2 = "list" }) => {
  const p2 = Se2(e2), s2 = new AbortController();
  return C({ serverURL: l3, pageSize: t2, lang: n2, signal: s2.signal }).then((g) => !p2 || !g.length ? { users: g, destroy: () => s2.abort() } : (a = { ...tt(n2), ...typeof a == "object" ? a : {} }, p2.innerHTML = `<ul class="wl-user-${o2}">${g.map((u2, w3) => [`<li class="wl-user-item" aria-label="${u2.nick}">`, u2.link && `<a href="${u2.link}" target="_blank">`, '<div class="wl-user-avatar">', `<img src="${u2.avatar}" alt="${u2.nick}">`, `<span class="wl-user-badge">${w3 + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', u2.nick, u2.level && `<span class="wl-badge">${a ? a[`level${u2.level}`] : `Level ${u2.level}`}</span>`, u2.label && `<span class="wl-badge">${u2.label}</span>`, "</div>", u2.link && u2.link, "</div>", u2.link && "</a>", "</li>"].filter((v3) => v3).join("")).join("")}</ul>`, { users: g, destroy: () => {
    s2.abort(), p2.innerHTML = "";
  } }));
};
export {
  Un as RecentComments,
  Vn as UserList,
  u as addComment,
  vt as commentCount,
  fe2 as defaultLocales,
  y as deleteComment,
  f as fetchCommentCount,
  p as getArticleCounter,
  $ as getComment,
  j as getPageview,
  w as getRecentComment,
  C as getUserList,
  zn as init,
  R as login,
  yt as pageviewCount,
  d as updateArticleCounter,
  U as updateComment,
  v as updatePageview,
  ft as version
};
//# sourceMappingURL=@waline_client.js.map
