/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

export default function correctSentence(text) {
	text = text.replace(/[^\w\s\-,:'"!\?\.]/g, '');
	text = text.replace(/(\s*([\.\?!]*)?)$/, '$2');
	if(!text.length) return '';

	text = text[0].toUpperCase() + text.substr(1);
	  
	if(text.length && !(/[\w,-:'"]*[.?!]$/).test(text))
		text += '.';

	return text;
}
