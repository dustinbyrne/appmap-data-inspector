import { getLabels } from "../rules";

export const Labels = {
  Database: {
    id: 'db',
    desc: 'Database persisted'
  },
  HighEntropy: {
    id: 'high-entropy',
    desc: 'This value has high entropy.'
  },
  LowEntropy: {
    id: 'low-entropy',
    desc: 'This value has low entropy. This is sometimes indicative of an unhashed secret.'
  },
  UserProvided: {
    id: 'user-provided',
    desc: 'This value is provided from a user. There are cases where user data must be properly sanitized.'
  },
  PersonalInformation: {
    id: 'personal-information',
    desc: 'Identified as personal information. Mishandling of this data could result in a compliance violation.',
  },
  Encrypted: {
    id: 'encrypted',
    desc: 'This value is encrypted.'
  },
  Unencrypted: {
    id: 'unencrypted',
    desc: 'This value is unencrypted.'
  },
  Credential: {
    id: 'credential',
    desc: 'This is a sensitive credential.'
  },
  KnownFormat: { id: 'known-format' },
  JSON: {
    id: 'json',
    desc: 'Contains a JSON document.',
  },
  URL: {
    id: 'url',
    desc: 'Contains A web URL. Make sure this value is properly sanitized.'
  },
  Stdout: {
    id: 'stdout',
    desc: 'Logged to stdout.',
  },
  HTML: {
    id: 'html',
    desc: 'Contains a HTML document.',
  },
  Hex: {
    id: 'hex',
    desc: 'Contains a hexadecimal value.'
  }
};

const labelLookup = Object.entries(Labels)
  .reduce((lookup, [key, label]) => {
    lookup[label.id] = {key, ...label};
    return lookup;
  }, {});

export function getLabel(id) {
  return labelLookup[id];
}
