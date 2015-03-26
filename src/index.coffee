react = require('react-tools/main')

module.exports = class ReactCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'jsx'
  pattern: /\.jsx/

  constructor: (@config) ->
    @harmony= @config?.plugins?.react?.harmony is yes
    @options = @config?.plugins?.react || {}

  compile: (params, callback) ->
    source= params.data

    try
      output = react.transformWithDetails(source, @options)
    catch err
      console.log "ERROR", err
      console.dir(output)
      return callback err.toString()

    callback null, data: output.code
