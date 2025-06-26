export const statusMap: Record<number, string> = {
  1: 'lên lịch',
  2: 'đang thực hiện',
  3: 'đã thực hiện',
  4: 'hủy',
  5: 'dời',
};

export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

export function findStatusIdByFuzzyText(input: string): number | undefined {
  const normInput = normalize(input);
  for (const [id, label] of Object.entries(statusMap)) {
    const normLabel = normalize(label);
    if (normLabel.includes(normInput) || normInput.includes(normLabel)) {
      return +id;
    }
  }
  return undefined;
}
