import React, { Component } from 'react'
import { connect } from 'react-redux';

class ListSVComponent extends Component {
    renderSinhVien = () => {
        const {listStudents} = this.props
        return listStudents.map((sinhvien,index) => {
            return (
                <tr key = {index}>
                    <td>{sinhvien.maSV}</td>
                    <td>{sinhvien.hoTen}</td>
                    <td>{sinhvien.soDT}</td>
                    <td>{sinhvien.email}</td>
                    <td>
                        <button>Edit</button>
                        <button className='ml-4'>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log("List Student", this.props.listStudents)
        return (
            <div>
                <div className='container'>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr >
                                <th scope="col">Mã SV</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Số Điện Thoại</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderSinhVien()}
                        </tbody>
                    </table>
                    
                </div>

            </div>
        )
    }
}

//lấy data from Redux
const mapStateToProps = (state) => {
    return {
        listStudents: state.QLSVReducer.listStudents,
    }
}

export default connect(mapStateToProps)(ListSVComponent)