import { MentorshipArea } from "@/lib/types";

export const MentorshipCard = ({
  icon: Icon,
  title,
  description,
}: Omit<MentorshipArea, "id">) => (
  <div className="group glass rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(var(--accent)/0.1)] hover:-translate-y-1">
    <div className="text-accent mb-5 p-3 rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/15">
      <Icon size={36} />
    </div>
    <h3 className="text-xl font-display italic mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-[15px] leading-relaxed">{description}</p>
  </div>
);
