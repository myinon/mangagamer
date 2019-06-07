const MIN_COLUMN_WIDTH = 240,
	GUTTER_WIDTH = 20,
	GROUPS = new Map();

function getColumns(width) {
	let store = MIN_COLUMN_WIDTH,
		columns = 1,
		increment = MIN_COLUMN_WIDTH + GUTTER_WIDTH;

	while ((store += increment) <= width) {
		columns++;
	}

	return columns;
}

function matchHeader() {
	for (let [key, value] of GROUPS) {
		let headers = value.map((el) => el.querySelector(".card-title")),
			headerRects = headers.map((h) => h.getBoundingClientRect()),
			maxHeader = Math.max(...headerRects.map((r) => r.height)),
			compare = function (el, rect, max) {
				if (rect.height < max) {
					el.style.marginBottom = `calc(1em + ${max - rect.height}px)`;
				} else {
					el.style.marginBottom = "1em";
				}
			};

		headers.forEach((h, idx) => compare(h, headerRects[idx], maxHeader));
	}
}

function generateGroups(width, gridItems) {
	let columns = getColumns(width);

	GROUPS.clear();
	Array.from(gridItems).forEach(function (el, idx) {
		let groupIdx = Math.floor(idx / columns),
			group = GROUPS.get(groupIdx);

		if (typeof group === "undefined") {
			group = [];
			GROUPS.set(groupIdx, group);
		}

		group.push(el);
	});
}

export function alignToGrid(width, gridItems) {
	generateGroups(width, gridItems);
	matchHeader();
}

export function ready() {
	return new Promise(function (resolve, reject) {
		if (document.readyState !== "loading") {
			resolve();
		} else {
			document.addEventListener("DOMContentLoaded", resolve, { once: true, passive: true });
		}
	});
}
