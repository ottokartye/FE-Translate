# Synopsis

This is an **in progress** translator written using Typescript that resolves keywords delimited by some special characters in a given text and finds the corresponding translation for them. 

It also contains a **Mocha** test file for testing different functions the translator handles.
Translations are red for now from a *JSON* variable and you also have to provide the regular expressions for recognizing your keywords.

# Code example

## Initializing
When initializing the Format class you need to provide 3 parameters: *RegularExpressions container*, currently selected language, the translations in JSON format:

```javascript
var expressions = new ExpressionContainer(
	new RegExp("(%[a-zA-Z_,]{1,}%)+", 'g'),
	new RegExp("(\{[a-zA-Z_]{1,}\})+", 'g')
);

let translations: Array<Translation> = [
	{ 'IDS_Artist' : {singular: 'artist',plural: 'artists'} },
	{ 'IDS_Album' : {singular: 'album', plural: 'albums'} },
	{ 'IDS_Track' : {singular: 'track', plural: 'tracks'} },
	{ 'IDS_Disclaimer' : {singular: 'Copyright %IDS_Year%'} },
	{ 'IDS_Year' : {singular: '2016'} }
];

let Format = new Format(expressions, 'en', translations);
```

## Getting the translations

Calling the actual *format* function you need to provide the *text* needed to be translated and the *data* variable in JSON format where the values for all the mentioned variables in the text have their value.

```javascript
let data: any = {countTrack: 0, countAlbum: 5,	countArtist: 46};

Format.format('This %IDS_Artist% has {countAlbum} %countAlbum,IDS_Album%. He is a good %IDS_Artist%. %IDS_Disclaimer%', data);
```

# Motivation

This project was created to handle translations for websites or any other kind of project using JS. The idea behind it is to be **universal** and modular. Should be easy to include in any project that needs to handle translations.
