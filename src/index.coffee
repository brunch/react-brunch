transform= require('react-tools').transform

module.exports = class ReactCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'jsx'

  constructor: (@config) ->
    @includeHeader= @config?.plugins?.react?.autoIncludeCommentBlock is yes

  compile: (params, callback) ->
    source= params.data
    if @includeHeader
      source= "/** @jsx React.DOM */\n#{ source }"
    try
      output= transform source
    catch err
      return callback err.toString()
    callback null, data:output
