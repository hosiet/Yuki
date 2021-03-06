#!/usr/bin/env node

'use strict'

require('./patch')
const fs = require('fs')
const Url = require('url')
const path = require('path')
const { createHash } = require('crypto')
const program = require('commander')
const moment = require('moment')
const { API_ROOT, TOKEN_NAME } = require('./config')
const meta = require('./package.json')
const Client = require('./request')

function getLocalTime(date) {
  return moment(date)
    .local()
    .format('YYYY-MM-DD HH:mm:ss')
}

const inst = new Client()

const AUTH_RECORD = path.join(process.env['HOME'], '.ustcmirror', 'auth.json')
let auths
try {
  auths = require(AUTH_RECORD)
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    console.error(`Invalid json in ${AUTH_RECORD}: %s`, e)
    process.exit(1)
  }
  auths = {}
}

(function(fp) {
  const d = path.dirname(fp)
  try {
    fs.statSync(d)
    return
  } catch (e) {
    fs.mkdirSync(d)
  }
})(AUTH_RECORD)

const normalizeUrl = (u) => {
  // not absolute
  if (!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(u)) u = `http://${u}`
  if (!u.endsWith('/')) u += '/'
  return u
}

const toReadableSize = (size) => {
  const units = ['B', 'K', 'M', 'G']
  const bsize = 1000
  for (const u of units) {
    if (size < bsize) {
      return `${size.toFixed(2)}${u}`
    }
    size /= bsize
  }
  return `${size.toFixed(2)}T`
}

const req = function(apiroot, url, body, method = 'get') {
  apiroot = normalizeUrl(apiroot)
  return inst.request({
    baseUrl: Url.resolve(apiroot, 'api/v1/'),
    url,
    body,
    method,
    headers: { authorization: `Bearer ${auths[apiroot] || ''}` }
  })
}

program
  .version(meta.version)
  .option('--apiroot <url>', `base url of remote registry (default ${API_ROOT})`, API_ROOT)

program
  .command('login <username> <password>')
  .description('log in to remote registry')
  .action((username, password, opts) => {
    const d = `${username}:${password}`
    const encoded = new Buffer(d).toString('base64')
    const apiroot = normalizeUrl(opts.parent.apiroot)
    req(apiroot, 'token', { auth: encoded })
    .then(async (res) => {
      if (res.ok) {
        const content = await res.json()
        console.log('Login succeeded!')

        if (typeof auths[apiroot] === 'undefined' ||
            auths[apiroot] !== content.token)
        {
          auths[apiroot] = content.token
          return new Promise((ful, rej) => {
            fs.writeFile(AUTH_RECORD, JSON.stringify(auths, null, 4), err => {
              if (err) return rej(err)
              fs.chmodSync(AUTH_RECORD, 0o600)
              ful()
            })
          })
        }
      } else {
        console.log(`Failed to login: ${res.error.message}`)
      }
    })
    .catch(console.error)
  })

program
  .command('logout')
  .description('log out from remote registry')
  .action((opts) => {
    const apiroot = normalizeUrl(opts.parent.apiroot)
    if (typeof auths[apiroot] === 'string') {
      delete auths[apiroot]
      fs.writeFile(AUTH_RECORD, JSON.stringify(auths, null, 4), err => {
        if (err) {
          return console.error(err)
        }
        console.log(`Removed token for ${apiroot}`)
      })
    } else {
      console.error(`Not logged in to ${apiroot}`)
    }
  })

