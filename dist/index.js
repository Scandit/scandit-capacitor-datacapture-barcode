import { SymbologyDescription, BarcodeTrackingAdvancedOverlayListenerEvents, BaseBarcodeTrackingAdvancedOverlay, TrackedBarcode, getBarcodeCountDefaults, loadBarcodeDefaults, loadBarcodeCaptureDefaults, loadBarcodeTrackingDefaults, loadBarcodeSelectionDefaults, loadBarcodeCountDefaults, getBarcodeDefaults, Barcode, Checksum, CompositeFlag, CompositeType, Symbology, SymbologySettings, BarcodeCapture, BarcodeCaptureSettings, BarcodeCaptureSession, BarcodeCaptureOverlay, BarcodeCaptureOverlayStyle, BarcodeCaptureFeedback, BarcodeSelection, BarcodeSelectionSettings, BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionFeedback, BarcodeSelectionFreezeBehavior, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionTapBehavior, BarcodeSelectionTypeName, BarcodeSelectionTapSelection, BarcodeTracking, BarcodeTrackingSession, BarcodeTrackingScenario, BarcodeTrackingSettings, TargetBarcode, BarcodeTrackingBasicOverlay, BarcodeTrackingBasicOverlayStyle, EncodingRange, LocalizedOnlyBarcode, Range, BarcodeCount, BarcodeCountFeedback, BarcodeCountSession, BarcodeCountSettings, BarcodeCountViewStyle as BarcodeCountViewStyle$1, BarcodeCountCaptureList, BarcodeCountCaptureListSession, BarcodeCountToolbarSettings, BarcodeFilterSettings, BarcodeFilterHighlightType, BarcodeFilterHighlightSettingsBrush, BarcodeCaptureListenerEvents, BarcodeTrackingListenerEvents, BarcodeSelectionListenerEvents, BarcodeCountListenerEvents, BarcodeTrackingBasicOverlayListenerEvents, BarcodeSelectionBrushProviderEvents } from './barcode.js';
export { ArucoDictionary, ArucoDictionaryPreset, ArucoMarker, Barcode, BarcodeCapture, BarcodeCaptureFeedback, BarcodeCaptureOverlay, BarcodeCaptureOverlayStyle, BarcodeCaptureSession, BarcodeCaptureSettings, BarcodeCount, BarcodeCountCaptureList, BarcodeCountCaptureListSession, BarcodeCountFeedback, BarcodeCountSession, BarcodeCountSettings, BarcodeCountToolbarSettings, BarcodeCountViewStyle, BarcodeFilterHighlightSettingsBrush, BarcodeFilterHighlightType, BarcodeFilterSettings, BarcodeSelection, BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionFeedback, BarcodeSelectionFreezeBehavior, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionSettings, BarcodeSelectionTapBehavior, BarcodeSelectionTapSelection, BarcodeTracking, BarcodeTrackingBasicOverlay, BarcodeTrackingBasicOverlayStyle, BarcodeTrackingScenario, BarcodeTrackingSession, BarcodeTrackingSettings, Checksum, CompositeFlag, CompositeType, EncodingRange, LocalizedOnlyBarcode, Range, StructuredAppendData, Symbology, SymbologyDescription, SymbologySettings, TargetBarcode, TrackedBarcode } from './barcode.js';
import { nameForSerialization, DefaultSerializeable, Size, BaseNativeProxy, ignoreFromSerialization, FactoryMaker } from 'scandit-capacitor-datacapture-core/dist/core';
import { capacitorExec, HTMLElementState, CapacitorCore } from 'scandit-capacitor-datacapture-core';

class TrackedBarcodeView extends DefaultSerializeable {
    static withHTMLElement(element, options) {
        return this.getEncodedImageData(element).then(data => new TrackedBarcodeView(data, options));
    }
    static withBase64EncodedData(data, options) {
        return Promise.resolve(new TrackedBarcodeView(data, options));
    }
    static getEncodedImageData(element) {
        return this.getBase64DataForSVG(this.getSVGDataForElement(element));
    }
    static getSize(element) {
        const isInDOM = document.body.contains(element);
        if (!isInDOM) {
            document.body.appendChild(element);
        }
        const size = element.getBoundingClientRect();
        if (!isInDOM) {
            document.body.removeChild(element);
        }
        return new Size(size.width, size.height);
    }
    static getSVGDataForElement(element) {
        const size = this.getSize(element);
        const data = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}px" height="${size.height}px">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>`);
        return { data, size };
    }
    static getCanvasWithSize(size) {
        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }
    static getBase64DataForSVG(svgData) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = this.getCanvasWithSize(svgData.size);
                canvas.getContext('2d').drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png', 1));
            };
            image.onerror = reject;
            image.src = 'data:image/svg+xml,' + svgData.data;
        });
    }
    constructor(encodedData, options) {
        super();
        if (options == null) {
            options = { scale: 1 };
        }
        this.data = encodedData;
        this.options = options;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/*! Capacitor: https://capacitorjs.com/ - MIT License */
const createCapacitorPlatforms = (win) => {
    const defaultPlatformMap = new Map();
    defaultPlatformMap.set('web', { name: 'web' });
    const capPlatforms = win.CapacitorPlatforms || {
        currentPlatform: { name: 'web' },
        platforms: defaultPlatformMap,
    };
    const addPlatform = (name, platform) => {
        capPlatforms.platforms.set(name, platform);
    };
    const setPlatform = (name) => {
        if (capPlatforms.platforms.has(name)) {
            capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
        }
    };
    capPlatforms.addPlatform = addPlatform;
    capPlatforms.setPlatform = setPlatform;
    return capPlatforms;
};
const initPlatforms = (win) => (win.CapacitorPlatforms = createCapacitorPlatforms(win));
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
const CapacitorPlatforms = /*#__PURE__*/ initPlatforms((typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {}));
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
CapacitorPlatforms.addPlatform;
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
CapacitorPlatforms.setPlatform;

var ExceptionCode;
(function (ExceptionCode) {
    /**
     * API is not implemented.
     *
     * This usually means the API can't be used because it is not implemented for
     * the current platform.
     */
    ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
    /**
     * API is not available.
     *
     * This means the API can't be used right now because:
     *   - it is currently missing a prerequisite, such as network connectivity
     *   - it requires a particular platform or browser version
     */
    ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
    constructor(message, code, data) {
        super(message);
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
const getPlatformId = (win) => {
    var _a, _b;
    if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return 'android';
    }
    else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return 'ios';
    }
    else {
        return 'web';
    }
};

const createCapacitor = (win) => {
    var _a, _b, _c, _d, _e;
    const capCustomPlatform = win.CapacitorCustomPlatform || null;
    const cap = win.Capacitor || {};
    const Plugins = (cap.Plugins = cap.Plugins || {});
    /**
     * @deprecated Use `capCustomPlatform` instead, default functions like registerPlugin will function with the new object.
     */
    const capPlatforms = win.CapacitorPlatforms;
    const defaultGetPlatform = () => {
        return capCustomPlatform !== null
            ? capCustomPlatform.name
            : getPlatformId(win);
    };
    const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
    const defaultIsNativePlatform = () => getPlatform() !== 'web';
    const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
    const defaultIsPluginAvailable = (pluginName) => {
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
            // JS implementation available for the current platform.
            return true;
        }
        if (getPluginHeader(pluginName)) {
            // Native implementation available.
            return true;
        }
        return false;
    };
    const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) ||
        defaultIsPluginAvailable;
    const defaultGetPluginHeader = (pluginName) => { var _a; return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find(h => h.name === pluginName); };
    const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
    const handleError = (err) => win.console.error(err);
    const pluginMethodNoop = (_target, prop, pluginName) => {
        return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
    };
    const registeredPlugins = new Map();
    const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
            console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
            return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async () => {
            if (!jsImplementation && platform in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations[platform] === 'function'
                        ? (jsImplementation = await jsImplementations[platform]())
                        : (jsImplementation = jsImplementations[platform]);
            }
            else if (capCustomPlatform !== null &&
                !jsImplementation &&
                'web' in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations['web'] === 'function'
                        ? (jsImplementation = await jsImplementations['web']())
                        : (jsImplementation = jsImplementations['web']);
            }
            return jsImplementation;
        };
        const createPluginMethod = (impl, prop) => {
            var _a, _b;
            if (pluginHeader) {
                const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find(m => prop === m.name);
                if (methodHeader) {
                    if (methodHeader.rtype === 'promise') {
                        return (options) => cap.nativePromise(pluginName, prop.toString(), options);
                    }
                    else {
                        return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
                    }
                }
                else if (impl) {
                    return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
                }
            }
            else if (impl) {
                return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
            }
            else {
                throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
            }
        };
        const createPluginMethodWrapper = (prop) => {
            let remove;
            const wrapper = (...args) => {
                const p = loadPluginImplementation().then(impl => {
                    const fn = createPluginMethod(impl, prop);
                    if (fn) {
                        const p = fn(...args);
                        remove = p === null || p === void 0 ? void 0 : p.remove;
                        return p;
                    }
                    else {
                        throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
                    }
                });
                if (prop === 'addListener') {
                    p.remove = async () => remove();
                }
                return p;
            };
            // Some flair ✨
            wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
            Object.defineProperty(wrapper, 'name', {
                value: prop,
                writable: false,
                configurable: false,
            });
            return wrapper;
        };
        const addListener = createPluginMethodWrapper('addListener');
        const removeListener = createPluginMethodWrapper('removeListener');
        const addListenerNative = (eventName, callback) => {
            const call = addListener({ eventName }, callback);
            const remove = async () => {
                const callbackId = await call;
                removeListener({
                    eventName,
                    callbackId,
                }, callback);
            };
            const p = new Promise(resolve => call.then(() => resolve({ remove })));
            p.remove = async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            };
            return p;
        };
        const proxy = new Proxy({}, {
            get(_, prop) {
                switch (prop) {
                    // https://github.com/facebook/react/issues/20030
                    case '$$typeof':
                        return undefined;
                    case 'toJSON':
                        return () => ({});
                    case 'addListener':
                        return pluginHeader ? addListenerNative : addListener;
                    case 'removeListener':
                        return removeListener;
                    default:
                        return createPluginMethodWrapper(prop);
                }
            },
        });
        Plugins[pluginName] = proxy;
        registeredPlugins.set(pluginName, {
            name: pluginName,
            proxy,
            platforms: new Set([
                ...Object.keys(jsImplementations),
                ...(pluginHeader ? [platform] : []),
            ]),
        });
        return proxy;
    };
    const registerPlugin = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
    // Add in convertFileSrc for web, it will already be available in native context
    if (!cap.convertFileSrc) {
        cap.convertFileSrc = filePath => filePath;
    }
    cap.getPlatform = getPlatform;
    cap.handleError = handleError;
    cap.isNativePlatform = isNativePlatform;
    cap.isPluginAvailable = isPluginAvailable;
    cap.pluginMethodNoop = pluginMethodNoop;
    cap.registerPlugin = registerPlugin;
    cap.Exception = CapacitorException;
    cap.DEBUG = !!cap.DEBUG;
    cap.isLoggingEnabled = !!cap.isLoggingEnabled;
    // Deprecated props
    cap.platform = cap.getPlatform();
    cap.isNative = cap.isNativePlatform();
    return cap;
};
const initCapacitorGlobal = (win) => (win.Capacitor = createCapacitor(win));

