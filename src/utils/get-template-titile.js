export const GetTemplateTitle = (index, word) => {
  const wordFormatted = `${word.charAt(0).toUpperCase()}${word
    .slice(1)
    .replace(/_/, ' ')}`;

  switch (index) {
    case 'i':
      return `Drinks that are made with ${wordFormatted}:`;

    case 'c':
      return `Drinks of the ${wordFormatted} category:`;

    case 'g':
      return `Drinks of the ${wordFormatted} ${
        word.includes('lass') ? ':' : index === 'g' && 'glass:'
      }`;

    default:
      if (wordFormatted.charAt(0) === 'A') {
        return 'Alcoholic:';
      }
      if (wordFormatted.charAt(0) === 'N') {
        return 'Non Alcoholic:';
      }

      return 'Optional Alcoholic:';
  }
};
