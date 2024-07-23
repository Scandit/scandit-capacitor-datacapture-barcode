import { SymbologyDescription, BarcodeTrackingAdvancedOverlayListenerEvents, BaseBarcodeFindView, SparkScanViewSettings, getSparkScanDefaults, BaseBarcodeTrackingAdvancedOverlay, BaseBarcodePickView, Barcode, TrackedBarcode, getBarcodeCountDefaults, loadBarcodeDefaults, loadBarcodeCaptureDefaults, loadBarcodeTrackingDefaults, loadBarcodeSelectionDefaults, loadBarcodeCountDefaults, loadBarcodePickDefaults, loadBarcodeFindDefaults, loadSparkScanDefaults, getBarcodeDefaults, ArucoDictionary, ArucoDictionaryPreset, BatterySavingMode, Checksum, CompositeFlag, CompositeType, Dot, DotWithIcons, Symbology, SymbologySettings, BarcodeCapture, BarcodeCaptureSettings, BarcodeCaptureSession, BarcodeCaptureOverlay, BarcodeCaptureOverlayStyle, BarcodeCaptureFeedback, BarcodeSelection, BarcodeSelectionSettings, BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionFeedback, BarcodeSelectionFreezeBehavior, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionTapBehavior, BarcodeSelectionTypeName, BarcodeSelectionTapSelection, BarcodeTracking, BarcodeTrackingSession, BarcodeTrackingScenario, BarcodeTrackingSettings, TargetBarcode, BarcodeTrackingBasicOverlay, BarcodeTrackingBasicOverlayStyle, EncodingRange, LocalizedOnlyBarcode, Range, BarcodeCount, BarcodeCountFeedback, BarcodeCountSession, BarcodeCountSettings, BarcodeCountViewStyle as BarcodeCountViewStyle$1, BarcodeCountCaptureList, BarcodeCountCaptureListSession, BarcodeCountToolbarSettings, BarcodeFilterSettings, BarcodeFilterHighlightType, BarcodeFilterHighlightSettingsBrush, BarcodeFind, BarcodeFindFeedback, BarcodeFindItem, BarcodeFindItemContent, BarcodeFindItemSearchOptions, BarcodeFindSettings, BarcodeFindViewSettings, BarcodePick, BarcodePickActionCallback, BarcodePickEvents, BarcodePickState, BarcodePickSettings, BarcodePickProduct, BarcodePickProductProviderCallback, BarcodePickProductProviderCallbackItem, BarcodePickAsyncMapperProductProvider, BarcodePickIconStyle, BarcodePickScanningSession, BarcodePickViewListenerEvents, BarcodePickViewSettings, BarcodePickViewUiListenerEvents, Rectangular, RectangularWithIcons, SparkScan, SparkScanFeedback, SparkScanPreviewBehavior, SparkScanScanningBehavior, SparkScanScanningModeDefault, SparkScanScanningModeTarget, SparkScanScanningPrecision, SparkScanSession, SparkScanSettings, SparkScanToastSettings, SparkScanViewErrorFeedback, SparkScanViewFeedback, SparkScanViewHandMode, SparkScanViewSuccessFeedback, SparkScanBarcodeFeedback, SparkScanBarcodeSuccessFeedback, SparkScanBarcodeErrorFeedback, BarcodeCaptureListenerEvents, BarcodeTrackingListenerEvents, BarcodeSelectionListenerEvents, BarcodeCountListenerEvents, BarcodeTrackingBasicOverlayListenerEvents, BarcodeSelectionBrushProviderEvents, BarcodeFindListenerEvents, BarcodeFindViewEvents, SparkScanListenerEvents, BarcodePickListenerEvents } from './barcode.js';
export { ArucoDictionary, ArucoDictionaryPreset, ArucoMarker, Barcode, BarcodeCapture, BarcodeCaptureFeedback, BarcodeCaptureOverlay, BarcodeCaptureOverlayStyle, BarcodeCaptureSession, BarcodeCaptureSettings, BarcodeCount, BarcodeCountCaptureList, BarcodeCountCaptureListSession, BarcodeCountFeedback, BarcodeCountSession, BarcodeCountSettings, BarcodeCountToolbarSettings, BarcodeCountViewStyle, BarcodeFilterHighlightSettingsBrush, BarcodeFilterHighlightType, BarcodeFilterSettings, BarcodeFind, BarcodeFindFeedback, BarcodeFindItem, BarcodeFindItemContent, BarcodeFindItemSearchOptions, BarcodeFindSettings, BarcodeFindViewSettings, BarcodePick, BarcodePickActionCallback, BarcodePickAsyncMapperProductProvider, BarcodePickIconStyle, BarcodePickProduct, BarcodePickProductProviderCallback, BarcodePickProductProviderCallbackItem, BarcodePickScanningSession, BarcodePickSettings, BarcodePickState, BarcodePickViewSettings, BarcodeSelection, BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionFeedback, BarcodeSelectionFreezeBehavior, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionSettings, BarcodeSelectionTapBehavior, BarcodeSelectionTapSelection, BarcodeTracking, BarcodeTrackingBasicOverlay, BarcodeTrackingBasicOverlayStyle, BarcodeTrackingScenario, BarcodeTrackingSession, BarcodeTrackingSettings, BatterySavingMode, Checksum, CompositeFlag, CompositeType, Dot, DotWithIcons, EncodingRange, LocalizedOnlyBarcode, Range, Rectangular, RectangularWithIcons, SparkScan, SparkScanBarcodeErrorFeedback, SparkScanBarcodeFeedback, SparkScanBarcodeSuccessFeedback, SparkScanFeedback, SparkScanPreviewBehavior, SparkScanScanningBehavior, SparkScanScanningModeDefault, SparkScanScanningModeTarget, SparkScanScanningPrecision, SparkScanSession, SparkScanSettings, SparkScanToastSettings, SparkScanViewErrorFeedback, SparkScanViewFeedback, SparkScanViewHandMode, SparkScanViewSettings, SparkScanViewSuccessFeedback, StructuredAppendData, Symbology, SymbologyDescription, SymbologySettings, TargetBarcode, TrackedBarcode } from './barcode.js';
import { nameForSerialization, DefaultSerializeable, Size, BaseNativeProxy, ignoreFromSerialization, Brush, FactoryMaker } from 'scandit-capacitor-datacapture-core/dist/core';
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
    CapacitorFunction["UpdateBarcodeCaptureOverlay"] = "updateBarcodeCaptureOverlay";
    CapacitorFunction["UpdateBarcodeCaptureMode"] = "updateBarcodeCaptureMode";
    CapacitorFunction["ApplyBarcodeCaptureModeSettings"] = "applyBarcodeCaptureModeSettings";
    CapacitorFunction["UpdateBarcodeTrackingBasicOverlay"] = "updateBarcodeTrackingBasicOverlay";
    CapacitorFunction["UpdateBarcodeTrackingAdvancedOverlay"] = "updateBarcodeTrackingAdvancedOverlay";
    CapacitorFunction["UpdateBarcodeTrackingMode"] = "updateBarcodeTrackingMode";
    CapacitorFunction["ApplyBarcodeTrackingModeSettings"] = "applyBarcodeTrackingModeSettings";
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
        loadBarcodePickDefaults(defaultsJSON.BarcodePick);
        loadBarcodeFindDefaults(defaultsJSON.BarcodeFind);
        loadSparkScanDefaults(defaultsJSON.SparkScan);
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
    updateBarcodeCaptureMode(modeJson) {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.UpdateBarcodeCaptureMode]({
            modeJson: modeJson
        });
    }
    applyBarcodeCaptureModeSettings(newSettingsJson) {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.ApplyBarcodeCaptureModeSettings]({
            modeSettingsJson: newSettingsJson
        });
    }
    updateBarcodeCaptureOverlay(overlayJson) {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.UpdateBarcodeCaptureOverlay]({
            overlayJson: overlayJson
        });
    }
    resetSession() {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.ResetBarcodeCaptureSession]();
    }
    registerListenerForEvents() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SubscribeBarcodeCaptureListener]();
    }
    unregisterListenerForEvents() {
        this.didScanListenerHandler.remove();
        this.didUpdateSessionListenerHandler.remove();
    }
    setModeEnabledState(enabled) {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SetBarcodeCaptureModeEnabledState]({ 'enabled': enabled });
    }
    subscribeDidUpdateSessionListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didUpdateSessionListenerHandler = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCaptureListenerEvent.DidUpdateSession, this.notifyListeners);
        });
    }
    subscribeDidScanListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didScanListenerHandler = yield window.Capacitor.Plugins[Capacitor.pluginName]
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
    updateBarcodeTrackingMode(modeJson) {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.UpdateBarcodeTrackingMode]({
            modeJson: modeJson
        });
    }
    applyBarcodeTrackingModeSettings(newSettingsJson) {
        return window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.ApplyBarcodeTrackingModeSettings]({
            modeSettingsJson: newSettingsJson
        });
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
    updateBarcodeTrackingAdvancedOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.UpdateBarcodeTrackingAdvancedOverlay, {
                overlayJson: overlayJson
            });
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
        this.didScanListenerHandler.remove();
        this.didListSessionUpdateListenerHandler.remove();
        return ScanditBarcodeCountPluginNative.unregisterBarcodeCountListener();
    }
    subscribeDidScan() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didScanListenerHandler = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountListenerEventName.didScan, this.notifyListeners);
        });
    }
    subscribeDidListSessionUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didListSessionUpdateListenerHandler = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountListenerEventName.didListSessionUpdate, this.notifyListeners);
        });
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
    updateBarcodeTrackingBasicOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.UpdateBarcodeTrackingBasicOverlay, {
                overlayJson: overlayJson
            });
        });
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
    updateBarcodeSelectionMode(modeJson) {
        return ScanditBarcodeSelectionPluginNative.updateBarcodeSelectionMode({ modeJson: modeJson });
    }
    applyBarcodeSelectionModeSettings(newSettingsJson) {
        return ScanditBarcodeSelectionPluginNative.applyBarcodeSelectionModeSettings({ modeSettingsJson: newSettingsJson });
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
    updateBarcodeSelectionBasicOverlay(overlayJson) {
        return ScanditBarcodeSelectionPluginNative.updateBarcodeSelectionBasicOverlay({ overlayJson: overlayJson });
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

class NativeBarcodePickProductProxy extends BaseNativeProxy {
    constructor() {
        super();
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.productIdentifierForItemsListenerHandler = this.productIdentifierForItemsListenerHandler.bind(this);
    }
    finishOnProductIdentifierForItems(jsonData) {
        return ScanditBarcodePickPluginNative.finishOnProductIdentifierForItems({ itemsJson: jsonData });
    }
    subscribeProductIdentifierForItemsListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.productIdentifierForItemsListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickEvents.OnProductIdentifierForItems, this.productIdentifierForItemsListenerHandler);
        });
    }
    unsubscribeListeners() {
        this.productIdentifierForItemsListenerHandle.remove();
    }
    productIdentifierForItemsListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickEvents.OnProductIdentifierForItems, JSON.stringify(event));
    }
}

