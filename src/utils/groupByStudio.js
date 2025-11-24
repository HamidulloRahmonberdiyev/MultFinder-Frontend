export const groupByStudio = (images) => {
  return images.reduce((acc, img) => {
    if (!acc[img.studio]) {
      acc[img.studio] = [];
    }
    acc[img.studio].push(img);
    return acc;
  }, {});
};

