/* TODO: Depending on performance improvement implementation uncomment or remove */
/*
    TODO: Update on each vscode release.
    Based on https://github.com/cdr/code-server/blob/780a673017052a4424ba474d2017ef6a560014d6/src/browser/workbench-build.html
*/
// export const codeServerHead = `
// <!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
// <!DOCTYPE html>
// <html>
// 	<head>
// 		<meta charset="utf-8" />

// 		<!-- Disable pinch zooming -->
// 		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">

// 		<!-- Content Security Policy -->
// 		<meta
// 			http-equiv="Content-Security-Policy"
// 			content="
// 				default-src 'self';
// 				img-src 'self' https: data: blob:;
// 				media-src 'none';
// 				script-src 'self' 'unsafe-eval' https: 'sha256-bpJydy1E+3Mx9MyBtkOIA3yyzM2wdyIz115+Sgq21+0=' 'sha256-meDZW3XhN5JmdjFUrWGhTouRKBiWYtXHltaKnqn/WMo=';
// 				child-src 'self';
// 				frame-src 'self';
// 				worker-src 'self';
// 				style-src 'self' 'unsafe-inline';
// 				connect-src 'self' ws: wss: https:;
// 				font-src 'self' blob:;
// 				manifest-src 'self';
// 		">

// 		<!-- Workbench Configuration -->
// 		<meta id="vscode-workbench-web-configuration" data-settings="{{WORKBENCH_WEB_CONFIGURATION}}">

// 		<!-- Workarounds/Hacks (remote user data uri) -->
// 		<meta id="vscode-remote-user-data-uri" data-settings="{{REMOTE_USER_DATA_URI}}">
// 		<!-- NOTE@coder: Added the commit for use in caching, the product for the
// 		extensions gallery URL, and nls for language support. -->
// 		<meta id="vscode-remote-commit" data-settings="{{COMMIT}}">
// 		<meta id="vscode-remote-product-configuration" data-settings="{{PRODUCT_CONFIGURATION}}">
// 		<meta id="vscode-remote-nls-configuration" data-settings="{{NLS_CONFIGURATION}}">

// 		<!-- Workbench Icon/Manifest/CSS -->
// 		<link rel="icon" href="./favicon.ico" type="image/x-icon" />
// 		<link rel="manifest" href="./manifest.json">
// 		<link rel="apple-touch-icon" href="./static-{{COMMIT}}/out/vs/server/src/media/code-server.png" />


// 		<!-- Prefetched beforehand in Strove. Look Strove html for details. -->
//         <link data-name="vs/workbench/workbench.web.api" rel="stylesheet" href="https://strove.io/static/vscode/workbench.web.api.css">
// 		<meta name="apple-mobile-web-app-capable" content="yes">

// 		<!-- Prefetch to avoid waterfall -->
// 		<link rel="prefetch" href="./static-c36d30657b8fbbf4fd7f622b34490601ddd512be/node_modules/semver-umd/lib/semver-umd.js">
// 		<link rel="prefetch" href="./static-c36d30657b8fbbf4fd7f622b34490601ddd512be/node_modules/@microsoft/applicationinsights-web/dist/applicationinsights-web.js">
// 	</head>
// `