class NativeBarcodePickViewProxy extends BaseNativeProxy {
    constructor() {
        super();
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.didPickItemListenerHandler = this.didPickItemListenerHandler.bind(this);
        this.didUnpickItemListenerHandler = this.didUnpickItemListenerHandler.bind(this);
        this.didStartScanningListenerHandler = this.didStartScanningListenerHandler.bind(this);
        this.didFreezeScanningListenerHandler = this.didFreezeScanningListenerHandler.bind(this);
        this.didPauseScanningListenerHandler = this.didPauseScanningListenerHandler.bind(this);
        this.didStopScanningListenerHandler = this.didStopScanningListenerHandler.bind(this);
        this.viewUiListenerHandler = this.viewUiListenerHandler.bind(this);
    }
    registerFrameworkEvents() {
        this.addViewListener();
        this.subscribeDidPickItemListener();
        this.subscribeDidUnpickItemListener();
    }
    addViewListener() {
        this.subscribeDidStartScanningListener();
        this.subscribeDidFreezeScanningListener();
        this.subscribeDidPauseScanningListener();
        this.subscribeDidStopScanningListener();
        ScanditBarcodePickPluginNative.addViewListener();
    }
    unregisterFrameworkEvents() {
        this.unsubscribeListeners();
    }
    findNodeHandle(_view) {
        // This is only needed on React Native, will be removed from Capacitor in a future refactor.
        return null;
    }
    viewStart() {
        return ScanditBarcodePickPluginNative.viewStart();
    }
    viewPause() {
        return ScanditBarcodePickPluginNative.viewPause();
    }
    viewFreeze() {
        return ScanditBarcodePickPluginNative.viewFreeze();
    }
    finishPickAction(code, result) {
        return ScanditBarcodePickPluginNative.finishPickAction({ code: code, result: result });
    }
    createView(_, json) {
        return ScanditBarcodePickPluginNative.createPickView({ json: json });
    }
    updateView(json) {
        return ScanditBarcodePickPluginNative.updatePickView({ json: json });
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return ScanditBarcodePickPluginNative.setPickViewPositionAndSize({ position: { top, left, width, height, shouldBeUnderWebView } });
    }
    addActionListener() {
        return ScanditBarcodePickPluginNative.addActionListener();
    }
    unsubscribeListeners() {
        this.didPickItemListenerHandle.remove();
        this.didUnpickItemListenerHandle.remove();
        this.didStartScanningListenerHandle.remove();
        this.didFreezeScanningListenerHandle.remove();
        this.didPauseScanningListenerHandle.remove();
        this.didStopScanningListenerHandle.remove();
        this.unsubscribeBarcodePickViewUiListener();
        ScanditBarcodePickPluginNative.removeViewListener();
        return ScanditBarcodePickPluginNative.removeActionListener();
    }
    subscribeDidPickItemListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didPickItemListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickEvents.DidPick, this.didPickItemListenerHandler);
        });
    }
    subscribeDidUnpickItemListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didUnpickItemListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickEvents.DidUnpick, this.didUnpickItemListenerHandler);
        });
    }
    subscribeBarcodePickViewUiListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.viewUiListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickViewUiListenerEvents.DidTapFinishButton, this.viewUiListenerHandler);
            return ScanditBarcodePickPluginNative.registerBarcodePickViewUiListener();
        });
    }
    unsubscribeBarcodePickViewUiListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.viewUiListenerHandle.remove();
            return ScanditBarcodePickPluginNative.unregisterBarcodePickViewUiListener();
        });
    }
    subscribeDidStartScanningListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didStartScanningListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickViewListenerEvents.DidStartScanning, this.didStartScanningListenerHandler);
        });
    }
    subscribeDidFreezeScanningListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didFreezeScanningListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickViewListenerEvents.DidFreezeScanning, this.didFreezeScanningListenerHandler);
        });
    }
    subscribeDidPauseScanningListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didPauseScanningListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickViewListenerEvents.DidPauseScanning, this.didPauseScanningListenerHandler);
        });
    }
    subscribeDidStopScanningListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didStopScanningListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickViewListenerEvents.DidStopScanning, this.didStopScanningListenerHandler);
        });
    }
    didPickItemListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickEvents.DidPick, JSON.stringify(event));
    }
    didUnpickItemListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickEvents.DidUnpick, JSON.stringify(event));
    }
    viewUiListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickViewUiListenerEvents.DidTapFinishButton, JSON.stringify(event));
    }
    didStartScanningListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickViewListenerEvents.DidStartScanning, JSON.stringify(event));
    }
    didFreezeScanningListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickViewListenerEvents.DidFreezeScanning, JSON.stringify(event));
    }
    didPauseScanningListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickViewListenerEvents.DidPauseScanning, JSON.stringify(event));
    }
    didStopScanningListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickViewListenerEvents.DidStopScanning, JSON.stringify(event));
    }
}

