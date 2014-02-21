describe('Plugin', function() {
  var plugin, plugin2;

  beforeEach(function() {
    plugin = new Plugin({});
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should has #compile method', function() {
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function(done) {
    var content = 'var a = 6;';
    var expected = 'var a = 6;';

    plugin.compile({data: content, path: 'file.jsx'}, function(error, result) {
      var data = (result || {}).data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected);
      done();
    });
  });

  it('should compile and produce valid result from JSX content', function(done) {
    var content = '/** @jsx React.DOM */ var div = <div></div>;';
    var expected = '/** @jsx React.DOM */ var div = React.DOM.div(null);';

    plugin.compile({data: content, path: 'file.jsx'}, function(error, result) {
      var data = (result || {}).data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected);
      done();
    });
  });

  it('should compile and include JSX header comment if configured to', function(done) {
    var content = 'var div = <div></div>;';
    var expected1 = 'var div = <div></div>;';
    var expected2 = '/** @jsx React.DOM */\nvar div = React.DOM.div(null);';

    plugin.compile({data: content, path: 'file.jsx'}, function(error, result) {
      var data = (result || {}).data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected1);
      // done();
    });

    plugin2= new Plugin({
      plugins: {
        react: {
          autoIncludeCommentBlock: true
        }
      }
    });

    plugin2.compile({data: content, path: 'file.jsx'}, function(error, result) {
      var data = (result || {}).data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected2);
      done();
    });

  });

  it('should compile and produce valid result from JSX content with harmony additions, if configured to', function(done) {
    var content = '/** @jsx React.DOM */ var div = <div></div>; var x= (y) => x * y';
    var expected = '/** @jsx React.DOM */ var div = React.DOM.div(null); var x= function(y)  {return x * y;}';

    plugin2= new Plugin({
      plugins: {
        react: {
          harmony: true
        }
      }
    });

    plugin2.compile({data: content, path: 'file.jsx'}, function(error, result) {
      var data = result.data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected);
      done();
    });
  });

});
