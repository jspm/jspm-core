function getFunctionContent(fn) {
  fn = `${fn}`;
  if (fn.startsWith('function') || /^(?:\(.*?\)|.+?)\s*=>\s*{/.test(fn)) {
    return fn.slice(fn.indexOf('{') + 1, fn.lastIndexOf('}')).trim();
  }
  const matches = fn.match(/^(?:\(.*?\)|.+?)\s+=>/d);
  return fn.slice(matches.indices[0][1]).trim();
}

function isDeepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (a !== null && typeof a === 'object') {
    if (b === null || typeof b !== 'object') return false;
    for (const k in a) {
      if (!isDeepEqual(a[k], b[k])) return false;
    }
    return true;
  }
}

export default class Test extends Array {
  assert(fn, message) {
    try {
      const condition = fn();
      if (!condition) {
        this.errors.push(new Error(message || `assertion ${getFunctionContent(condition)} failed`));
      }
    } catch (e) {
      this.push(e);
    }
  }

  /**
   * `Object.is` strict equality
   */
  assertStrictEqual(a, b, message) {
    try {
      const got = a();
      if (!Object.is(got, b)) {
        this.push(new Error(message || `${getFunctionContent(a)} === ${JSON.stringify(got)}, expected ${JSON.stringify(b)}`));
      }
    } catch (e) {
      this.push(e);
    }
  }

  /**
   * Object.is strict equality
   */
   assertEqual(a, b, message) {
    try {
      const got = a();
      if (got !== b) {
        this.push(new Error(message || `${getFunctionContent(a)} === ${JSON.stringify(got)}, expected ${JSON.stringify(b)}`));
      }
    } catch (e) {
      this.push(e);
    }
  }

  /**
   * Match with regex
   */
  assertMatch(a, b, message) {
    try {
      const got = a();
      if (!b.test(got)) {
        this.push(new Error(message || `${getFunctionContent(a)} (${JSON.stringify(got)}) does not match ${b}`));
      }
    } catch (e) {
      this.push(e);
    }
  }

  /**
   * Object or array deep equality
   */
   assertObjectEqual(a, b, message) {
    try {
      const got = a();
      if (!isDeepEqual(got, b)) {
        this.push(new Error(message || `${getFunctionContent(a)} === ${JSON.stringify(got)}, expected ${JSON.stringify(b)}`));
      }
    } catch (e) {
      this.push(e);
    }
  }
}
