import * as utils from "./announcement-utils.js";

utils.ready().then(function (_) {
	if (!("CSS" in window && CSS.supports("grid-template-columns", "subgrid"))) {
		for (let cardTitle of document.querySelectorAll(".card-title")) {
			cardTitle.style.minHeight = "unset";
		}

		if ("ResizeObserver" in window) {
			let ro = new ResizeObserver(function (entries) {
				for (let entry of entries) {
					utils.alignToGrid(
						entry.contentRect.width,
						entry.target.querySelectorAll(".announcement")
					);
				}
			});

			for (let convention of document.querySelectorAll(".convention-info .grid")) {
				ro.observe(convention);
			}
		} else {
			let conventions = document.querySelectorAll(".convention-info .grid"),
				alignToGrid = function (e) {
					for (let grid of conventions) {
						utils.alignToGrid(
							grid.clientWidth,
							grid.querySelectorAll(".announcement")
						);
					}
				};

			window.addEventListener("resize", alignToGrid, { passive: true });
			window.addEventListener("orientationchange", alignToGrid, { passive: true });

			alignToGrid(null);
		}
	}
});
