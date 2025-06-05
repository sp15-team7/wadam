export interface Wine {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rating: number;
}

const fakeWines: Wine[] = [
  {
    id: 1,
    name: 'Château Margaux 2015',
    image: '/images/wine1.jpg',
    price: 850000,
    description: '프랑스 보르도 지역의 프리미엄 와인',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Opus One 2018',
    image: '/images/wine2.jpg',
    price: 650000,
    description: '캘리포니아의 대표적인 와인',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Sassicaia 2019',
    image: '/images/wine3.jpg',
    price: 450000,
    description: '이탈리아 토스카나의 명품 와인',
    rating: 4.6,
  },
];

export const getWines = async (): Promise<Wine[]> => {
  // 1.5초 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return fakeWines;
};

export const getWineById = async (id: number): Promise<Wine | undefined> => {
  // 1.5초 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return fakeWines.find((wine) => wine.id === id);
}; 