const Capacitor$1 = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {});
const registerPlugin = Capacitor$1.registerPlugin;
/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */
Capacitor$1.Plugins;

/**
 * Base class web plugins should extend.
 */
class WebPlugin {
    constructor(config) {
        this.listeners = {};
        this.windowListeners = {};
        if (config) {
            // TODO: add link to upgrade guide
            console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
            this.config = config;
        }
    }
    addListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listenerFunc);
        // If we haven't added a window listener for this event and it requires one,
        // go ahead and add it
        const windowListener = this.windowListeners[eventName];
        if (windowListener && !windowListener.registered) {
            this.addWindowListener(windowListener);
        }
        const remove = async () => this.removeListener(eventName, listenerFunc);
        const p = Promise.resolve({ remove });
        Object.defineProperty(p, 'remove', {
            value: async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            },
        });
        return p;
    }
    async removeAllListeners() {
        this.listeners = {};
        for (const listener in this.windowListeners) {
            this.removeWindowListener(this.windowListeners[listener]);
        }
        this.windowListeners = {};
    }
    notifyListeners(eventName, data) {
        const listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }
    hasListeners(eventName) {
        return !!this.listeners[eventName].length;
    }
    registerWindowListener(windowEventName, pluginEventName) {
        this.windowListeners[pluginEventName] = {
            registered: false,
            windowEventName,
            pluginEventName,
            handler: event => {
                this.notifyListeners(pluginEventName, event);
            },
        };
    }
    unimplemented(msg = 'not implemented') {
        return new Capacitor$1.Exception(msg, ExceptionCode.Unimplemented);
    }
    unavailable(msg = 'not available') {
        return new Capacitor$1.Exception(msg, ExceptionCode.Unavailable);
    }
    async removeListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(listenerFunc);
        this.listeners[eventName].splice(index, 1);
        // If there are no more listeners for this type of event,
        // remove the window listener
        if (!this.listeners[eventName].length) {
            this.removeWindowListener(this.windowListeners[eventName]);
        }
    }
    addWindowListener(handle) {
        window.addEventListener(handle.windowEventName, handle.handler);
        handle.registered = true;
    }
    removeWindowListener(handle) {
        if (!handle) {
            return;
        }
        window.removeEventListener(handle.windowEventName, handle.handler);
        handle.registered = false;
    }
}
/******** END WEB VIEW PLUGIN ********/
/******** COOKIES PLUGIN ********/
/**
 * Safely web encode a string value (inspired by js-cookie)
 * @param str The string value to encode
 */
const encode = (str) => encodeURIComponent(str)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);
/**
 * Safely web decode a string value (inspired by js-cookie)
 * @param str The string value to decode
 */
const decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
    async getCookies() {
        const cookies = document.cookie;
        const cookieMap = {};
        cookies.split(';').forEach(cookie => {
            if (cookie.length <= 0)
                return;
            // Replace first "=" with CAP_COOKIE to prevent splitting on additional "="
            let [key, value] = cookie.replace(/=/, 'CAP_COOKIE').split('CAP_COOKIE');
            key = decode(key).trim();
            value = decode(value).trim();
            cookieMap[key] = value;
        });
        return cookieMap;
    }
    async setCookie(options) {
        try {
            // Safely Encoded Key/Value
            const encodedKey = encode(options.key);
            const encodedValue = encode(options.value);
            // Clean & sanitize options
            const expires = `; expires=${(options.expires || '').replace('expires=', '')}`; // Default is "; expires="
            const path = (options.path || '/').replace('path=', ''); // Default is "path=/"
            const domain = options.url != null && options.url.length > 0
                ? `domain=${options.url}`
                : '';
            document.cookie = `${encodedKey}=${encodedValue || ''}${expires}; path=${path}; ${domain};`;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async deleteCookie(options) {
        try {
            document.cookie = `${options.key}=; Max-Age=0`;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async clearCookies() {
        try {
            const cookies = document.cookie.split(';') || [];
            for (const cookie of cookies) {
                document.cookie = cookie
                    .replace(/^ +/, '')
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async clearAllCookies() {
        try {
            await this.clearCookies();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
registerPlugin('CapacitorCookies', {
    web: () => new CapacitorCookiesPluginWeb(),
});
// UTILITY FUNCTIONS
/**
 * Read in a Blob value and return it as a base64 string
 * @param blob The blob value to convert to a base64 string
 */
const readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const base64String = reader.result;
        // remove prefix "data:application/pdf;base64,"
        resolve(base64String.indexOf(',') >= 0
            ? base64String.split(',')[1]
            : base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
});
/**
 * Normalize an HttpHeaders map by lowercasing all of the values
 * @param headers The HttpHeaders object to normalize
 */
const normalizeHttpHeaders = (headers = {}) => {
    const originalKeys = Object.keys(headers);
    const loweredKeys = Object.keys(headers).map(k => k.toLocaleLowerCase());
    const normalized = loweredKeys.reduce((acc, key, index) => {
        acc[key] = headers[originalKeys[index]];
        return acc;
    }, {});
    return normalized;
};
/**
 * Builds a string of url parameters that
 * @param params A map of url parameters
 * @param shouldEncode true if you should encodeURIComponent() the values (true by default)
 */
const buildUrlParams = (params, shouldEncode = true) => {
    if (!params)
        return null;
    const output = Object.entries(params).reduce((accumulator, entry) => {
        const [key, value] = entry;
        let encodedValue;
        let item;
        if (Array.isArray(value)) {
            item = '';
            value.forEach(str => {
                encodedValue = shouldEncode ? encodeURIComponent(str) : str;
                item += `${key}=${encodedValue}&`;
            });
            // last character will always be "&" so slice it off
            item.slice(0, -1);
        }
        else {
            encodedValue = shouldEncode ? encodeURIComponent(value) : value;
            item = `${key}=${encodedValue}`;
        }
        return `${accumulator}&${item}`;
    }, '');
    // Remove initial "&" from the reduce
    return output.substr(1);
};
/**
 * Build the RequestInit object based on the options passed into the initial request
 * @param options The Http plugin options
 * @param extra Any extra RequestInit values
 */
const buildRequestInit = (options, extra = {}) => {
    const output = Object.assign({ method: options.method || 'GET', headers: options.headers }, extra);
    // Get the content-type
    const headers = normalizeHttpHeaders(options.headers);
    const type = headers['content-type'] || '';
    // If body is already a string, then pass it through as-is.
    if (typeof options.data === 'string') {
        output.body = options.data;
    }
    // Build request initializers based off of content-type
    else if (type.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(options.data || {})) {
            params.set(key, value);
        }
        output.body = params.toString();
    }
    else if (type.includes('multipart/form-data')) {
        const form = new FormData();
        if (options.data instanceof FormData) {
            options.data.forEach((value, key) => {
                form.append(key, value);
            });
        }
        else {
            for (const key of Object.keys(options.data)) {
                form.append(key, options.data[key]);
            }
        }
        output.body = form;
        const headers = new Headers(output.headers);
        headers.delete('content-type'); // content-type will be set by `window.fetch` to includy boundary
        output.headers = headers;
    }
    else if (type.includes('application/json') ||
        typeof options.data === 'object') {
        output.body = JSON.stringify(options.data);
    }
    return output;
};
// WEB IMPLEMENTATION
class CapacitorHttpPluginWeb extends WebPlugin {
    /**
     * Perform an Http request given a set of options
     * @param options Options to build the HTTP request
     */
    async request(options) {
        const requestInit = buildRequestInit(options, options.webFetchExtra);
        const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
        const url = urlParams ? `${options.url}?${urlParams}` : options.url;
        const response = await fetch(url, requestInit);
        const contentType = response.headers.get('content-type') || '';
        // Default to 'text' responseType so no parsing happens
        let { responseType = 'text' } = response.ok ? options : {};
        // If the response content-type is json, force the response to be json
        if (contentType.includes('application/json')) {
            responseType = 'json';
        }
        let data;
        let blob;
        switch (responseType) {
            case 'arraybuffer':
            case 'blob':
                blob = await response.blob();
                data = await readBlobAsBase64(blob);
                break;
            case 'json':
                data = await response.json();
                break;
            case 'document':
            case 'text':
            default:
                data = await response.text();
        }
        // Convert fetch headers to Capacitor HttpHeaders
        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });
        return {
            data,
            headers,
            status: response.status,
            url: response.url,
        };
    }
    /**
     * Perform an Http GET request given a set of options
     * @param options Options to build the HTTP request
     */
    async get(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'GET' }));
    }
    /**
     * Perform an Http POST request given a set of options
     * @param options Options to build the HTTP request
     */
    async post(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'POST' }));
    }
    /**
     * Perform an Http PUT request given a set of options
     * @param options Options to build the HTTP request
     */
    async put(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'PUT' }));
    }
    /**
     * Perform an Http PATCH request given a set of options
     * @param options Options to build the HTTP request
     */
    async patch(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'PATCH' }));
    }
    /**
     * Perform an Http DELETE request given a set of options
     * @param options Options to build the HTTP request
     */
    async delete(options) {
        return this.request(Object.assign(Object.assign({}, options), { method: 'DELETE' }));
    }
}
registerPlugin('CapacitorHttp', {
    web: () => new CapacitorHttpPluginWeb(),
});

