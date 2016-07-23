'use strict';

const MAP = new Map();

const get = key => MAP.get(key);
const set = (key, value) => MAP.set(key, value);
const del = key => MAP.delete(key);
const has = key => MAP.has(key);

module.exports = {
  get,
  set,
  delete: del,
  has
};
