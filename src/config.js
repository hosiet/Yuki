#!/usr/bin/env node

'use strict'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

const path = require('path')

function merge(target, src, prefix = '') {
  Object.keys(target).forEach(k => {
    if (typeof src[`${prefix}${k}`] !== 'undefined')
      target[k] = src[`${prefix}${k}`]
  })
}

const isDev = process.env.NODE_ENV.startsWith('dev')
const isProd = process.env.NODE_ENV.startsWith('prod')
const isTest = process.env.NODE_ENV.startsWith('test')
const isCLI = process.argv[2] !== 'daemon'

let defaults = null
const setup = () => {
  defaults = {
    // For server
    DB_USER: '',
    DB_PASSWD: '',
    DB_HOST: '127.0.0.1',
    DB_NAME: 'mirror',
    DB_PORT: 27017,
    API_PORT: 9999,
    API_ADDR: '127.0.0.1',
    DOCKERD_PORT: 2375,
    DOCKERD_HOST: '127.0.0.1',
    DOCKERD_SOCKET: '/var/run/docker.sock',
    BIND_ADDRESS: '',
    CT_LABEL: 'syncing',
    CT_NAME_PREFIX: 'syncing',
    LOGDIR_ROOT: '/var/log/ustcmirror',
    IMAGES_UPDATE_INTERVAL: '1 * * * *',
    OWNER: `${process.getuid()}:${process.getgid()}`,
    TIMESTAMP: true,
    LOGLEVEL: '',
    // For client
    API_ROOT: '',
  }
  // Access local server by default
  defaults.API_ROOT = `http://localhost:${defaults.API_PORT}/`

  defaults.isDev = isDev
  defaults.isTest = isTest
  defaults.isProd = isProd

  // should be lower case
  defaults['TOKEN_NAME'] = 'x-mirror-token'

  const fps = ['/etc/ustcmirror/config', path.join(process.env['HOME'], '.ustcmirror/config')]

  for (const fp of fps) {
    let cfg
    try {
      cfg = require(fp)
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        throw e
      }
      continue
    }
    merge(defaults, cfg)
  }

  merge(defaults, process.env, 'YUKI_')
  if (typeof defaults.TIMESTAMP === 'string') {
    defaults.TIMESTAMP = defaults.TIMESTAMP === 'true'
  }

  if (!defaults.LOGLEVEL) {
    defaults.LOGLEVEL = isDev ? 'debug' : 'warn'
  }

  if (!isCLI && !isTest) {
    if (!/(error|warn|info|verbose|debug|silly)/.test(defaults.LOGLEVEL))
    {
      throw new Error(`Invalid LOGLEVEL: ${defaults.LOGLEVEL}`)
    }
  }

  if (isDev) {
    console.log('Configuration:', JSON.stringify(defaults, null, 4))
  }
}

setup()

export default defaults
