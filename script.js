const poke_search = document.querySelector("#poke_search");
const search_btn = document.querySelector("#search_button");

const resultBox = document.getElementById("result");

const pokeImg = document.getElementById("poke_img");
const pokeName = document.getElementById("poke_name");
const pokeType = document.getElementById("poke_type");
const pokeHeight = document.getElementById("poke_height");
const pokeWeight = document.getElementById("poke_weight");
const pokeAbilities = document.getElementById("poke_abilities");

search_btn.addEventListener("click", async () => {
	let pokemon = poke_search.value.trim();
	const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

	const result = await getPokemondata(URL);

	if (result.success) {
		const data = result.data;
		pokeImg.src =
			data.sprites.other["official-artwork"].front_default ||
			data.sprites?.front_default;
		pokeName.textContent = data.forms?.[0]?.name || "Unknown";
		pokeType.textContent = `Type: ${data.types?.[0]?.type?.name}` || "Unknown";
		pokeHeight.textContent = `Height: ${data.height}`;
		pokeWeight.textContent = `Weight: ${data.weight}`;
		pokeAbilities.textContent = `Abilities: ${data.abilities
			.map((a) => a.ability.name)
			.join(", ")}`;

		// ✅ Show result box
		resultBox.classList.remove("hidden");
	} else {
		alert("Pokemon not found!");
		resultBox.classList.add("hidden"); // Hide if not found
	}
});

async function getPokemondata(url) {
	//gets pokemon data
	try {
		const data = await fetchPokeApi(url);
		return {
			success: 1,
			data,
		};
	} catch (error) {
		return {
			success: 0,
			error: error.message,
		};
	}
}
async function fetchPokeApi(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch Fail");
	}
	return await response.json();
}
