
import Banner from "@/components/Banner";
import ChooseUs from "@/components/ChooseUs";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";

import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Banner/>
    <Courses/>
    <ChooseUs/>
    <Instructors/>
   </div>
  );
}
