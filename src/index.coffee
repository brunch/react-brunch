transform= require('react-tools').transform

module.exports = class ReactCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'jsx'

  constructor: (@config) ->
    null

  compile: (params, callback) ->
    source= transform params.data
    callback null, data:source