var NativeBarcodeFindEvents;
(function (NativeBarcodeFindEvents) {
    NativeBarcodeFindEvents["onSearchStarted"] = "FrameworksBarcodeFindListener.onSearchStarted";
    NativeBarcodeFindEvents["onSearchPaused"] = "FrameworksBarcodeFindListener.onSearchPaused";
    NativeBarcodeFindEvents["onSearchStopped"] = "FrameworksBarcodeFindListener.onSearchStopped";
})(NativeBarcodeFindEvents || (NativeBarcodeFindEvents = {}));
class NativeBarcodeFindListenerProxy extends BaseNativeProxy {
    constructor() {
        super(...arguments);
        this.nativeEventSubscriptions = [];
        this.isModeEnabled = () => false;
    }
    setItemList(itemsJson) {
        return ScanditBarcodeFindPluginNative.barcodeFindSetItemList({ BarcodeFindItemList: itemsJson });
    }
    updateFindMode(barcodeFindJson) {
        return ScanditBarcodeFindPluginNative.updateFindMode({ BarcodeFind: barcodeFindJson });
    }
    barcodeFindModeStart() {
        return ScanditBarcodeFindPluginNative.barcodeFindModeStart();
    }
    barcodeFindModePause() {
        return ScanditBarcodeFindPluginNative.barcodeFindModePause();
    }
    barcodeFindModeStop() {
        return ScanditBarcodeFindPluginNative.barcodeFindModeStop();
    }
    setModeEnabledState(isEnabled) {
        ScanditBarcodeFindPluginNative.setBarcodeFindModeEnabledState({ enabled: isEnabled });
    }
    subscribeBarcodeFindListener() {
        const onSearchStartedSubscription = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(NativeBarcodeFindEvents.onSearchStarted, this.notifyListeners.bind(this));
        const onSearchPausedSubscription = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(NativeBarcodeFindEvents.onSearchPaused, this.notifyListeners.bind(this));
        const onSearchStoppedSubscription = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(NativeBarcodeFindEvents.onSearchStopped, this.notifyListeners.bind(this));
        this.nativeEventSubscriptions.push(onSearchStartedSubscription, onSearchPausedSubscription, onSearchStoppedSubscription);
        return ScanditBarcodeFindPluginNative.registerBarcodeFindListener();
    }
    unsubscribeBarcodeFindListener() {
        return __awaiter(this, void 0, void 0, function* () {
            const removePromises = this.nativeEventSubscriptions.map((subscription) => __awaiter(this, void 0, void 0, function* () { return yield subscription.remove(); }));
            yield Promise.all(removePromises);
            return ScanditBarcodeFindPluginNative.unregisterBarcodeFindListener();
        });
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(BarcodeFindListenerEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(BarcodeFindListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case NativeBarcodeFindEvents.onSearchStarted:
                this.eventEmitter.emit(BarcodeFindListenerEvents.onSearchStartedEvent, JSON.stringify(event));
                break;
            case NativeBarcodeFindEvents.onSearchPaused:
                this.eventEmitter.emit(BarcodeFindListenerEvents.onSearchPausedEvent, JSON.stringify(event));
                break;
            case NativeBarcodeFindEvents.onSearchStopped:
                this.eventEmitter.emit(BarcodeFindListenerEvents.onSearchStoppedEvent, JSON.stringify(event));
                break;
        }
    }
}

var NativeBarcodeFindViewEvents;
(function (NativeBarcodeFindViewEvents) {
    NativeBarcodeFindViewEvents["onFinishButtonTapped"] = "FrameworksBarcodeFindViewUiListener.onFinishButtonTapped";
})(NativeBarcodeFindViewEvents || (NativeBarcodeFindViewEvents = {}));
class NativeBarcodeFindViewProxy extends BaseNativeProxy {
    showView() {
        return ScanditBarcodeFindPluginNative.showFindView();
    }
    hideView() {
        return ScanditBarcodeFindPluginNative.hideFindView();
    }
    onPause() {
        return ScanditBarcodeFindPluginNative.barcodeFindModePause();
    }
    onResume() {
        return ScanditBarcodeFindPluginNative.barcodeFindViewOnResume();
    }
    startSearching() {
        return ScanditBarcodeFindPluginNative.barcodeFindViewStartSearching();
    }
    stopSearching() {
        return ScanditBarcodeFindPluginNative.barcodeFindViewStopSearching();
    }
    pauseSearching() {
        return ScanditBarcodeFindPluginNative.barcodeFindViewPauseSearching();
    }
    findNodeHandle(_view) {
        // This is used on RN only to retrieve the view id
        return null;
    }
    createView(_id, barcodeFindViewJson) {
        return ScanditBarcodeFindPluginNative.createFindView(JSON.parse(barcodeFindViewJson));
    }
    updateView(barcodeFindViewJson) {
        return ScanditBarcodeFindPluginNative.updateFindView(JSON.parse(barcodeFindViewJson));
    }
    subscribeBarcodeFindViewListener() {
        this.subscriptionBarcodeFindViewListener = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(NativeBarcodeFindViewEvents.onFinishButtonTapped, this.notifyListeners.bind(this));
        return ScanditBarcodeFindPluginNative.registerBarcodeFindViewListener();
    }
    unsubscribeBarcodeFindViewListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventEmitter.off(BarcodeFindViewEvents.onFinishButtonTappedEventName);
            yield this.subscriptionBarcodeFindViewListener.remove();
            return ScanditBarcodeFindPluginNative.unregisterBarcodeFindViewListener();
        });
    }
    notifyListeners(event) {
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case NativeBarcodeFindViewEvents.onFinishButtonTapped:
                this.eventEmitter.emit(BarcodeFindViewEvents.onFinishButtonTappedEventName, JSON.stringify(event));
                break;
        }
    }
}

