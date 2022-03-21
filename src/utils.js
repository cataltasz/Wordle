export function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

export function toLowerCase(word) {
  for (let i = 0; i < word.length; i++) {
    switch (word[i]) {
      case "İ":
        word = setCharAt(word, i, "i");
        break;
      case "I":
        word = setCharAt(word, i, "ı");
        break;
      default:
        word = setCharAt(word, i, word[i].toLowerCase());
    }
  }

  return word;
}

export function toUpperCase(word) {
  for (let i = 0; i < word.length; i++) {
    switch (word[i]) {
      case "i":
        word = setCharAt(word, i, "İ");
        break;
      case "ı":
        word = setCharAt(word, i, "I");
        break;
      default:
        word = setCharAt(word, i, word[i].toUpperCase());
    }
  }

  return word;
}

export function findAll(str, letter) {
  let indices = new Set();
  for (var i = 0; i < str.length; i++) {
    if (str[i] === letter) indices.add(i);
  }

  return indices;
}

export function intersection(set1, set2) {
  return set1.filter((x) => set2.includes(x));
}

export const trChars = [
  "Ç",
  "Ö",
  "Ş",
  "İ",
  "ı",
  "Ü",
  "Ğ",
  "ç",
  "ö",
  "ş",
  "ü",
  "ğ",
  "i",
  "I",
];
