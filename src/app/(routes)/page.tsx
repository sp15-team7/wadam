async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function LandingPage() {
  await wait(3000); // loading.tsx test 3초 딜레이
  return <div className='text-4xl-bold md:text-2xl-bold'>Hello World </div>;
};