program
  .command('whoami')
  .description('print current user')
  .action((opts) => {
    const apiroot = normalizeUrl(opts.parent.apiroot)
    req(opts.parent.apiroot, 'me')
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json()
        console.log(`name: ${data.name}`)
        console.log(`admin: ${data.admin}`)
        console.log(`api: ${Url.resolve(apiroot, 'api/v1/')}`)
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('user-add')
  .option('-n --name <name>', 'username')
  .option('-p --pass <password>', 'password')
  .option('-r --role <role>', 'role of user [admin,normal]', 'normal')
  .description('create user')
  .action((opts) => {
    if (!opts.name || !opts.pass) {
      console.error('Please tell me the username and password')
      return
    }
    if (!/^(admin|normal)$/i.test(opts.role)) {
      return console.error('Invalid role')
    }

    req(opts.parent.apiroot, `users/${opts.name}`, {
      password: opts.pass,
      admin: opts.role === 'admin'
    })
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to create user <${opts.name}>: ${res.error.message}`)
      } else {
        console.log(`Successfully created user <${opts.name}>`)
      }
    })
    .catch(console.error)
  })

program
  .command('user-ls [name]')
  .description('list user(s)')
  .action((name, opts) => {
    const u = name ? `users/${name}` : 'users'
    req(opts.parent.apiroot, u)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json()
        const output = (user) => {
          const token = user.token === undefined ? 'secret' : user.token
          const admin = user.admin === undefined ? 'secret' : user.admin
          console.log(`${user.name}:`)
          console.log(`\tToken: ${token}`)
          console.log(`\tAdministrator: ${admin}`)
        }
        Array.isArray(data) ? data.forEach(output) : output(data)
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('user-update <name>')
  .option('-p --pass <password>', 'password')
  .option('-r --role <role>', 'role of user [admin,normal]')
  .description('update user profile')
  .action((name, opts) => {
    if (typeof opts.role === 'undefined' &&
        typeof opts.pass === 'undefined') {
      return console.error('Nothing changes')
    }

    const payload = {}
    if (opts.role) {
      if (!/^(admin|normal)$/i.test(opts.role)) {
        return console.error('Invalid role')
      }
      payload.admin = opts.role === 'admin'
    }
    if (opts.pass) {
      payload.password = opts.pass
    }
    req(opts.parent.apiroot, `users/${name}`, payload, 'PUT')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to update user <${name}>: ${res.error.message}`)
      } else {
        console.error(`Successfully updated user <${name}>`)
      }
    })
    .catch(console.error)
  })

