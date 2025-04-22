const replacementCharacters = {
  " ": "%20",
  ",": "%2C",
  "-": "%2D",
  ".": "%2E",
  "/": "%2F",
  _: "%5F",
};

export const formatLocation = async function formatLocationStringForAPIUrl(
  string
) {
  const formattedString = string.split("").reduce((string, currCharacter) => {
    if (currCharacter in replacementCharacters) {
      string += replacementCharacters[currCharacter];
      console.log();
    } else {
      string += currCharacter;
    }
    return string;
  }, ``);
  return formattedString;
};
