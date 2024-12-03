// https://leetcode.com/problems/task-scheduler/
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
  // Step 1: Count the frequency of each task
  // We use an array of size 26 (for 'A' to 'Z') to store the counts of each task.
  const taskCounts = new Array(130).fill(0);
  for (const task of tasks) {
    taskCounts[task.charCodeAt(0)]++;
  }

  // Step 2: Find the task with the maximum frequency
  // We find the most frequently occurring task. This helps us define the layout of the schedule.
  const maxCount = Math.max(...taskCounts);

  // Step 3: Count how many tasks have this maximum frequency
  // Count all tasks that occur the same number of times as the maximum frequency.
  let maxCountTasks = 0;
  for (const count of taskCounts) {
    if (count === maxCount) maxCountTasks++;
  }

  // Step 4: Calculate the minimum intervals required
  // - partCount: Number of "gaps" created by the most frequent tasks.
  const partCount = maxCount - 1;
  // - partLength: Number of empty slots in each gap that can hold other tasks or remain idle.
  const partLength = n - (maxCountTasks - 1);
  // - emptySlots: Total number of slots available for other tasks or idle time.
  const emptySlots = partCount * partLength;
  // - remainingTasks: Tasks left to fill empty slots after placing the most frequent tasks.
  const remainingTasks = tasks.length - maxCount * maxCountTasks;
  // - idles: Number of idle intervals needed if remaining tasks can't fill all empty slots.
  const idles = Math.max(0, emptySlots - remainingTasks);

  // Return the total intervals required, which is the sum of task count and idle intervals.
  return tasks.length + idles;
};

/*
Example Execution:
Input: tasks = ["A","A","A","B","B","B"], n = 2

Step-by-Step:
1. Count task frequencies:
   taskCounts = [3, 3, 0, ..., 0] (A = 3, B = 3)

2. Find maxCount:
   maxCount = 3 (A and B both occur 3 times)

3. Count tasks with maxCount:
   maxCountTasks = 2 (Tasks A and B)

4. Calculate minimum intervals:
   partCount = maxCount - 1 = 3 - 1 = 2
   partLength = n - (maxCountTasks - 1) = 2 - (2 - 1) = 1
   emptySlots = partCount * partLength = 2 * 1 = 2
   remainingTasks = tasks.length - maxCount * maxCountTasks = 6 - 3 * 2 = 0
   idles = Math.max(0, emptySlots - remainingTasks) = Math.max(0, 2 - 0) = 2

5. Total intervals = tasks.length + idles = 6 + 2 = 8

Output: 8
Explanation: A valid schedule is A -> B -> idle -> A -> B -> idle -> A -> B.
*/
