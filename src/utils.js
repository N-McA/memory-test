
export function getURLParams() {
  let pageURL = decodeURIComponent(window.location.search.substring(1))
	let params = {};
	let vars = pageURL.split('&');
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

