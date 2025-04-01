class Dictionary {
  constructor(wordsArray) {
    this.dict = new Set(wordsArray);

    wordsArray.forEach(word => {
      const arr = word.split('');
      for (let i = 0; i < word.length; i++) {
        const combination = [...arr];
        combination[i] = '*';
        this.dict.add(combination.join(''));
      }
    });
  }

  isInDictionary (word) {
    return this.dict.has(word);
  }
}

const test = new Dictionary((['car', 'bar']));
console.log(test.dict);
console.log(test.isInDictionary('*ar'));
console.log(test.isInDictionary('rar'));
