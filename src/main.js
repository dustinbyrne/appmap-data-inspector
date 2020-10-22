import '@fortawesome/fontawesome-free/js/fontawesome';
import App from './App.svelte';
import { dataObjects } from './stores';
import { getUrl } from './lib/util';

const app = new App({
  target: document.body,
  props: {}
});

const url = getUrl();
if (url) {
  dataObjects.url(url);
}

export default app;
