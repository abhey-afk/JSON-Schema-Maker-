export const FIELD_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  NESTED: 'nested'
};

export const createDefaultField = (type = FIELD_TYPES.STRING) => ({
  id: Date.now() + Math.random(),
  name: '',
  type,
  defaultValue: type === FIELD_TYPES.STRING ? '' : type === FIELD_TYPES.NUMBER ? 0 : undefined,
  children: type === FIELD_TYPES.NESTED ? [] : undefined
});