async function getProjects() {
	let projects = [];

	await fetch("./projects.json")
		.then((res) => res.json())
		.then((data) => {
			projects = data;
		});

	return projects;
}

function createProjectModal(project, img, view_more) {
	let body = document.querySelector("body");
	let title_div = document.createElement("div");
	let title = document.createElement("h2");
	let demo_button = document.createElement("span");
	let github_button = document.createElement("span");
	let link = document.createElement("a");
	let description = document.createElement("p");
	let overlay = document.createElement("div");
	let project_modal = document.createElement("div");
	let close = document.createElement("button");

	view_more.addEventListener("click", () => {
		body.appendChild(overlay);
	});

	close.classList.add("close");
	close.innerHTML = "&times";
	close.addEventListener("click", () => {
		body.removeChild(overlay);
	});

	title_div.appendChild(title);
	title_div.appendChild(demo_button);
	title_div.appendChild(github_button);
	title_div.classList.add("title");

	title.innerHTML = project.name;

	demo_button.classList.add("title-link", "title-link-demo", "fas", "fa-eye");
	demo_button.addEventListener("click", () => {
		link.href = project.url;
		link.target = "_blank";
		link.click();
	});

	github_button.classList.add(
		"title-link",
		"title-link-github",
		"fas",
		"fa-code"
	);
	github_button.addEventListener("click", () => {
		link.href = project.github;
		link.target = "_blank";
		link.click();
	});

	description.innerHTML = project.description;

	/* Overlay */
	overlay.classList.add("overlay");
	overlay.appendChild(project_modal);

	/* Project Modal */
	project_modal.classList.add("project-modal");
	project_modal.appendChild(close);
	project_modal.appendChild(img.cloneNode(true));
	project_modal.appendChild(title_div);
	project_modal.appendChild(description);

	/* Closes modal */
	window.addEventListener("click", (event) => {
		if (event.target == overlay) {
			body.removeChild(overlay);
		}
	});
}

async function main() {
	let outer_div = document.querySelector("#projects");
	let projects = await getProjects();

	for (let project of projects) {
		let project_div = document.createElement("div");
		let img = document.createElement("img");
		let title = document.createElement("h1");
		let view_more = document.createElement("button");
		let hover_div = document.createElement("div");

		img.src = project.img;
		img.alt = project.name;
		title.innerHTML = project.name;
		view_more.innerHTML = "View Details";

		outer_div.appendChild(project_div);

		project_div.classList.add("card");
		project_div.appendChild(img);
		project_div.appendChild(hover_div);

		hover_div.classList.add("card-hover-details");
		hover_div.appendChild(title);
		hover_div.appendChild(view_more);

		view_more.classList.add("card-hover-details-button");

		createProjectModal(project, img, view_more);
	}
}

main();
