const top = document.getElementById("gotop"),
	autograph = document.getElementById("autographs"),
	closeBtn = document.getElementById("close"),
	dialog = document.querySelector(".autographs");

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
		top.classList.toggle("active", window.pageYOffset >= 400);
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

autograph?.addEventListener(
	"click",
	function (e) {
		dialog?.showModal();
		cancelDefault(e);
		return false;
	},
	false
);

closeBtn?.addEventListener(
	"click",
	function (e) {
		dialog?.close();
		cancelDefault(e);
		return false;
	},
	false
);
