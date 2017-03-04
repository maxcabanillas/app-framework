/* Purpose: Fix scripts according Standard JS and create "code-findings.log" with remaining findings. */

'use strict'

// Load packages
let env = require('../env')
let alert = require('../lib/alert')
let cmd = require('../lib/cmd')
let fs = require('fs-extra')
let abs = require('path').resolve

// Show message
alert('Standard JavaScript fix ongoing - please wait ...')

// Define log file
let logFile = 'code-findings.log'

// Define Standard parameters
let params = [
  'node',
  'cmd.js',
  '>' + abs(env.proj, logFile),
  // Find app.vue, pages/*.vue and pages/sub/*.vue
  '"' + abs(env.app, '**/*.vue') + '"'
]
if (!env.installed) {
  params.push('"' + abs(__dirname, '../*.js') + '"')
  params.push('"' + abs(__dirname, '../lib/*.js') + '"')
  params.push('"' + abs(__dirname, '../scripts/*.js') + '"')
}
params.push('--plugin')
params.push('html')
params.push('--fix')

// Do the fix
cmd([env.proj, 'node_modules/standard/bin'], params, function () {
  fs.removeSync(abs(env.proj, logFile))
  alert('Standard JavaScript fix done.')
}, 'Error: Some findings must be fixed manually - please check "' + logFile + '" for detailed information.')
