let outer_div = document.querySelector("#projects");
let projects = [];

async function getProjects() {
	await fetch("./projects.json")
		.then((res) => res.json())
		.then((data) => {
			projects = data;
		});
}

async function main() {
	await getProjects();

	for (let project of projects) {
		let body = document.querySelector("body");
		let project_div = document.createElement("div");
		let img = document.createElement("img");
		let title = document.createElement("h3");
		let description = document.createElement("p");
		let view_more = document.createElement("button");
		let hover_div = document.createElement("div");
		let overlay = document.createElement("div");
		let project_details = document.createElement("div");
		let close = document.createElement("button");

		img.src = project.img;
		img.alt = "local-events";
		title.innerHTML = project.name;
		description.innerHTML = project.description;
		view_more.innerHTML = "View Details";

		view_more.addEventListener("click", () => {
			body.appendChild(overlay);
			overlay.style.display = "flex";
		});

		close.innerHTML = "Close";

		close.addEventListener("click", () => {
			overlay.style.display = "none";
		});

		project_details.appendChild(img);
		project_details.appendChild(title);
		project_details.appendChild(description);
		project_details.appendChild(close);
		project_details.classList.add("project-details");

		overlay.appendChild(project_details);
		overlay.classList.add("overlay");

		window.onclick = (event) => {
			if (event.target == overlay) {
				overlay.style.display = "none";
			}
		};

		project_div.classList.add("card");

		hover_div.classList.add("card-hover-details");
		view_more.classList.add("card-hover-details-button");
		hover_div.appendChild(title);
		hover_div.appendChild(view_more);

		project_div.appendChild(img);
		project_div.appendChild(hover_div);

		outer_div.appendChild(project_div);
	}
}

main();
