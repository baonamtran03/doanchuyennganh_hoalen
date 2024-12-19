import React from 'react';
import api from '../../../utils/api';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    api({
      method: 'get',
      url: 'users'
    })
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    )
  }
}
