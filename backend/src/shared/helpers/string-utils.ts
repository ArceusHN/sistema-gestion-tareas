export class StringUtils {
    /**
     * Verifica si un string es nulo, undefined o contiene solo espacios en blanco
     * @param value - El string a verificar
     * @returns true si el string es nulo, undefined o solo tiene espacios en blanco; false en caso contrario
     */
    public static isNullOrWhiteSpace(value: string | null | undefined): boolean {
      return value === null || value === undefined || value.trim().length === 0;
    }
}