var CapacitorFunction;
(function (CapacitorFunction) {
    CapacitorFunction["GetDefaults"] = "getDefaults";
    CapacitorFunction["SubscribeBarcodeCaptureListener"] = "subscribeBarcodeCaptureListener";
    CapacitorFunction["FinishBarcodeCaptureDidScan"] = "finishBarcodeCaptureDidScan";
    CapacitorFunction["FinishBarcodeCaptureDidUpdateSession"] = "finishBarcodeCaptureDidUpdateSession";
    CapacitorFunction["SubscribeBarcodeTrackingListener"] = "subscribeBarcodeTrackingListener";
    CapacitorFunction["UnsubscribeBarcodeTrackingListener"] = "unsubscribeBarcodeTrackingListener";
    CapacitorFunction["FinishBarcodeTrackingDidUpdateSession"] = "finishBarcodeTrackingDidUpdateSession";
    CapacitorFunction["SubscribeBarcodeTrackingBasicOverlayListener"] = "subscribeBarcodeTrackingBasicOverlayListener";
    CapacitorFunction["UnsubscribeBarcodeTrackingBasicOverlayListener"] = "unsubscribeBarcodeTrackingBasicOverlayListener";
    CapacitorFunction["SetBrushForTrackedBarcode"] = "setBrushForTrackedBarcode";
    CapacitorFunction["ClearTrackedBarcodeBrushes"] = "clearTrackedBarcodeBrushes";
    CapacitorFunction["SubscribeBarcodeTrackingAdvancedOverlayListener"] = "subscribeBarcodeTrackingAdvancedOverlayListener";
    CapacitorFunction["UnsubscribeBarcodeTrackingAdvancedOverlayListener"] = "unsubscribeBarcodeTrackingAdvancedOverlayListener";
    CapacitorFunction["SetViewForTrackedBarcode"] = "setViewForTrackedBarcode";
    CapacitorFunction["SetAnchorForTrackedBarcode"] = "setAnchorForTrackedBarcode";
    CapacitorFunction["SetOffsetForTrackedBarcode"] = "setOffsetForTrackedBarcode";
    CapacitorFunction["ClearTrackedBarcodeViews"] = "clearTrackedBarcodeViews";
    CapacitorFunction["SubscribeBarcodeSelectionListener"] = "subscribeBarcodeSelectionListener";
    CapacitorFunction["GetCountForBarcodeInBarcodeSelectionSession"] = "getCountForBarcodeInBarcodeSelectionSession";
    CapacitorFunction["ResetBarcodeCaptureSession"] = "resetBarcodeCaptureSession";
    CapacitorFunction["ResetBarcodeTrackingSession"] = "resetBarcodeTrackingSession";
    CapacitorFunction["ResetBarcodeSelectionSession"] = "resetBarcodeSelectionSession";
    CapacitorFunction["ResetBarcodeSelection"] = "resetBarcodeSelection";
    CapacitorFunction["UnfreezeCameraInBarcodeSelection"] = "unfreezeCameraInBarcodeSelection";
    CapacitorFunction["SubscribeBarcodeCountListener"] = "registerBarcodeCountListener";
    CapacitorFunction["UnsubscribeBarcodeCountListener"] = "unregisterBarcodeCountListener";
    CapacitorFunction["ResetBarcodeCountSession"] = "resetBarcodeCountSession";
    CapacitorFunction["StartBarcodeCountScanningPhase"] = "startScanningPhase";
    CapacitorFunction["EndBarcodeCountScanningPhase"] = "endScanningPhase";
    CapacitorFunction["SetBarcodeCountCaptureList"] = "setBarcodeCountCaptureList";
    CapacitorFunction["SetBarcodeCaptureModeEnabledState"] = "setBarcodeCaptureModeEnabledState";
    CapacitorFunction["SetBarcodeTrackingModeEnabledState"] = "setBarcodeTrackingModeEnabledState";
})(CapacitorFunction || (CapacitorFunction = {}));
const pluginName = 'ScanditBarcodeNative';
// tslint:disable-next-line:variable-name
const Capacitor = {
    pluginName,
    defaults: {},
    exec: (success, error, functionName, args) => capacitorExec(success, error, pluginName, functionName, args),
};
const getDefaults = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const defaultsJSON = yield window.Capacitor.Plugins[pluginName][CapacitorFunction.GetDefaults]();
        loadBarcodeDefaults(defaultsJSON);
        loadBarcodeCaptureDefaults(defaultsJSON.BarcodeCapture);
        loadBarcodeTrackingDefaults(defaultsJSON.BarcodeTracking);
        loadBarcodeSelectionDefaults(defaultsJSON.BarcodeSelection);
        loadBarcodeCountDefaults(defaultsJSON.BarcodeCount);
        // TODO: Review this
        Capacitor.defaults = getBarcodeDefaults();
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.warn(error);
    }
    return Capacitor.defaults;
});
// To circumvent a circular dependency
SymbologyDescription.defaults = () => Capacitor.defaults;

var BarcodeCaptureListenerEvent;
(function (BarcodeCaptureListenerEvent) {
    BarcodeCaptureListenerEvent["DidScan"] = "BarcodeCaptureListener.didScan";
    BarcodeCaptureListenerEvent["DidUpdateSession"] = "BarcodeCaptureListener.didUpdateSession";
})(BarcodeCaptureListenerEvent || (BarcodeCaptureListenerEvent = {}));
class NativeBarcodeCaptureListenerProxy {
    constructor() {
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    resetSession() {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.ResetBarcodeCaptureSession]();
    }
    registerListenerForEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SubscribeBarcodeCaptureListener]();
    }
    unregisterListenerForEvents() {
        this.didScanEventListener.remove();
        this.didUpdateSessionEventListener.remove();
    }
    setModeEnabledState(enabled) {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SetBarcodeCaptureModeEnabledState]({ 'enabled': enabled });
    }
    subscribeDidUpdateSessionListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didUpdateSessionEventListener = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCaptureListenerEvent.DidUpdateSession, this.notifyListeners);
        });
    }
    subscribeDidScanListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didScanEventListener = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCaptureListenerEvent.DidScan, this.notifyListeners);
        });
    }
    finishDidUpdateSessionCallback(isFinished) {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.FinishBarcodeCaptureDidUpdateSession]({ 'enabled': isFinished });
    }
    finishDidScanCallback(isFinished) {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.FinishBarcodeCaptureDidScan]({ 'enabled': isFinished });
    }
    emitInCallback(enabled) {
        this.eventEmitter.emit(BarcodeCaptureListenerEvents.inCallback, enabled);
    }
    notifyListeners(event) {
        const done = () => {
            this.emitInCallback(false);
            return { enabled: this.isModeEnabled() };
        };
        this.emitInCallback(true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeCaptureListenerEvent.DidScan:
                this.eventEmitter.emit(BarcodeCaptureListenerEvents.didScan, JSON.stringify(event));
                break;
            case BarcodeCaptureListenerEvent.DidUpdateSession:
                this.eventEmitter.emit(BarcodeCaptureListenerEvents.didUpdateSession, JSON.stringify(event));
                break;
        }
        return done();
    }
}

var BarcodeTrackingListenerEvent;
(function (BarcodeTrackingListenerEvent) {
    BarcodeTrackingListenerEvent["DidUpdateSession"] = "BarcodeTrackingListener.didUpdateSession";
})(BarcodeTrackingListenerEvent || (BarcodeTrackingListenerEvent = {}));
class NativeBarcodeTrackingListenerProxy {
    constructor() {
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    resetSession() {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.ResetBarcodeTrackingSession]();
    }
    registerListenerForEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SubscribeBarcodeTrackingListener]();
    }
    unregisterListenerForEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.UnsubscribeBarcodeTrackingListener]();
    }
    subscribeDidUpdateSession() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeTrackingListenerEvent.DidUpdateSession, this.notifyListeners.bind(this));
    }
    finishDidUpdateSessionCallback(enabled) {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.FinishBarcodeTrackingDidUpdateSession]({ enabled });
    }
    setModeEnabledState(enabled) {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SetBarcodeTrackingModeEnabledState]({ 'enabled': enabled });
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(BarcodeTrackingListenerEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(BarcodeTrackingListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeTrackingListenerEvent.DidUpdateSession:
                this.eventEmitter.emit(BarcodeTrackingListenerEvents.didUpdateSession, JSON.stringify(event));
                break;
        }
        return done();
    }
}

var BarcodeTrackingAdvancedOverlayListenerEvent;
(function (BarcodeTrackingAdvancedOverlayListenerEvent) {
    BarcodeTrackingAdvancedOverlayListenerEvent["ViewForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.viewForTrackedBarcode";
    BarcodeTrackingAdvancedOverlayListenerEvent["AnchorForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.anchorForTrackedBarcode";
    BarcodeTrackingAdvancedOverlayListenerEvent["OffsetForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.offsetForTrackedBarcode";
    BarcodeTrackingAdvancedOverlayListenerEvent["DidTapViewForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.didTapViewForTrackedBarcode";
})(BarcodeTrackingAdvancedOverlayListenerEvent || (BarcodeTrackingAdvancedOverlayListenerEvent = {}));
class NativeBarcodeTrackingAdvancedOverlayProxy extends BaseNativeProxy {
    constructor() {
        super();
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    setBrushForTrackedBarcode(brushJson, trackedBarcodeIdentifer, sessionFrameSequenceId) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.SetBrushForTrackedBarcode, {
                trackedBarcodeId: trackedBarcodeIdentifer,
                sessionFrameSequenceId: sessionFrameSequenceId,
                brush: brushJson
            });
        });
    }
    setViewForTrackedBarcode(viewJson, trackedBarcodeIdentifer, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.SetViewForTrackedBarcode, {
                view: viewJson,
                sessionFrameSequenceID: sessionFrameSequenceID,
                trackedBarcodeID: trackedBarcodeIdentifer,
            });
        });
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcodeIdentifer, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.SetAnchorForTrackedBarcode, {
                anchor,
                sessionFrameSequenceID: sessionFrameSequenceID,
                trackedBarcodeID: trackedBarcodeIdentifer,
            });
        });
    }
    setOffsetForTrackedBarcode(offsetJson, trackedBarcodeIdentifer, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.SetOffsetForTrackedBarcode, {
                offset: offsetJson,
                sessionFrameSequenceID: sessionFrameSequenceID,
                trackedBarcodeID: trackedBarcodeIdentifer,
            });
        });
    }
    clearTrackedBarcodeViews() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.ClearTrackedBarcodeViews, null);
        });
    }
    registerListenerForAdvancedOverlayEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SubscribeBarcodeTrackingAdvancedOverlayListener]();
    }
    unregisterListenerForAdvancedOverlayEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.UnsubscribeBarcodeTrackingAdvancedOverlayListener]();
    }
    subscribeViewForTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName].addListener(BarcodeTrackingAdvancedOverlayListenerEvent.ViewForTrackedBarcode, this.notifyListeners.bind(this));
    }
    subscribeAnchorForTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName].addListener(BarcodeTrackingAdvancedOverlayListenerEvent.AnchorForTrackedBarcode, this.notifyListeners.bind(this));
    }
    subscribeOffsetForTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName].addListener(BarcodeTrackingAdvancedOverlayListenerEvent.OffsetForTrackedBarcode, this.notifyListeners.bind(this));
    }
    subscribeDidTapViewForTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName].addListener(BarcodeTrackingAdvancedOverlayListenerEvent.DidTapViewForTrackedBarcode, this.notifyListeners.bind(this));
    }
    getJSONStringForView(view) {
        return view ? view.toJSON() : null;
    }
    notifyListeners(event) {
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return {};
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeTrackingAdvancedOverlayListenerEvent.ViewForTrackedBarcode:
                this.eventEmitter.emit(BarcodeTrackingAdvancedOverlayListenerEvents.viewForTrackedBarcode, JSON.stringify(event));
                break;
            case BarcodeTrackingAdvancedOverlayListenerEvent.AnchorForTrackedBarcode:
                this.eventEmitter.emit(BarcodeTrackingAdvancedOverlayListenerEvents.anchorForTrackedBarcode, JSON.stringify(event));
                break;
            case BarcodeTrackingAdvancedOverlayListenerEvent.OffsetForTrackedBarcode:
                this.eventEmitter.emit(BarcodeTrackingAdvancedOverlayListenerEvents.offsetForTrackedBarcode, JSON.stringify(event));
                break;
            case BarcodeTrackingAdvancedOverlayListenerEvent.DidTapViewForTrackedBarcode:
                this.eventEmitter.emit(BarcodeTrackingAdvancedOverlayListenerEvents.didTapViewForTrackedBarcode, JSON.stringify(event));
                break;
        }
        return {};
    }
}
NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec = Capacitor.exec;

