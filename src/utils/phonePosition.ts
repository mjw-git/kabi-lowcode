export function getContain() {
  const contain = document.getElementById("contain") as HTMLElement;
  const DOMRect = contain.getBoundingClientRect();
  return {
    left: DOMRect.x,
    top: DOMRect.y,
  };
}
export function isOverContain(e: MouseEvent) {
  const contain = document.getElementById("contain") as HTMLElement;
  const DOMRect = contain.getBoundingClientRect();
  const bool =
    e.clientX > DOMRect.x &&
    e.clientY > DOMRect.y &&
    DOMRect.x + DOMRect.width > e.clientX &&
    DOMRect.y + DOMRect.height > e.clientY;
  return bool;
}
