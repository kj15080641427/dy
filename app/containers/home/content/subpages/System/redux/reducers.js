import {changePermissionData} from './types'
// export default function main(state = defaultState, action) {
//     let newState = Object.assign({}, state);
//     switch (action.type) {
//       case actionTypes.SET_USERINFO: {
//         let data = action.data;
//         if (data && data.length) {
//           newState.userinfo = data;
//         }
//         break;
//       }
//       default:
//         return state;
//     }
  
//     return newState;
//   }
export default function system(state={},action){
    let newState = Object.assign({},state)
    switch (action.type) {
        case changePermissionData:
            newState.permissionList = action.payload.data
            console.log(newState,'newState')
            // return newState
            break;
        default:
            return state
    }

    return newState
}