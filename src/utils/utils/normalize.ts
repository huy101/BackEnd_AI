import { SelectQueryBuilder } from 'typeorm';

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
export function buildSearchQueryByWords<
  T extends import('typeorm').ObjectLiteral,
>(
  queryBuilder: SelectQueryBuilder<T>,
  field: string,
  searchText: string,
): SelectQueryBuilder<T> {
  const normalized = searchText
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/[^a-zA-Z0-9\s]/g, '') // bỏ ký tự đặc biệt
    .replace(/\s+/g, ' ') // bỏ khoảng trắng thừa
    .trim()
    .toLowerCase();

  const words = normalized.split(' ');

  words.forEach((word, index) => {
    queryBuilder.andWhere(`LOWER(unaccent(${field})) LIKE :word${index}`, {
      [`word${index}`]: `%${word}%`,
    });
  });

  return queryBuilder;
}
