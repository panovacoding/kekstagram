import { getRandomNumber, getRandomArrayElement } from './utils.js';

const description = [
  ' А сегодня в завтрашний день, не все могут смотреть',
  'Это на даче было, сейчас я дома уже',
  'Не важно сколько дней в твоей жизни, важно сколько жизни в твоих днях',
  'Кто знает тот поймет',
  'Взаимные лайки и подписки',
  'Насчет сотрудничества в ЛС',
];

const names = [
  'Артём',
  'Иван',
  'Роман',
  'Николай',
  'Екатерина',
  'Анна',
  'Ольга',
  'Юлия',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// eslint-disable-next-line arrow-body-style
const createPhotoDescription = () => {
  return {
    id: getRandomNumber(1, 25),
    url: `photos/${getRandomNumber(1, 25)}.jpg`,
    description: getRandomArrayElement(description),
    likes: getRandomNumber(15, 200),
    comments: [
      {
        id: getRandomNumber(1, 25),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomArrayElement(messages),
        name: getRandomArrayElement(names),
      },
      {
        id: getRandomNumber(1, 25),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomArrayElement(messages),
        name: getRandomArrayElement(names),
      },
      {
        id: getRandomNumber(1, 25),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomArrayElement(messages),
        name: getRandomArrayElement(names),
      },
    ]
  };
};

function photoDescriprions () {
  return Array.from({length: 25}, createPhotoDescription);
}

const data = photoDescriprions();
export { data };
