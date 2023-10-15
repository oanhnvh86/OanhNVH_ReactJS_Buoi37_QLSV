import {INSERT_SV, EDIT_SV,DELETE_SV,SEARCH_SV} from '../types/QLSVType';

//Khởi tạo giá trị ban đầu của store
const stateDefault = {
    listStudents: [
        {maSV:"A1", hoTen:'Nguyen Van A', soDT:'0937798888', email:'oanh@gmail.com'},
        

    ]
}

const QLSVReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case INSERT_SV: {
            console.log('action insert:', action);
            let listStudentsUpdate = [...state.listStudents];
            state.listStudents = listStudentsUpdate;
           
            return { ...state }
        }
        case EDIT_SV: {
            // let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            // let index = danhSachGheDangDatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.soGhe);
            // if (index !== -1) { //ghế đang đặt đã có trong mảng khi người dùng click => remove đi
            //     danhSachGheDangDatUpdate.splice(index, 1);
            // }
            // state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            return { ...state }
        }
        case DELETE_SV: {
            // let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            // let index = danhSachGheDangDatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.soGhe);
            // if (index !== -1) { //ghế đang đặt đã có trong mảng khi người dùng click => remove đi
            //     danhSachGheDangDatUpdate.splice(index, 1);
            // }
            // state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            return { ...state }
        }
        case SEARCH_SV: {
            // let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            // let index = danhSachGheDangDatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.soGhe);
            // if (index !== -1) { //ghế đang đặt đã có trong mảng khi người dùng click => remove đi
            //     danhSachGheDangDatUpdate.splice(index, 1);
            // }
            // state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            return { ...state }
        }

        default: return { ...state }
    }

}

export default QLSVReducer;