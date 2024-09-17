---
title: "Acronyms and Markov Chains"
date: "2024-09-15"
tags: ["blog", "algorithm"]
description: "Learning to associate sentence creation and password memorization, and connecting these two ideas together."
music: "ERROR_PlasticGirl"
musicTitle: "ERROR"
musicArtist: "PLASTIC GIRL IN CLOSET"
musicURI: "https://youtu.be/3RDCSySwX3k"
---

I've been dealing with data breaches where my password was exposed-- a recent data breach was even localized at my own university.

As a result, I’ve revisited old accounts and changed their passwords to auto-generated hashes. I started using [Bitwarden](https://bitwarden.com/) as my main password manager,  and I’ve found it easier to integrate its services with my devices compared to LastPass.

However, if someone were to force me to remember any of my passwords, I wouldn’t be able to recall them. While Bitwarden is a useful tool, there are times when I need to come up with a strong, complex password that can withstand [brute force attacks](https://www.keepersecurity.com/threats/brute-force-attack.html). [Common passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords) are notorious for being easy to guess, either because they follow typical patterns or are tied to personal information (e.g., birthdays, years, names).

To improve security, many people opt for [passphrases](https://en.wikipedia.org/wiki/Passphrase).These are sequences of words that are easier to remember while being very naturally long (at the word-granularity). For instance, one can remember 4 words of 4 letters each much more easily than a 16-character password.
Passphrases are beneficial because they can be long and have high entropy, making them resistant to brute force attacks. However, if the passphrase is too comprehensible, it may still be susceptible to guessing based on common associations.

For example, "Cats play with yarn" is easy to guess because cats are commonly associated with yarn.

Even worse, attackers can use [dictionary attacks](https://en.wikipedia.org/wiki/Dictionary_attack) which reduce the entropy to the level of individual words, making the passphrase as vulnerable as a simple password.

So, how can we achieve both the ease of remembering passphrases and the high entropy of complex passwords?

# Motivation

The key idea is to use "semi-comprehensible" sentences. These sentences are easier to remember than random phrases but don't have a direct connection to personal information, making them harder for attackers to guess. With the words loosely connected, the user can recite them as they would an acronym.

With acronyms, like PEMDAS or HOMES, it's much easier to remember them through [mnemonic devices](https://www.masterclass.com/articles/mnemonic-devices-explained) than the original acronym. PEMDAS can be recited as "Please Excuse My Dear Aunt Sally" which is somewhat coherent, but is not connected to the original acronym.

Similarly, using uncommon, loosely connected words to create a passphrase can serve as a mnemonic device. This approach avoids the direct association with personal information, forcing attackers to rely on brute force methods.

# What are Markov Chains?

To put it simply, it's a state machine. Let's assume we're forcasting the weather.

The current weather can alternate between sunny, windy, cloudy, etc. We can think of these as **"states"**. So, let's assume that the current state of the weather is sunny. If we see a raincloud approaching, we can assume that the weather can transition to a rainy state. However, we cannot be certain, as weather relies on probability.

A sunny weather can just as easily remain sunny, change to rainy, or even cloudy. We refer to this probability of change as **"transitions"**.

![Markov chain](https://healeycodes.com/_next/image?url=%2Fposts%2Fgenerating-text-with-markov-chains%2Fweather-markov-chain.png&w=640&q=100)

From this diagram, a sunny weather has a 90% change of being sunny, and a 10% change of being rainy.

Note that a Markov chain doesn't necessarily scale with time or any metric that increases over time. More specifically, a Markov chain helps compute the next step based on the current state.

## Creating passphrases

How does this relate to creating passphrases? We can model a sentence as a sequence of words transitioning from one to another.

For example, "A cat with a hat" can be mapped out as:

```text
A -> cat -> with -> a -> hat
```

However, you may notice that the transitions will have a 100% chance of occurring. This is correct behavior since we expect that if we start with the word "A", we can determine that the next word must be "cat".

As we increase the number of sentences, the probability distribution becomes more diverse. We'll start seeing identical words mapping to different words.

For example, "A frog with a hat" will allow "A" to transition to either "cat" or "frog", each with a 50% probability.


As we scale up with more sentences, we build a probability model for word transitions.

The collection of sentences or text used to build this model is called a corpus. With this corpus, we can generate new sentences by starting with a word and choosing the next word based on probabilities.

As a result, you'll have a sentence that may resemble phrases in literary works, text, and/or documents in the English language, but avoids mimicking it entirely.


```go
futureWords, ok := markovChain.Transitions[currentWord]
if !ok || len(nextSentence) == 0 {
	return passphrase
}

nextWord = futureWords[rand.Intn(len(futureWords))]
```

As you can see, we want to get all the possible future states from our current word, then choose at random from these future states the next word to add on to our passphrase. If we reach a potential endword (no future states), then we can return our passphrase.

To find starting words, we can (1) use capitalized words in the corpus or (2) maintain a separate list of start words. Here’s an example of using the latter approach:

```go
func (m *MarkovChain) addSentence(sentence string) {

	words := strings.Fields(sentence)
	length := len(words)

	if length > 0 {
		startWord := words[0]
		m.StartWords[startWord] = true
	}
	// ...
}

func (m *MarkovChain) getRandomStartWord() string {

	var startWords []string
	for word := range m.StartWords {
		startWords = append(startWords, word)
	}

	return startWords[rand.Intn(len(startWords))]
}

```

## Building the password

To create a password from the passphrase, we can use the first letters of each word to form an acronym. To further complicate it, we can introduce "noise" by adding random symbols or numbers to the acronym. This makes it harder to remember but maintains the association with the original passphrase.

```go
func CreatePassword(sentence string, capLevel int, noiseLevel int) (string, error) {

	words := strings.Fields(sentence)
	acronym := CreateAcronym(words)
	noisyAcronym, err := addNoise(acronym, noiseLevel)

	return strings.Join(noisyAcronym, ""), nil
}
```

## Improvements

We can enhance the quality of our passphrases by using multi-word states instead of single words. For instance, "A tree" provides more context than just "A", leading to richer phrase possibilities.

Increasing the corpus size and incorporating diverse texts can also improve the generated passphrases. I’m continuously working on this to refine the results of my Markov chain implementation.

For my implementation, I've built a server running the Markov chain + passphrase generation in [Go](https://go.dev/). The frontend client application was developed in Typescript + [React](https://react.dev/) and built with [Vite](https://vitejs.dev/).

You can try it out through [this link](https://www.ifuxyl.dev/akro)!

![A screenshot of akro](https://i.imgur.com/Jf5Fueu.png)


# Sources
All resources, whether for learning or information, are sourced here. Most of the images & diagrams I've used can be found through these websites. Please take a look at them! Without the wealth of knowledge from these articles, I wouldn't have arrived at the solution for this particular project.

Andrew Healey's Generating Text with Markov Chains -- [https://healeycodes.com/generating-text-with-markov-chains](https://healeycodes.com/generating-text-with-markov-chains)

Markov Chains Explained Visually -- [https://setosa.io/ev/markov-chains/](https://setosa.io/ev/markov-chains/)

--

You've reached the end, thank you for reading.
To stay notified, consider checking out my [RSS](https://ifuxyl.dev/rss.xml) to be notified of articles like this-- it may be worth your time!

Have a comment, question, or an ask? Feel free to [email](mailto:sweeneyngo@proton.me) me!
