// src/components/DeletePerson.js
import React from 'react';
import api from '../../../utils/api'; // Nhập cấu hình Axios

class DeletePerson extends React.Component {
  state = {
    id: ''
  }

  handleChange = (event) => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Gửi yêu cầu DELETE
    api({
      method: 'delete',
      url: `users/${this.state.id}` // Sử dụng URL tương đối
    })
      .then(response => {
        console.log("Người dùng đã được xóa:", response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra:", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.id} onChange={this.handleChange} placeholder="Nhập ID" />
        <button type="submit">Xóa</button>
      </form>
    );
  }
}

export default DeletePerson;