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

As a result, I've spent time to revisit old accounts and changing their passwords to auto-generated hashes. I started adopting [Bitwarden](https://bitwarden.com/) as my main password manager, and I've had an easier time integrating their services to my end devices compared to LastPass.

However, if someone were to point a gun at my head and asked me to remember any of the passwords I've used on my accounts, I wouldn't remember them. While Bitwarden is a useful tool, there are times where I need to think of a strong, complex password that can endure [brute force attacks](https://www.keepersecurity.com/threats/brute-force-attack.html). [Common passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords) are notorious for being simple to guess, since it either (1) has a typical pattern, or (2) is intrinsically tied to the person (e.g. birthday, year, name).

To level up, most people opt for [passphrases](https://en.wikipedia.org/wiki/Passphrase), which are a sequence of words that are easy to remember. The benefit is that passphrases can be very naturally long while still being relatively easier to remember than passwords. As long as you can remember 4 words of 4 letters each, you're able to create a 16-character password for example. They're great for brute force since it increases the entropy, but if the sentence is comprehensible then it is possible for a nefarious party to simply guess the phrases through common associations.

For example, "Cats play with yarn" is easy to guess because cats are often associated with yarn.

Even worse, they can even consult [dictionary attacks](https://en.wikipedia.org/wiki/Dictionary_attack) which lowers the entropy back to the word-level, making it no better than a password.

So what if you can accomplish both the easy-to-remember benefit of passphrases, while still having high entropy like a password?

# Motivation

The big idea is to leverage "semi-comprehensible" sentences since they're much easier to remember than random phrases linked together. I found that using phrases that are intrinsically connected to someone is much easier to crack. With the words loosely connected, the user can recite them as they would an acronym.

With acronyms, like PEMDAS or HOMES, it's much easier to remember them through [mnemonic devices](https://www.masterclass.com/articles/mnemonic-devices-explained) than the original acronym. PEMDAS can be recited as "Please Excuse My Dear Aunt Sally" which is somewhat coherent, but is not connected to the original acronym.

Similarly, we can think of uncommon, loosely connected words to string together and use that as our own "mneomic device". That way, there's no relation to the phrase with us, giving hackers no choice but to rely on brute force strategies.

# What are Markov Chains?

To put it simply, it's a state machine. Let's assume we're forcasting the weather.

The current weather can alternate between sunny, windy, cloudy, etc. We can think of these as **"states"**. So, let's assume that the current state of the weather is sunny. If we see a raincloud approaching, we can assume that the weather can transition to a rainy state. However, we cannot be certain, as weather relies on probability.

A sunny weather can just as easily remain sunny, change to rainy, or even cloudy. We refer to this probability of change as **"transitions"**.

![Markov chain](https://healeycodes.com/_next/image?url=%2Fposts%2Fgenerating-text-with-markov-chains%2Fweather-markov-chain.png&w=640&q=100)

From this diagram, a sunny weather has a 90% change of being sunny, and a 10% change of being rainy.

Note that a Markov chain doesn't necessarily scale with time or any metric that increases over time. It's more of a demonstration of computing the next step from the previous state.

## Creating passphrases

How does phrase creation relate to Markov chains? Well, we can think of a sentence as multiple words transitioning to the next.

For example, "A cat with a hat" can be mapped out as:

```text
A -> cat -> with -> a -> hat
```

However, you may notice that the transitions will have a 100%, and this is correct behavior since we expect that if we start with the word "A", we can determine that the next word must be "cat".

If we increase the number of sentences we map, we'll start seeing identical words mapping to different words.

For instance, "A frog with a hat" will now allow the word "A" to map to "cat" and "frog". We can say that the two states will equally have a 50% chance of occuring.


As we scale to more sentences, we can build up probabilities for transitions of various words.

We call this list of sentences (or text) a corpus. And with this corpus, we can then create our own sentences by choosing a starter word, and calculating the next word through probability.

What you'll have is a sentence that may resemble phrases in literary works, text, and/or documents in the English language but dynamically create new forms through RNG.

As you can see, we want to get all the possible future states from our current word, then choose at random from these future states the next word to add on to our passphrase. If we reach a potential endword (no future states), then we can return our passphrase.

```go
futureWords, ok := markovChain.Transitions[currentWord]
if !ok || len(nextSentence) == 0 {
	return passphrase
}

nextWord = futureWords[rand.Intn(len(futureWords))]
```

For finding candidate start words, we can either (1) leverage words we encounter in corpus with a capital letter, or (2) indicate start words through a separate data structure. I went with the latter, with an example code here:

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

When creating the password, we can use the passphrase we generate, and take the first letters of each word. That way, we create our own acronym. To complicate it even further, I implement "noise", which randomizes a symbol/number to insert into our acronym. While this will make it harder to remember, the association with the original passphrase will help with memorization.

```go
func CreatePassword(sentence string, capLevel int, noiseLevel int) (string, error) {

	words := strings.Fields(sentence)
	acronym := CreateAcronym(words)
	noisyAcronym, err := addNoise(acronym, noiseLevel)

	return strings.Join(noisyAcronym, ""), nil
}
```

## Improvements

We can definitely improve the quality of our passphrases. For example, we can opt for multiple words as states rather than a single one. Typically "A tree" is a better state (encodes more information) than "A" since the former can map to future phrases that are connected to the tree.

Moreover, we can also introduce more corpus text. The quality & complexity of the text can vastly affect the sentences you produce, and it's something I'm still building to improve the results of my Markov chain.


For my implementation, I've built a server running the Markov chain + passphrase generation in [Go](https://go.dev/). The frontend client application was written in Typescript + [React](https://react.dev/) and built with [Vite](https://vitejs.dev/).

You can play with it yourself through [this link](https://www.ifuxyl.dev/akro)!

![A screenshot of akro](https://i.imgur.com/Jf5Fueu.png)


# Sources
All resources, whether for learning or information, are sourced here. Most of the images & diagrams I've used can be found through these websites. Please take a look at them! Without the wealth of knowledge from these articles, I wouldn't have arrived at the solution for this particular project.

Andrew Healey's Generating Text with Markov Chains -- [https://healeycodes.com/generating-text-with-markov-chains](https://healeycodes.com/generating-text-with-markov-chains)

Markov Chains Explained Visually -- [https://setosa.io/ev/markov-chains/](https://setosa.io/ev/markov-chains/)

--

You've reached the end, thank you for reading.
To stay notified, consider checking out my [RSS](https://ifuxyl.dev/rss.xml) to be notified of articles like this-- it may be worth your time!

Have a comment, question, or an ask? Feel free to [email](mailto:sweeneyngo@proton.me) me!
