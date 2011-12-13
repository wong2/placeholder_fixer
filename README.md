in html5, there's a placeholder property for `<input />` but some browsers(like IE6) don't support it, this project provide a fallback for them.

Usage: include placeholder_fixer.js on the bottom of your `<body>`
`<!doctype html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Demo</title>
</head>
<body>
    <input type="text" placeholder="aaaaaa" />
    <input type="text" placeholder="hahah" />
    <input type="text" placeholder="fhhfsh" />
    <input type="text" placeholder="bbbb" />

    <script type="text/javascript" src="placeholder_fixer.js"></script>
</body>
</html>`
You can include the js file on Google Code server:
`<script type="text/javascript" src="http://placeholder-fixer.googlecode.com/svn/trunk/placeholder_fixer.js"></script>`
