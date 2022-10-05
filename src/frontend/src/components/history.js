import React, { Component } from "react";
import './profile.css'

class History extends Component {
    state = {
    };

    loadHistory = async () => {
        const { per, page, data } = this.state;
        const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;
        await fetch(endpoint)
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
            this.loadHistory
        );
    };

    componentDidMount() {
        console.log(this.state)
        this.loadHistory();
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default History;
