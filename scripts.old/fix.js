/* Purpose: Fix scripts according Standard JS and create "code-findings.log" with remaining findings. */

'use strict'

// Load packages
var env = require('../env')
var alert = require('../lib/alert')
var cmd = require('../lib/cmd')
var fs = require('fs-extra')
var abs = require('path').resolve

// Show message
alert('Standard JavaScript fix ongoing - please wait ...')

// Define Standard parameters
var params = [
  'node',
  'cmd.js',
  '>' + abs(env.proj, 'code-findings.log'),
  '"' + abs(env.app, '**/*.vue') + '"'
]
if (!env.installed) {
  params.push('"' + abs(__dirname, '../*.js') + '"')
  params.push('"' + abs(__dirname, '../lib/*.js') + '"')
  params.push('"' + abs(__dirname, '../lib/*.js') + '"')
}
params.push('--plugin')
params.push('html')
params.push('--fix')

// Do the fix
cmd([env.proj, 'node_modules/standard/bin'], params, function () {
  fs.removeSync(abs(env.proj, 'standard-check.log'))
  alert('Standard JavaScript fix done.')
}, 'Error: Some findings must be fixed manually - please check "standard-check.log" for detailed information.')
