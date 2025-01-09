const promise1 = Promise.resolve('first');
const promise2 = Promise.resolve('second');
const promise3 = Promise.reject('third');
const promise4 = Promise.reject('forth');

const  runPromises = async () => {
  const res1 = Promise.all([promise1, promise2]);
  const res2 = Promise.all([promise3, promise4]); // promise3 throws error
  return [res1, res2];
};

runPromises()
  .then(console.log)
  .catch(console.error); // The promise rejected with the reason "third".
