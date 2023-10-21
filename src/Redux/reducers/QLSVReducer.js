import {INSERT_SV, EDIT_SV, UPDATE_SV,DELETE_SV,SEARCH_SV} from '../types/QLSVType';

//Khởi tạo giá trị ban đầu của store
const stateDefault = {
    listStudents: [
        // {maSV:"A1", hoTen:'Nguyen Van A', soDT:'0937798888', email:'oanh@gmail.com'},
    ],
    sinhvienEdit: null
}

const QLSVReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case INSERT_SV: {
            console.log('action insert:', action.payload);
            const listStudentsUpdate = [...state.listStudents];
            listStudentsUpdate.push(action.payload);
            state.listStudents = listStudentsUpdate;
           
            return { ...state }
        }
        case DELETE_SV: {
            // const listStudentsUpdate = [...state.listStudents];
            // const index = listStudentsUpdate.findIndex(sinhvien => sinhvien.maSV === action.maSV);
            // if (index !== -1) { //Sinhvien đã có trong mảng khi người dùng click => remove đi
            //     listStudentsUpdate.splice(index, 1);
            // }
            const listStudentsUpdate = state.listStudents.filter(
                (sinhvien) => sinhvien.maSV !== action.payload
            );

            state.listStudents = listStudentsUpdate;
            return { ...state }
        }
        case EDIT_SV: {
            state.sinhvienEdit = action.payload;
            return { ...state };
        }

        case UPDATE_SV: {
            // state.sinhvienEdit = action.payload;
            
            const listStudentsUpdate = [...state.listStudents];
            let index = listStudentsUpdate.findIndex(sinhvien => sinhvien.maSV === action.payload.maSV);
            if (index !== -1) { //Sinh vien đã có trong mảng khi người dùng click => remove đi
                listStudentsUpdate.splice(index, 1, action.payload);
            }
            state.listStudents = listStudentsUpdate;
            state.sinhvienEdit = null;
            return { ...state };
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