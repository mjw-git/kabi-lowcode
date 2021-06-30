export function easyDeepClone(obj: any) {
  if (obj instanceof Array) {
    let newArray = [];
    for (const i of obj) {
      newArray[i] = obj[i];
    }
    return newArray;
  }
  if (typeof obj !== "object") return obj;
  const newObj: any = {};
  for (const property in obj) {
    newObj[property] = easyDeepClone(obj[property]);
  }
  return newObj;
}
