"use client";
import SocialLinks from "./common/SocialLinks";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-background dark:bg-background-dark py-16"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-foreground dark:text-foreground-dark">
          Get in Touch
        </h2>
        <p className="text-xl text-muted-foreground dark:text-muted-foreground-dark mb-12 max-w-2xl mx-auto">
          I{"'"}m always open to new opportunities, collaborations, and
          mentorship requests. Feel free to reach out!
        </p>
        <SocialLinks size={32} />
      </div>
    </section>
  );
};

export default Contact;
