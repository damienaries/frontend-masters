import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdoptedPetContext from './AdoptedPetContext';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
import fetchPet from './fetchPet';

const Details = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	// eslint-disable-next-line no-unused-vars
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);

	const { id } = useParams();
	const results = useQuery(['details', id], fetchPet);

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">:)</h2>
			</div>
		);
	}

	const pet = results.data.pets[0];

	return (
		<div className="details">
			<Carousel images={pet.images} />
			<div className="">
				<h1>{pet.name}</h1>
				<h2>
					{pet.animal} - {pet.breed} - {pet.city}, {pet.state}
				</h2>
				<button onClick={() => setShowModal(true)}>Adpot {pet.name}</button>
				<p>{pet.description}</p>
				{showModal ? (
					<Modal>
						<div className="">
							<h1>Would you like to adopt {pet.name}?</h1>
							<div className="buttons">
								<button
									onClick={() => {
										setAdoptedPet(pet);
										navigate('/');
									}}
								>
									Yes
								</button>
								<button onClick={() => setShowModal(false)}>No</button>
							</div>
						</div>
					</Modal>
				) : null}
			</div>
		</div>
	);
};

function DetailsErrorBoundary() {
	return (
		<ErrorBoundary>
			<Details />
		</ErrorBoundary>
	);
}

export default DetailsErrorBoundary;
