export const defaultStaleTime = 1000 * 60 * 5;

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}
