import tags from "./tags.json";

export default (tag, isFullname) => {
  return isFullname ? tags[tag].name : tag;
};
