'use strict';

// MODULES //

var debug = require( 'debug' )( 'licenses:pkg:repo' );
var prefix = require( './stdlib.js' );
var isObject = require( prefix+'@stdlib/utils/is-plain-object' );
var replace = require( prefix+'@stdlib/string/replace' );


// REPO //

/**
* Extracts a repository URL (if available) from `package.json` data.
*
* @private
* @param {Object} pkg - `package.json` data
* @returns {(string|null)} repo URL or null
*/
function repo( pkg ) {
	var url;
	if ( isObject( pkg.repository ) ) {
		url = pkg.repository.url;
		if ( url ) {
			// GitHub URLs:
			url = replace( url, 'git\\+ssh\\:\\/\\/git\\@', 'git://' );
			url = replace( url, 'git\\+', '' );
			url = replace( url, 'git\\:\\/\\/', 'https://' );
			url = replace( url, 'git\\@', 'https://' );
			url = replace( url, '\\.git', '' );

			debug( 'Package repository URL: %s.', url );
			return url;
		}
	}
	debug( 'Unable to find repository URL in `package.json`.' );
	return null;
} // end FUNCTION repo()


// EXPORTS //

module.exports = repo;
