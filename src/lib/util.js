
export async function fetchJson(url) {
  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    },
  });

  return await res.json();
}

// calculate shannon entropy for a given input
export function calculateEntropy(str) {
  const value = str.toString();
  const chars = [...value].reduce((memo, c) => {
    memo[c] = memo[c] + 1 || 1;
    return memo;
  }, {});

  return Object.entries(chars).reduce((entropy, [c, count]) => {
    const freq = count / value.length;
    entropy += freq * Math.log2(freq);
    return entropy;
  }, 0) * -1;
}

export function getUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('url');
}
