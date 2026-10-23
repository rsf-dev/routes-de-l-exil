const boundMenus = new WeakMap();

export function initUtilityMenu({ document: page = globalThis.document, ids = { menu: "utility-menu", toggle: "utility-menu-toggle", panel: "utility-menu-panel" }, onChange = () => {} } = {}) {
  const menu = page.getElementById(ids.menu);
  const toggle = page.getElementById(ids.toggle);
  const panel = page.getElementById(ids.panel);
  if (!menu || !toggle || !panel) return null;
  if (boundMenus.has(menu)) return boundMenus.get(menu);

  const isOpen = () => menu.classList.contains("open");
  const setOpen = open => {
    menu.classList.toggle("open", Boolean(open));
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(Boolean(open)));
    onChange(Boolean(open));
  };
  const controller = { open: () => setOpen(true), close: () => setOpen(false), isOpen };
  boundMenus.set(menu, controller);
  setOpen(false);
  toggle.addEventListener("click", () => setOpen(!isOpen()));
  page.addEventListener("pointerdown", event => {
    if (isOpen() && !menu.contains(event.target)) setOpen(false);
  });
  page.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    toggle.focus();
    event.preventDefault();
    event.stopImmediatePropagation();
  }, { capture: true });
  return controller;
}
