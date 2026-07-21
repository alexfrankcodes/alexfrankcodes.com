"use client";

import { useState } from "react";
import { mentorshipAreas } from "@/data/mentorship";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";
import ConfettiText from "@/components/ConfettiText";
import MentorshipForm from "@/components/MentorshipForm";

const Mentorship = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id={SECTION_IDS.mentorship} title="Mentorship">
      <p className="text-muted leading-relaxed max-w-lg">
        I enjoy helping newer developers find their footing, so I offer{" "}
        <ConfettiText className="text-accent">100% free</ConfettiText> mentorship to junior
        engineers and students:
      </p>
      <ul className="mt-10 space-y-8">
        {mentorshipAreas.map((area) => (
          <li key={area.id} className="border-l border-border pl-5">
            <h3 className="font-display font-semibold tracking-tight text-foreground">
              {area.title}
            </h3>
            <p className="mt-1.5 text-muted leading-relaxed">
              {area.description}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 font-mono text-sm">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {isOpen ? "Cancel" : "Request mentorship ↗"}
        </button>
      </p>
      {isOpen && <MentorshipForm />}
    </Section>
  );
};

export default Mentorship;
