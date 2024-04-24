"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import HeroImage from "@/assets/hero-image.svg";
import Image from "next/image";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <main className="flex lg:flex-row flex-col-reverse items-center justify-around lg:p-24">
      <div className="w-3/5">
        <div className="content">
          <h1
            className="lg:text-7xl text-4xl max-w-[500px]
        tracking-tight mx-auto font-bold text-center mb-[30px]"
          >
            The super fast color palettes generator!
          </h1>
          <p
            className="text-lg max-w-[400px] mb-[35px] mx-auto 
        font-medium text[#464853] text-center"
          >
            Create the perfect palette or get inspired by thousands of beautiful
            color schemes.
          </p>
          <div className="w-[260px] mx-auto">
            <Button
              className="bg-[#0066ff] hover:bg-[#0454cc] w-full text-white
              font-semibold h-[46px] px-[21px] my-3 rounded-lg"
            >
              {isSignedIn ? (
                <Link href="/generate">Start the generator</Link>
              ) : (
                <Link href="/sign-in">Sign in to start the generator</Link>
              )}
            </Button>
            <Button
              variant={"outline"}
              className="text-black w-full border border-[#d8d8da] font-semibold
              h-[46px] px-[21px] my-3 rounded-lg"
            >
              Explore palettes
            </Button>
          </div>
        </div>
      </div>
      <div
        className="w-2/3 xl:p-32 p-2 lg:mb-0 mb-10 xl:mt-0 lg:mt-32 mt-5 
      flex justify-center items-center"
      >
        <Image src={HeroImage} alt="hero" />
      </div>
    </main>
  );
}
