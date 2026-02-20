'use strict'

const upstream = require('minimatch10')

const upstreamFn =
  typeof upstream === 'function'
    ? upstream
    : upstream && typeof upstream.minimatch === 'function'
      ? upstream.minimatch
      : upstream && typeof upstream.default === 'function'
        ? upstream.default
        : null

if (!upstreamFn) {
  throw new TypeError(
    'minimatch-compat: could not find a callable minimatch() export from minimatch10'
  )
}

function minimatch(path, pattern, options) {
  return upstreamFn(path, pattern, options)
}

Object.assign(minimatch, upstream)
minimatch.minimatch = upstreamFn

module.exports = minimatch
