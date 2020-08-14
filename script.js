async function getProjects() {
	let projects = [];

	await fetch("./projects.json")
		.then((res) => res.json())
		.then((data) => {
			projects = data;
		});

	return projects;
}

function setProjectModal(overlay, project_modal, project, img) {
	let close = document.createElement("button");
	let title_div = document.createElement("div");
	let title = document.createElement("h2");
	let demo_button = document.createElement("button");
	let github_button = document.createElement("button");
	let link = document.createElement("a");
	let description = document.createElement("p");
	let tags = document.createElement("div");

	close.classList.add("close");
	close.innerHTML = "&times";
	close.addEventListener("click", () => {
		overlay.classList.remove("overlay-fade-in");
		project_modal.classList.remove("project-modal-fade-in");

		overlay.classList.add("overlay-fade-out");
		project_modal.classList.add("project-modal-fade-out");
	});

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

	tags.classList.add("tech-stack");

	for (let tech of project.tech) {
		let tag = document.createElement("p");

		tag.innerHTML = tech;
		tags.appendChild(tag);
	}

	/* Project Modal */
	project_modal.appendChild(close);
	project_modal.appendChild(img.cloneNode(true));
	project_modal.appendChild(title_div);
	project_modal.appendChild(description);
	project_modal.appendChild(tags);

	/* Project Modal Title Section */
	title_div.classList.add("title");
	title_div.appendChild(title);
	title_div.appendChild(demo_button);
	title_div.appendChild(github_button);

	/* Closes modal */
	window.addEventListener("click", (event) => {
		if (event.target == overlay) {
			overlay.classList.remove("overlay-fade-in");
			project_modal.classList.remove("project-modal-fade-in");

			overlay.classList.add("overlay-fade-out");
			project_modal.classList.add("project-modal-fade-out");
		}
	});
}

function submitContactForm() {
	let form = document.querySelector("form");
	let name = document.querySelector("#your-name");
	let email = document.querySelector("#your-email");
	let message = document.querySelector("#your-message");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		name.value = "";
		email.value = "";
		message.value = "";

		const data = new FormData(form);

		fetch(form.getAttribute("action"), {
			method: "POST",
			headers: {
				Accept: "application/x-www-form-urlencoded;charset=UTF-8",
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: new URLSearchParams(data).toString(),
		})
			.then((res) => {
				if (res) {
					alert("Your message was successfully sent to Toubee Lo!");
				}
			})
			.catch(() => {
				alert("Something went wrong. Please try again later.");
			});
	});
}

async function main() {
	let outer_div = document.querySelector("#projects");
	let overlay = document.querySelector(".overlay");
	let project_modal = document.querySelector(".project-modal");
	let projects = await getProjects();
	let menu_button = document.querySelector(".menu-button");
	let burger = document.querySelector(".burger");
	let nav = document.querySelector("nav");
	let links = document.querySelectorAll(".link");

	menu_button.addEventListener("click", () => {
		menu_button.classList.toggle("open");
		burger.classList.toggle("change-color");

		nav.classList.toggle("show");
	});

	links.forEach((link) => {
		link.addEventListener("click", () => {
			menu_button.classList.toggle("open");
			burger.classList.toggle("change-color");

			nav.classList.toggle("show");
		});
	});

	for (let project of projects) {
		let project_div = document.createElement("div");
		let img = document.createElement("img");
		let title = document.createElement("h1");
		let view_more = document.createElement("button");
		let hover_div = document.createElement("div");

		img.src = project.img;
		img.alt = project.name + " image.";
		title.innerHTML = project.name;
		view_more.innerHTML = "View Details";
		view_more.addEventListener("click", () => {
			overlay.classList.remove("overlay-fade-out");
			project_modal.classList.remove("project-modal-fade-out");

			overlay.classList.add("overlay-fade-in");
			project_modal.classList.add("project-modal-fade-in");

			if (!project_modal.children.length) {
				setProjectModal(overlay, project_modal, project, img);
			} else {
				while (project_modal.firstChild) {
					project_modal.firstChild.remove();
				}

				setProjectModal(overlay, project_modal, project, img);
			}
		});

		outer_div.appendChild(project_div);

		project_div.classList.add("card");
		project_div.appendChild(img);
		project_div.appendChild(hover_div);

		hover_div.classList.add("card-hover-details");
		hover_div.appendChild(title);
		hover_div.appendChild(view_more);

		view_more.classList.add("card-hover-details-button");
	}

	submitContactForm();
}

main();
