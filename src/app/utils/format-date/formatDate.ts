export function FormateDateUtil(date: string | number | Date | undefined) {
  if (!date) {
    return { success: false, error: 'Ops, dado inválido' };
  }
  const formated = new Intl.DateTimeFormat('pt-BR').format(new Date(date));

  return { success: true, data: formated };
}
