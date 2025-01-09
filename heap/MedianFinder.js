const { MinPriorityQueue, MaxPriorityQueue } = require('@datastructures-js/priority-queue');



var MedianFinder = function() {
  this.maxHeap = new MaxPriorityQueue();
  this.minHeap = new MinPriorityQueue();
  this.totalSize = 0;

};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  this.totalSize++;

  if(!this.minHeap.front()){
    this.minHeap.enqueue(num);
    return
  }

  if(num >= this.minHeap.front().element){
    this.minHeap.enqueue(num)
  }else{
    this.maxHeap.enqueue(num)
  }

  // balance
  if(this.minHeap.size() > this.maxHeap.size() + 1){
    this.maxHeap.enqueue(this.minHeap.dequeue().element)
    return
  }

  else if(this.maxHeap.size() > this.minHeap.size()){
    this.minHeap.enqueue(this.maxHeap.dequeue().element)
    return
  }


};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if(this.totalSize % 2 === 0){
    return (this.minHeap.front().element + this.maxHeap.front().element) / 2
  }else{
    return this.minHeap.front().element
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

const obj = new MedianFinder();
obj.addNum(2);
obj.addNum(3);
obj.addNum(4);

const param_2 = obj.findMedian();
console.log(param_2); // Output: 3