var BarcodeSelectionListenerEvent;
(function (BarcodeSelectionListenerEvent) {
    BarcodeSelectionListenerEvent["DidUpdateSelection"] = "BarcodeSelectionListener.didUpdateSelection";
    BarcodeSelectionListenerEvent["DidUpdateSession"] = "BarcodeSelectionListener.didUpdateSession";
})(BarcodeSelectionListenerEvent || (BarcodeSelectionListenerEvent = {}));
class NativeBarcodeSelectionListenerProxy {
    constructor() {
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    getCount(selectionIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield ScanditBarcodeSelectionPluginNative.getCountForBarcodeInBarcodeSelectionSession({ selectionIdentifier: selectionIdentifier });
            return count.data;
        });
    }
    resetSession() {
        return ScanditBarcodeSelectionPluginNative.resetBarcodeSelectionSession();
    }
    registerListenerForEvents() {
        ScanditBarcodeSelectionPluginNative.subscribeBarcodeSelectionListener();
    }
    subscribeDidUpdateSelectionListener() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeSelectionListenerEvent.DidUpdateSelection, this.notifyListeners.bind(this));
    }
    subscribeDidUpdateSession() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeSelectionListenerEvent.DidUpdateSession, this.notifyListeners.bind(this));
    }
    finishDidUpdateSelectionCallback(isEnabled) {
        ScanditBarcodeSelectionPluginNative.finishBarcodeSelectionDidSelect({ enabled: isEnabled });
    }
    finishDidUpdateSessionCallback(isEnabled) {
        ScanditBarcodeSelectionPluginNative.finishBarcodeSelectionDidUpdateSession({ enabled: isEnabled });
    }
    unregisterListenerForEvents() {
        ScanditBarcodeSelectionPluginNative.unsubscribeBarcodeSelectionListener();
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(BarcodeSelectionListenerEvents.inCallback, false);
            window.Capacitor.Plugins[Capacitor.pluginName].finishCallback({
                result: {
                    enabled: this.isModeEnabled(),
                    finishCallbackID: event.name,
                },
            });
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(BarcodeSelectionListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeSelectionListenerEvent.DidUpdateSelection:
                this.eventEmitter.emit(BarcodeSelectionListenerEvents.didUpdateSelection, JSON.stringify(event));
                break;
            case BarcodeSelectionListenerEvent.DidUpdateSession:
                this.eventEmitter.emit(BarcodeSelectionListenerEvents.didUpdateSession, JSON.stringify(event));
                break;
        }
        return done();
    }
}
NativeBarcodeSelectionListenerProxy.exec = Capacitor.exec;

var BarcodeCountListenerEventName;
(function (BarcodeCountListenerEventName) {
    BarcodeCountListenerEventName["didScan"] = "BarcodeCountListener.onScan";
    BarcodeCountListenerEventName["didListSessionUpdate"] = "BarcodeCountCaptureListListener.didUpdateSession";
})(BarcodeCountListenerEventName || (BarcodeCountListenerEventName = {}));
class NativeBarcodeCountListenerProxy {
    constructor() {
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    updateMode(barcodeCountJson) {
        return ScanditBarcodeCountPluginNative.updateMode({ BarcodeCount: barcodeCountJson });
    }
    resetBarcodeCount() {
        return ScanditBarcodeCountPluginNative.resetBarcodeCount();
    }
    registerBarcodeCountListener() {
        return ScanditBarcodeCountPluginNative.registerBarcodeCountListener();
    }
    setModeEnabledState(enabled) {
        ScanditBarcodeCountPluginNative.setBarcodeCountModeEnabledState({ 'enabled': enabled });
    }
    unregisterBarcodeCountListener() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountListenerEventName.didScan, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountListenerEventName.didListSessionUpdate, this.notifyListeners);
        return ScanditBarcodeCountPluginNative.unregisterBarcodeCountListener();
    }
    subscribeDidScan() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountListenerEventName.didScan, this.notifyListeners);
    }
    subscribeDidListSessionUpdate() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountListenerEventName.didListSessionUpdate, this.notifyListeners);
    }
    finishOnScan() {
        ScanditBarcodeCountPluginNative.finishBarcodeCountListenerOnScan();
    }
    startScanningPhase() {
        ScanditBarcodeCountPluginNative.startScanningPhase();
    }
    endScanningPhase() {
        ScanditBarcodeCountPluginNative.endScanningPhase();
    }
    setBarcodeCountCaptureList(captureListStr) {
        const targetBarcodesJson = captureListStr.targetBarcodes;
        ScanditBarcodeCountPluginNative.setBarcodeCountCaptureList({ TargetBarcodes: targetBarcodesJson });
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(BarcodeCountListenerEvents.inCallback, false);
            window.Capacitor.Plugins[Capacitor.pluginName].finishBarcodeCountListenerOnScan();
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(BarcodeCountListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeCountListenerEventName.didScan:
                this.eventEmitter.emit(BarcodeCountListenerEvents.didScan, JSON.stringify(event));
                break;
        }
        if (event.name === BarcodeCountListenerEventName.didListSessionUpdate) {
            this.eventEmitter.emit(BarcodeCountListenerEvents.didListSessionUpdate, JSON.stringify(event));
        }
        return done();
    }
}

class NativeBarcodeCountSessionProxy {
    getSpatialMap() {
        return ScanditBarcodeCountPluginNative.getSpatialMap().then((result) => result.data);
    }
    getSpatialMapWithHints(expectedNumberOfRows, expectedNumberOfColumns) {
        return ScanditBarcodeCountPluginNative.getSpatialMapWithHints({
            expectedNumberOfColumns,
            expectedNumberOfRows
        }).then((result) => result.data);
    }
    resetSession() {
        return ScanditBarcodeCountPluginNative.resetBarcodeCountSession();
    }
}

var BarcodeTrackingBasicOverlayListenerEvent;
(function (BarcodeTrackingBasicOverlayListenerEvent) {
    BarcodeTrackingBasicOverlayListenerEvent["BrushForTrackedBarcode"] = "BarcodeTrackingBasicOverlayListener.brushForTrackedBarcode";
    BarcodeTrackingBasicOverlayListenerEvent["DidTapTrackedBarcode"] = "BarcodeTrackingBasicOverlayListener.didTapTrackedBarcode";
})(BarcodeTrackingBasicOverlayListenerEvent || (BarcodeTrackingBasicOverlayListenerEvent = {}));
class NativeBarcodeTrackingBasicOverlayProxy {
    constructor() {
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    setBrushForTrackedBarcode(brushJson, trackedBarcodeIdentifer, _sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.SetBrushForTrackedBarcode, {
                brush: brushJson,
                trackedBarcodeID: trackedBarcodeIdentifer,
            });
        });
    }
    clearTrackedBarcodeBrushes() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.ClearTrackedBarcodeBrushes, null);
        });
    }
    registerListenerForBasicOverlayEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SubscribeBarcodeTrackingBasicOverlayListener]();
    }
    unregisterListenerForBasicOverlayEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.UnsubscribeBarcodeTrackingBasicOverlayListener]();
    }
    subscribeBrushForTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeTrackingBasicOverlayListenerEvent.BrushForTrackedBarcode, this.notifyListeners.bind(this));
    }
    subscribeDidTapTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeTrackingBasicOverlayListenerEvent.DidTapTrackedBarcode, this.notifyListeners.bind(this));
    }
    notifyListeners(event) {
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeTrackingBasicOverlayListenerEvent.BrushForTrackedBarcode:
                this.eventEmitter.emit(BarcodeTrackingBasicOverlayListenerEvents.brushForTrackedBarcode, JSON.stringify(event));
                break;
            case BarcodeTrackingBasicOverlayListenerEvent.DidTapTrackedBarcode:
                this.eventEmitter.emit(BarcodeTrackingBasicOverlayListenerEvents.didTapTrackedBarcode, JSON.stringify(event));
                break;
        }
        return null;
    }
}
NativeBarcodeTrackingBasicOverlayProxy.capacitorExec = Capacitor.exec;

class NativeBarcodeSelectionProxy {
    unfreezeCamera() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.exec(resolve, reject, CapacitorFunction.UnfreezeCameraInBarcodeSelection, null);
        });
    }
    resetMode() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.exec(resolve, reject, CapacitorFunction.ResetBarcodeSelection, null);
        });
    }
    selectAimedBarcode() {
        return ScanditBarcodeSelectionPluginNative.selectAimedBarcode();
    }
    unselectBarcodes(barcodesStr) {
        return ScanditBarcodeSelectionPluginNative.unselectBarcodes(barcodesStr);
    }
    setSelectBarcodeEnabled(barcodeStr, enabled) {
        return ScanditBarcodeSelectionPluginNative.setSelectBarcodeEnabled(barcodeStr, enabled);
    }
    increaseCountForBarcodes(barcodeStr) {
        return ScanditBarcodeSelectionPluginNative.increaseCountForBarcodes(barcodeStr);
    }
    setModeEnabledState(enabled) {
        ScanditBarcodeSelectionPluginNative.setBarcodeSelectionModeEnabledState({ 'enabled': enabled });
    }
}
NativeBarcodeSelectionProxy.exec = Capacitor.exec;

