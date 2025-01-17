import { Component } from 'react';

class Carousel extends Component {
	state = {
		active: 0,
	};

	static defaultProps = {
		images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
	};

	handleIndexClick = (e) => {
		this.setState({
			active: Number(e.target.dataset.index),
		});
	};

	render() {
		const { active } = this.state;
		const { images } = this.props;

		return (
			<div className="carousel">
				<img src={images[active]} alt="animal hero" />
				<div className="carousel-smaller">
					{images.map((photo, index) => (
						// eslint-disable-next-line
						<img
							key={photo}
							src={photo}
							data-index={index}
							className={index === active ? 'active' : ''}
							alt="img"
							onClick={this.handleIndexClick}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Carousel;
