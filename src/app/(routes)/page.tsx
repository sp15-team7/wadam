import Link from 'next/link';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function LandingPage() {
  await wait(3000); // loading.tsx test 3초 딜레이
  return (
    <div>
      <p className='text-4xl-bold md:text-2xl-bold'>Hello World</p>
      <br />
      <Link
        href='/loading-test'
        className='bg-primary text-white px-8 py-4 rounded-md text-xl-bold'
      >
        loading-test
      </Link>
    </div>
  );
};
