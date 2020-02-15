import React from 'react';
import { action } from '@storybook/addon-actions';
import Dummy from '../components/Dummy';

export default {
  title: 'Dummy',
  component: Dummy,
};

export const DummySimple = () => <Dummy />;

DummySimple.story = {
  name: 'Какой-то dummy компонент',
};

export const DummyOne = () => <Dummy one="Kekos" />;

DummyOne.story = {
  name: 'Какой-то dummy компонент с параметром',
};
