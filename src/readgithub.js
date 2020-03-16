(function($) {
  $.fn.readGitHub = function(options) {
    return this.each(function() {

      // OPTIONS
      // --------------------------------------------------

      // Extend default config
      var config = $.extend( {
        meta: 'top',
        provider: 'jsdelivr',
        cdn: true,
        repo: $(this).data('repo'),
        branch: 'master',
        file: 'README.md',
        loading: 'Loading',
        fail: 'Couldn\'t connect to GitHub',
        replaceRelativeIMG: true,
        replaceRelativeLinks: true,
        renderer: function(file) {
          return file
        }
      }, options)

      // INIT
      // --------------------------------------------------

      // Form the ajax get URL
      var url = 'https://'
      if(config.provider == 'rawgit') {
        if(config.cdn) url += 'cdn.'
        url += 'rawgit.com'
        url = [ url, config.repo, config.branch, config.file ].join('/')
      }
      else if(config.provider == 'jsdelivr') {
        url += 'cdn.jsdelivr.net/gh'
        url = [ url, config.repo + '@' + config.branch, config.file ].join('/')
      }
      else if(config.provider == 'github') {
        url += 'raw.githubusercontent.com'
        url = [ url, config.repo, config.branch, config.file ].join('/')
      }

      // Wrap in <div>
      $(this).html('<div class="github-read"><div class="github-file"></div></div>')
      
      // Permanent reference for DOM placement
      var gh = $(this).find('.github-file:first')

      // Place meta
      var meta = '<div class="github-meta"><a href="https://github.com/' + config.repo + '/blob/' + config.branch + '/' + config.file + '" target="_blank">' + config.file + '</a><a style="float: right;" href="https://github.com/StudioLE/readgithub" target="_blank">readGitHub.js</a></div>'
      
      if(config.meta == 'top') {
        gh.before(meta)
      }
      else if(config.meta == 'bottom') {
        gh.after(meta)
      }

      // Insert loading message
      gh.html(config.loading)

      // Perform get
      $.ajax(url)
      .done(function(file) {
        var pattern = ''
        var matches = ''
        if(config.replaceRelativeIMG && String.prototype.hasOwnProperty('matchAll')) {
          var cdn = 'https://cdn.jsdelivr.net/gh'
          cdn = [ cdn, config.repo + '@' + config.branch ].join('/')
          pattern = /!\[(.*)\]\((.*)\)/g
          matches = file.matchAll(pattern)
          matches = Array.from(matches)
          matches.forEach(function(matchArray) {
            var match = matchArray[0]
            var alt = matchArray[1]
            var path = matchArray[2]
            if(path.substr(0, 2) != '//' && path.substr(0, 7) != 'http://' && path.substr(0, 8) != 'https://') {
              var replacement = '![' + alt + '](' + cdn + '/' + path + ')'
              file = file.replace(match, replacement)
            }
          })
        }
        if(config.replaceRelativeLinks && String.prototype.hasOwnProperty('matchAll')) {
          var github = 'https://github.com'
          github = [ github, config.repo, 'blob', config.branch ].join('/')
          pattern = /\[(.*)\]\((.*)\)/g
          matches = file.matchAll(pattern)
          matches = Array.from(matches)
          matches.forEach(function(matchArray) {
            var match = matchArray[0]
            var alt = matchArray[1]
            var path = matchArray[2]
            if(path.substr(0, 2) != '//' && path.substr(0, 7) != 'http://' && path.substr(0, 8) != 'https://') {
              var replacement = '[' + alt + '](' + github + '/' + path + ')'
              file = file.replace(match, replacement)
            }
          })
        }

        if( ! String.prototype.hasOwnProperty('matchAll')) {
          file = '*Please note: This content is loaded automatically from GitHub and is best viewed in [Google Chrome](https://www.google.com/chrome/). Internet Explorer and Microsoft Edge will not load inline images.*\n\n' + file
        }

        // If get succeeds render the content using the renderer
        gh.html(config.renderer(file))
      })
      .fail(function() {
        // If get fails insert failure message
        gh.html(config.fail)
      })
      .always(function() {
        //
      })

    }) // return this.each()
  } /* $.fn.readGitHub */ 
}(jQuery))
