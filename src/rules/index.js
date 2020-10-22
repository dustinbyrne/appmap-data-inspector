import PersonalInformation from './pii.json';
import Crypto from './crypto.json';
import Formats from './formats.json';

const rules = [
  PersonalInformation,
  Crypto,
  Formats,
].flat();

export function getLabels(dataObj) {
  const labels = [];
  rules.forEach(r => {
    if (r.regex) {
      const target = r.target ? dataObj[r.target] : dataObj.value;
      if (target && target.match(r.regex) && r.labels) {
        labels.push(...r.labels);
      }
    }
  });
  return labels;
}
