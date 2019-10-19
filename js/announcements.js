(function () {
	let delBtns = document.querySelectorAll(".delete"),
		top = document.getElementById("gotop"),
		navbar = document.querySelector(".nav-bar"),
		navlinks = navbar.querySelectorAll("a"),
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
				offset = el.offsetTop;
				if (document.documentElement.classList.contains("intob") && window.matchMedia("(min-width: 640px) and (min-height: 550px)").matches) {
					offset -= navbar.getBoundingClientRect().height + 20;
					window.scroll({ left: 0, top: Math.round(offset), behavior: "smooth" });
				} else {
					el.scrollIntoView({ behavior: "smooth", block: "start" });
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
}());
