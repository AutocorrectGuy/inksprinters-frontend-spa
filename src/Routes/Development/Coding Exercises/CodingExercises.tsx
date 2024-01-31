import React from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import Markdown from 'react-markdown'

type Props = {}

const markdown = `## Exercise: Dungeon Map Generator

**Objective:** Write a function that generates a simple dungeon map as a 2D array, where each cell can either be a wall or an empty space.

**Instructions:**
1. Define a function named ~generateDungeonMap~ that takes three parameters: width, height, and a percentage chance for a cell to be a wall.
2. Initialize a 2D array based on the given width and height.
3. Iterate over each cell in the array, assigning a wall or empty space based on the given percentage chance.
4. Walls are denoted as ~'W'~ and empty spaces as ~'.'~.
5. Return the 2D array representing the dungeon map.
6. Ensure that the function correctly handles edge cases, such as zero dimensions.

**Example Usage:**
let map = generateDungeonMap(5, 5, 30);
console.log(map);
// Output: 2D array with a mix of 'W' and '.', based on 30% chance for walls

---

## Exercise: Pathfinding

**Objective:** Write a function that determines if there is a path from the start point to the end point in a given 2D dungeon map.

**Instructions:**
1. Define a function named ~isPathAvailable~ that takes three parameters: a 2D dungeon map array, a start coordinate, and an end coordinate.
2. Use a pathfinding algorithm (like Depth-First Search or Breadth-First Search) to find a path from start to end.
3. The dungeon map will contain walls ('W') and empty spaces ('.').
4. Return ~true~ if a path exists, and ~false~ otherwise.
5. Handle edge cases such as invalid coordinates and start or end points being walls.

**Example Usage:**
let map = [
  ['.', '.', 'W', '.', '.'],
  ['.', 'W', 'W', '.', 'W'],
  ['.', '.', '.', 'W', '.'],
  ['W', 'W', '.', '.', '.'],
  ['.', '.', 'W', 'W', '.']
];
console.log(isPathAvailable(map, [0, 0], [4, 4])); // Should return true or false based on the map

---

## Exercise: Inventory Management

**Objective:** Create a function to manage a player's inventory in a dungeon crawler game, supporting add, remove, and query operations.

**Instructions:**
1. Define a function named ~manageInventory~ that takes two parameters: an inventory object and a command string.
2. The inventory object will have item names as keys and quantities as values.
3. The command string can be 'add', 'remove', or 'query', followed by the item name, and for 'add' or 'remove', a quantity.
4. Update the inventory based on the command and return the updated inventory.
5. Ensure proper error handling for invalid commands or items not in the inventory.

**Example Usage:**
let inventory = { 'sword': 1, 'potion': 3 };
inventory = manageInventory(inventory, 'add potion 2'); // Adds 2 potions
console.log(inventory); // Output: { 'sword': 1, 'potion': 5 }

inventory = manageInventory(inventory, 'remove potion 1'); // Removes 1 potion
console.log(inventory); // Output: { 'sword': 1, 'potion': 4 }

console.log(manageInventory(inventory, 'query potion')); // Output: 4

---

## Exercise: Monster Encounter

**Objective:** Write a function to simulate a monster encounter, determining if the player wins based on their level and equipment.

**Instructions:**
1. Define a function named ~monsterEncounter~ that takes three parameters: player's level, player's equipment array, and the monster's level.
2. Each piece of equipment in the array provides a bonus level to the player.
3. Compare the player's total level (player's level plus equipment bonuses) to the monster's level.
4. Return ~true~ if the player's total level is equal to or greater than the monster's level, indicating a win. Otherwise, return ~false~.
5. Handle edge cases such as empty equipment arrays or non-numeric values.

**Example Usage:**
console.log(monsterEncounter(5, ['sword', 'shield'], 7)); // Should return false
console.log(monsterEncounter(5, ['sword', 'magic staff'], 6)); // Should return true

---

## Exercise: Random Event Generator

**Objective:** Create a function that generates random events in the dungeon based on predefined probabilities.

**Instructions:**
1. Define a function named ~generateRandomEvent~ that takes no parameters.
2. Inside the function, define a list of possible events (like finding treasure, encountering a monster, etc.), each with an associated probability.
3. Use random selection to pick an event based on the defined probabilities.
4. Return the selected event.
5. Ensure the function can handle various types of events and probabilities.

**Example Usage:**
let event = generateRandomEvent();
console.log(event);
// Output: A string describing the event, based on the random selection

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
