import correctSentence from './../../correctSentence';

test('Возвращает корректное предложение', () => {
	expect(correctSentence('greetings, friends')).toBe('Greetings, friends.');
	expect(correctSentence('Greetings, friends')).toBe('Greetings, friends.');
	expect(correctSentence('Greetings, friends.')).toBe('Greetings, friends.');
	expect(correctSentence('test - 8 friends  .')).toBe('Test - 8 friends.');
	expect(correctSentence('test - 8 friends  ?!')).toBe('Test - 8 friends?!');
	expect(correctSentence('')).toBe('');
	expect(correctSentence('.')).toBe('.');
});
