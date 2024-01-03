import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-blue-50'>
      <Link href='/quiz'>
        <button className='bg-blue-400 w-52 p-5 text-white font-bold rounded-lg'>Start</button>
      </Link>
    </div>
  );
};

export default Home;