var NativeBarcodeSelectionOverlayProxyEvents;
(function (NativeBarcodeSelectionOverlayProxyEvents) {
    NativeBarcodeSelectionOverlayProxyEvents["brushForAimedBarcode"] = "BarcodeSelectionAimedBrushProvider.brushForBarcode";
    NativeBarcodeSelectionOverlayProxyEvents["brushForTrackedBarcode"] = "BarcodeSelectionTrackedBrushProvider.brushForBarcode";
})(NativeBarcodeSelectionOverlayProxyEvents || (NativeBarcodeSelectionOverlayProxyEvents = {}));
class NativeBarcodeSelectionOverlayProxy extends BaseNativeProxy {
    setTextForAimToSelectAutoHint(text) {
        return ScanditBarcodeSelectionPluginNative.setTextForAimToSelectAutoHint(text);
    }
    removeAimedBarcodeBrushProvider() {
        return ScanditBarcodeSelectionPluginNative.removeAimedBarcodeBrushProvider();
    }
    setAimedBarcodeBrushProvider() {
        return ScanditBarcodeSelectionPluginNative.setAimedBarcodeBrushProvider();
    }
    finishBrushForAimedBarcodeCallback(brushStr, selectionIdentifier) {
        ScanditBarcodeSelectionPluginNative.finishBrushForAimedBarcode(brushStr, selectionIdentifier);
    }
    removeTrackedBarcodeBrushProvider() {
        return ScanditBarcodeSelectionPluginNative.removeTrackedBarcodeBrushProvider();
    }
    setTrackedBarcodeBrushProvider() {
        return ScanditBarcodeSelectionPluginNative.setTrackedBarcodeBrushProvider();
    }
    finishBrushForTrackedBarcodeCallback(brushStr, selectionIdentifier) {
        ScanditBarcodeSelectionPluginNative.finishBrushForTrackedBarcode(brushStr, selectionIdentifier);
    }
    subscribeBrushForTrackedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(NativeBarcodeSelectionOverlayProxyEvents.brushForTrackedBarcode, this.notifyListeners.bind(this));
    }
    subscribeBrushForAimedBarcode() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(NativeBarcodeSelectionOverlayProxyEvents.brushForAimedBarcode, this.notifyListeners.bind(this));
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(BarcodeSelectionBrushProviderEvents.inCallback, false);
            window.Capacitor.Plugins[Capacitor.pluginName].finishCallback({
                result: {
                    enabled: this.isModeEnabled(),
                    finishCallbackID: event.name,
                },
            });
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(BarcodeSelectionBrushProviderEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case NativeBarcodeSelectionOverlayProxyEvents.brushForAimedBarcode:
                this.eventEmitter.emit(BarcodeSelectionBrushProviderEvents.brushForAimedBarcode, JSON.stringify(event));
                break;
            case NativeBarcodeSelectionOverlayProxyEvents.brushForTrackedBarcode:
                this.eventEmitter.emit(BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode, JSON.stringify(event));
                break;
        }
        return done();
    }
}

function initBarcodeProxy() {
    FactoryMaker.bindInstance('BarcodeCaptureListenerProxy', new NativeBarcodeCaptureListenerProxy());
    FactoryMaker.bindInstance('BarcodeTrackingListenerProxy', new NativeBarcodeTrackingListenerProxy());
    FactoryMaker.bindInstance('BarcodeTrackingBasicOverlayProxy', new NativeBarcodeTrackingBasicOverlayProxy());
    FactoryMaker.bindInstance('BarcodeTrackingAdvancedOverlayProxy', new NativeBarcodeTrackingAdvancedOverlayProxy());
    FactoryMaker.bindInstance('BarcodeSelectionListenerProxy', new NativeBarcodeSelectionListenerProxy());
    FactoryMaker.bindInstance('BarcodeSelectionOverlayProxy', new NativeBarcodeSelectionOverlayProxy());
    FactoryMaker.bindInstance('BarcodeSelectionProxy', new NativeBarcodeSelectionProxy());
    FactoryMaker.bindInstance('BarcodeCountListenerProxy', new NativeBarcodeCountListenerProxy());
    FactoryMaker.bindInstance('BarcodeCountSessionProxy', new NativeBarcodeCountSessionProxy());
}

class BarcodeTrackingAdvancedOverlay {
    get type() {
        return this.baseBarcodeTrackingOverlay.type;
    }
    get shouldShowScanAreaGuides() {
        return this.baseBarcodeTrackingOverlay.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        this.baseBarcodeTrackingOverlay.shouldShowScanAreaGuides = shouldShow;
    }
    get listener() {
        return this.baseBarcodeTrackingOverlay.listener;
    }
    set listener(listener) {
        this.baseBarcodeTrackingOverlay.listener = listener;
    }
    static withBarcodeTrackingForView(barcodeTracking, view) {
        const overlay = new BarcodeTrackingAdvancedOverlay();
        overlay.baseBarcodeTrackingOverlay.initialize(barcodeTracking, view);
        return overlay;
    }
    constructor() {
        this.baseBarcodeTrackingOverlay = new BaseBarcodeTrackingAdvancedOverlay();
    }
    setViewForTrackedBarcode(view, trackedBarcode) {
        return this.baseBarcodeTrackingOverlay.setViewForTrackedBarcode(view, trackedBarcode);
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcode) {
        return this.baseBarcodeTrackingOverlay.setAnchorForTrackedBarcode(anchor, trackedBarcode);
    }
    setOffsetForTrackedBarcode(offset, trackedBarcode) {
        return this.baseBarcodeTrackingOverlay.setOffsetForTrackedBarcode(offset, trackedBarcode);
    }
    clearTrackedBarcodeViews() {
        return this.baseBarcodeTrackingOverlay.clearTrackedBarcodeViews();
    }
    toJSON() {
        return this.baseBarcodeTrackingOverlay.toJSON();
    }
}

class ScanditBarcodePluginImplementation {
    initialize(coreDefaults) {
        return __awaiter(this, void 0, void 0, function* () {
            CapacitorCore.defaults = coreDefaults;
            const barcodeDefaults = yield getDefaults();
            Capacitor.defaults = barcodeDefaults;
            initBarcodeProxy();
            const api = {
                Barcode,
                Checksum,
                CompositeFlag,
                CompositeType,
                Symbology,
                SymbologyDescription,
                SymbologySettings,
                BarcodeCapture,
                BarcodeCaptureSettings,
                BarcodeCaptureSession,
                BarcodeCaptureOverlay,
                BarcodeCaptureOverlayStyle,
                BarcodeCaptureFeedback,
                BarcodeSelection,
                BarcodeSelectionSettings,
                BarcodeSelectionAimerSelection,
                BarcodeSelectionAutoSelectionStrategy,
                BarcodeSelectionBasicOverlay,
                BarcodeSelectionBasicOverlayStyle,
                BarcodeSelectionFeedback,
                BarcodeSelectionFreezeBehavior,
                BarcodeSelectionManualSelectionStrategy,
                BarcodeSelectionSession,
                BarcodeSelectionTapBehavior,
                BarcodeSelectionTypeName,
                BarcodeSelectionTapSelection,
                BarcodeTracking,
                BarcodeTrackingSession,
                BarcodeTrackingScenario,
                BarcodeTrackingSettings,
                TrackedBarcode,
                TargetBarcode,
                BarcodeTrackingBasicOverlay,
                BarcodeTrackingBasicOverlayStyle,
                BarcodeTrackingAdvancedOverlay,
                EncodingRange,
                LocalizedOnlyBarcode,
                Range,
                TrackedBarcodeView,
                BarcodeCount,
                BarcodeCountFeedback,
                BarcodeCountSession,
                BarcodeCountSettings,
                BarcodeCountView,
                BarcodeCountViewStyle: BarcodeCountViewStyle$1,
                BarcodeCountCaptureList,
                BarcodeCountCaptureListSession,
                BarcodeCountToolbarSettings,
                BarcodeFilterSettings,
                BarcodeFilterHighlightType,
                BarcodeFilterHighlightSettingsBrush
            };
            return api;
        });
    }
}
// tslint:disable-next-line:variable-name
registerPlugin('ScanditBarcodePlugin', {
    android: () => new ScanditBarcodePluginImplementation(),
    ios: () => new ScanditBarcodePluginImplementation(),
    web: () => new ScanditBarcodePluginImplementation(),
});
// tslint:disable-next-line:variable-name
const ScanditBarcodePlugin = new ScanditBarcodePluginImplementation();
const ScanditBarcodeCountPluginNative = registerPlugin('ScanditBarcodeNative');
const ScanditBarcodeSelectionPluginNative = registerPlugin('ScanditBarcodeNative');

