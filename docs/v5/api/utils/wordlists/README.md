-----

Documentation: [html](https://docs.vapors.io/)

-----

Wordlists
=========

Wordlist
--------

#### *wordlist* . **locale** => *string*

The locale for this wordlist.


#### *wordlist* . **getWord**( index ) => *string*

Returns the word at *index*.


#### *wordlist* . **getWordIndex**( word ) => *number*

Returns the index of *word* within the wordlist.


#### *wordlist* . **split**( mnemonic ) => *Array< string >*

Returns the mnemonic split into each individual word, according to a locale's valid whitespace character set.


#### *wordlist* . **join**( words ) => *string*

Returns the mnemonic by joining *words* together using the whitespace that is standard for the locale.


#### *Wordlist* . **check**( wordlists ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString)< 32 > >*

Checks that all words map both directions correctly and return the hash of the lists. Sub-classes should use this to validate the wordlist is correct against the official wordlist hash.


#### *Wordlist* . **register**( wordlist [ , name ] ) => *void*

Register a wordlist with the list of wordlists, optionally overriding the registered *name*.


Languages
---------

#### *vapors* . *wordlists* . **cz** => *Wordlist*

The Czech [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **en** => *Wordlist*

The English [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **es** => *Wordlist*

The Spanish [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **fr** => *Wordlist*

The French [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **it** => *Wordlist*

The Italian [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **ja** => *Wordlist*

The Japanese [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **ko** => *Wordlist*

The Korean [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **zh_cn** => *Wordlist*

The Simplified Chinese [Wordlist](/v5/api/utils/wordlists/#Wordlist).


#### *vapors* . *wordlists* . **zh_tw** => *Wordlist*

The Traditional Chinese [Wordlist](/v5/api/utils/wordlists/#Wordlist).


