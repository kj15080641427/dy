export function templateWater(baseData, detailData) {
  if (!baseData) return [];
  return baseData.map((item) => {
    return {
      type: "Point",
      id: item.stcd + item.name,
      lonlat: [item.lon, item.lat],
      warningOver: (item.stcd && item.stcd.warning) || 0,
      warningTime: (item.stcd && item.stcd.tm) || "",
      ...item,
    };
  });
}
export function templateRain(baseData, detailData) {
  if (!baseData) return [];
  return baseData.map((item) => {
    return {
      type: "Point",
      id: item.stcd,
      lonlat: [item.lon, item.lat],
      ...item,
    };
  });
}
export function templatePonding(baseData, detailData) {
  if (!baseData) return [];
  return baseData.map((item) => {
    return {
      type: "Point",
      id: item.stcd,
      lonlat: [item.lon, item.lat],
      // warningOver: detailData[item.stcd] && detailData[item.stcd].warning || 0,
      // warningTime: detailData[item.stcd] && detailData[item.stcd].tm || "",
      ...item,
    };
  });
}
export function templateWareHouse(baseData, detailData) {
  if (!baseData) return [];
  return baseData.map((item) => {
    return {
      type: "Point",
      id: item.materialWarehouseId,
      lonlat: [item.lon, item.lat],
      ...item,
    };
  });
}
