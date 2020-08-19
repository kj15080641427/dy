import { put, call, all, takeEvery } from 'redux-saga/effects';
import { queryPermission, deletePermission } from '@app/data/request';
import { getQueryPermissionType, changePermissionData } from './types'
/**
 * 权限分页查询
 */
console.log(getQueryPermissionType)
function* asyncQueryPermission() {
    let data = [];
    try {
        let result = yield call(queryPermission, { "current": 1, "size": 100 });
        if (result.code === 200) {
            data = result.data.records
            // data = [...result.data.record];
        }
    }
    catch (e) {
        console.warn(e);
    }
    //更新数据
    yield put({
        type: changePermissionData,
        payload: { data: data },
    });
}
/**
 * 删除权限
 */
// function* asyncDeletePermission() {
//     let data = [];
//     try {
//         let result = yield call(deletePermission, 1);

//         if (result.code === 200) {
//             data = [...result.data];
//         }
//     }
//     catch (e) {
//         console.warn(e);
//     }

//     //更新数据
// yield put({
//     type: getQueryPermissionType,
//     payload: { data: data },
// });
// }
/**
 * 初始化
 * @returns {IterableIterator<*>}
 */
export default function* permission() {
    yield all([
        takeEvery(getQueryPermissionType, asyncQueryPermission),
        // takeEvery(getQueryPermissionType,asyncDeletePermission),
    ]);
}