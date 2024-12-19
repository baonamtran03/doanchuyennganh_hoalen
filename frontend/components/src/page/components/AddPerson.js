// src/components/AddPerson.js
import React from 'react';
import api from '../../../utils/api'; // Nhập cấu hình Axios

class AddPerson extends React.Component {
  state = {
    name: ''
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const user = { name: this.state.name };

    // Gửi yêu cầu POST
    api({
      method: 'post',
      url: 'users', // Sử dụng URL tương đối
      data: user
    })
      .then(response => {
        console.log("Người dùng đã được thêm:", response.data);
      })
      .catch(error => {
        console.error("Có lỗi xảy ra:", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Nhập tên" />
        <button type="submit">Thêm</button>
      </form>
    );
  }
}

export default AddPerson;