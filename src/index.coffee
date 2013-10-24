transform= require('react-tools').transform

module.exports = class ReactCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'jsx'

  constructor: (@config) ->
    null

  compile: (params, callback) ->
    try
      source= transform params.data
    catch err
      return callback err.toString()
    callback null, data:source
