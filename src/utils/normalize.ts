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
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
    .replace(/\s+/g, ' ') // remove extra spaces
    .trim()
    .toLowerCase();

  const words = normalized.split(' ');

  words.forEach((word, index) => {
    queryBuilder.andWhere(
      `LOWER(TRANSLATE(${field}, 'àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeiiiiioooooooooooooooouuuuuuuuuuuyyyyyd')) LIKE :word${index}`,
      {
        [`word${index}`]: `%${word}%`,
      },
    );
  });

  return queryBuilder;
}
export function buildSearchQueryByWords2<
  T extends import('typeorm').ObjectLiteral,
>(
  queryBuilder: SelectQueryBuilder<T>,
  field: string, // ví dụ: 'city.Name'
  searchText: string,
): SelectQueryBuilder<T> {
  const normalized = searchText
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
    .replace(/[^a-zA-Z0-9\s]/g, '') // Bỏ ký tự đặc biệt
    .replace(/\s+/g, ' ') // Bỏ khoảng trắng thừa
    .trim()
    .toLowerCase();

  const words = normalized.split(' ');

  words.forEach((word, index) => {
    queryBuilder.andWhere(`LOWER(${field}) LIKE :word${index}`, {
      [`word${index}`]: `%${word}%`,
    });
  });

  return queryBuilder;
}
