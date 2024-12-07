const fetchBreedList = async ({ queryKey }) => {
	const animal = queryKey[1];

	const apiResponse = await fetch(
		`http://pets-v2.dev-apis.com/breeds?animal=${animal}`
	);

	if (!apiResponse.ok) {
		throw new Error(`breeds/${animal} failed :(`);
	}

	return apiResponse.json();
};

export default fetchBreedList;
