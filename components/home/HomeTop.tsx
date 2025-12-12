import Sidebar from "@/components/Layout/Sidebar";
import HeroBanner from "@/components/home/HeroBanner";
import RightPromo from "@/components/home/RightPromo";


export default function HomeTop() {
  return (
    <div className="flex gap-4 mb-8">
      <Sidebar />
      <HeroBanner />
      <RightPromo />
    </div>
  );
}
