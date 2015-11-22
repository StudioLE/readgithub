# readGitHub.js

A jQuery plugin to load GitHub files into your page

## Install

Packages are available via Bower and NPM

```
npm install --save readgithub
```

```
bower install --save readgithub
```

## Use

Include `dist/css/readgithub.css` and `dist/js/readgithub.js` in your page, ensuring jQuery is loaded first.

``` html
<!-- css -->
<link rel="stylesheet" href="bower_components/readgithub/dist/css/readgithub.css">
<!-- jQuery -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<!-- readGitHub -->
<script src="bower_components/readgithub/dist/js/readgithub.js"></script>
```

Add the following line whereever you would like to render a file from GitHub:

``` html
<div rel="github" data-repo="username/repository"></div>
```

Finally, call the readGitHub method in your javascript

``` js
$(document).ready(function() {
	$('[rel~="github"]').readGitHub()
})
```

readGitHub will look for the `rel="github"` and read the requested repository from `data-repo`.


## Configuration

A number of configuration options are available. One of the most powerful features is the option to use a renderer. For instance you can declare a Markdown render, read your `README.md` and readGitHub will load and convert your `.md` as html.

### Using a renderer

``` js
$('[rel~="github"]').readGitHub({
	renderer: function(file) {
		// Your render function
		return file
	}
})
```

For instance to render with markdown-it include the script before `readGitHub.js`.

``` html
<!-- markdown-it -->
<script src="//cdnjs.cloudflare.com/ajax/libs/markdown-it/2.2.1/markdown-it.js"></script>
```

And use the following within your javascript

``` js
$('[rel~="github"]').readGitHub({
	renderer: function(file) {
		return window.markdownit().render(file)
	}
})
```
