import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Plus, FileText, Settings } from 'lucide-react';
import { createDefaultField } from '../types/schema';
import SchemaField from './SchemaField';
import JsonPreview from './JsonPreview';
import Button from './ui/Button';

const SchemaBuilder = () => {
  const methods = useForm({
    defaultValues: {
      fields: [createDefaultField()]
    },
    mode: 'onChange' // Enable real-time form validation and updates
  });

  const { watch, setValue, getValues } = methods;
  const formData = watch();
  
  // Debug: Log form data changes
  React.useEffect(() => {
    console.log('Form data updated:', formData);
    console.log('Fields:', formData.fields);
    if (formData.fields && formData.fields.length > 0) {
      formData.fields.forEach((field, index) => {
        console.log(`Field ${index}:`, {
          name: field.name,
          type: field.type,
          defaultValue: field.defaultValue,
          id: field.id
        });
      });
    }
  }, [formData]);

  const addField = () => {
    const currentFields = getValues('fields') || [];
    const newField = createDefaultField();
    setValue('fields', [...currentFields, newField]);
  };

  const removeField = (fieldIndex, parentPath = 'fields') => {
    const pathParts = parentPath.split('.');
    const currentData = getValues();
    
    if (pathParts.length === 1) {
      // Removing from root level
      const currentFields = currentData.fields || [];
      const newFields = currentFields.filter((_, index) => index !== fieldIndex);
      setValue('fields', newFields);
    } else {
      // Removing from nested level
      const parentFieldIndex = parseInt(pathParts[1]);
      const currentFields = currentData.fields || [];
      const parentField = currentFields[parentFieldIndex];
      
      if (parentField && parentField.children) {
        const newChildren = parentField.children.filter((_, index) => index !== fieldIndex);
        setValue(`fields.${parentFieldIndex}.children`, newChildren);
      }
    }
  };

  const addNestedField = (parentFieldIndex, newField, parentPath = 'fields') => {
    const pathParts = parentPath.split('.');
    
    if (pathParts.length === 1) {
      // Adding to root level nested field
      const currentFields = getValues('fields') || [];
      const parentField = currentFields[parentFieldIndex];
      
      if (parentField) {
        const currentChildren = parentField.children || [];
        setValue(`fields.${parentFieldIndex}.children`, [...currentChildren, newField]);
      }
    } else {
      // Adding to deeper nested level
      const rootFieldIndex = parseInt(pathParts[1]);
      const nestedPath = pathParts.slice(2).join('.');
      const fullPath = `fields.${rootFieldIndex}.${nestedPath}.${parentFieldIndex}.children`;
      const currentChildren = getValues(fullPath) || [];
      setValue(fullPath, [...currentChildren, newField]);
    }
  };

  const removeNestedField = (parentFieldIndex, nestedFieldIndex, parentPath) => {
    const pathParts = parentPath.split('.');
    
    if (pathParts.length === 1) {
      // Removing from root level nested field
      const currentFields = getValues('fields') || [];
      const parentField = currentFields[parentFieldIndex];
      
      if (parentField && parentField.children) {
        const newChildren = parentField.children.filter((_, index) => index !== nestedFieldIndex);
        setValue(`fields.${parentFieldIndex}.children`, newChildren);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">JSON Schema Builder</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Create dynamic JSON schemas with real-time preview
                </p>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                <Button
                  variant="default"
                  icon={Plus}
                  onClick={addField}
                  className="w-full sm:w-auto"
                >
                  Add Field
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side Content */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 min-h-[calc(100vh-200px)]">
            {/* Schema Builder - Left Side */}
            <div className="bg-white rounded-t-lg lg:rounded-t-lg shadow-sm border border-b-0 lg:border-b-0 border-gray-200 p-4 sm:p-6 overflow-y-auto min-h-[300px] lg:min-h-0">
              <div className="flex items-center mb-4 sm:mb-6">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Schema Builder</h2>
              </div>
              
              <FormProvider {...methods}>
                <div className="space-y-4 sm:space-y-6">
                  {formData.fields && formData.fields.length > 0 ? (
                    formData.fields.map((field, index) => (
                      <SchemaField
                        key={field.id}
                        field={field}
                        fieldIndex={index}
                        onAddField={addField}
                        onRemoveField={removeField}
                        onAddNestedField={addNestedField}
                        onRemoveNestedField={removeNestedField}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="text-gray-400 mb-4">
                        <Settings className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" />
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No fields yet</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">Start building your schema by adding your first field.</p>
                      <Button variant="default" icon={Plus} onClick={addField}>
                        Add Your First Field
                      </Button>
                    </div>
                  )}
                </div>
              </FormProvider>
            </div>

            {/* JSON Preview - Right Side */}
            <div className="bg-white rounded-none lg:rounded-t-lg shadow-sm border border-t-0 lg:border-t border-b-0 border-gray-200 flex flex-col min-h-[300px] lg:min-h-0">
              <div className="flex items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Live JSON Preview</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <JsonPreview data={formData} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">JSON Schema Builder</h3>
                  <p className="text-sm text-gray-300">Create dynamic JSON schemas with ease</p>
                </div>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-sm text-gray-300 mb-1">Built with ❤️ by</p>
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Abhey Mishra
                </p>
                <p className="text-xs text-gray-400 mt-1">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-6 pt-4 text-center">
              <p className="text-xs text-gray-400">
                © 2025 JSON Schema Builder. Crafted with React, Tailwind CSS & Vite.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SchemaBuilder;