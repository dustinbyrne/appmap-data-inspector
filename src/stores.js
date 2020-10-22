import { writable } from 'svelte/store';
import { fetchJson, calculateEntropy } from './lib/util';
import { getLabels } from './rules';
import { Labels } from './lib/labels';

function getDataObjects(scenarioData) {
  if (!scenarioData || !scenarioData.events) {
    return [];
  }

  const dataObjects = scenarioData.events
  .map(e => [e.parameters, e.message])
  .flat(2)
  .filter(o => o && o.value && (o.class === 'java.lang.String' || o.class === 'String'));

  const http = scenarioData.events
    .map(e => (e.http_server_request || e.http_server_response) && e)
    .filter(e => e);
  const sql = scenarioData.events
    .map(e => e.sql_query)
    .filter(sql => sql);

  dataObjects.forEach((p) => {
    p.labels = new Set();
    const inQuery = sql.filter(s => s.sql.includes(p.value));
    if (inQuery.length) {
      p.labels.add(Labels.Database.id);
    }

    const inHttpRequest = http.filter((e) => {
      if (Array.isArray(e.message)) {
        return e.message.find(o => o.value.includes(p.value))
      }
      return false;
    });
    if (inHttpRequest.length) {
      p.labels.add(Labels.UserProvided.id);
    }

    const labels = getLabels(p);
    if (labels.length) {
      labels.forEach(l => p.labels.add(l));
    }

    p.entropy = calculateEntropy(p.value);
    if (p.entropy > 6 && !p.labels.has(Labels.KnownFormat.id)) {
      p.labels.add(Labels.HighEntropy.id)
    }

    if (p.labels.has(Labels.Credential.id)
      && !p.labels.has(Labels.Encrypted.id)
      && !p.labels.has(Labels.Hex.id)) {
      p.labels.add(Labels.Unencrypted.id);
    }
  });

  return Object.values(dataObjects.reduce((memo, p) => {
    const existing = memo[p.name + p.value];
    if (existing) {
      p.labels.forEach(l => existing.labels.add(l));
      return memo;
    }

    memo[p.name + p.value] = p;
    return memo;
  }, {}));
}

function createUrlStore() {
  const initParams = new URLSearchParams(window.location.search);
  const { subscribe, set, update } = writable(initParams.get('url'));

  return {
    subscribe,
    set: (url) => {
      if (url) {
        const params = new URLSearchParams();
        params.set('url', url);
        window.location.search = params.toString();
      } else {
        window.location.search = '';
      }

      set(url);
    },
  };
}

export const urlStore = createUrlStore();

function createScenarioStore() {
  const { subscribe, set, update } = writable({});

  urlStore.subscribe(async (u) => {
    if (u) {
      const scenarioData = await fetchJson(u);
      set(scenarioData);
    }
  });

  return {
    subscribe,
    set: (data) => {
      let scenarioData = data;
      if (typeof scenarioData === 'string') {
        scenarioData = JSON.parse(data);
      }
      set(scenarioData);
    },
  };
}

export const scenarioStore = createScenarioStore();

function createDataObjectStore() {
  const { subscribe, set, update } = writable([]);

  scenarioStore.subscribe(async (scenarioData) => {
    set(getDataObjects(scenarioData));
  });

  return {
    subscribe,
    sort: (key, ascending) => {
      update((arr) => {
        arr.sort((a, b) => {
          const firstVal = ascending ? a[key] : b[key];
          const secondVal = ascending ? b[key] : a[key];
          if (typeof firstVal === 'number') {
            return firstVal - secondVal;
          } else {
            return firstVal.localeCompare(secondVal);
          }
        });
        return arr;
      });
    }
  };
}

export const dataObjectStore = createDataObjectStore();
