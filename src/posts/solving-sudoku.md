---
title: 'Conquer Sudoku; Run the Machine'
date: '2024-12-29'
tags: ['blog', 'algorithm']
description: "Solving a famous numbers game through various algorithms designed for machines."
music: 'EnterThroughTheLobby_Disconscious'
musicTitle: 'Enter Through the Lobby'
musicArtist: 'Disconscious'
musicURI: 'https://youtu.be/-jXcnlq_yNA'
---

I've been thinking about puzzles lately.

Maybe it's because I grew up solving puzzles from the [Professor Layton series](https://www.laytonseries.com/naen/) and became quite good at it. I still fondly remember one of my most favorite puzzle from the series, CV#128 or [Number Lock](https://layton.fandom.com/wiki/Puzzle:Number_Lock). Growing up, I remember dreading this kind of puzzle, one that would take multiple sessions of brute forcing various solutions, trying different combinations, and inching just a little bit closer to the final solution. Puzzles can immerse you in an entire world of dread, excitement, stress, and sheer will.

More recently, I've been playing a fun, quirky game called [Baba is You](https://store.steampowered.com/app/736260/Baba_Is_You/) which revitalized the retro charm of solving small puzzles with a creative twist. It's a big step up from the previously mentioned entry in my life, since this game is much, **much** more challenging in every way. To say it introduces you to its world is an understatement. I had myself completely envelopped in every property, learning the hidden interactions & taking notes whenever I can to get closer to solving the most ridiculous puzzles Arvi throws at me. I have yet to reach the Endgame, but Solitary Island's [Prison](https://babaiswiki.fandom.com/wiki/Prison) & Deep Forest's [Insulation](https://babaiswiki.fandom.com/wiki/Insulation) was unbelievably hellish. It's the best puzzle game I've had the pleasure to experience.

In any case, I thought about what it'd be like to solve puzzles with the purpose of maximizing efficiency.

Play the robot, almost-- run the machine.

We commonly use heuristics & "common sense" to arrive at our solutions, and puzzles are designed with this mindset. But do robots optimize based on these heuristics, and should they be held to those standards? I tackled this question through a simple puzzle of combinatorics, [Sudoku](https://en.wikipedia.org/wiki/Sudoku).

# Su-su-do-do-ku-ku
Did you know Sudoku was not originally from Japan? It actually was first designed as "Number Place" before becoming popular through Japan as Sudoku. The name Sudoku is a simplified version of the phrase "Sūji wa dokushin ni kagiru (数字は独身に限る)" which roughly translates to "Digits must be single". It's quite funny since the term "single" used here is generally used for "single relationships" or an unmarried person. Not many people know about this phrase, so I named my application after the very first word, [suji](hhttps://www.ifuxyl.dev/suji).

For my implementation, I've built a UI client application in Typescript + [React](https://react.dev/) and built with [Vite](https://vitejs.dev/). The simulation & execution of algorithms are all done with Typescript, since the 9x9 structure of Sudoku is a small enough size to not warrant a faster compiled language.


You can try it out through [this link](https://www.ifuxyl.dev/suji)!

![A screenshot of suji](https://i.imgur.com/V3YbtO3.png)

# Process(es)

I thought of what this application mainly serves to aid my exploration process. While I was in awe of fully-implemented simulators like Jan Feldmann's [Sudoku Coach](https://sudoku.coach/). I was more interested in simulating solvers in a similar fashion to the [Maze generator/solver micro-applications](https://github.com/topics/maze-solver-algorithm) I usually see on Github.

As I kept digging for published algorithms & well-known techniques in the Sudoku space, I was enamored with the two different fields of Sudoku solving colliding as one.

For instance, a popular pen-and-paper technique (["Crook's Algorithm"](https://www.ams.org/notices/200904/tx090400460p.pdf)) invented by J.F. Crook is entirely based on the naked singles/doubles that are initially taught to beginners.

Unsurpringly, I learned a great deal of human-applicable techniques through building out these algorithms. It's wonderful to be able to solve Sudoku puzzles myself with this newfound knowledge, and I'm appreciative of the amazing Sudoku community who's kept this puzzle as relevant today.

When it comes to efficiency & performance, I was thinking at an angle of accurate measurements/specs but with most of the implementations done in TypeScript, I wasn't particularly using the appropriate tools to accurately measure the optimal performance of these algorithms. There are many existing papers (one such paper from [P. Berggren & D. Nilsson](https://www.csc.kth.se/utbildning/kandidatexjobb/datateknik/2012/rapport/berggren_patrik_OCH_nilsson_david_K12011.pdf) I highly reccomend!) on Sudoku who leveraged implementations written in C and C++, so I felt there was no reason to compete in that space.

With my experience in teaching others through code, I resonated more with creating a sandbox environment to help users understand and experiment with various algorithms, so I ultimately decided to sacrifice efficiency for user-friendly tooling & intuitive UI. As a result, I set up a rule:

- All solvers (algorithms) run at 100ms/step.

At this time interval, the algorithm works slow enough for the average person to understand what is happening. We can see how the algorithm explores different options, evaluates paths, and test if it's any closer to an optimal solution. It's also slow enough for most users to differentiate this application from other variations, since this acts to simulate for the user's benefit, not the machine.

## Time for Algorithms?

While I do believe I want to showcase all of the algorithms I implemented, that would be **extremely** wordy, so I will drop some notes I made about each one. You can also view these notes in the [README](https://github.com/sweeneyngo/suji/blob/main/README.md).

Backtracking

- A brute force algorithm (depth-first) that attempts every valid digit sequentially, and returning to previous cells if a solution can not be found. The simplest, yet effective method as all puzzles, regardless of difficulty, can be solved with this algorithm.

Backtracking (sorted)

- A variant of the Backtracking algorithm that opts to sort the empty cells by the remaining candidate values from lowest to highest. It generally achieves a faster solution rate to the previous strategy with this optimization.

Candidate-checking

- An algorithm focused on elimination; for each empty cell, it checks which valid digits are possible based on the concept of naked singles. It can reliably solve most simpler puzzles, but harder puzzles will require other algorithms and/or backtracking.

Place-finding

- An algorithm focused on insertion; for each number, it determines which empty cells can validly hold that value based on the concept of naked singles. This method, like candidate-checking, might not solve the puzzle fully and may require more advanced techniques once no more placements can be made.

Crook's Algorithm

- Crook's Algorithm (designed by J. F. Crook) is a more advanced Sudoku solving technique that is a variant of the Place-finding algorithm, but extends to "preemptive sets" (m>2). A preemptive set is a list of m numbers, together with a list of m cells, with the property that no numbers other than the m numbers from the list can occupy the m cells. This property is the basis for Naked Pairs, Triples, Quads, etc. The implementation focuses on reducing the candidates by the existing preemptive sets, then adopt the Place-finding strategy to isolate naked singles. Unlike the previous two, the Crook's algorithm can effectively solve every puzzle regardless of difficult, and is popularized as the "Pen-and-paper" approach.

Simulated Annealing

- A probabilistic/stochastic algorithm (similar to Genetic algorithms) inspired by the physical process of annealing in metallurgy, where materials are heated and then slowly cooled to reach a stable state. In the context of solving Sudoku, this method is used to explore the solution space in a way that avoids getting stuck in local minima (suboptimal solutions). While known to be efficient, it can't compete with the previous deductive methods in Sudoku. Unlike the latter however, these type of algorithms aren't based on logic, giving them the potential to solve a wider range of problems. For this implementation, the initial temperature is dynamically determined from the board's state, and the cooling rate is optimized to 0.99.

Pattern Matching

- An algorithm that emerges from a simple principle: there exists pre-calculated solution "patterns" where each digit can feasibly go. It leverages patterns for faster resolution, especially for the final steps in solving a Sudoku puzzle. For each number, there are only 46,656 valid possible configurations or "patterns" for the distribution of numbers within a Sudoku grid. This implementation determines all configurations given the current grid state & remaining empty cells for each digit (hard limit capped at 46,656), and compacts them as bit vectors.

## Navigation

Most of my algorithms can be found in `utils/solver.ts`, where it's written in [Generator](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html) format, since I wanted to leverage the use of stepping through each algorithm for a friendlier learning experience. Some algorithms required a simple recursive step like the Backtracking variants, but others needed to apply probablistic steps or bitwise manipulation like Simulated Annealing and Pattern matching. Of course, if you'd simply like to experience it, you can select an algorithm from the menu.

I opted out of using a `<canvas>` for this implementation, though it would probably be more intuitive to leverage this as I can avoid pitfalls with rendering with HTML/CSS for more intricate designs. I managed to work with a 2D state for most of my data manipulation, and render that final state with some crafty implementation to get what you see on the frontpage. Regardless, I hope it is somewhat satisfactory as a playground.

## Quick Look on a Solver

Let's take a closer look at the most primitive solver provided by [suji](https://www.ifuxyl.dev/suji/): a Backtracking algorithm that computes all valid possibilities from left-right, top-bottom until the puzzle is completely solved:

```typescript
function* solveBacktracking(grid: GridCell[][]): Generator<GridCell[][]> {

    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true;
    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {

            const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
            newGrid[row][col].value = num as ValidDigit;
            yield newGrid;

            const result = yield* solveBacktracking(newGrid);
            if (result) return true;
        }
    }
    return false;
}
```

Given a Sudoku puzzle, we can refer to cells with pre-determined values in them "non-empty". As such, the other cells without values will be "empty". We'll start by finding all empty cells, since that's what we need to fill in order to complete the puzzle:

```typescript
const emptyCell = findEmptyCell(grid);
if (!emptyCell) return true;
const { row, col } = emptyCell;
```

Given we have a function to find an empty cell, we can verify if a empty cell exists. If it doesn't, then the puzzle is solved. Otherwise, we can set our coordinates to this empty cell to determine a value for it. By having this function recurse, we can eventually fill up every remaining empty cell until we arrive at our solution.

When it comes to producing the next-working state of the grid, we can use the keyword `yield` to stop iteration through our function and allow our parent functions to display the grid's new state.

We first need to deeply copy the grid to avoid referential changes that target previous states of the grid. Then, once we write into this grid, we can then `yield` the new grid.

For the recursive step, we can now run our function `solveBacktracking()` with our new grid, and use the keyword `yield*` which allows the function to continue running the recursive process in the background:

```typescript
const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
newGrid[row][col].value = num as ValidDigit;
yield newGrid;

const result = yield* solveBacktracking(newGrid);
if (result) return true;
```

The use of coroutines here is similar to C++'s rendition, but I find the simplicity of Typescript helps simplify the process of yielding states.

For instance, a working C++ implementation of Generators can be shown below:

```c++
#include <iostream>
#include <vector>
#include <coroutine>

struct Generator {
    struct promise_type {
        std::vector<std::vector<int>> grid;

        Generator get_return_object() {
            return Generator{*this};
        }

        std::suspend_always yield_value(std::vector<std::vector<int>> g) {
            grid = std::move(g);
            return {};
        }

        std::suspend_always return_void() {
            return {};
        }

        void unhandled_exception() {
            std::exit(1);
        }
    };

    struct iterator {
        promise_type* promise;
        bool done = false;
        iterator(promise_type* promise) : promise(promise) {}

        iterator& operator++() {
            done = true;
            return *this;
        }

        bool operator==(const iterator& other) const {
            return done == other.done;
        }

        const std::vector<std::vector<int>>& operator*() const {
            return promise->grid;
        }
    };

    promise_type& promise;
    iterator begin() { return iterator(&promise); }
    iterator end() { return iterator(&promise); }
    Generator(promise_type& promise) : promise(promise) {}
};

Generator generate_2d_array() {
    std::vector<std::vector<int>> grid = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    co_yield grid;
}
```

To complete our algorithm, we just want to check if every number is a valid one, and if so we can set the value to our grid:

```typescript
for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
           // ...
    }
}
```

Since we are deep copying, we'll always have the previous state `grid` available if we don't find a valid state after recursion, allowing us to efficiently backtrack when we don't arrive at an optimal path. This algorithm, like other Backtracking algorithm, can be simplified to a DFS approach.

# Sources

All resources, whether for learning or information, are sourced here. Most of the images & diagrams I've used can be found through these websites. Please take a look at them! Without the wealth of knowledge from these articles, I wouldn't have arrived at the solution for this particular project.

Sudoku Explainer based on Keith Corlett's Implementation -- [https://sourceforge.net/p/sudoku-explainer/](https://sourceforge.net/p/sudoku-explainer/)

Official Sudoku Wiki -- [https://www.sudokuwiki.org/](https://www.sudokuwiki.org/)

Sudoku Coach by Jan Feldmann -- [https://sudoku.coach/](https://sudoku.coach/)

Sudoku Generator for Encodings -- [https://qqwing.com/generate.html](https://qqwing.com/generate.html)

Overview of Sudoku Algorithms via Wikipedia -- [https://en.wikipedia.org/wiki/Sudoku_solving_algorithms](https://en.wikipedia.org/wiki/Sudoku_solving_algorithms)

Constraint Satisfaction by Cornell --[https://pi.math.cornell.edu/~mec/Summer2009/meerkamp/Site/Solving_any_Sudoku_I.html](https://pi.math.cornell.edu/~mec/Summer2009/meerkamp/Site/Solving_any_Sudoku_I.html)

Crook's Algorithm by J.F. Crook -- [https://www.ams.org/notices/200904/tx090400460p.pdf](https://www.ams.org/notices/200904/tx090400460p.pdf)

Knuth's Algorithm (Dancing Links) by Donald E. Knuth -- [http://www.ocf.berkeley.edu/~jchu/publicportal/sudoku/0011047.pdf](http://www.ocf.berkeley.edu/~jchu/publicportal/sudoku/0011047.pdf)

--

You've reached the end, thank you for reading.
To stay notified, consider checking out my [RSS](https://ifuxyl.dev/rss.xml) to be notified of articles like this-- it may be worth your time!

Have a comment, question, or an ask? Feel free to [email](mailto:sweeneyngo@proton.me) me!
