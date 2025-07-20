import React from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';
import { FIELD_TYPES, createDefaultField } from '../types/schema';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

const SchemaField = ({ 
  field, 
  fieldIndex, 
  onAddField, 
  onRemoveField, 
  onAddNestedField, 
  onRemoveNestedField,
  nestingLevel = 0,
  parentPath = 'fields'
}) => {
  const { register, watch, setValue, control } = useFormContext();
  const [isExpanded, setIsExpanded] = React.useState(true);
  
  const fieldPath = `${parentPath}.${fieldIndex}`;
  const fieldType = watch(`${fieldPath}.type`);
  const hasChildren = field.children && field.children.length > 0;
  
  const typeOptions = [
    { value: FIELD_TYPES.STRING, label: 'String' },
    { value: FIELD_TYPES.NUMBER, label: 'Number' },
    { value: FIELD_TYPES.NESTED, label: 'Nested' }
  ];

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setValue(`${fieldPath}.type`, newType);
    
    if (newType === FIELD_TYPES.STRING) {
      setValue(`${fieldPath}.defaultValue`, '');
      setValue(`${fieldPath}.children`, undefined);
    } else if (newType === FIELD_TYPES.NUMBER) {
      setValue(`${fieldPath}.defaultValue`, 0);
      setValue(`${fieldPath}.children`, undefined);
    } else if (newType === FIELD_TYPES.NESTED) {
      setValue(`${fieldPath}.defaultValue`, undefined);
      setValue(`${fieldPath}.children`, []);
    }
  };

  const handleAddNestedField = () => {
    const newField = createDefaultField();
    onAddNestedField(fieldIndex, newField, parentPath);
  };

  const handleRemoveNestedField = (nestedIndex) => {
    onRemoveNestedField(fieldIndex, nestedIndex, parentPath);
  };

  const paddingLeft = nestingLevel * 24;

  return (
    <div className="space-y-4">
      <div 
        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        style={{ marginLeft: `${paddingLeft}px` }}
      >
        <div className="flex items-center gap-4">
          {fieldType === FIELD_TYPES.NESTED && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          )}
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
            <div className="sm:col-span-4">
              <Controller
                name={`${fieldPath}.name`}
                control={control}
                defaultValue={field.name || ''}
                rules={{ required: 'Field name is required' }}
                render={({ field: controllerField }) => (
                  <Input
                    label="Field Name"
                    placeholder="Enter field name"
                    {...controllerField}
                  />
                )}
              />
            </div>
            
            <div className="sm:col-span-3">
              <Controller
                name={`${fieldPath}.type`}
                control={control}
                defaultValue={field.type || FIELD_TYPES.STRING}
                render={({ field: controllerField }) => (
                  <Select
                    label="Type"
                    options={typeOptions}
                    {...controllerField}
                    onChange={(e) => {
                      controllerField.onChange(e);
                      handleTypeChange(e);
                    }}
                  />
                )}
              />
            </div>
            
            {fieldType !== FIELD_TYPES.NESTED && (
              <div className="sm:col-span-3">
                <Controller
                  name={`${fieldPath}.defaultValue`}
                  control={control}
                  defaultValue={field.defaultValue !== undefined ? field.defaultValue : (fieldType === FIELD_TYPES.NUMBER ? 0 : '')}
                  render={({ field: controllerField }) => (
                    <Input
                      label="Default Value"
                      type={fieldType === FIELD_TYPES.NUMBER ? 'number' : 'text'}
                      placeholder={fieldType === FIELD_TYPES.STRING ? 'Enter default value' : '0'}
                      {...controllerField}
                    />
                  )}
                />
              </div>
            )}
            
            <div className={`${fieldType === FIELD_TYPES.NESTED ? 'sm:col-span-7' : 'sm:col-span-2'} flex flex-col sm:flex-row gap-2`}>
              {fieldType === FIELD_TYPES.NESTED && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  onClick={handleAddNestedField}
                >
                  Add Nested
                </Button>
              )}
              
              <Button
                variant="destructive"
                size="sm"
                icon={Trash2}
                onClick={() => onRemoveField(fieldIndex, parentPath)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        
        {fieldType === FIELD_TYPES.NESTED && isExpanded && hasChildren && (
          <div className="mt-4 space-y-3 border-l-2 border-gray-100 pl-4">
            {field.children.map((nestedField, nestedIndex) => (
              <SchemaField
                key={nestedField.id}
                field={nestedField}
                fieldIndex={nestedIndex}
                onAddField={onAddField}
                onRemoveField={handleRemoveNestedField}
                onAddNestedField={onAddNestedField}
                onRemoveNestedField={onRemoveNestedField}
                nestingLevel={nestingLevel + 1}
                parentPath={`${fieldPath}.children`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaField;