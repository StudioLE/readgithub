(function($){
	$.fn.readGitHub = function(options) {
return this.each(function(index) {

	// 	OPTIONS
	// --------------------------------------------------

	// Extend default config
	var config = $.extend({
		provider: 'rawgit',
		cdn: true,
		repo: $(this).data('repo'),
		branch: 'master',
		file: 'README.md',
		loading: 'Loading',
		fail: 'Couldn\'t connect to GitHub',
		renderer: function(file) {
			return window.markdownit().render(file)
		}
	}, options)

	// 	INIT
	// --------------------------------------------------

	// Form the ajax get URL
	var url = 'https://'
	if(config.provider == 'rawgit') {
		if(config.cdn) url += 'cdn.'
		url += 'rawgit.com'
	}
	else if(config.provider == 'github') {
		url += 'raw.githubusercontent.com'
	}
	url = [url, config.repo, config.branch, config.file].join('/')

	// Permanent reference to the placeholder
	placeholder = $(this)

	// Insert loading message
	placeholder.html(config.loading)

	// Perform get
	$.ajax(url)
	.done(function(file) {
		// If get succeeds render the content using the renderer
		placeholder.html(config.renderer(file))
	})
	.fail(function() {
		// If get fails insert failure message
		placeholder.html(config.fail)
	})
	.always(function() {
	});

}); // return this.each()
	} /* $.fn.readGitHub */ 
})(jQuery)