var BarcodeCountViewEventName;
(function (BarcodeCountViewEventName) {
    BarcodeCountViewEventName["singleScanButtonTapped"] = "BarcodeCountViewUiListener.onSingleScanButtonTapped";
    BarcodeCountViewEventName["listButtonTapped"] = "BarcodeCountViewUiListener.onListButtonTapped";
    BarcodeCountViewEventName["exitButtonTapped"] = "BarcodeCountViewUiListener.onExitButtonTapped";
    BarcodeCountViewEventName["brushForRecognizedBarcode"] = "BarcodeCountViewListener.brushForRecognizedBarcode";
    BarcodeCountViewEventName["brushForRecognizedBarcodeNotInList"] = "BarcodeCountViewListener.brushForRecognizedBarcodeNotInList";
    BarcodeCountViewEventName["brushForUnrecognizedBarcode"] = "BarcodeCountViewListener.brushForUnrecognizedBarcode";
    BarcodeCountViewEventName["filteredBarcodeTapped"] = "BarcodeCountViewListener.didTapFilteredBarcode";
    BarcodeCountViewEventName["recognizedBarcodeNotInListTapped"] = "BarcodeCountViewListener.didTapRecognizedBarcodeNotInList";
    BarcodeCountViewEventName["recognizedBarcodeTapped"] = "BarcodeCountViewListener.didTapRecognizedBarcode";
    BarcodeCountViewEventName["unrecognizedBarcodeTapped"] = "BarcodeCountViewListener.didTapUnrecognizedBarcode";
    BarcodeCountViewEventName["captureListCompleted"] = "BarcodeCountViewListener.didCompleteCaptureList";
})(BarcodeCountViewEventName || (BarcodeCountViewEventName = {}));
class BarcodeCountViewProxy {
    static forBarcodeCount(view) {
        const viewProxy = new BarcodeCountViewProxy();
        viewProxy.barcodeCount = view._barcodeCount;
        viewProxy.view = view;
        // // First we need to initialize the context, so it will set up the DataCaptureContextProxy.
        view._context.initialize();
        // // We call update because it returns a promise, this guarantees, that by the time
        // // we need the deserialized context, it will be set in the native layer.
        // (view.context as any as PrivateDataCaptureContext).update().then(() => {
        //   viewProxy.create();
        // });
        view._context.update();
        viewProxy.create();
        viewProxy.subscribeListeners();
        return viewProxy;
    }
    constructor() {
        this.isInListenerCallback = false;
        this.notifyListeners = this.notifyListeners.bind(this);
        this.recognizedBarcodeTappedHandler = this.recognizedBarcodeTappedHandler.bind(this);
        this.singleScanButtonTappedHandler = this.singleScanButtonTappedHandler.bind(this);
        this.listButtonTappedHandler = this.listButtonTappedHandler.bind(this);
        this.exitButtonTappedHandler = this.exitButtonTappedHandler.bind(this);
        this.filteredBarcodeTappedHandler = this.filteredBarcodeTappedHandler.bind(this);
        this.recognizedBarcodeNotInListTappedHandler = this.recognizedBarcodeNotInListTappedHandler.bind(this);
        this.unrecognizedBarcodeTappedHandler = this.unrecognizedBarcodeTappedHandler.bind(this);
        this.captureListCompletedHandler = this.captureListCompletedHandler.bind(this);
    }
    update() {
        const barcodeCountView = this.view.toJSON();
        const json = JSON.stringify(barcodeCountView);
        return ScanditBarcodeCountPluginNative.updateView({ View: json });
    }
    create() {
        const barcodeCountView = this.view.toJSON();
        const json = {
            BarcodeCount: JSON.stringify(this.view._barcodeCount.toJSON()),
            View: JSON.stringify(barcodeCountView)
        };
        return ScanditBarcodeCountPluginNative.createView(json);
    }
    dispose() {
        this.unsubscribeListeners();
    }
    setUiListener(listener) {
        if (!!listener) {
            ScanditBarcodeCountPluginNative.registerBarcodeCountViewUiListener();
        }
        else {
            ScanditBarcodeCountPluginNative.unregisterBarcodeCountViewUiListener();
        }
    }
    setListener(listener) {
        if (!!listener) {
            ScanditBarcodeCountPluginNative.registerBarcodeCountViewListener();
        }
        else {
            ScanditBarcodeCountPluginNative.unregisterBarcodeCountViewListener();
        }
    }
    clearHighlights() {
        return ScanditBarcodeCountPluginNative.clearBarcodeCountViewHighlights();
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return ScanditBarcodeCountPluginNative.setViewPositionAndSize({ position: { top, left, width, height, shouldBeUnderWebView } });
    }
    show() {
        return ScanditBarcodeCountPluginNative.showView();
    }
    hide() {
        return ScanditBarcodeCountPluginNative.hideView();
    }
    subscribeListeners() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.singleScanButtonTapped, this.singleScanButtonTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.listButtonTapped, this.listButtonTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.exitButtonTapped, this.exitButtonTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.brushForRecognizedBarcode, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.brushForRecognizedBarcodeNotInList, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.brushForUnrecognizedBarcode, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.filteredBarcodeTapped, this.filteredBarcodeTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.recognizedBarcodeNotInListTapped, this.recognizedBarcodeNotInListTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.recognizedBarcodeTapped, this.recognizedBarcodeTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.unrecognizedBarcodeTapped, this.unrecognizedBarcodeTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeCountViewEventName.captureListCompleted, this.captureListCompletedHandler);
    }
    unsubscribeListeners() {
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.singleScanButtonTapped, this.singleScanButtonTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.listButtonTapped, this.listButtonTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.exitButtonTapped, this.exitButtonTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.brushForRecognizedBarcode, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.brushForRecognizedBarcodeNotInList, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.brushForUnrecognizedBarcode, this.notifyListeners);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.filteredBarcodeTapped, this.filteredBarcodeTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.recognizedBarcodeNotInListTapped, this.recognizedBarcodeNotInListTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.recognizedBarcodeTapped, this.recognizedBarcodeTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.unrecognizedBarcodeTapped, this.unrecognizedBarcodeTappedHandler);
        window.Capacitor.Plugins[Capacitor.pluginName]
            .removeListener(BarcodeCountViewEventName.captureListCompleted, this.captureListCompletedHandler);
    }
    singleScanButtonTappedHandler() {
        var _a, _b;
        this.isInListenerCallback = true;
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapSingleScanButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
        this.isInListenerCallback = false;
    }
    listButtonTappedHandler() {
        var _a, _b;
        this.isInListenerCallback = true;
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapListButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
        this.isInListenerCallback = false;
    }
    exitButtonTappedHandler() {
        var _a, _b;
        this.isInListenerCallback = true;
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapExitButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
        this.isInListenerCallback = false;
    }
    filteredBarcodeTappedHandler(trackedBarcode) {
        if (this.view.listener && this.view.listener.didTapFilteredBarcode) {
            this.view.listener.didTapFilteredBarcode(this.view, trackedBarcode);
        }
    }
    recognizedBarcodeNotInListTappedHandler(trackedBarcode) {
        if (this.view.listener && this.view.listener.didTapRecognizedBarcodeNotInList) {
            this.view.listener.didTapRecognizedBarcodeNotInList(this.view, trackedBarcode);
        }
    }
    recognizedBarcodeTappedHandler(trackedBarcode) {
        if (this.view.listener && this.view.listener.didTapRecognizedBarcode) {
            this.view.listener.didTapRecognizedBarcode(this.view, trackedBarcode);
        }
    }
    unrecognizedBarcodeTappedHandler(trackedBarcode) {
        if (this.view.listener && this.view.listener.didTapUnrecognizedBarcode) {
            this.view.listener.didTapUnrecognizedBarcode(this.view, trackedBarcode);
        }
    }
    captureListCompletedHandler() {
        if (this.view.listener && this.view.listener.didCompleteCaptureList) {
            this.view.listener.didCompleteCaptureList(this.view);
        }
    }
    notifyListeners(event) {
        var _a, _b, _c;
        const done = () => {
            this.barcodeCount.isInListenerCallback = false;
            return { enabled: this.barcodeCount.isEnabled };
        };
        this.barcodeCount.isInListenerCallback = true;
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        let trackedBarcode;
        let brush;
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeCountViewEventName.brushForRecognizedBarcode:
                trackedBarcode = TrackedBarcode
                    .fromJSON(JSON.parse((_a = event.trackedBarcode) !== null && _a !== void 0 ? _a : ''));
                brush = this.view.recognizedBrush;
                if (this.view.listener && this.view.listener.brushForRecognizedBarcode) {
                    brush = this.view.listener.brushForRecognizedBarcode(this.view, trackedBarcode);
                }
                const brushForRecognizedBarcodePayload = {
                    brush: brush ? JSON.stringify(brush.toJSON()) : null,
                    trackedBarcodeID: trackedBarcode.identifier,
                };
                ScanditBarcodeCountPluginNative.finishBarcodeCountViewListenerBrushForRecognizedBarcode(brushForRecognizedBarcodePayload);
                break;
            case BarcodeCountViewEventName.brushForRecognizedBarcodeNotInList:
                trackedBarcode = TrackedBarcode
                    .fromJSON(JSON.parse((_b = event.trackedBarcode) !== null && _b !== void 0 ? _b : ''));
                brush = this.view.notInListBrush;
                if (this.view.listener && this.view.listener.brushForRecognizedBarcodeNotInList) {
                    brush = this.view.listener.brushForRecognizedBarcodeNotInList(this.view, trackedBarcode);
                }
                const brushForRecognizedBarcodeNotInListPayload = {
                    brush: brush ? JSON.stringify(brush.toJSON()) : null,
                    trackedBarcodeID: trackedBarcode.identifier,
                };
                ScanditBarcodeCountPluginNative.finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList(brushForRecognizedBarcodeNotInListPayload);
                break;
            case BarcodeCountViewEventName.brushForUnrecognizedBarcode:
                trackedBarcode = TrackedBarcode
                    .fromJSON(JSON.parse((_c = event.trackedBarcode) !== null && _c !== void 0 ? _c : ''));
                brush = this.view.unrecognizedBrush;
                if (this.view.listener && this.view.listener.brushForUnrecognizedBarcode) {
                    brush = this.view.listener.brushForUnrecognizedBarcode(this.view, trackedBarcode);
                }
                const brushForUnecognizedBarcodePayload = {
                    brush: brush ? JSON.stringify(brush.toJSON()) : null,
                    trackedBarcodeID: trackedBarcode.identifier,
                };
                ScanditBarcodeCountPluginNative.finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode(brushForUnecognizedBarcodePayload);
                break;
        }
        return done();
    }
}

