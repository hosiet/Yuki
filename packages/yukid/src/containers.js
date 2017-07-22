#!/usr/bin/node

'use strict'

import Promise from 'bluebird'
import { Repository as Repo } from './models'
import { EMITTER } from './globals'
import CONFIG from './config'
import docker from './docker'

const imgTag = 'ustcmirror.images'
const PREFIX = CONFIG.get('CT_NAME_PREFIX')

async function bringUp(cfg) {
  let ct
  try {
    ct = await docker.createContainer(cfg)
  } catch (err) {
    if (err.statusCode === 404) {
      await docker.pull(cfg.Image)
      return bringUp(cfg)
    } else {
      throw err
    }
  }
  await ct.start()

  const name = cfg.name.substring(PREFIX.length + 1)

  ct.wait()
    .then(async (data) => {
      const repo = await Repo.findById(name, { storageDir: 1 })
      EMITTER.emit('sync-end', {
        exitCode: data.StatusCode,
        name: repo._id,
        storageDir: repo.storageDir
      })
    })

  return ct
}

function cleanContainers() {
  const removing = ['created', 'exited', 'dead']
    .map((status) => {
      return docker.listContainers({
        all: true,
        filters: {
          label: {
            syncing: true,
            [imgTag]: true,
          },
          status: {
            [status]: true
          }
        }
      })
        .then((cts) => {
          return Promise.all(
            cts.map((info) => {
              const ct = docker.getContainer(info.Id)
              return ct.remove({
                v: true,
                force: true
              })
            })
          )
        })
    })
  return Promise.all(removing)
}

function updateImages() {
  return Repo.distinct('image')
    .then(tags => tags.map((tag) => docker.pull(tag)))
    .then(ps => Promise.all(ps))
}

function cleanImages() {
  return docker.listImages({
    filters: {
      label: {
        [imgTag]: true
      },
      dangling: {
        true: true
      }
    }
  })
    .then(images => Promise.all(images.map(info => {
      return docker.getImage(info.Id).remove()
    })))
}

export default {
  bringUp,
  cleanContainers,
  cleanImages,
  updateImages,
}
