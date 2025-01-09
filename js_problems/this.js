/**
const foodCabinet = {
  currentFilter: 'b',
  groceries: [
    'apple',
    'bread',
    'butter',
    'chicken',
    'eggs',
    'milk',
    'potatoes',
    'rice',
  ],
  getFilteredGroceries: function() {
    return this.groceries.filter(function (grocery) {
      return grocery.startsWith(this.currentFilter);
    });
  }
};

console.log(foodCabinet.getFilteredGroceries());
*/
// fix code

const foodCabinet = {
  currentFilter: 'b',
  groceries: [
    'apple',
    'bread',
    'butter',
    'chicken',
    'eggs',
    'milk',
    'potatoes',
    'rice',
  ],
  getFilteredGroceries: function () {
    const currentFilter = this.currentFilter;
    return this.groceries.filter(function (grocery, ) {
      return grocery.startsWith(currentFilter);
    });
  },

  getFilteredGroceries2: function () {
    return this.groceries.filter(function (grocery) {
      return grocery.startsWith(this.currentFilter);
    }, this);
  },
  filter: (grocery) => grocery.startsWith(this.currentFilter),
  getFilteredGroceries3: function() {
    return this.groceries.filter(this.filter);
  }
};

// should be [ 'bread', 'butter' ]
console.log(foodCabinet.getFilteredGroceries());
console.log(foodCabinet.getFilteredGroceries2());
console.log(foodCabinet.getFilteredGroceries3()); // [])]
