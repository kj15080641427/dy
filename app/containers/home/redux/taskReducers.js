import * as types from "./types";
const initState = { tasMaterialkUser: [], tableInput: [] };
let selected = [];

export default function taskReducers(state = initState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.SET_MATERIAL_TABLE_INPUT: // 设置物资数量
      let data = action.data;
      data = { ...data.row, number: data.number };
      let a = selected.filter((item) => item.materialId == data.materialId);
      if (a[0]) {
        selected.map((t) => {
          if (t.materialId == data.materialId) {
            t.number = data.number;
          }
        });
      } else {
        selected.push(data);
      }
      newState = { ...newState, tableNumber: selected };
      break;
    default:
      break;
  }
  return newState;
}
