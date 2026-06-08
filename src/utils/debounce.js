// https://github.com/angus-c/just/tree/d8c5dd18941062d8db7e9310ecc8f53fd607df54/packages/function-debounce
function debounce(fn, wait, callFirst) {
  let timeout = null;
  let debouncedFn = null;

  const clear = function () {
    if (timeout) {
      clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  };

  const flush = function () {
    const call = debouncedFn;

    clear();

    if (call) {
      call();
    }
  };

  const debounceWrapper = function () {
    if (!wait) {
      return fn.apply(this, arguments);
    }

    const args = arguments;
    const callNow = callFirst && !timeout;

    clear();

    debouncedFn = () => {
      fn.apply(this, args);
    };

    timeout = setTimeout(function () {
      timeout = null;

      if (!callNow) {
        const call = debouncedFn;

        debouncedFn = null;

        return call();
      }
    }, wait);

    if (callNow) {
      return debouncedFn();
    }
  };

  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;

  return debounceWrapper;
}

export { debounce as default };
