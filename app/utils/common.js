// element判断是否含有className
export function hasClassName(obj, name) {
  let tmpName = obj.className;
  let tmpReg = new RegExp(name, 'g');
  if (tmpReg.test(tmpName)) {
      return true;
  } else {
      return false;
  }
}