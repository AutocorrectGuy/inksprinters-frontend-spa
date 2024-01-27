import React from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import Markdown from 'react-markdown'

type Props = {}

const markdown = `## Exercise: Sum of Even Numbers

**Objective:** Write a function that calculates the sum of all even numbers within an array.

**Instructions:**
1. Define a function named __sumEvenNumbers__ that takes a single parameter: an array of numbers.
2. Inside the function, initialize a variable to hold the sum of even numbers.
3. Iterate through the array and add to the sum if the number is even.
4. Return the sum after the loop completes.
5. Ensure the function works for positive, negative, and zero values within the array.

**Example Usage:**
~~~javascript
let result = sumEvenNumbers([1, 2, 3, 4, 5]); // Should return 6
console.log(result); // Output: 6

result = sumEvenNumbers([3, 5, 7]); // Should return 0
console.log(result); // Output: 0

result = sumEvenNumbers([-2, 4, -6, 3]); // Should return -4
console.log(result); // Output: -4
~~~

---

## ## Exercise: Transform Array to Object

**Objective:** Write a function that transforms an array of strings into an object, with each string becoming a key and its length becoming the corresponding value.

**Instructions:**
1. Define a function named __transformToObject__ that takes a single parameter: an array of strings.
2. Inside the function, create an object to hold the key-value pairs.
3. Iterate through the array, using each string as a key and its length as the value in the object.
4. Return the object after adding all the key-value pairs.
5. Ensure the function handles empty arrays and arrays with a single string.

**Example Usage:**
~~~javascript
let result = transformToObject(["apple", "banana", "cherry"]); // Should return { apple: 5, banana: 6, cherry: 6 }
console.log(result); // Output: { apple: 5, banana: 6, cherry: 6 }

result = transformToObject([]); // Should return {}
console.log(result); // Output: {}

result = transformToObject(["hello"]); // Should return { hello: 5 }
console.log(result); // Output: { hello: 5 }
~~~

---

## ## Exercise: Filter and Count Creatures

**Objective:** Write a function that filters an array of creature objects by type and counts how many are older than a given age.

**Instructions:**
1. Define a function named __filterAndCount__ that takes three parameters: an array of creature objects, a string for the creature type, and a number for the age threshold.
2. Inside the function, use the array's _filter_ method to find creatures of the specified type that are older than the given age.
3. Return the count of filtered creatures.
4. Ensure the function correctly handles arrays with various object structures.

If you can make your own custom function that is faster than the one using arrays 'filter' method, give it a go, because there
might be something! But then make both functions - 'filterAndCount' and 'filterAndCountFaster'.

**Example Usage:**
~~~javascript
let creatures = [
  { type: 'dragon', age: 200 },
  { type: 'elf', age: 120 },
  { type: 'dragon', age: 150 },
  { type: 'dragon', age: 150 }
];

let count = filterAndCount(creatures, 'dragon', 100); // Should return 3
console.log(count); // Output: 3

creatures = [
  { type: 'orc', age: 30 },
  { type: 'elf', age: 70 }
];

count = filterAndCount(creatures, 'elf', 50); // Should return 1
console.log(count); // Output: 1

creatures = [
  { type: 'dwarf', age: 50 },
  { type: 'dwarf', age: 40 }
];

count = filterAndCount(creatures, 'elf', 30); // Should return 0
console.log(count); // Output: 0
~~~
`
const CodingExercises = (props: Props) => {
  return (
    <MainContentContainer h1="Coding exercises">
      <div className="rounded-[20px] p-4">
        <Markdown>{markdown}</Markdown>
      </div>
    </MainContentContainer>
  )
}

export default CodingExercises