program
  .command('user-rm <name>')
  .description('remove user')
  .action((name, opts) => {
    req(opts.parent.apiroot, `users/${name}`, null, 'DELETE')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to remove user <${name}>: ${res.error.message}`)
      } else {
        console.log(`Successfully removed user <${name}>`)
      }
    })
    .catch(console.error)
  })

program
  .command('meta-ls [repo]')
  .description('list metadata of repository(s)')
  .option('-k --key <key>',
    'sort repos according to specified key. [name,lastSuccess,size]',
    'name')
  .option('-r --reverse', 'reverse the result')
  .action((repo, opts) => {
    if (!/^(name|lastSuccess|size)$/i.test(opts.key)) {
      return console.error(`Invalid key: ${opts.key}`)
    }
    const order = opts.reverse ? -1 : 1
    const u = repo ? `meta/${repo}` : `meta?order=${order}&key=${opts.key}`
    req(opts.parent.apiroot, u)
    .then(async res => {
      if (res.ok) {
        const data = await res.json()
        const repos = Array.isArray(data) ? data : [data]
        for (const repo of repos) {
          process.stdout.write(`${repo._id}: `)
          delete repo._id
          repo.size = toReadableSize(repo.size)
          repo.updatedAt = getLocalTime(repo.updatedAt)
          repo.lastSuccess = getLocalTime(repo.lastSuccess)
          console.log(JSON.stringify(repo, null, 2))
        }
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('repo-ls [repo]')
  .description('list repository(s)')
  .option('-t --type <method>', 'filter repos based on syncing method')
  .action((repo, opts) => {
    let u = repo ? `repositories/${repo}` : 'repositories'
    if (!repo && opts.type) {
      u += `?type=${opts.type}`
    }
    req(opts.parent.apiroot, u)
    .then(async res => {
      if (res.ok) {
        const data = await res.json()
        const repos = Array.isArray(data) ? data : [data]
        for (const repo of repos) {
          process.stdout.write(`${repo._id}: `)
          delete repo._id
          if (repo.updatedAt) {
            repo.updatedAt = getLocalTime(repo.updatedAt)
          }
          if (repo.createdAt) {
            repo.createdAt = getLocalTime(repo.createdAt)
          }
          console.log(JSON.stringify(repo, null, 2))
        }
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('repo-logs <repo>')
  .description('fetch previous logs')
  .option('-n --nth <number>', 'nth log file', 0)
  .option('-s --stats', 'get stats', false)
  .option('--tail <num>', 'specify lines of logs at the end', 'all')
  .action((repo, opts) => {
    if (opts.stats) {
      const url = `repositories/${repo}/logs?stats=true`
      return req(opts.parent.apiroot, url)
        .then(async res => {
          if (!res.ok) {
            return console.error(res.error.message)
          }
          const data = await res.json()
          for (const i of data) {
            console.log(`${i.name}:`)
            console.log(`\tSize: ${toReadableSize(i.size)}`)
            console.log(`\tLastMod: ${getLocalTime(i.mtime)}`)
          }
        })
        .catch(console.error)
    }

    if (!/^\d+$/.test(opts.nth)) {
      return console.error('-n/--nth must follow a number')
    }
    const url = `repositories/${repo}/logs?n=${opts.nth}&tail=${opts.tail}`
    return req(opts.parent.apiroot, url)
    .then(res => {
      if (!res.ok) {
        return console.error(res.error.message)
      }
      res.body.pipe(process.stdout)
    })
    .catch(console.error)
  })

program
  .command('repo-update <repo> <keyval>')
  .description('update config of repository')
  .action((repo, keyval, opts) => {
    const [k, v] = keyval.splitN('=', 1) // See `patch.js`
    const payload = {}
    if (v.length === 0) {
      payload['$unset'] = { [k]: '' }
    } else {
      payload[k] = v
    }
    req(opts.parent.apiroot, `repositories/${repo}`, payload, 'PUT')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to update repository <${repo}>: ${res.error.message}`)
      } else {
        console.log(`Successfully updated repository <${repo}>`)
      }
    })
    .catch(console.error)
  })

program
  .command('repo-rm <repo>')
  .description('manually remove repository')
  .action((repo, opts) => {
    req(opts.parent.apiroot, `repositories/${repo}`, null, 'DELETE')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to remove repository <${repo}>: ${res.error.message}`)
      } else {
        console.log(`Successfully removed repository <${repo}>`)
      }
    })
    .catch(console.error)
  })

program
  .command('ct-ls [ct]')
  .description('list container(s)')
  .action((ct, opts) => {
    const u = ct ? `containers/${ct}` : 'containers'
    req(opts.parent.apiroot, u)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          for (const ct of data) {
            console.log(`${ct.Names[0]}:`)
            console.log(`\tId: id:${ct.Id.slice(0, 10)}`)
            console.log(`\tCreated: ${getLocalTime(ct.Created * 1000)}`)
            console.log(`\tState: ${ct.State}`)
            console.log(`\tStatus: ${ct.Status}`)
          }
        } else {
          console.log(JSON.stringify(data, null, 4))
        }
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('ct-stop <repo>')
  .description('stop running container')
  .action((repo, opts) => {
    const url = `containers/${repo}/stop`
    req(opts.parent.apiroot, url, null, 'POST')
      .then(res => {
        if (res.ok) {
          console.log(`Successfully stopped container <${repo}>`)
        } else {
          console.error(res.error.message)
        }
      })
      .catch(console.error)
  })

program
  .command('ct-rm <repo>')
  .description('manually remove container')
  .action((repo, opts) => {
    req(opts.parent.apiroot, `containers/${repo}`, null, 'DELETE')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to remove repository <${repo}>: ${res.error.message}`)
      } else {
        console.log(`Successfully removed container <${repo}>`)
      }
    })
    .catch(console.error)
  })

