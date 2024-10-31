export const imageFileExtention = (fileName: string) => {
  const extentionList = ['png', 'jpg', 'jpeg'];
  const [name, extention] = fileName.split('.');
  const extentionNotAllowed = !extentionList.includes(extention);
  if (extentionNotAllowed) {
    return new Error(
      `Le format ${extention} n'est pas autorisé. Choisisser un ficher ${extentionList}`
    );
  }
  return '';
};
