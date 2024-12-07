import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import Results from './Results';
import fetchSearch from './fetchSearch';
import useBreedList from './useBreedList';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		animal: '',
		breed: '',
		location: '',
	});

	const [animal, setAnimal] = useState('');
	const [breeds] = useBreedList(animal);
	// eslint-disable-next-line no-unused-vars
	const [adoptedPet, _] = useContext(AdoptedPetContext);

	const results = useQuery(['search', requestParams], fetchSearch);
	const pets = results?.data?.pets ?? [];

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);

					const obj = {
						animal: formData.get('animal') ?? '',
						location: formData.get('location') ?? '',
						breed: formData.get('breed') ?? '',
					};
					setRequestParams(obj);
				}}
			>
				{adoptedPet ? (
					<div className="pet image-container">
						<img src={adoptedPet.images[0]} alt={adoptedPet.name} />
					</div>
				) : null}
				<label htmlFor="location">Location</label>
				<input id="location" name="location" placeholder="Location" />

				<label htmlFor="animal">Animal</label>
				<select
					id="animal"
					value={animal}
					onChange={(e) => {
						setAnimal(e.target.value);
					}}
				>
					<option value="null">Select Animal</option>
					{ANIMALS.map((a) => (
						<option key={a}>{a}</option>
					))}
				</select>

				<label htmlFor="breed">Breed</label>
				<select name="breed" id="breed" disabled={breeds.length === 0}>
					<option value="null">Select breed</option>
					{breeds.map((b) => (
						<option key={b}>{b}</option>
					))}
				</select>

				<button>Submit</button>
			</form>

			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;
