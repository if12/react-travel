import React, { Component } from 'react';
import { render } from 'react-dom';

const URL_GITHUB = 'https://api.github.com/repos/facebook/react/commits?per_page=3&sha=';
const formatDate = date => date.replace(/T|Z/g, ' ')

const CommitViewer = props => (
	<ul>
		{
			props.commits.map((commit) => {
				return (
					<li key={ commit.sha.slice(0, 7) }>
						<a href={ commit.html_url} target="_blank">{ commit.sha.slice(0, 7) }</a>
						- <span>{ commit.commit.message }</span>
						<br/>
						by <span><a href={ commit.author.html_url } target="_blank">{ commit.author.login }</a></span>
						at <span>{ formatDate(commit.commit.author.date) }</span>
					</li>
				)
			})
		}
	</ul>
)

class Github extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commits: []
		}
	}

	branch = 'master'

	componentWillMount() {
		this.fetchGithubData(this.branch);
	}

	fetchGithubData = (branch) => {
		return fetch(URL_GITHUB + branch).then(res => {
			if (res.ok) {
				return res.json()
			}
		}).then(json => {
			this.setState({
				commits: json
			})
		})
	}

	/**
	 * 这一块被Vue完爆，因为没有集中只操作data上，还要发送请求.
	 * 而Vue用watch就可以了
	 */
	selectBranch = (e) => {
		this.branch = e.nativeEvent.target.value;
		this.fetchGithubData(this.branch);
	}

	renderRadios = () => {
		var branches = ['master', 'fiberchildren'];
		return (
			<span>
				{
					branches.map((b) => (
						<span>
							<input type="radio" name="branch" value={ b } 
								checked={ this.branch === b }
								onChange={ this.selectBranch } id={ 'branch_' + b } />
							<label htmlFor={ 'branch_' + b }>{ b }</label>	
						</span>
					))
				}
			</span>
		)
	}

	render() {
		return (
			<div>
				<h3>Github Commits Viewer</h3>
				{ this.renderRadios() }
				<CommitViewer commits={ this.state.commits }/>
			</div>
		)
	}
}

render(
	<Github />,
	document.getElementById('app')
)