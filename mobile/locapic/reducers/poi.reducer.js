export default function (pointOfInterests = [], action) {
  if (action.type === "addPOI") {
    return [...pointOfInterests, action.pointOfInterest];
  } else if (action.type === "removePOI") {
    return pointOfInterests.filter((el) => el.name !== action.name);
  } else {
    return pointOfInterests;
  }
}