class NativeSparkScanListenerProxy {
    constructor() {
        this.nativeEventSubscriptions = [];
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    resetSession() {
        return ScanditSparkScanPluginNative.resetSession();
    }
    updateMode(sparkScanJson) {
        return ScanditSparkScanPluginNative.updatSparkScanMode({ 'sparkScanJson': sparkScanJson });
    }
    registerListenerForEvents() {
        ScanditSparkScanPluginNative.registerSparkScanListenerForEvents();
    }
    unregisterListenerForEvents() {
        const removePromises = this.nativeEventSubscriptions.map((subscription) => __awaiter(this, void 0, void 0, function* () { return yield subscription.remove(); }));
        Promise.all(removePromises).then(() => {
            ScanditSparkScanPluginNative.unregisterSparkScanListenerForEvents();
        });
    }
    subscribeDidUpdateSessionListener() {
        this.didUpdateSessionListenerHandler = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(SparkScanListenerEvents.didUpdateSession, this.notifyListeners.bind(this));
        this.nativeEventSubscriptions.push(this.didUpdateSessionListenerHandler);
    }
    subscribeDidScanListener() {
        this.didScanListenerHandler = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(SparkScanListenerEvents.didScan, this.notifyListeners.bind(this));
        this.nativeEventSubscriptions.push(this.didScanListenerHandler);
    }
    finishDidUpdateSessionCallback(enabled) {
        return ScanditSparkScanPluginNative.finishSparkScanDidUpdateSessionCallback({ 'enabled': enabled });
    }
    finishDidScanCallback(enabled) {
        return ScanditSparkScanPluginNative.finishSparkScanDidScanCallback({ 'enabled': enabled });
    }
    setModeEnabledState(enabled) {
        return ScanditSparkScanPluginNative.setSparkScanModeEnabledState({ 'enabled': enabled });
    }
    notifyListeners(event) {
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case SparkScanListenerEvents.didScan:
                this.eventEmitter.emit(SparkScanListenerEvents.didScan, JSON.stringify(event));
                break;
            case SparkScanListenerEvents.didUpdateSession:
                this.eventEmitter.emit(SparkScanListenerEvents.didUpdateSession, JSON.stringify(event));
                break;
        }
        return done();
    }
}

class NativeBarcodePickListenerProxy extends BaseNativeProxy {
    constructor() {
        super();
        this.eventEmitter = FactoryMaker.getInstance('EventEmitter');
        this.didCompleteScanningSessionListenerHandler = this.didCompleteScanningSessionListenerHandler.bind(this);
        this.didUpdateScanningSessionListenerHandler = this.didUpdateScanningSessionListenerHandler.bind(this);
    }
    subscribeBarcodePickListeners() {
        ScanditBarcodePickPluginNative.addScanningListener();
        this.subscribeDidCompleteScanningSessionListener();
        this.subscribeDidUpdateScanningSessionListener();
    }
    unsubscribeBarcodePickListeners() {
        this.didCompleteScanningSessionListenerHandle.remove();
        this.didUpdateScanningSessionListenerHandle.remove();
        ScanditBarcodePickPluginNative.removeScanningListener();
    }
    subscribeDidCompleteScanningSessionListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didCompleteScanningSessionListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickListenerEvents.DidCompleteScanningSession, this.didCompleteScanningSessionListenerHandler);
        });
    }
    subscribeDidUpdateScanningSessionListener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.didUpdateScanningSessionListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodePickListenerEvents.DidUpdateScanningSession, this.didUpdateScanningSessionListenerHandler);
        });
    }
    didCompleteScanningSessionListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickListenerEvents.DidCompleteScanningSession, JSON.stringify(event));
    }
    didUpdateScanningSessionListenerHandler(event) {
        this.eventEmitter.emit(BarcodePickListenerEvents.DidUpdateScanningSession, JSON.stringify(event));
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
    FactoryMaker.bindInstance('BarcodePickListenerProxy', new NativeBarcodePickListenerProxy());
    FactoryMaker.bindInstance('BarcodePickProductProxy', new NativeBarcodePickProductProxy());
    FactoryMaker.bindInstance('BarcodePickViewProxy', new NativeBarcodePickViewProxy());
    FactoryMaker.bindInstance('BarcodeFindProxy', new NativeBarcodeFindListenerProxy());
    FactoryMaker.bindInstance('BarcodeFindViewProxy', new NativeBarcodeFindViewProxy());
    FactoryMaker.bindInstance('SparkScanListenerProxy', new NativeSparkScanListenerProxy());
}

