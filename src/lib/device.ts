// Чи може пристрій справді зателефонувати по tel:-посиланню.
// На touch-пристроях (телефони/планшети) — так, відкриється дзвінок.
// На десктопі (мишка) tel: зазвичай нічого не робить, тож там показуємо
// попап «Замовити дзвінок».
export function canDial(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(pointer: coarse)').matches;
}
