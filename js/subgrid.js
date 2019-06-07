import * as utils from "./announcement-utils.js";

utils.ready().then(function () {
	if (!("CSS" in window && CSS.supports("grid-template-columns", "subgrid"))) {
		for (let cardTitle of document.querySelectorAll(".card-title")) {
			cardTitle.style.minHeight = "unset";
		}

		if ("ResizeObserver" in window) {
			let ro = new ResizeObserver((entries) => {
				for (let entry of entries) {
					utils.alignToGrid(entry.contentRect.width, entry.target._.announcements);
				}
			});

			for (let convention of document.querySelectorAll(".convention-info .grid")) {
				let lowdash = Object.create(null);

				lowdash.announcements = convention.querySelectorAll(".announcement");
				convention._ = Object.freeze(lowdash);

				ro.observe(convention);
			}
		} else {
			let conventions = document.querySelectorAll(".convention-info .grid"),
				alignToGrid = function (e) {
					for (let grid of conventions) {
						utils.alignToGrid(grid.clientWidth, grid._.announcements);
					}
			};

			for (let grid of conventions) {
				let lowdash = Object.create(null);

				lowdash.announcements = grid.querySelectorAll(".announcement");
				grid._ = Object.freeze(lowdash);
			}

			window.addEventListener("resize", alignToGrid, { passive: true });
			window.addEventListener("orientationchange", alignToGrid, { passive: true });

			alignToGrid(null);
		}
	}
});
