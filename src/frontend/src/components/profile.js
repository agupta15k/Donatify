import React, { Component } from "react";
import './profile.css';
import getProfleAPI from '../API/getProfile';

class UserCard extends Component {
    state = {
        data: {},
        per: 9,
        page: 1,
        total_pages: null
    };

    uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    loadProfile = async() => {
        const { per, page, data } = this.state;
        const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;
        fetch(endpoint)
            .then(response => {
                console.log(response.json())
                return response
            })
            .then(json => {
                console.log(json.results)
                this.setState({
                    data: json.results[0],
                });
            });
    };

    loadMore = () => {
        this.setState(
            prevState => ({
                page: prevState.page + 1,
                scrolling: true
            }),
            this.loadData
        );
    };

    componentDidMount() {
        console.log(this.state)
        this.loadProfile();
    }

    render() {
        return (
            <div className="clearfix">
                <div className="row">
                    {/* {this.state.data.map(data => ( */}
                    {this.state.data.id.value ? (
                        <div className="col-md-4 animated fadeIn" key={this.state.data.id.value}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="avatar">
                                        <img
                                            src={this.state.data.picture.large}
                                            className="card-img-top"
                                            alt=""
                                        />
                                    </div>
                                    <h5 className="card-title">
                                        {this.uppercase(this.state.data.name.first) +
                                            " " +
                                            this.uppercase(this.state.data.name.last)}
                                    </h5>
                                    <p className="card-text">
                                        {this.state.data.location.city +
                                            ", " +
                                            this.uppercase(this.state.data.location.state)}
                                        <br />
                                        <span className="phone">{this.state.data.phone}</span>
                                    </p>
                                </div>
                            </div>
                        </div>) : (<div />)}
                    {/* ))} */}
                </div>
                <button
                    className="btn btn-light btn-block w-50 mx-auto"
                    onClick={e => {
                        this.loadMore();
                    }}
                >
                    Load More Users
                </button>
            </div>
        );
    }
}

export default UserCard;
