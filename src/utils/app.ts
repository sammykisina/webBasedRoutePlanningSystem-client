const getRandom = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

const generateAvatar: (name: string) => string = (name) =>
  `https://ui-avatars.com/api/?name=${name}&background=14264e&color=fff&bold=true&font-size=0.33`;

const appUtils = {
  getRandom,
  generateAvatar,
};

export default appUtils;
