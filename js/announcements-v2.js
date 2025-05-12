const top = document.getElementById("gotop");

function cancelDefault(e) {
	if (typeof e !== "undefined" && e !== null) {
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

window.addEventListener(
	"scroll",
	function (e) {
		if (window.pageYOffset >= 400) {
			top.classList.add("active");
		} else {
			top.classList.remove("active");
		}
	},
	false
);

top.addEventListener(
	"click",
	function (e) {
		window.scroll({ left: 0, top: 0, behavior: "smooth" });
		Promise.resolve().then((_) => document.activeElement.blur());
		cancelDefault(e);
		return false;
	},
	false
);