const BarcodeCountDefaults = {
    get BarcodeCountView() {
        const defaults = getBarcodeCountDefaults();
        return defaults.BarcodeCountView;
    }
};
var BarcodeCountViewStyle;
(function (BarcodeCountViewStyle) {
    BarcodeCountViewStyle["Icon"] = "icon";
    BarcodeCountViewStyle["Dot"] = "dot";
})(BarcodeCountViewStyle || (BarcodeCountViewStyle = {}));
class BarcodeCountView extends DefaultSerializeable {
    get uiListener() {
        return this._uiListener;
    }
    set uiListener(listener) {
        this._uiListener = listener;
        this.viewProxy.setUiListener(listener);
    }
    get listener() {
        return this._listener;
    }
    set listener(listener) {
        this._listener = listener;
        this.viewProxy.setListener(listener);
    }
    get shouldShowUserGuidanceView() {
        return this._shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(newValue) {
        this._shouldShowUserGuidanceView = newValue;
        this.updateNative();
    }
    get shouldShowListButton() {
        return this._shouldShowListButton;
    }
    set shouldShowListButton(newValue) {
        this._shouldShowListButton = newValue;
        this.updateNative();
    }
    get shouldShowExitButton() {
        return this._shouldShowExitButton;
    }
    set shouldShowExitButton(newValue) {
        this._shouldShowExitButton = newValue;
        this.updateNative();
    }
    get shouldShowShutterButton() {
        return this._shouldShowShutterButton;
    }
    set shouldShowShutterButton(newValue) {
        this._shouldShowShutterButton = newValue;
        this.updateNative();
    }
    get shouldShowHints() {
        return this._shouldShowHints;
    }
    set shouldShowHints(newValue) {
        this._shouldShowHints = newValue;
        this.updateNative();
    }
    get shouldShowClearHighlightsButton() {
        return this._shouldShowClearHighlightsButton;
    }
    set shouldShowClearHighlightsButton(newValue) {
        this._shouldShowClearHighlightsButton = newValue;
        this.updateNative();
    }
    get shouldShowSingleScanButton() {
        return this._shouldShowSingleScanButton;
    }
    set shouldShowSingleScanButton(newValue) {
        this._shouldShowSingleScanButton = newValue;
        this.updateNative();
    }
    get shouldShowFloatingShutterButton() {
        return this._shouldShowFloatingShutterButton;
    }
    set shouldShowFloatingShutterButton(newValue) {
        this._shouldShowFloatingShutterButton = newValue;
        this.updateNative();
    }
    get shouldShowToolbar() {
        return this._shouldShowToolbar;
    }
    set shouldShowToolbar(newValue) {
        this._shouldShowToolbar = newValue;
        this.updateNative();
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(newValue) {
        this._shouldShowScanAreaGuides = newValue;
        this.updateNative();
    }
    static get defaultRecognizedBrush() {
        return BarcodeCountDefaults.BarcodeCountView.defaultRecognizedBrush;
    }
    static get defaultUnrecognizedBrush() {
        return BarcodeCountDefaults.BarcodeCountView.defaultUnrecognizedBrush;
    }
    static get defaultNotInListBrush() {
        return BarcodeCountDefaults.BarcodeCountView.defaultNotInListBrush;
    }
    get recognizedBrush() {
        return this._recognizedBrush;
    }
    set recognizedBrush(newValue) {
        this._recognizedBrush = newValue;
        this.updateNative();
    }
    get unrecognizedBrush() {
        return this._unrecognizedBrush;
    }
    set unrecognizedBrush(newValue) {
        this._unrecognizedBrush = newValue;
        this.updateNative();
    }
    get notInListBrush() {
        return this._notInListBrush;
    }
    set notInListBrush(newValue) {
        this._notInListBrush = newValue;
        this.updateNative();
    }
    get filterSettings() {
        return this._filterSettings;
    }
    set filterSettings(newValue) {
        this._filterSettings = newValue;
        this.updateNative();
    }
    get style() {
        return this._style;
    }
    get listButtonAccessibilityHint() {
        return this._listButtonAccessibilityHint;
    }
    set listButtonAccessibilityHint(newValue) {
        this._listButtonAccessibilityHint = newValue;
        this.updateNative();
    }
    get listButtonAccessibilityLabel() {
        return this._listButtonAccessibilityLabel;
    }
    set listButtonAccessibilityLabel(newValue) {
        this._listButtonAccessibilityLabel = newValue;
        this.updateNative();
    }
    get listButtonContentDescription() {
        return this._listButtonContentDescription;
    }
    set listButtonContentDescription(newValue) {
        this._listButtonContentDescription = newValue;
        this.updateNative();
    }
    get exitButtonAccessibilityHint() {
        return this._exitButtonAccessibilityHint;
    }
    set exitButtonAccessibilityHint(newValue) {
        this._exitButtonAccessibilityHint = newValue;
        this.updateNative();
    }
    get exitButtonAccessibilityLabel() {
        return this._exitButtonAccessibilityLabel;
    }
    set exitButtonAccessibilityLabel(newValue) {
        this._exitButtonAccessibilityLabel = newValue;
        this.updateNative();
    }
    get exitButtonContentDescription() {
        return this._exitButtonContentDescription;
    }
    set exitButtonContentDescription(newValue) {
        this._exitButtonContentDescription = newValue;
        this.updateNative();
    }
    get shutterButtonAccessibilityHint() {
        return this._shutterButtonAccessibilityHint;
    }
    set shutterButtonAccessibilityHint(newValue) {
        this._shutterButtonAccessibilityHint = newValue;
        this.updateNative();
    }
    get shutterButtonAccessibilityLabel() {
        return this._shutterButtonAccessibilityLabel;
    }
    set shutterButtonAccessibilityLabel(newValue) {
        this._shutterButtonAccessibilityLabel = newValue;
        this.updateNative();
    }
    get shutterButtonContentDescription() {
        return this._shutterButtonContentDescription;
    }
    set shutterButtonContentDescription(newValue) {
        this._shutterButtonContentDescription = newValue;
        this.updateNative();
    }
    get floatingShutterButtonAccessibilityHint() {
        return this._floatingShutterButtonAccessibilityHint;
    }
    set floatingShutterButtonAccessibilityHint(newValue) {
        this._floatingShutterButtonAccessibilityHint = newValue;
        this.updateNative();
    }
    get floatingShutterButtonAccessibilityLabel() {
        return this._floatingShutterButtonAccessibilityLabel;
    }
    set floatingShutterButtonAccessibilityLabel(newValue) {
        this._floatingShutterButtonAccessibilityLabel = newValue;
        this.updateNative();
    }
    get floatingShutterButtonContentDescription() {
        return this._floatingShutterButtonContentDescription;
    }
    set floatingShutterButtonContentDescription(newValue) {
        this._floatingShutterButtonContentDescription = newValue;
        this.updateNative();
    }
    get clearHighlightsButtonAccessibilityHint() {
        return this._clearHighlightsButtonAccessibilityHint;
    }
    set clearHighlightsButtonAccessibilityHint(newValue) {
        this._clearHighlightsButtonAccessibilityHint = newValue;
        this.updateNative();
    }
    get clearHighlightsButtonAccessibilityLabel() {
        return this._clearHighlightsButtonAccessibilityLabel;
    }
    set clearHighlightsButtonAccessibilityLabel(newValue) {
        this._clearHighlightsButtonAccessibilityLabel = newValue;
        this.updateNative();
    }
    get clearHighlightsButtonContentDescription() {
        return this._clearHighlightsButtonContentDescription;
    }
    set clearHighlightsButtonContentDescription(newValue) {
        this.clearHighlightsButtonContentDescription = newValue;
        this.updateNative();
    }
    get singleScanButtonAccessibilityHint() {
        return this._singleScanButtonAccessibilityHint;
    }
    set singleScanButtonAccessibilityHint(newValue) {
        this._singleScanButtonAccessibilityHint = newValue;
        this.updateNative();
    }
    get singleScanButtonAccessibilityLabel() {
        return this._singleScanButtonAccessibilityLabel;
    }
    set singleScanButtonAccessibilityLabel(newValue) {
        this._singleScanButtonAccessibilityLabel = newValue;
        this.updateNative();
    }
    get singleScanButtonContentDescription() {
        return this._singleScanButtonContentDescription;
    }
    set singleScanButtonContentDescription(newValue) {
        this._singleScanButtonContentDescription = newValue;
        this.updateNative();
    }
    get clearHighlightsButtonText() {
        return this._clearHighlightsButtonText;
    }
    set clearHighlightsButtonText(newValue) {
        this._clearHighlightsButtonText = newValue;
        this.updateNative();
    }
    get exitButtonText() {
        return this._exitButtonText;
    }
    set exitButtonText(newValue) {
        this._exitButtonText = newValue;
        this.updateNative();
    }
    get textForTapShutterToScanHint() {
        return this._textForTapShutterToScanHint;
    }
    set textForTapShutterToScanHint(newValue) {
        this._textForTapShutterToScanHint = newValue;
        this.updateNative();
    }
    get textForScanningHint() {
        return this._textForScanningHint;
    }
    set textForScanningHint(newValue) {
        this._textForScanningHint = newValue;
        this.updateNative();
    }
    get textForMoveCloserAndRescanHint() {
        return this._textForMoveCloserAndRescanHint;
    }
    set textForMoveCloserAndRescanHint(newValue) {
        this._textForMoveCloserAndRescanHint = newValue;
        this.updateNative();
    }
    get textForMoveFurtherAndRescanHint() {
        return this._textForMoveFurtherAndRescanHint;
    }
    set textForMoveFurtherAndRescanHint(newValue) {
        this._textForMoveFurtherAndRescanHint = newValue;
        this.updateNative();
    }
    get textForUnrecognizedBarcodesDetectedHint() {
        return this._textForUnrecognizedBarcodesDetectedHint;
    }
    set textForUnrecognizedBarcodesDetectedHint(newValue) {
        this._textForUnrecognizedBarcodesDetectedHint = newValue;
        this.updateNative();
    }
    set htmlElementState(newState) {
        const didChangeShown = this._htmlElementState.isShown !== newState.isShown;
        const didChangePositionOrSize = this._htmlElementState.didChangeComparedTo(newState);
        this._htmlElementState = newState;
        if (didChangePositionOrSize) {
            this.updatePositionAndSize();
        }
        if (didChangeShown) {
            if (this._htmlElementState.isShown) {
                this._show();
            }
            else {
                this._hide();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
    }
    static forContextWithMode(context, barcodeCount) {
        const style = BarcodeCountDefaults.BarcodeCountView.style;
        const view = new BarcodeCountView({ context, barcodeCount, style });
        return view;
    }
    static forContextWithModeAndStyle(context, barcodeCount, style) {
        const view = new BarcodeCountView({ context, barcodeCount, style });
        return view;
    }
    constructor({ context, barcodeCount, style }) {
        super();
        this._uiListener = null;
        this._listener = null;
        this._shouldShowUserGuidanceView = BarcodeCountDefaults.BarcodeCountView.shouldShowUserGuidanceView;
        this._shouldShowListButton = BarcodeCountDefaults.BarcodeCountView.shouldShowListButton;
        this._shouldShowExitButton = BarcodeCountDefaults.BarcodeCountView.shouldShowExitButton;
        this._shouldShowShutterButton = BarcodeCountDefaults.BarcodeCountView.shouldShowShutterButton;
        this._shouldShowHints = BarcodeCountDefaults.BarcodeCountView.shouldShowHints;
        this._shouldShowClearHighlightsButton = BarcodeCountDefaults.BarcodeCountView.shouldShowClearHighlightsButton;
        this._shouldShowSingleScanButton = BarcodeCountDefaults.BarcodeCountView.shouldShowSingleScanButton;
        this._shouldShowFloatingShutterButton = BarcodeCountDefaults.BarcodeCountView.shouldShowFloatingShutterButton;
        this._shouldShowToolbar = BarcodeCountDefaults.BarcodeCountView.shouldShowToolbar;
        this._shouldShowScanAreaGuides = BarcodeCountDefaults.BarcodeCountView.shouldShowScanAreaGuides;
        this._recognizedBrush = BarcodeCountDefaults.BarcodeCountView.defaultRecognizedBrush;
        this._unrecognizedBrush = BarcodeCountDefaults.BarcodeCountView.defaultUnrecognizedBrush;
        this._notInListBrush = BarcodeCountDefaults.BarcodeCountView.defaultNotInListBrush;
        this._filterSettings = null;
        this._style = BarcodeCountDefaults.BarcodeCountView.style;
        this._listButtonAccessibilityHint = BarcodeCountDefaults.BarcodeCountView.listButtonAccessibilityHint;
        this._listButtonAccessibilityLabel = BarcodeCountDefaults.BarcodeCountView.listButtonAccessibilityLabel;
        this._listButtonContentDescription = BarcodeCountDefaults.BarcodeCountView.listButtonContentDescription;
        this._exitButtonAccessibilityHint = BarcodeCountDefaults.BarcodeCountView.exitButtonAccessibilityHint;
        this._exitButtonAccessibilityLabel = BarcodeCountDefaults.BarcodeCountView.exitButtonAccessibilityLabel;
        this._exitButtonContentDescription = BarcodeCountDefaults.BarcodeCountView.exitButtonContentDescription;
        this._shutterButtonAccessibilityHint = BarcodeCountDefaults.BarcodeCountView.shutterButtonAccessibilityHint;
        this._shutterButtonAccessibilityLabel = BarcodeCountDefaults.BarcodeCountView.shutterButtonAccessibilityLabel;
        this._shutterButtonContentDescription = BarcodeCountDefaults.BarcodeCountView.shutterButtonContentDescription;
        this._floatingShutterButtonAccessibilityHint = BarcodeCountDefaults.BarcodeCountView.floatingShutterButtonAccessibilityHint;
        this._floatingShutterButtonAccessibilityLabel = BarcodeCountDefaults.BarcodeCountView.floatingShutterButtonAccessibilityLabel;
        this._floatingShutterButtonContentDescription = BarcodeCountDefaults.BarcodeCountView.floatingShutterButtonContentDescription;
        this._clearHighlightsButtonAccessibilityHint = BarcodeCountDefaults.BarcodeCountView.clearHighlightsButtonAccessibilityHint;
        this._clearHighlightsButtonAccessibilityLabel = BarcodeCountDefaults.BarcodeCountView.clearHighlightsButtonAccessibilityLabel;
        this._clearHighlightsButtonContentDescription = BarcodeCountDefaults.BarcodeCountView.clearHighlightsButtonContentDescription;
        this._singleScanButtonAccessibilityHint = BarcodeCountDefaults.BarcodeCountView.singleScanButtonAccessibilityHint;
        this._singleScanButtonAccessibilityLabel = BarcodeCountDefaults.BarcodeCountView.singleScanButtonAccessibilityLabel;
        this._singleScanButtonContentDescription = BarcodeCountDefaults.BarcodeCountView.singleScanButtonContentDescription;
        this._clearHighlightsButtonText = BarcodeCountDefaults.BarcodeCountView.clearHighlightsButtonText;
        this._exitButtonText = BarcodeCountDefaults.BarcodeCountView.exitButtonText;
        this._textForTapShutterToScanHint = BarcodeCountDefaults.BarcodeCountView.textForTapShutterToScanHint;
        this._textForScanningHint = BarcodeCountDefaults.BarcodeCountView.textForScanningHint;
        this._textForMoveCloserAndRescanHint = BarcodeCountDefaults.BarcodeCountView.textForMoveCloserAndRescanHint;
        this._textForMoveFurtherAndRescanHint = BarcodeCountDefaults.BarcodeCountView.textForMoveFurtherAndRescanHint;
        this._textForUnrecognizedBarcodesDetectedHint = BarcodeCountDefaults.BarcodeCountView.textForUnrecognizedBarcodesDetectedHint;
        this._toolbarSettings = null;
        this.htmlElement = null;
        this._htmlElementState = new HTMLElementState();
        this.scrollListener = this.elementDidChange.bind(this);
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this._style = style;
        this._barcodeCount = barcodeCount;
        this._context = context;
        barcodeCount._context = context;
        this.viewProxy = BarcodeCountViewProxy.forBarcodeCount(this);
    }
    clearHighlights() {
        return this.viewProxy.clearHighlights();
    }
    setToolbarSettings(settings) {
        this._toolbarSettings = settings;
        this.updateNative();
    }
    updateNative() {
        return this.viewProxy.update();
    }
    connectToElement(element) {
        this.htmlElement = element;
        this.htmlElementState = new HTMLElementState();
        // Initial update
        this.elementDidChange();
        this.subscribeToChangesOnHTMLElement();
    }
    detachFromElement() {
        this.unsubscribeFromChangesOnHTMLElement();
        this.htmlElement = null;
        this.elementDidChange();
    }
    setFrame(frame, isUnderContent = false) {
        return this.viewProxy.setPositionAndSize(frame.origin.y, frame.origin.x, frame.size.width, frame.size.height, isUnderContent);
    }
    show() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually shown if they're manually sized using setFrame");
        }
        return this._show();
    }
    hide() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually hidden if they're manually sized using setFrame");
        }
        return this._hide();
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new HTMLElementState();
            return;
        }
        const newState = new HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = { top: boundingRect.top, left: boundingRect.left };
        newState.size = { width: boundingRect.width, height: boundingRect.height };
        newState.shouldBeUnderContent = parseInt(this.htmlElement.style.zIndex || '1', 10) < 0
            || parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none'
            && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    updatePositionAndSize() {
        if (!this.htmlElementState || !this.htmlElementState.isValid) {
            return;
        }
        this.viewProxy.setPositionAndSize(this.htmlElementState.position.top, this.htmlElementState.position.left, this.htmlElementState.size.width, this.htmlElementState.size.height, this.htmlElementState.shouldBeUnderContent);
    }
    _show() {
        if (!this._context) {
            throw new Error('There should be a context attached to a view that should be shown');
        }
        return this.viewProxy.show();
    }
    _hide() {
        if (!this._context) {
            throw new Error('There should be a context attached to a view that should be shown');
        }
        return this.viewProxy.hide();
    }
}
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "_barcodeCount", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "_context", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "viewProxy", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "_uiListener", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "_listener", void 0);
__decorate([
    nameForSerialization('shouldShowUserGuidanceView')
], BarcodeCountView.prototype, "_shouldShowUserGuidanceView", void 0);
__decorate([
    nameForSerialization('shouldShowListButton')
], BarcodeCountView.prototype, "_shouldShowListButton", void 0);
__decorate([
    nameForSerialization('shouldShowExitButton')
], BarcodeCountView.prototype, "_shouldShowExitButton", void 0);
__decorate([
    nameForSerialization('shouldShowShutterButton')
], BarcodeCountView.prototype, "_shouldShowShutterButton", void 0);
__decorate([
    nameForSerialization('shouldShowHints')
], BarcodeCountView.prototype, "_shouldShowHints", void 0);
__decorate([
    nameForSerialization('shouldShowClearHighlightsButton')
], BarcodeCountView.prototype, "_shouldShowClearHighlightsButton", void 0);
__decorate([
    nameForSerialization('shouldShowSingleScanButton')
], BarcodeCountView.prototype, "_shouldShowSingleScanButton", void 0);
__decorate([
    nameForSerialization('shouldShowFloatingShutterButton')
], BarcodeCountView.prototype, "_shouldShowFloatingShutterButton", void 0);
__decorate([
    nameForSerialization('shouldShowToolbar')
], BarcodeCountView.prototype, "_shouldShowToolbar", void 0);
__decorate([
    nameForSerialization('shouldShowScanAreaGuides')
], BarcodeCountView.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate([
    nameForSerialization('recognizedBrush')
], BarcodeCountView.prototype, "_recognizedBrush", void 0);
__decorate([
    nameForSerialization('unrecognizedBrush')
], BarcodeCountView.prototype, "_unrecognizedBrush", void 0);
__decorate([
    nameForSerialization('notInListBrush')
], BarcodeCountView.prototype, "_notInListBrush", void 0);
__decorate([
    nameForSerialization('filterSettings')
], BarcodeCountView.prototype, "_filterSettings", void 0);
__decorate([
    nameForSerialization('style')
], BarcodeCountView.prototype, "_style", void 0);
__decorate([
    nameForSerialization('listButtonAccessibilityHint')
], BarcodeCountView.prototype, "_listButtonAccessibilityHint", void 0);
__decorate([
    nameForSerialization('listButtonAccessibilityLabel')
], BarcodeCountView.prototype, "_listButtonAccessibilityLabel", void 0);
__decorate([
    nameForSerialization('listButtonContentDescription')
], BarcodeCountView.prototype, "_listButtonContentDescription", void 0);
__decorate([
    nameForSerialization('exitButtonAccessibilityHint')
], BarcodeCountView.prototype, "_exitButtonAccessibilityHint", void 0);
__decorate([
    nameForSerialization('exitButtonAccessibilityLabel')
], BarcodeCountView.prototype, "_exitButtonAccessibilityLabel", void 0);
__decorate([
    nameForSerialization('exitButtonContentDescription')
], BarcodeCountView.prototype, "_exitButtonContentDescription", void 0);
__decorate([
    nameForSerialization('shutterButtonAccessibilityHint')
], BarcodeCountView.prototype, "_shutterButtonAccessibilityHint", void 0);
__decorate([
    nameForSerialization('shutterButtonAccessibilityLabel')
], BarcodeCountView.prototype, "_shutterButtonAccessibilityLabel", void 0);
__decorate([
    nameForSerialization('shutterButtonContentDescription')
], BarcodeCountView.prototype, "_shutterButtonContentDescription", void 0);
__decorate([
    nameForSerialization('floatingShutterButtonAccessibilityHint')
], BarcodeCountView.prototype, "_floatingShutterButtonAccessibilityHint", void 0);
__decorate([
    nameForSerialization('floatingShutterButtonAccessibilityLabel')
], BarcodeCountView.prototype, "_floatingShutterButtonAccessibilityLabel", void 0);
__decorate([
    nameForSerialization('floatingShutterButtonContentDescription')
], BarcodeCountView.prototype, "_floatingShutterButtonContentDescription", void 0);
__decorate([
    nameForSerialization('clearHighlightsButtonAccessibilityHint')
], BarcodeCountView.prototype, "_clearHighlightsButtonAccessibilityHint", void 0);
__decorate([
    nameForSerialization('clearHighlightsButtonAccessibilityLabel')
], BarcodeCountView.prototype, "_clearHighlightsButtonAccessibilityLabel", void 0);
__decorate([
    nameForSerialization('clearHighlightsButtonContentDescription')
], BarcodeCountView.prototype, "_clearHighlightsButtonContentDescription", void 0);
__decorate([
    nameForSerialization('singleScanButtonAccessibilityHint')
], BarcodeCountView.prototype, "_singleScanButtonAccessibilityHint", void 0);
__decorate([
    nameForSerialization('singleScanButtonAccessibilityLabel')
], BarcodeCountView.prototype, "_singleScanButtonAccessibilityLabel", void 0);
__decorate([
    nameForSerialization('singleScanButtonContentDescription')
], BarcodeCountView.prototype, "_singleScanButtonContentDescription", void 0);
__decorate([
    nameForSerialization('clearHighlightsButtonText')
], BarcodeCountView.prototype, "_clearHighlightsButtonText", void 0);
__decorate([
    nameForSerialization('exitButtonText')
], BarcodeCountView.prototype, "_exitButtonText", void 0);
__decorate([
    nameForSerialization('textForTapShutterToScanHint')
], BarcodeCountView.prototype, "_textForTapShutterToScanHint", void 0);
__decorate([
    nameForSerialization('textForScanningHint')
], BarcodeCountView.prototype, "_textForScanningHint", void 0);
__decorate([
    nameForSerialization('textForMoveCloserAndRescanHint')
], BarcodeCountView.prototype, "_textForMoveCloserAndRescanHint", void 0);
__decorate([
    nameForSerialization('textForMoveFurtherAndRescanHint')
], BarcodeCountView.prototype, "_textForMoveFurtherAndRescanHint", void 0);
__decorate([
    nameForSerialization('textForUnrecognizedBarcodesDetectedHint')
], BarcodeCountView.prototype, "_textForUnrecognizedBarcodesDetectedHint", void 0);
__decorate([
    nameForSerialization('toolbarSettings')
], BarcodeCountView.prototype, "_toolbarSettings", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "htmlElement", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "_htmlElementState", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "scrollListener", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "domObserver", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeCountView.prototype, "orientationChangeListener", void 0);

export { BarcodeCountView, BarcodeTrackingAdvancedOverlay, ScanditBarcodeCountPluginNative, ScanditBarcodePlugin, ScanditBarcodePluginImplementation, ScanditBarcodeSelectionPluginNative, TrackedBarcodeView };
