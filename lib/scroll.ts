export function scrollToHash(targetId: string) {
  const target = document.querySelector(targetId);
  if (!target) {
    return;
  }

  const navbarHeight = document.querySelector("nav")?.clientHeight ?? 0;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: targetPosition - navbarHeight,
    behavior: "smooth",
  });
}
