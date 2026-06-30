// Маска телефону +380 без зовнішніх бібліотек.

/**
 * Форматує введення у вигляд «+380 XX XXX XX XX».
 */
export function maskPhone(raw: string): string {
  // лишаємо тільки цифри
  let digits = raw.replace(/\D/g, '');

  // нормалізуємо початок до 380
  if (digits.startsWith('380')) {
    // ок
  } else if (digits.startsWith('0')) {
    digits = '380' + digits.slice(1);
  } else if (digits.startsWith('80')) {
    digits = '3' + digits;
  } else if (digits.length && !digits.startsWith('3')) {
    digits = '380' + digits;
  }

  digits = digits.slice(0, 12); // 380 + 9 цифр

  const rest = digits.slice(3); // після 380
  const parts = [
    rest.slice(0, 2),
    rest.slice(2, 5),
    rest.slice(5, 7),
    rest.slice(7, 9),
  ].filter(Boolean);

  return '+380' + (parts.length ? ' ' + parts.join(' ') : '');
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length >= 11;
}
