import { changePermissionData,setBaseSiteData } from './types'

export default function system(state = {}, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case changePermissionData:
            newState.permissionList = action.payload.data
            console.log(newState, 'newState')
            // return newState
            break;
        default:
            return state
    }

    return newState
}