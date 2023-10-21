import {INSERT_SV, EDIT_SV,DELETE_SV,SEARCH_SV} from '../types/QLSVType';

export const insertSTUDENT = (payload) => {
    return {
        type: INSERT_SV,
        payload
    }
}

export const deleteSTUDENT = (payload) => {
    return {
        type: DELETE_SV,
        payload
    }
}

export const editSTUDENT = (payload) => {
    return {
        type: EDIT_SV,
        payload
    }
}

export const searchSTUDENT = (payload) => {
    return {
        type: SEARCH_SV,
        payload
    }
}