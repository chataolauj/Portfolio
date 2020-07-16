let ul = document.getElementById("projects");
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
		let li = document.createElement("li");
		li.appendChild(document.createTextNode(project.name));
		ul.appendChild(li);
	}
}

main();
