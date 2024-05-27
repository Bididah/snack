/* eslint-disable @typescript-eslint/ban-types */
export function generatefiltre(
  entityName: string,
  queryParams?: Object,
): string {
  let filtre: string = '1=1';
  for (const key in queryParams) {
    if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
      filtre += ` AND ${entityName}.${key} =:${key}`;
    }
    return filtre;
  }
}
