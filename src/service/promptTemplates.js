export const generateImagePrompt = (place, type = 'place') => {
  if (type === 'hotel') {
    return `${place} hotel building exterior architecture`;
  }
  return `${place} tourist attraction landmark photography`;
};