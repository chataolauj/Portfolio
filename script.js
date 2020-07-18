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
		let project_div = document.createElement("div");
		let img = document.createElement("img");
		let title = document.createElement("h3");
		let description = document.createElement("p");
		let view_more = document.createElement("button");

		let hover_div = document.createElement("div");

		img.src = project.img;
		img.alt = "local-events";
		title.innerHTML = project.name;
		view_more.innerHTML = "View Details";

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
