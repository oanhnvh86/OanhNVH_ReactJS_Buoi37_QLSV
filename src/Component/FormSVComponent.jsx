import React, { Component } from 'react'
import { connect } from 'react-redux';
import { flushSync } from "react-dom";
import { insertSTUDENT } from '../Redux/actions/QLSVActions'

class FormSVComponent extends Component {
    state = {
        value: {
            maSV: '',
            hoTen: '',
            soDT: '',
            email: ''
        },
        error: {
            maSV: '',
            hoTen: '',
            soDT: '',
            email: ''
        },
    }

    handleChange = (e) => {
        //lấy giá trị mỗi lần value input thay đổi bởi người dùng
        // target: chính là thẻ input của chúng ta
        // console.log('event:',e);
        const { target } = e;
        // console.log('target:',target);
        const { value, name } = target;
        // const value = event.target.value <==> document.getById('').value

        // flushSync: giúp set state ngay lập tức, chuyển this.setState về cơ chế đồng bộ
        // console.log("before ::: set state");

        // cập nhật state value ngay lập tức trước khi gọi hàm handleValidate
        flushSync(() => {
            this.setState({
                // merge tất cả các state lại với nhau, không cần copy lại những state giá trị cũ
                value: {
                    ...this.state.value,
                    // dynamic property es6
                    [name]: value,
                },
            });
        });

        console.log("state:", this.state);
        // this.handleValidate();
    };

    handleSubmit = (e) => {
        e.preventDefault();



        // const newError = this.handleValidate();

        // kiểm tra nếu có 1 message error nào thì không cho submit
        // const ready = Object.values(newError).every((i) => i.length === 0);
        // if (ready === false) return;

        // gửi lên redux
        this.props.insertSV(this.state);

        this.setState({
            value: {
                maSV: '',
                hoTen: '',
                soDT: '',
                email: ''
            },

        });
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="mt-4 p-4"
                style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
            >
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="maSV" className="form-label">
                                maSV
                            </label>
                            <input
                                // onBlur={this.handleBlur}
                                // // đưa giá trị vào ô input
                                value={this.state.value.maSV}
                                // // lấy giá trị từ input ra
                                onChange={this.handleChange}
                                // // Không cho chỉnh sửa nên nhấn edit sản phẩm
                                // disabled={this.props.productEdit}
                                name="maSV"
                                className="form-control"
                                id="maSV"
                            />
                            {/* Hiển thị lỗi khi người dùng đã truy cập vào và có message lỗi */}
                            {/* {this.state.touch.id && this.state.error.id && (
                <p className="text-danger">{this.state.error.id}</p>
              )} */}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="soDT" className="form-label">
                                Số điện thoại
                            </label>
                            <input
                                // onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                value={this.state.value.soDT}
                                name="soDT"
                                type="text"
                                className="form-control"
                                id="soDT"
                            />

                            {/* {this.state.touch.price && this.state.error.price && (
                <p className="text-danger">{this.state.error.price}</p>
              )} */}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="hoTen" className="form-label">
                                Họ Tên
                            </label>
                            <input
                                // onBlur={this.handleBlur}
                                value={this.state.value.hoTen}
                                name="hoTen"
                                onChange={this.handleChange}
                                className="form-control"
                                id="hoTen"
                            />

                            {/* {this.state.touch.productId && this.state.error.productId && (
                <p className="text-danger">{this.state.error.productId}</p>
              )} */}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                // onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                value={this.state.value.email}
                                name="email"
                                type="text"
                                className="form-control"
                                id="email"
                            />

                            {/* {this.state.touch.image && this.state.error.image && (
                <p className="text-danger">{this.state.error.image}</p>
              )} */}
                        </div>


                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    {/* {this.props.productEdit ? "Update" : "Submit"} */}
                    Thêm Sinh Viên
                </button>
            </form>
        )
    }
}

//lấy data from Redux
const mapStateToProps = (rootReducer) => {
    return {
        listStudents: rootReducer.QLSVReducer.listStudents,
    }
}
//push data to Redux
const mapDispatchToProps = (dispatch) => {
    return {
        insertSV: (sinhvien) => {
            dispatch(insertSTUDENT(sinhvien));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSVComponent)