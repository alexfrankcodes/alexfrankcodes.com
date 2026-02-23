import Image from "next/image";
import pro from "@/public/img/pro.png";

const Avatar = () => (
  <div className="hidden lg:block transition-all duration-500 hover:scale-[1.03]">
    <div className="relative">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/30 to-accent-secondary/20 blur-md" />
      <div className="relative w-64 h-64 rounded-full border border-border/60 overflow-hidden">
        <Image
          src={pro}
          alt="Alex Frank"
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
);

export default Avatar;
