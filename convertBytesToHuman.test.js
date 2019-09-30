/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  	expect(convertBytesToHuman(-1)).toBe(false);
  	expect(convertBytesToHuman('string')).toBe(false);
  	expect(convertBytesToHuman(1024.01)).toBe(false);
});

test('Возвращает корректное значение для чисел', () => {
  	expect(convertBytesToHuman(10)).toBe('10 B');
  	expect(convertBytesToHuman(0)).toBe('0 B');
  	expect(convertBytesToHuman(1024)).toBe('1 KB');
  	expect(convertBytesToHuman(1024 * 1024)).toBe('1 MB');
 	expect(convertBytesToHuman(1024 * 1024 * 1035)).toBe('1.01 GB');
 	expect(convertBytesToHuman(1024 * 1024 * 1025)).toBe('1 GB');
 	expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
 	expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1024)).toBe('1 PB');
 	expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe('1024 PB');
});

// другая группа проверок
