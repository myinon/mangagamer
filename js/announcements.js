(function () {
	let delBtns = document.querySelectorAll(".delete"),
		top = document.getElementById("gotop"),
		navbar = document.querySelector(".nav-bar"),
		navlinks = navbar.querySelectorAll("a"),
		mediaMatches = window.matchMedia("(min-width: 640px) and (min-height: 550px)"),
		menuIsSticky = mediaMatches.matches,
		fn_delBtn = function (e) {
			e.currentTarget.parentElement.style.display = "none";
			e.preventDefault();
		},
		fn_scrollLink = function (e) {
			let hash = e.currentTarget.hash,
				el = null,
				offset = 0;

			if (hash.charAt(0) === "#") {
				hash = hash.substring(1);
			}

			el = document.getElementById(hash);
			if (el !== null) {
				if (window.CSS && CSS.supports("scroll-margin-top", "0") && document.documentElement.classList.contains("reszob")) {
					el.scrollIntoView({ behavior: "smooth", block: "start" });
				} else {
					offset = el.offsetTop;
					if (document.documentElement.classList.contains("intob") && menuIsSticky) {
						offset -= navbar.getBoundingClientRect().height + 20;
						window.scroll({ left: 0, top: Math.round(offset), behavior: "smooth" });
					} else {
						el.scrollIntoView({ behavior: "smooth", block: "start" });
					}
				}
			}

			e.preventDefault();
		};

	function cancelDefault(e) {
		if (typeof(e) !== "undefined" && e !== null) {
			if (e.preventDefault) {
				e.preventDefault();
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			e.cancelBubble = true;
			e.returnValue = false;
		}
	}

	for (let b = 0; b < delBtns.length; b++) {
		delBtns[b].addEventListener("click", fn_delBtn, false);
	}

	for (let i = 0; i < navlinks.length; i++) {
		let a = navlinks[i];
		if (typeof a !== "undefined" && a !== null && a.hash.charAt(0) === "#") {
			a.addEventListener("click", fn_scrollLink, false);
		}
	}

	mediaMatches.addListener(function (e) {
		menuIsSticky = e.matches;
		if (!menuIsSticky) {
			document.documentElement.style.setProperty("--menu-height", "0");
		} else {
			let nbh = navbar.getBoundingClientRect().height;
			document.documentElement.style.setProperty("--menu-height", `${nbh}px`);
		}
	});

	window.addEventListener("scroll", function (e) {
		if (window.pageYOffset >= 400) {
			top.classList.add("active");
		} else {
			top.classList.remove("active");
		}
	}, false);

	top.addEventListener("click", function (e) {
		window.scroll({ left: 0, top: 0, behavior: "smooth" });
		Promise.resolve().then((_) => document.activeElement.blur());
		cancelDefault(e);
		return false;
	}, false);

	if ("IntersectionObserver" in window) {
		let observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.boundingClientRect.top <= 0) {
					entry.target.classList.add("-sticky");
				} else {
					entry.target.classList.remove("-sticky");
				}
			});
		}, { rootMargin: "-1px 0px 0px 0px", threshold: [1] });
		observer.observe(navbar);
		document.documentElement.classList.add("intob");
	}

	if ("ResizeObserver" in window) {
		let resizer = new ResizeObserver(function (entries) {
			entries.forEach(function (entry) {
				const rect = entry.contentRect;
				document.documentElement.style.setProperty("--menu-height", menuIsSticky ? `${rect.height}px` : "0");
			});
		});
		resizer.observe(document.querySelector(".nav-bar"));
		document.documentElement.classList.add("reszob");
	}
}());
