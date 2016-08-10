var App = React.createClass({
	getInitialState() {
		return {
			response: false,
			title: '',
			actors: '',
			awards: '',
			country: '',
			director: '',
			genre: '',
			language: '',
			metascore: '',
			plot: '',
			poster: '',
			rated: '',
			released: '',
			runtime: '',
			writer: '',
			year: '',
			posterUrl: ''
		};
	},
	handleOnKeyUp: function(event) {
		// if user presses Enter, process data
		if(event.which === 13) {
			console.log(event.target.value);
			var input = event.target.value;
			var apiUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=full&r=json';
			var movieTitle='', imageUrl = '';

			this.serverRequest = $.getJSON(apiUrl, function (result) {
				console.log(result);
				if(result.Response == "True") {
					movieTitle = result.Title;
					var imageUrl = '';
					var apiUrl2 = 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + encodeURIComponent(movieTitle) + '&callback=?';
						console.log(apiUrl2);
						
						this.serverRequest2 = $.getJSON(apiUrl2, function (imageQuery) {
							console.log(imageQuery);
							console.log(imageQuery.results[0].poster_path);
							imageUrl = 'http://image.tmdb.org/t/p/w500/' + imageQuery.results[0].poster_path;
							console.log(imageUrl);

							this.setState({
							response: true,
							title: result.Title,
							actors: result.Actors,
							awards: result.Awards,
							country: result.Country,
							director: result.Director,
							genre: result.Genre,
							language: result.Language,
							metascore: result.Metascore,
							plot: result.Plot,
							poster: result.Poster,
							rated: result.Rated,
							released: result.Release,
							runtime: result.Runtime,
							writer: result.Writer,
							year: result.Year,
							posterUrl: imageUrl
						});
					}.bind(this));
					} else {
						this.setState({
							response: false
						});
					}
				}.bind(this));
		}
	},
	render: function() {
		return (
			<div className="section section-primary">
			<div className="container">
			<div className="row">
			<div className="col-md-12 text-center">
			<h1 className="text-center">Welcome to Movie Finder</h1>
			<br/>
			<br/>
			</div>
			</div>
			<div className="row">
			<div className="col-md-6 col-md-offset-3">
			<input type="text" className="form-control" placeholder="Enter movie title" onKeyUp={this.handleOnKeyUp}></input> 
			</div>
			</div>
			</div>
			<br />
			<br />
			{this.state.response ? <Movie title={this.state.title} actors={this.state.actors} awards={this.state.awards} country={this.state.country} director={this.state.director} 
			genre={this.state.genre} language={this.state.language} metascore={this.state.metascore} plot={this.state.plot} poster={this.state.poster} rated={this.state.rated} 
			released={this.state.released} runtime={this.state.runtime} writer={this.state.writer} year={this.state.year} posterUrl={this.state.posterUrl} /> : null}
			</div>
			);
	}
});

var Movie = React.createClass({
	render: function() {
		return (
			<div className="section section-warning"> 
			<div className="container"> 
			<div className="row"> 
			<div className="col-md-6"> 
			<h1>{this.props.title} ({this.props.year})</h1> 
			<h3>Metascore Rating: {this.props.metascore} </h3> 
			<p><b>Director(s):</b> {this.props.director}</p>
			<p><b>Writer(s):</b> {this.props.writer}</p>
			<p><b>Actor(s):</b> {this.props.actors}</p>
			<p><b>Awards:</b> {this.props.awards}</p>
			<p><b>Genre:</b> {this.props.genre}</p>
			<p><b>Language:</b> {this.props.language}</p>
			<p><b>Rated:</b> {this.props.rated}</p>
			<p><b>Runtime:</b> {this.props.runtime}</p>
			<p>{this.props.plot}</p>
			</div>
			<div className="col-md-6"> 
			<img src={this.props.posterUrl} className="img-responsive" /> 
			</div>
			</div>
			</div>
			</div>
			);
	}
});

ReactDOM.render(<App />, document.getElementById("app"));