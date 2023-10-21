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
        //lưu trữ cho event onblur: TRUE: người dùng đã truy cập vào input, false: ko chạm
        touch: {
            maSV: false,
            hoTen: false,
            soDT: false,
            email: false
        },
    }

    //!Change value in input
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
            //setState: hàm thực thi theo cơ chế bất đồng bộ
            this.setState({
                // merge tất cả các state lại với nhau, không cần copy lại những state giá trị cũ
                value: {
                    ...this.state.value,
                    // dynamic property es6
                    [name]: value,
                },
            });
        });

        // console.log("state:", this.state);
        this.handleValidate();
    };

    //!Focus to input
    handleBlur = (e) => {
        // const { value, name } = e.target;
        const { name } = e.target;
        this.setState({
            // merge tất cả các state lại với nhau, không cần copy lại những state giá trị cũ
            touch: {
                ...this.state.touch,
                // dynamic property es6
                [name]: true,
            },
        });

        this.handleValidate();
    }

    //!Validate
    handleValidate = () => {
        // -> biến object thành array
        // Object.keys(this.state.value);
        // Object.values(this.state.value);
        // Object.entries(this.state.value);
        const newError = { ...this.state.error }; //giữ lại cái error cũ

        const { value } = this.state; // cũ

        for (let prop in value) {
            switch (prop) {
                case "maSV": {
                    // nếu như không có lỗi nào thì reset về string rỗng.
                    newError[prop] = "";

                    // 3. Check điều kiện ID là duy nhất.
                    // product.id: string | number
                    // value[prop]: string | number
                    //   const isExist = this.props.listStudents.find(
                    //     (sinhvien) => +sinhvien.maSV === Number(value[prop])
                    //   );
                    //   const isNotEdit = !this.props.productEdit;

                    //   if (isExist && isNotEdit) {
                    //     newError[prop] = "Id đã tồn tại.";
                    //   }

                    // 2. phải là số
                    const REGEX_NUMBER = /^\d+$/;
                    if (!REGEX_NUMBER.test(value[prop])) {
                        newError[prop] = "phải là số";
                    }

                    // 1. không được bỏ trống
                    if (value[prop].length === 0) {
                        newError[prop] = "không được bỏ trống";
                    }

                    break;
                }
                case "soDT": {
                    // nếu như không có lỗi nào thì reset về string rỗng.
                    newError[prop] = "";

                    // 2. phải là số
                    const REGEX_NUMBER = /^\d+$/;
                    if (!REGEX_NUMBER.test(value[prop])) {
                        newError[prop] = "phải là số";
                    }

                    // 1. không được bỏ trống
                    if (value[prop].length === 0) {
                        newError[prop] = "không được bỏ trống";
                    }

                    break;
                }

                case "hoTen": {
                    // nếu như không có lỗi nào thì reset về string rỗng.
                    newError[prop] = "";

                    // 1. không được bỏ trống
                    if (value[prop].length === 0) {
                        newError[prop] = "không được bỏ trống";
                    }

                    break;
                }

                case "email": {
                    // nếu như không có lỗi nào thì reset về string rỗng.

                    // Điều kiện nào có ưu tiên lớn nhất thì chúng ta sẽ sắp xếp từ dưới lên trên.
                    newError[prop] = "";

                    // 2. phải là email
                    const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!REGEX_EMAIL.test(value[prop])) {
                        newError[prop] = "phải đúng định dạng email";
                    }

                    // 1. không được bỏ trống
                    if (value[prop].length === 0) {
                        newError[prop] = "không được bỏ trống";
                    }

                    break;
                }

                default:
                    break;
            }
        }

        this.setState({
            error: newError,
        });

        return newError; //return ra value, cho phần Submit dùng
    };

    //!Submit form
    handleSubmit = (e) => {
        //chặn sự kiện loading page
        e.preventDefault();
        //Xử lý cho TH khi nhấn submint mà chúng ta chưa click vào ô input nào => thì đây là giả lập rằng các ô input đã dc click vào
        this.setState({
            touch: {
                maSV: true,
                hoTen: true,
                soDT: true,
                email: true
            },
        });

        //Truosc khi submit, thì phải validate all
        const newError = this.handleValidate();
        

        // kiểm tra nếu có 1 message error nào thì không cho submit
        const ready = Object.values(newError).every((i) => i.length === 0);
        if (ready === false)
            return;

        //KHi nhấn submit, thì gửi input data qua list Sinhvien => đưa dữ liệu này lên redux
        this.props.insertSV(this.state.value);
        //sau khi gởi data lên redux, refresh lại data của state => refresh input value
        this.setState({
            value: {
                maSV: '',
                hoTen: '',
                soDT: '',
                email: ''
            },

        });
    };

    //!Render to UI
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
                                id="maSV"
                                name="maSV"
                                className="form-control"
                                // đưa giá trị vào ô input
                                value={this.state.value.maSV}
                                // lấy giá trị từ input ra
                                onChange={this.handleChange}
                                //sự kiện load focus
                                onBlur={this.handleBlur}
                            // // Không cho chỉnh sửa nên nhấn edit sản phẩm
                            // disabled={this.props.productEdit}
                            />
                            {/* Hiển thị lỗi khi người dùng đã truy cập vào và có message lỗi */}
                            {this.state.touch.maSV && this.state.error.maSV && (
                                <p className="text-danger">{this.state.error.maSV}</p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="soDT" className="form-label">
                                Số điện thoại
                            </label>
                            <input
                                id="soDT"
                                name="soDT"
                                type="text"
                                className="form-control"
                                value={this.state.value.soDT}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />
                            {this.state.touch.soDT && this.state.error.soDT && (
                                <p className="text-danger">{this.state.error.soDT}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="hoTen" className="form-label">
                                Họ Tên
                            </label>
                            <input
                                id="hoTen"
                                name="hoTen"
                                className="form-control"
                                value={this.state.value.hoTen}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />

                            {this.state.touch.hoTen && this.state.error.hoTen && (
                                <p className="text-danger">{this.state.error.hoTen}</p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="form-control"
                                value={this.state.value.email}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />

                            {this.state.touch.email && this.state.error.email && (
                                <p className="text-danger">{this.state.error.email}</p>
                            )}
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