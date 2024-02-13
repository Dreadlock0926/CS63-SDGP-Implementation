/** CortexJS MathJSON 0.22.0 */
    (function(global,factory){typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'],factory):(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MathJson = {}));})(this, (function (exports) { 'use strict';
var MathJson = (() => {
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

  // src/math-json.ts
  var math_json_exports = {};
  __export(math_json_exports, {
    applyRecursively: () => applyRecursively,
    getDictionary: () => dictionary,
    getStringValue: () => stringValue,
    head: () => head,
    headName: () => headName,
    isDictionaryObject: () => isDictionaryObject,
    isFunctionObject: () => isFunctionObject,
    isStringObject: () => isStringObject,
    isSymbolObject: () => isSymbolObject,
    mapArgs: () => mapArgs,
    nops: () => nops,
    op: () => op,
    symbol: () => symbol,
    version: () => version
  });

  // src/math-json/utils.ts
  function isSymbolObject(expr) {
    return expr !== null && typeof expr === "object" && "sym" in expr;
  }
  function isStringObject(expr) {
    return expr !== null && typeof expr === "object" && "str" in expr;
  }
  function isFunctionObject(expr) {
    return expr !== null && typeof expr === "object" && "fn" in expr;
  }
  function isDictionaryObject(expr) {
    return expr !== null && typeof expr === "object" && "dict" in expr;
  }
  var recommendedScriptsRegex;
  function isRecommendedScripts(text) {
    if (!recommendedScriptsRegex) {
      const recommendedScripts = [
        "Zyyy",
        "Zinh",
        "Arab",
        "Armn",
        "Beng",
        "Bopo",
        "Cyrl",
        "Deva",
        "Ethi",
        "Geor",
        "Grek",
        "Gujr",
        "Guru",
        "Hang",
        "Hani",
        "Hebr",
        "Hira",
        "Kana",
        "Knda",
        "Khmr",
        "Laoo",
        "Latn",
        "Mlym",
        "Mymr",
        "Orya",
        "Sinh",
        "Taml",
        "Telu",
        "Thaa",
        "Thai",
        "Tibt"
      ];
      const regexPattern = `^[${recommendedScripts.map((x) => `\\p{Script=${x}}`).join("")}]*$`;
      recommendedScriptsRegex = new RegExp(regexPattern, "u");
    }
    return recommendedScriptsRegex.test(text);
  }
  function isValidIdentifier(s) {
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s))
      return true;
    if (ONLY_EMOJIS.test(s))
      return true;
    if (!isRecommendedScripts(s))
      return false;
    return /^[\p{XIDS}_]\p{XIDC}*$/u.test(s);
  }
  var VS16 = "\\u{FE0F}";
  var KEYCAP = "\\u{20E3}";
  var ZWJ = "\\u{200D}";
  var FLAG_SEQUENCE = "\\p{RI}\\p{RI}";
  var TAG_MOD = `(?:[\\u{E0020}-\\u{E007E}]+\\u{E007F})`;
  var EMOJI_MOD = `(?:\\p{EMod}|${VS16}${KEYCAP}?|${TAG_MOD})`;
  var EMOJI_NOT_IDENTIFIER = `(?:(?=\\P{XIDC})\\p{Emoji})`;
  var ZWJ_ELEMENT = `(?:${EMOJI_NOT_IDENTIFIER}${EMOJI_MOD}*|\\p{Emoji}${EMOJI_MOD}+|${FLAG_SEQUENCE})`;
  var POSSIBLE_EMOJI = `(?:${ZWJ_ELEMENT})(${ZWJ}${ZWJ_ELEMENT})*`;
  var SOME_EMOJI = new RegExp(`(?:${POSSIBLE_EMOJI})+`, "u");
  var ONLY_EMOJIS = new RegExp(`^(?:${POSSIBLE_EMOJI})+$`, "u");
  function validateIdentifier(s) {
    if (typeof s !== "string")
      return "not-a-string";
    if (s === "")
      return "empty-string";
    if (s.normalize() !== s)
      return "expected-nfc";
    if (/[\u200E\u200F\u2066-\u2069\u202A-\u202E]/.test(s))
      return "unexpected-bidi-marker";
    if (ONLY_EMOJIS.test(s))
      return "valid";
    if (/\p{XIDC}/u.test(s) && SOME_EMOJI.test(s))
      return "unexpected-mixed-emoji";
    if (!isRecommendedScripts(s))
      return "unexpected-script";
    if (!isValidIdentifier(s)) {
      if (!isValidIdentifier(s[0]))
        return "invalid-first-char";
      return "invalid-char";
    }
    return "valid";
  }
  function stringValue(expr) {
    if (expr === null || expr === void 0)
      return null;
    if (typeof expr === "object" && "str" in expr)
      return expr.str;
    if (typeof expr !== "string")
      return null;
    if (expr.length < 2)
      return null;
    if (expr[0] !== "'" || expr[expr.length - 1] !== "'")
      return null;
    return expr.substring(1, expr.length - 1);
  }
  function head(expr) {
    if (expr === null || expr === void 0)
      return null;
    if (Array.isArray(expr)) {
      if (typeof expr[0] === "string" && !isValidIdentifier(expr[0])) {
        console.error(
          `Invalid identifier "${expr[0]}": ${validateIdentifier(expr[0])}`
        );
        return null;
      }
      return expr[0];
    }
    if (isFunctionObject(expr))
      return expr.fn[0];
    return null;
  }
  function headName(expr) {
    const h = head(expr);
    return typeof h === "string" ? h : "";
  }
  function ops(expr) {
    if (expr === null || expr === void 0)
      return null;
    if (Array.isArray(expr))
      return expr.slice(1);
    if (isFunctionObject(expr))
      return expr.fn.slice(1);
    return null;
  }
  function op(expr, n) {
    if (expr === null || expr === void 0)
      return null;
    if (Array.isArray(expr))
      return expr[n] ?? null;
    if (isFunctionObject(expr))
      return expr.fn[n] ?? null;
    return null;
  }
  function op1(expr) {
    return op(expr, 1);
  }
  function op2(expr) {
    return op(expr, 2);
  }
  function nops(expr) {
    if (expr === null || expr === void 0)
      return 0;
    if (Array.isArray(expr))
      return Math.max(0, expr.length - 1);
    if (isFunctionObject(expr))
      return Math.max(0, expr.fn.length - 1);
    return 0;
  }
  function symbol(expr) {
    if (expr === null || expr === void 0)
      return null;
    if (typeof expr === "string") {
      if (/^[+\-\.0-9]/.test(expr))
        return null;
      if (expr.length >= 2 && expr[0] === "'" && expr[expr.length - 1] === "'")
        return null;
    }
    const s = isSymbolObject(expr) ? expr.sym : expr;
    if (typeof s !== "string")
      return null;
    return s;
  }
  function keyValuePair(expr) {
    const h = head(expr);
    if (h === "KeyValuePair" || h === "Tuple" || h === "Pair") {
      const key = stringValue(op1(expr));
      if (!key)
        return null;
      return [key, op2(expr) ?? "Nothing"];
    }
    return null;
  }
  function dictionary(expr) {
    if (expr === null)
      return null;
    if (typeof expr === "object" && "dict" in expr)
      return expr.dict;
    const kv = keyValuePair(expr);
    if (kv)
      return { [kv[0]]: kv[1] };
    const h = head(expr);
    if (h === "Dictionary") {
      const result = {};
      for (let i = 1; i < nops(expr); i++) {
        const kv2 = keyValuePair(op(expr, i));
        if (kv2)
          result[kv2[0]] = kv2[1];
      }
      return result;
    }
    return null;
  }
  function applyRecursively(expr, fn) {
    const h = head(expr);
    if (h !== null) {
      return [fn(h), ...(ops(expr) ?? []).map(fn)];
    }
    const dict = dictionary(expr);
    if (dict !== null) {
      const keys = Object.keys(dict);
      const result = {};
      for (const key of keys)
        result[key] = fn(dict[key]);
      return { dict: result };
    }
    return fn(expr);
  }
  function mapArgs(expr, fn) {
    let args = null;
    if (Array.isArray(expr))
      args = expr;
    if (isFunctionObject(expr))
      args = expr.fn;
    if (args === null)
      return [];
    let i = 1;
    const result = [];
    while (i < args.length) {
      result.push(fn(args[i]));
      i += 1;
    }
    return result;
  }

  // src/math-json.ts
  var version = "0.22.0";
  return __toCommonJS(math_json_exports);
})();
Object.assign(exports, MathJson); Object.defineProperty(exports, '__esModule', { value: true });}));
