export default {
  install: (app, options) => {
    app.directive('img-fallback', {
      beforeMount(el, binding) {
        const { value } = binding;
        const defaultLoading = options.loading || 'http://de.4-traders.com/images/loading_100.gif';
        const defaultError = options.error || 'https://i.imgur.com/msl6h99.gif';
        const img = new Image();

        let loading = defaultLoading;
        let error = defaultError;
        let original = el.src;

        if (!value) {
          console.info(
            `Vue Img Fallback Warning: Directive value is ${typeof value}. Now using default values.`
          );
        }

        if (typeof value === 'string') {
          loading = value;
          error = value;
        }

        if (value instanceof Object) {
          loading = value.loading || defaultLoading;
          error = value.error || defaultError;
        }

        img.src = original;

        el.src = loading;

        img.onload = () => {
          el.src = original;
        };

        img.onerror = () => {
          el.src = error;
        };
      }
    }

    );
  }
};

export { ImgFallback };
