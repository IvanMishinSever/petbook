import React from 'react';
import { fetchUserData, cancelFetch } from '../utils/dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       userData: null
    }
  }

  loadUserData() {
    this.setState({ userData: null});
    this.fetchID = fetchUserData(this.props.username, (userData) => {
  this.setState({ userData });
});
  }
  componentDidMount() {
    this.loadUserData();
  }
  componentWillUnmount() {
    cancelFetch(this.fetchID);
  }
  componentDidUpdate(prevProps) {
   if (this.props.username !== prevProps.username) {
     cancelFetch(this.fetchID);
     this.loadUserData();
   }
  }
  render() {
    let isLoading;
     this.state.userData === null ? isLoading = true : isLoading = false; 
    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }
    let name;
    isLoading === true ? name = 'Loading...' : name = this.state.userData.name;
    let bio;
    isLoading === true ? bio = 'Loading bio...' : bio = this.state.userData.bio;
    let friends;
    isLoading === true ? friends = [] : friends = this.state.userData.friends;
    return (
      <div className={className}>
        <div className="profile-picture">
          {!isLoading && (<img src={this.state.userData.profilePictureUrl} alt="" />)}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}