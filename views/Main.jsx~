import React from 'react';
import {Paper, Avatar, List, ListItem, FlatButton,Divider} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');
import {Grid, Row, Col} from 'react-bootstrap';

export default class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={
			userinfo:{
				username: '',
				email: '',
			},
		}
		$.ajax({
			url: '/userinfo',
			dataType: 'json',
			success: (data) => {
				this.setState({
					userinfo: data,
				});
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		})
	}
	render(){
		return(
			<div className='main' style={{backgroundColor: '#512da8', height: '100%'}}>
				<Grid fluid style={{padding:20}}>
					<Row >
						<Tile
							lg={6}
							md={6}
							sm={12}
							height={500}
							bgColor={Colors.indigo500}
						>
						<List>
							<ListItem
								disabled
								leftAvatar={
									<Avatar >{this.state.userinfo.username.substr(0,1)}</Avatar>
								}
							>
								{this.state.userinfo.username}
								<FlatButton label="Выйти" style={{position:'absolute', top: 10, right: 10}} linkButton href={'/logout'} backgroundColor={Colors.indigo700}/>
							</ListItem>
							<Divider/>
							<ListItem disabled>
								email: { this.state.userinfo.local.email }
							</ListItem>
							<ListItem disabled>
								Facebook name: { this.state.userinfo.facebook.name }
							</ListItem>
							<ListItem disabled>
								Facebook token: { this.state.userinfo.facebook.token }
							</ListItem>
							<ListItem disabled>
								Facebook id: { this.state.userinfo.facebook.id}
							</ListItem>
						</List>
						</Tile>
						<Tile
							lg={3}
						 	md={4}
						 	sm={12}
							height={240}
							bgColor={Colors.green500}
						/>
						<Tile
							lg={3}
						 	md={4}
						 	sm={12}
							height={240}
							bgColor={Colors.blue500}
						/>
						<Tile
							lg={3}
						 	md={4}
						 	sm={12}
							height={240}
							bgColor={Colors.purple500}
						/>
						<Tile
							lg={3}
						 	md={4}
						 	sm={12}
							height={240}
							bgColor={Colors.amber500}
						/>
						<Tile
							lg={12}
						 	md={12}
						 	sm={12}
							height={400}
							bgColor={Colors.cyan500}
						/>
					</Row>
				</Grid>
			</div>
		);
	};
};

class Tile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			zDepth: 1,
			zIndex: '0',
		}
	};
	handleMouseEnter = () => {
		this.setState({
			zDepth: 3,
			zIndex: '999',
		})
	};
	handleMouseLeave = () => {
		this.setState({
			zDepth: 1,
			zIndex: '0',
		})
	};
	render(){
		return(
		<div className={'ratio'}>
		<div className={'sqaure'}>
		<Col lg={this.props.lg || 12} md={this.props.md || 12} sm={this.props.sm || 12} style={{padding:10, zIndex:this.state.zIndex}}>
			<Paper 
				zDepth={this.state.zDepth} 
				style={{height:this.props.height || 100, zIndex:this.state.zIndex, backgroundColor: this.props.bgColor || '#000000'}}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{this.props.children}
			</Paper>
			</Col>
			</div>
			</div>
		)
	}
}
