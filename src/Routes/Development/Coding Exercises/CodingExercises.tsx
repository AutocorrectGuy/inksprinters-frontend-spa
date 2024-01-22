import React from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import Markdown from 'react-markdown'

type Props = {}

const markdown = `## Exercise 1: Monster Attack

**Objective:** Calculate the remaining health of a character after a monster attack.

**Instructions:**
1. Declare a variable 'initialHealth' and assign it a value of 100.
2. Declare a variable 'monsterDamage' and assign it a random value between 10 and 30.
3. Calculate the remaining health after subtracting 'monsterDamage' from 'initialHealth'.
4. Use an 'if' statement to check if the remaining health is greater than 0.
5. If it is, log '"Character is still alive with [remainingHealth] health."'
6. Otherwise, log '"Character has been defeated."'

**Example Output:**
- "Character is still alive with 75 health."
- "Character has been defeated."

---

## Exercise 2: Village Access

**Objective:** Determine if a user can access a certain village based on their character attributes.

**Instructions:**
1. Declare a variable 'characterType' and assign it one of the following values: '"wizard"', '"warrior"', or '"peasant"'.
2. Declare a boolean variable 'hasMagicRing' and set it to either 'true' or 'false'.
3. The village is accessible to a '"wizard"' or anyone with a 'hasMagicRing' set to 'true'.
4. Use an 'if' statement to check if the user can access the village.
5. If they can, log '"Access to the village granted."'
6. Otherwise, log '"Access to the village denied."'

**Example Output:**
- "Access to the village granted."
- "Access to the village denied."

---

## Exercise 3: Monster with Fire Resistance Armor

**Objective:** Calculate the effective damage to a monster wearing fire resistance armor.

**Instructions:**
1. Declare a variable 'baseDamage' and assign it a value of 50.
2. Declare a variable 'fireResistance' representing the monster's fire resistance percentage (between 0 and 100).
3. Calculate the effective damage considering the 'fireResistance'. 
4. If the 'fireResistance' is 50%, the effective damage would be half of 'baseDamage'.
5. Log the effective damage dealt to the monster.

**Example Output:**
- "Effective damage dealt is 25."
- "Effective damage dealt is 50."`
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
