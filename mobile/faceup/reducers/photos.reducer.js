export default function (photos = [], action) {
  if (action.type === "addPhoto") {
    return [...photos, action.photoURL];
  } else {
    return photos;
  }
}
