$('[rel~="github"]').readGitHub({
  branch: 'master',
  renderer: function(file) {
    return window.markdownit().render(file)
  }
})
