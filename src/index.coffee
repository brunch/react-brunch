visitors= require('react-tools/vendor/fbtransform/visitors')
transform= require('jstransform').transform

module.exports = class ReactCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'jsx'
  pattern: /\.jsx/

  constructor: (@config) ->
    @harmony= @config?.plugins?.react?.harmony is yes

  compile: (params, callback) ->
    source= params.data
    visitorList= if @harmony
        visitors.getAllVisitors()
      else
        visitors.transformVisitors.react
    try
      output= transform(visitorList, source).code

    catch err
      console.log "ERROR", err
      return callback err.toString()

    callback null, data:output
