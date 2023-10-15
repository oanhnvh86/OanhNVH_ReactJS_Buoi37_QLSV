import {INSERT_SV, EDIT_SV,DELETE_SV,SEARCH_SV} from '../types/QLSVType';

export const insertSTUDENT = (sv) => {
    return {
        type: INSERT_SV,
        sv
    }
}


export const editSTUDENT = (svID) => {
    return {
        type: EDIT_SV,
        svID
    }
}

export const deleteSTUDENT = (svID) => {
    return {
        type: DELETE_SV,
        svID
    }
}

export const searchSTUDENT = (text) => {
    return {
        type: SEARCH_SV,
        text
    }
}