class BarcodeFindView {
    static forMode(dataCaptureContext, barcodeFind) {
        return new BarcodeFindView(dataCaptureContext, barcodeFind);
    }
    static forModeWithViewSettings(dataCaptureContext, barcodeFind, viewSettings) {
        return new BarcodeFindView(dataCaptureContext, barcodeFind, viewSettings);
    }
    static forModeWithViewSettingsAndCameraSettings(dataCaptureContext, barcodeFind, viewSettings, cameraSettings) {
        return new BarcodeFindView(dataCaptureContext, barcodeFind, viewSettings, cameraSettings);
    }
    constructor(dataCaptureContext, barcodeFind, barcodeFindViewSettings, cameraSettings) {
        this.htmlElement = null;
        this._htmlElementState = new HTMLElementState();
        this.scrollListener = this.elementDidChange.bind(this);
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodeFindView = new BaseBarcodeFindView(dataCaptureContext, barcodeFind, barcodeFindViewSettings, cameraSettings);
        this.baseBarcodeFindView.initialize(this);
    }
    set htmlElementState(newState) {
        const didChangeShown = this._htmlElementState.isShown !== newState.isShown;
        this._htmlElementState = newState;
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
    get barcodeFindViewUiListener() {
        return this.baseBarcodeFindView.barcodeFindViewUiListener;
    }
    set barcodeFindViewUiListener(value) {
        this.baseBarcodeFindView.barcodeFindViewUiListener = value;
    }
    get shouldShowUserGuidanceView() {
        return this.baseBarcodeFindView.shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(value) {
        this.baseBarcodeFindView.shouldShowUserGuidanceView = value;
    }
    get shouldShowHints() {
        return this.baseBarcodeFindView.shouldShowHints;
    }
    set shouldShowHints(value) {
        this.baseBarcodeFindView.shouldShowHints = value;
    }
    get shouldShowCarousel() {
        return this.baseBarcodeFindView.shouldShowCarousel;
    }
    set shouldShowCarousel(value) {
        this.baseBarcodeFindView.shouldShowCarousel = value;
    }
    get shouldShowPauseButton() {
        return this.baseBarcodeFindView.shouldShowPauseButton;
    }
    set shouldShowPauseButton(value) {
        this.baseBarcodeFindView.shouldShowPauseButton = value;
    }
    get shouldShowFinishButton() {
        return this.baseBarcodeFindView.shouldShowFinishButton;
    }
    set shouldShowFinishButton(value) {
        this.baseBarcodeFindView.shouldShowFinishButton = value;
    }
    get shouldShowProgressBar() {
        return this.baseBarcodeFindView.shouldShowProgressBar;
    }
    set shouldShowProgressBar(value) {
        this.baseBarcodeFindView.shouldShowProgressBar = value;
    }
    get shouldShowTorchControl() {
        return this.baseBarcodeFindView.shouldShowTorchControl;
    }
    set shouldShowTorchControl(value) {
        this.baseBarcodeFindView.shouldShowTorchControl = value;
    }
    get torchControlPosition() {
        return this.baseBarcodeFindView.torchControlPosition;
    }
    set torchControlPosition(value) {
        this.baseBarcodeFindView.torchControlPosition = value;
    }
    get textForCollapseCardsButton() {
        return this.baseBarcodeFindView.textForCollapseCardsButton;
    }
    set textForCollapseCardsButton(value) {
        this.baseBarcodeFindView.textForCollapseCardsButton = value;
    }
    get textForAllItemsFoundSuccessfullyHint() {
        return this.baseBarcodeFindView.textForAllItemsFoundSuccessfullyHint;
    }
    set textForAllItemsFoundSuccessfullyHint(value) {
        this.baseBarcodeFindView.textForAllItemsFoundSuccessfullyHint = value;
    }
    get textForPointAtBarcodesToSearchHint() {
        return this.baseBarcodeFindView.textForPointAtBarcodesToSearchHint;
    }
    set textForPointAtBarcodesToSearchHint(value) {
        this.baseBarcodeFindView.textForPointAtBarcodesToSearchHint = value;
    }
    get textForMoveCloserToBarcodesHint() {
        return this.baseBarcodeFindView.textForMoveCloserToBarcodesHint;
    }
    set textForMoveCloserToBarcodesHint(value) {
        this.baseBarcodeFindView.textForMoveCloserToBarcodesHint = value;
    }
    get textForTapShutterToPauseScreenHint() {
        return this.baseBarcodeFindView.textForTapShutterToPauseScreenHint;
    }
    set textForTapShutterToPauseScreenHint(value) {
        this.baseBarcodeFindView.textForTapShutterToPauseScreenHint = value;
    }
    get textForTapShutterToResumeSearchHint() {
        return this.baseBarcodeFindView.textForTapShutterToResumeSearchHint;
    }
    set textForTapShutterToResumeSearchHint(value) {
        this.baseBarcodeFindView.textForTapShutterToResumeSearchHint = value;
    }
    stopSearching() {
        return this.baseBarcodeFindView.stopSearching();
    }
    startSearching() {
        return this.baseBarcodeFindView.startSearching();
    }
    pauseSearching() {
        return this.baseBarcodeFindView.pauseSearching();
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
    _show() {
        return this.baseBarcodeFindView.show();
    }
    _hide() {
        return this.baseBarcodeFindView.hide();
    }
    toJSON() {
        return this.baseBarcodeFindView.toJSON();
    }
}
__decorate([
    ignoreFromSerialization
], BarcodeFindView.prototype, "htmlElement", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeFindView.prototype, "_htmlElementState", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeFindView.prototype, "scrollListener", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeFindView.prototype, "domObserver", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeFindView.prototype, "orientationChangeListener", void 0);

var SparkScanViewEventName;
(function (SparkScanViewEventName) {
    SparkScanViewEventName["fastFindButtonTapped"] = "SparkScanViewUiListener.fastFindButtonTapped";
    SparkScanViewEventName["barcodeCountButtonTapped"] = "SparkScanViewUiListener.barcodeCountButtonTapped";
})(SparkScanViewEventName || (SparkScanViewEventName = {}));
var SparkScanFeedbackDelegateEvents;
(function (SparkScanFeedbackDelegateEvents) {
    SparkScanFeedbackDelegateEvents["feedbackForBarcode"] = "SparkScanFeedbackDelegate.feedbackForBarcode";
})(SparkScanFeedbackDelegateEvents || (SparkScanFeedbackDelegateEvents = {}));
class SparkScanViewProxy {
    static forSparkScanView(view) {
        const viewProxy = new SparkScanViewProxy();
        viewProxy.view = view;
        view._context.update();
        viewProxy.create();
        view._sparkScan.subscribeNativeListeners();
        viewProxy.subscribeListeners();
        return viewProxy;
    }
    constructor() {
        this.nativeEventSubscriptions = [];
        this.notifyListeners = this.notifyListeners.bind(this);
    }
    update() {
        const sparkScanView = this.view.toJSON();
        const json = JSON.stringify(sparkScanView);
        return ScanditSparkScanPluginNative.updateSparkScanView({ View: json });
    }
    create() {
        const barcodeCountView = this.view.toJSON();
        const viewJson = {
            SparkScan: this.view._sparkScan.toJSON(),
            SparkScanView: barcodeCountView
        };
        return ScanditSparkScanPluginNative.createSparkScanView({ 'viewJson': JSON.stringify(viewJson) });
    }
    dispose() {
        this.view._sparkScan.unsubscribeNativeListeners();
        this.unsubscribeListeners();
        ScanditSparkScanPluginNative.disposeSparkScanView();
    }
    emitFeedback(feedback) {
        return ScanditSparkScanPluginNative.emitSparkScanViewFeedback({ 'feedback': JSON.stringify(feedback.toJSON()) });
    }
    stopScanning() {
        return ScanditSparkScanPluginNative.stopSparkScanViewScanning();
    }
    pauseScanning() {
        return ScanditSparkScanPluginNative.pauseSparkScanViewScanning();
    }
    startScanning() {
        return ScanditSparkScanPluginNative.startSparkScanViewScanning();
    }
    prepareScanning() {
        return ScanditSparkScanPluginNative.prepareSparkScanViewScanning();
    }
    subscribeListeners() {
        ScanditSparkScanPluginNative.registerSparkScanViewListenerEvents();
        this.fastFindButtonTappedListenerHandler = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(SparkScanViewEventName.fastFindButtonTapped, this.notifyListeners.bind(this));
        this.nativeEventSubscriptions.push(this.fastFindButtonTappedListenerHandler);
        this.barcodeCountButtonTappedListenerHandler = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(SparkScanViewEventName.barcodeCountButtonTapped, this.notifyListeners.bind(this));
        this.nativeEventSubscriptions.push(this.barcodeCountButtonTappedListenerHandler);
    }
    unsubscribeListeners() {
        const removePromises = this.nativeEventSubscriptions.map((subscription) => __awaiter(this, void 0, void 0, function* () { return yield subscription.remove(); }));
        Promise.all(removePromises).then(() => {
            ScanditSparkScanPluginNative.unregisterSparkScanViewListenerEvents();
        });
    }
    notifyListeners(event) {
        var _a, _b, _c, _d;
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case SparkScanViewEventName.barcodeCountButtonTapped:
                (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapBarcodeCountButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
                break;
            case SparkScanViewEventName.fastFindButtonTapped:
                (_d = (_c = this.view.uiListener) === null || _c === void 0 ? void 0 : _c.didTapFastFindButton) === null || _d === void 0 ? void 0 : _d.call(_c, this.view);
                break;
        }
        return done();
    }
    show() {
        return ScanditSparkScanPluginNative.showSparkScanView();
    }
    hide() {
        return ScanditSparkScanPluginNative.hideSparkScanView();
    }
    addFeedbackDelegate() {
        ScanditSparkScanPluginNative.addSparkScanFeedbackDelegate();
        const handler = window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(SparkScanFeedbackDelegateEvents.feedbackForBarcode, this.onFeedbackForBarcodeHandler.bind(this));
        this.nativeEventSubscriptions.push(handler);
        this.feedbackForBarcodeHandler = handler;
    }
    onFeedbackForBarcodeHandler(event) {
        var _a, _b;
        const payload = JSON.parse(event.barcode);
        const barcode = Barcode.fromJSON(payload);
        const feedback = (_b = (_a = this.view.feedbackDelegate) === null || _a === void 0 ? void 0 : _a.feedbackForBarcode) === null || _b === void 0 ? void 0 : _b.call(_a, barcode);
        ScanditSparkScanPluginNative.submitSparkScanFeedbackForBarcode({
            feedbackJson: JSON.stringify(feedback === null || feedback === void 0 ? void 0 : feedback.toJSON())
        });
    }
    removeFeedbackDelegate() {
        var _a;
        ScanditSparkScanPluginNative.removeSparkScanFeedbackDelegate();
        (_a = this.feedbackForBarcodeHandler) === null || _a === void 0 ? void 0 : _a.remove();
        if (this.feedbackForBarcodeHandler != null) {
            const handlerIndex = this.nativeEventSubscriptions.indexOf(this.feedbackForBarcodeHandler);
            if (handlerIndex != -1) {
                this.nativeEventSubscriptions.slice(handlerIndex, 1);
            }
        }
        this.feedbackForBarcodeHandler = null;
    }
    showToast(text) {
        return ScanditSparkScanPluginNative.showToast({ 'text': text });
    }
}

class SparkScanView extends DefaultSerializeable {
    static forContext(context, sparkScan, settings) {
        const view = new SparkScanView({ context, sparkScan, settings });
        return view;
    }
    static get defaultBrush() {
        return new Brush(SparkScanView.sparkScanDefaults.SparkScanView.brush.fillColor, SparkScanView.sparkScanDefaults.SparkScanView.brush.strokeColor, SparkScanView.sparkScanDefaults.SparkScanView.brush.strokeWidth);
    }
    constructor({ context, sparkScan, settings }) {
        super();
        this.uiListener = null;
        this._shouldShowScanAreaGuides = SparkScanView.sparkScanDefaults.SparkScanView.shouldShowScanAreaGuides;
        this._brush = SparkScanView.defaultBrush;
        this._previewSizeControlVisible = SparkScanView.sparkScanDefaults.SparkScanView.previewSizeControlVisible;
        this._torchButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.torchButtonVisible;
        this._scanningBehaviorButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.scanningBehaviorButtonVisible;
        this._handModeButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.handModeButtonVisible;
        this._barcodeCountButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.barcodeCountButtonVisible;
        this._fastFindButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.fastFindButtonVisible;
        this._targetModeButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.targetModeButtonVisible;
        this._soundModeButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.soundModeButtonVisible;
        this._hapticModeButtonVisible = SparkScanView.sparkScanDefaults.SparkScanView.hapticModeButtonVisible;
        this._stopCapturingText = SparkScanView.sparkScanDefaults.SparkScanView.stopCapturingText;
        this._startCapturingText = SparkScanView.sparkScanDefaults.SparkScanView.startCapturingText;
        this._resumeCapturingText = SparkScanView.sparkScanDefaults.SparkScanView.resumeCapturingText;
        this._scanningCapturingText = SparkScanView.sparkScanDefaults.SparkScanView.scanningCapturingText;
        this._captureButtonActiveBackgroundColor = SparkScanView.sparkScanDefaults.SparkScanView.captureButtonActiveBackgroundColor;
        this._captureButtonBackgroundColor = SparkScanView.sparkScanDefaults.SparkScanView.captureButtonBackgroundColor;
        this._captureButtonTintColor = SparkScanView.sparkScanDefaults.SparkScanView.captureButtonTintColor;
        this._toolbarBackgroundColor = SparkScanView.sparkScanDefaults.SparkScanView.toolbarBackgroundColor;
        this._toolbarIconActiveTintColor = SparkScanView.sparkScanDefaults.SparkScanView.toolbarIconActiveTintColor;
        this._toolbarIconInactiveTintColor = SparkScanView.sparkScanDefaults.SparkScanView.toolbarIconInactiveTintColor;
        this._targetModeHintText = SparkScanView.sparkScanDefaults.SparkScanView.targetModeHintText;
        this._shouldShowTargetModeHint = SparkScanView.sparkScanDefaults.SparkScanView.shouldShowTargetModeHint;
        this._hasFeedbackDelegate = false;
        this._sparkScan = sparkScan;
        this._context = context;
        this._viewSettings = settings !== null && settings !== void 0 ? settings : new SparkScanViewSettings();
        this.viewProxy = SparkScanViewProxy.forSparkScanView(this);
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(newValue) {
        this._shouldShowScanAreaGuides = newValue;
        this.viewProxy.update();
    }
    get brush() {
        return this._brush;
    }
    set brush(newValue) {
        this._brush = newValue;
        this.viewProxy.update();
    }
    get previewSizeControlVisible() {
        return this._previewSizeControlVisible;
    }
    set previewSizeControlVisible(newValue) {
        this._previewSizeControlVisible = newValue;
        this.viewProxy.update();
    }
    get torchButtonVisible() {
        return this._torchButtonVisible;
    }
    set torchButtonVisible(newValue) {
        this._torchButtonVisible = newValue;
        this.update();
    }
    get scanningBehaviorButtonVisible() {
        return this._scanningBehaviorButtonVisible;
    }
    set scanningBehaviorButtonVisible(newValue) {
        this._scanningBehaviorButtonVisible = newValue;
        this.update();
    }
    get handModeButtonVisible() {
        return this._handModeButtonVisible;
    }
    set handModeButtonVisible(newValue) {
        this._handModeButtonVisible = newValue;
        this.update();
    }
    get barcodeCountButtonVisible() {
        return this._barcodeCountButtonVisible;
    }
    set barcodeCountButtonVisible(newValue) {
        this._barcodeCountButtonVisible = newValue;
        this.update();
    }
    get fastFindButtonVisible() {
        return this._fastFindButtonVisible;
    }
    set fastFindButtonVisible(newValue) {
        this._fastFindButtonVisible = newValue;
        this.update();
    }
    get targetModeButtonVisible() {
        return this._targetModeButtonVisible;
    }
    set targetModeButtonVisible(newValue) {
        this._targetModeButtonVisible = newValue;
        this.update();
    }
    get soundModeButtonVisible() {
        return this._soundModeButtonVisible;
    }
    set soundModeButtonVisible(newValue) {
        this._soundModeButtonVisible = newValue;
        this.update();
    }
    get hapticModeButtonVisible() {
        return this._hapticModeButtonVisible;
    }
    set hapticModeButtonVisible(newValue) {
        this._hapticModeButtonVisible = newValue;
        this.update();
    }
    get stopCapturingText() {
        return this._stopCapturingText;
    }
    set stopCapturingText(newValue) {
        this._stopCapturingText = newValue;
        this.update();
    }
    get startCapturingText() {
        return this._startCapturingText;
    }
    set startCapturingText(newValue) {
        this._startCapturingText = newValue;
        this.update();
    }
    get resumeCapturingText() {
        return this._resumeCapturingText;
    }
    set resumeCapturingText(newValue) {
        this._resumeCapturingText = newValue;
        this.update();
    }
    get scanningCapturingText() {
        return this._scanningCapturingText;
    }
    set scanningCapturingText(newValue) {
        this._scanningCapturingText = newValue;
        this.update();
    }
    get captureButtonActiveBackgroundColor() {
        return this._captureButtonActiveBackgroundColor;
    }
    set captureButtonActiveBackgroundColor(newValue) {
        this._captureButtonActiveBackgroundColor = newValue;
        this.update();
    }
    get captureButtonBackgroundColor() {
        return this._captureButtonBackgroundColor;
    }
    set captureButtonBackgroundColor(newValue) {
        this._captureButtonBackgroundColor = newValue;
        this.update();
    }
    get captureButtonTintColor() {
        return this._captureButtonTintColor;
    }
    set captureButtonTintColor(newValue) {
        this._captureButtonTintColor = newValue;
        this.update();
    }
    get toolbarBackgroundColor() {
        return this._toolbarBackgroundColor;
    }
    set toolbarBackgroundColor(newValue) {
        this._toolbarBackgroundColor = newValue;
        this.update();
    }
    get toolbarIconActiveTintColor() {
        return this._toolbarIconActiveTintColor;
    }
    set toolbarIconActiveTintColor(newValue) {
        this._toolbarIconActiveTintColor = newValue;
        this.update();
    }
    get toolbarIconInactiveTintColor() {
        return this._toolbarIconInactiveTintColor;
    }
    set toolbarIconInactiveTintColor(newValue) {
        this._toolbarIconInactiveTintColor = newValue;
        this.update();
    }
    get targetModeHintText() {
        return this._targetModeHintText;
    }
    set targetModeHintText(newValue) {
        this._targetModeHintText = newValue;
        this.update();
    }
    get shouldShowTargetModeHint() {
        return this._shouldShowTargetModeHint;
    }
    set shouldShowTargetModeHint(newValue) {
        this._shouldShowTargetModeHint = newValue;
        this.update();
    }
    emitFeedback(feedback) {
        // NOOP
        console.warn('emitFeedback is deprecated and does nothing. Use the property feedbackDelegate instead.');
    }
    prepareScanning() {
        this.viewProxy.prepareScanning();
    }
    startScanning() {
        this.viewProxy.startScanning();
    }
    pauseScanning() {
        this.viewProxy.pauseScanning();
    }
    stopScanning() {
        this.viewProxy.stopScanning();
    }
    update() {
        return this.viewProxy.update();
    }
    dispose() {
        this.viewProxy.dispose();
    }
    show() {
        return this._show();
    }
    hide() {
        return this._hide();
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
    get feedbackDelegate() {
        return this._feedbackDelegate;
    }
    set feedbackDelegate(delegate) {
        if (this._feedbackDelegate) {
            this.viewProxy.removeFeedbackDelegate();
        }
        this._feedbackDelegate = delegate;
        if (delegate) {
            this.viewProxy.addFeedbackDelegate();
        }
        this._hasFeedbackDelegate = delegate != null;
    }
    showToast(text) {
        return this.viewProxy.showToast(text);
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
}
__decorate([
    ignoreFromSerialization
], SparkScanView.prototype, "_sparkScan", void 0);
__decorate([
    ignoreFromSerialization
], SparkScanView.prototype, "_context", void 0);
__decorate([
    ignoreFromSerialization
], SparkScanView.prototype, "viewProxy", void 0);
__decorate([
    nameForSerialization('viewSettings')
], SparkScanView.prototype, "_viewSettings", void 0);
__decorate([
    nameForSerialization('shouldShowScanAreaGuides')
], SparkScanView.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate([
    nameForSerialization('brush')
], SparkScanView.prototype, "_brush", void 0);
__decorate([
    nameForSerialization('previewSizeControlVisible')
], SparkScanView.prototype, "_previewSizeControlVisible", void 0);
__decorate([
    nameForSerialization('torchButtonVisible')
], SparkScanView.prototype, "_torchButtonVisible", void 0);
__decorate([
    nameForSerialization('scanningBehaviorButtonVisible')
], SparkScanView.prototype, "_scanningBehaviorButtonVisible", void 0);
__decorate([
    nameForSerialization('handModeButtonVisible')
], SparkScanView.prototype, "_handModeButtonVisible", void 0);
__decorate([
    nameForSerialization('barcodeCountButtonVisible')
], SparkScanView.prototype, "_barcodeCountButtonVisible", void 0);
__decorate([
    nameForSerialization('fastFindButtonVisible')
], SparkScanView.prototype, "_fastFindButtonVisible", void 0);
__decorate([
    nameForSerialization('targetModeButtonVisible')
], SparkScanView.prototype, "_targetModeButtonVisible", void 0);
__decorate([
    nameForSerialization('soundModeButtonVisible')
], SparkScanView.prototype, "_soundModeButtonVisible", void 0);
__decorate([
    nameForSerialization('hapticModeButtonVisible')
], SparkScanView.prototype, "_hapticModeButtonVisible", void 0);
__decorate([
    nameForSerialization('stopCapturingText')
], SparkScanView.prototype, "_stopCapturingText", void 0);
__decorate([
    nameForSerialization('startCapturingText')
], SparkScanView.prototype, "_startCapturingText", void 0);
__decorate([
    nameForSerialization('resumeCapturingText')
], SparkScanView.prototype, "_resumeCapturingText", void 0);
__decorate([
    nameForSerialization('scanningCapturingText')
], SparkScanView.prototype, "_scanningCapturingText", void 0);
__decorate([
    nameForSerialization('captureButtonActiveBackgroundColor')
], SparkScanView.prototype, "_captureButtonActiveBackgroundColor", void 0);
__decorate([
    nameForSerialization('captureButtonBackgroundColor')
], SparkScanView.prototype, "_captureButtonBackgroundColor", void 0);
__decorate([
    nameForSerialization('captureButtonTintColor')
], SparkScanView.prototype, "_captureButtonTintColor", void 0);
__decorate([
    nameForSerialization('toolbarBackgroundColor')
], SparkScanView.prototype, "_toolbarBackgroundColor", void 0);
__decorate([
    nameForSerialization('toolbarIconActiveTintColor')
], SparkScanView.prototype, "_toolbarIconActiveTintColor", void 0);
__decorate([
    nameForSerialization('toolbarIconInactiveTintColor')
], SparkScanView.prototype, "_toolbarIconInactiveTintColor", void 0);
__decorate([
    nameForSerialization('targetModeHintText')
], SparkScanView.prototype, "_targetModeHintText", void 0);
__decorate([
    nameForSerialization('shouldShowTargetModeHint')
], SparkScanView.prototype, "_shouldShowTargetModeHint", void 0);
__decorate([
    ignoreFromSerialization
], SparkScanView.prototype, "_feedbackDelegate", void 0);
__decorate([
    nameForSerialization('hasFeedbackDelegate')
], SparkScanView.prototype, "_hasFeedbackDelegate", void 0);

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
                ArucoDictionary,
                ArucoDictionaryPreset,
                Barcode,
                BatterySavingMode,
                Checksum,
                CompositeFlag,
                CompositeType,
                Dot,
                DotWithIcons,
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
                BarcodeFilterHighlightSettingsBrush,
                BarcodeFind,
                BarcodeFindFeedback,
                BarcodeFindItem,
                BarcodeFindItemContent,
                BarcodeFindItemSearchOptions,
                BarcodeFindSettings,
                BarcodeFindViewSettings,
                BarcodeFindView,
                BarcodePick,
                BarcodePickActionCallback,
                BarcodePickEvents,
                BarcodePickState,
                BarcodePickSettings,
                BarcodePickProduct,
                BarcodePickProductProviderCallback,
                BarcodePickProductProviderCallbackItem,
                BarcodePickAsyncMapperProductProvider,
                BarcodePickIconStyle,
                BarcodePickScanningSession,
                BarcodePickViewListenerEvents,
                BarcodePickViewSettings,
                BarcodePickViewUiListenerEvents,
                Rectangular,
                RectangularWithIcons,
                SparkScan,
                SparkScanFeedback,
                SparkScanPreviewBehavior,
                SparkScanScanningBehavior,
                SparkScanView,
                SparkScanScanningModeDefault,
                SparkScanScanningModeTarget,
                SparkScanScanningPrecision,
                SparkScanSession,
                SparkScanSettings,
                SparkScanToastSettings,
                SparkScanViewErrorFeedback,
                SparkScanViewFeedback,
                SparkScanViewHandMode,
                SparkScanViewSettings,
                SparkScanViewSuccessFeedback,
                SparkScanBarcodeFeedback,
                SparkScanBarcodeSuccessFeedback,
                SparkScanBarcodeErrorFeedback,
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
const ScanditBarcodePickPluginNative = registerPlugin('ScanditBarcodeNative');
const ScanditBarcodeFindPluginNative = registerPlugin('ScanditBarcodeNative');
const ScanditSparkScanPluginNative = registerPlugin('ScanditBarcodeNative');

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
        return __awaiter(this, void 0, void 0, function* () {
            this.singleScanButtonTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.singleScanButtonTapped, this.singleScanButtonTappedHandler);
            this.listButtonTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.listButtonTapped, this.listButtonTappedHandler);
            this.exitButtonTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.exitButtonTapped, this.exitButtonTappedHandler);
            this.brushForRecognizedBarcodeListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.brushForRecognizedBarcode, this.notifyListeners);
            this.brushForRecognizedBarcodeNotInListListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.brushForRecognizedBarcodeNotInList, this.notifyListeners);
            this.brushForUnrecognizedBarcodeListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.brushForUnrecognizedBarcode, this.notifyListeners);
            this.filteredBarcodeTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.filteredBarcodeTapped, this.filteredBarcodeTappedHandler);
            this.recognizedBarcodeNotInListTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.recognizedBarcodeNotInListTapped, this.recognizedBarcodeNotInListTappedHandler);
            this.recognizedBarcodeTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.recognizedBarcodeTapped, this.recognizedBarcodeTappedHandler);
            this.unrecognizedBarcodeTappedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.unrecognizedBarcodeTapped, this.unrecognizedBarcodeTappedHandler);
            this.captureListCompletedListenerHandle = yield window.Capacitor.Plugins[Capacitor.pluginName]
                .addListener(BarcodeCountViewEventName.captureListCompleted, this.captureListCompletedHandler);
        });
    }
    unsubscribeListeners() {
        this.singleScanButtonTappedListenerHandle.remove();
        this.listButtonTappedListenerHandle.remove();
        this.exitButtonTappedListenerHandle.remove();
        this.brushForRecognizedBarcodeListenerHandle.remove();
        this.brushForRecognizedBarcodeNotInListListenerHandle.remove();
        this.brushForUnrecognizedBarcodeListenerHandle.remove();
        this.filteredBarcodeTappedListenerHandle.remove();
        this.recognizedBarcodeNotInListTappedListenerHandle.remove();
        this.recognizedBarcodeTappedListenerHandle.remove();
        this.unrecognizedBarcodeTappedListenerHandle.remove();
        this.captureListCompletedListenerHandle.remove();
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

class BarcodePickView extends DefaultSerializeable {
    constructor(props) {
        super();
        this.htmlElement = null;
        this._htmlElementState = new HTMLElementState();
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.scrollListener = this.elementDidChange.bind(this);
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodePickView = new BaseBarcodePickView({
            context: props.context,
            barcodePick: props.barcodePick,
            settings: props.settings,
            cameraSettings: props.cameraSettings
        });
        this.viewProxy = FactoryMaker.getInstance('BarcodePickViewProxy');
        this.baseBarcodePickView.initialize(this);
    }
    get uiListener() {
        return this.baseBarcodePickView.uiListener;
    }
    set uiListener(value) {
        this.baseBarcodePickView.uiListener = value;
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
                this.start();
            }
            else {
                this.pause();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
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
    start() {
        this.baseBarcodePickView.start();
    }
    pause() {
        this.baseBarcodePickView.pause();
    }
    freeze() {
        this.baseBarcodePickView.freeze();
    }
    addListener(listener) {
        this.baseBarcodePickView.addListener(listener);
    }
    removeListener(listener) {
        this.baseBarcodePickView.removeListener(listener);
    }
    addActionListener(listener) {
        this.baseBarcodePickView.addActionListener(listener);
    }
    removeActionListener(listener) {
        this.baseBarcodePickView.removeActionListener(listener);
    }
    release() {
        this.baseBarcodePickView.dispose();
    }
}
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "baseBarcodePickView", void 0);
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "viewProxy", void 0);
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "htmlElement", void 0);
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "_htmlElementState", void 0);
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "domObserver", void 0);
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "scrollListener", void 0);
__decorate([
    ignoreFromSerialization
], BarcodePickView.prototype, "orientationChangeListener", void 0);

export { BarcodeCountView, BarcodeFindView, BarcodePickView, BarcodeTrackingAdvancedOverlay, ScanditBarcodeCountPluginNative, ScanditBarcodeFindPluginNative, ScanditBarcodePickPluginNative, ScanditBarcodePlugin, ScanditBarcodePluginImplementation, ScanditBarcodeSelectionPluginNative, ScanditSparkScanPluginNative, SparkScanView, TrackedBarcodeView };