program
  .command('ct-logs <repo>')
  .description('capture container logs')
  .option('-f, --follow', 'follow log output')
  .option('--tail <num>', 'specify lines of logs at the end', /^(all|\d+)$/, 'all')
  .action((repo, opts) => {
    const tail = opts.tail
    let url = `containers/${repo}/logs?tail=${tail}`
    if (opts.follow) url += '&follow=true'

    req(opts.parent.apiroot, url)
    .then(res => {
      if (!res.ok) {
        return console.error(res.error.message)
      }
      res.body.pipe(process.stdout)
    })
    .catch(console.error)
  })

program
  .command('images-update')
  .description('update ustcmirror images')
  .action((opts) => {
    req(opts.parent.apiroot, 'images/update', null, 'POST')
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to update images: ${res.error.message}`)
      } else {
        console.log('All up-to-date')
      }
    })
    .catch(console.error)
  })

program
  .command('sync <repo>')
  .description('sync')
  .option('-v, --verbose', 'debug mode')
  .action((repo, opts) => {
    const url = (opts.verbose) ?
      `containers/${repo}?debug=true` :
      `containers/${repo}`

    req(opts.parent.apiroot, url, null, 'POST')
      .then(res => {
        if (res.ok) {
          res.body.pipe(process.stdout)
        } else {
          console.error(res.error.message)
        }
      })
      .catch(console.error)
  })

program
  .command('export [file]')
  .description('export configuration')
  .option('--pretty', 'human-readable')
  .action((file, opts) => {
    let u = 'config'
    u += opts.pretty ? '?pretty=1' : ''
    req(opts.parent.apiroot, u)
    .then((res) => {
      if (res.ok) {
        file = path.resolve(file ? file : 'repositories.json')
        const fout = fs.createWriteStream(file)
        res.body.pipe(fout)
        res.body.on('end', () => {
          console.log(`config is exported at ${file}`)
        })
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('import <file>')
  .description('import configuration')
  .action((file, opts) => {
    file = path.resolve(file)
    const data = require(file)
    req(opts.parent.apiroot, 'config', data)
    .then(res => {
      if (!res.ok) {
        console.error(`Failed to import config: ${res.error.message}`)
      } else {
        console.log('Successfully imported config')
      }
    })
    .catch(console.error)
  })

program
  .command('reload')
  .description('reload all config')
  .action((opts) => {
    req(opts.parent.apiroot, 'reload', null, 'post')
    .then((res) => {
      if (res.ok) {
        console.log('Successfully reloaded!')
      } else {
        console.error(res.error.message)
      }
    })
    .catch(console.error)
  })

program
  .command('shell')
  .description('start an interactive shell on remote machine')
  .action((opts) => {
    const apiroot = normalizeUrl(opts.parent.apiroot)
    const socketio = require('socket.io-client')
    const socket = socketio(apiroot, {
      timeout: 5000,
      reconnectionAttempts: 3
    })
    const exit = (msg) => {
      console.error(msg)
      process.exit(1)
    }
    socket.on('connect_error', exit.bind(null, 'Failed to connect to remote server.'))
    socket.on('content_timeout', exit.bind(null, 'Connection timeout.'))

    const token = auths[apiroot]
    if (!token || typeof token !== 'string') {
      exit('Invalid token. Please login first.')
    }
    socket.emit('shell-auth', {
      token,
      cols: process.stdout.columns || 80,
      rows: process.stdout.rows || 24,
    })
    socket.on('shell-message', (result) => {
      if (!result.ok) {
        exit(result.msg)
      }
      const readline = require('readline')
      const rl = readline.createInterface({
        input: process.stdin,
        output: null
      })
      rl.on('line', (line) => {
        socket.emit('shell-input', line)
      })
      rl.on('close', () => process.exit(0))
      socket.on('shell-output', (data) => {
        process.stdout.write(data)
      })

    })
  })

program
  .command('*')
  .action(() => program.outputHelp())

program.parse(process.argv)

if (process.argv.length === 2) {
  program.outputHelp()
}
