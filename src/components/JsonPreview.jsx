import React from 'react';

const JsonPreview = ({ data }) => {
  const generateSchema = (fields) => {
    const schema = {};
    
    fields.forEach(field => {
      // Skip fields without names
      if (!field.name || field.name.trim() === '') return;
      
      if (field.type === 'nested' && field.children) {
        schema[field.name] = generateSchema(field.children);
      } else {
        // Handle default values properly
        let value;
        
        if (field.defaultValue !== undefined && field.defaultValue !== null) {
          // Convert to appropriate type
          if (field.type === 'number') {
            value = field.defaultValue === '' ? 0 : Number(field.defaultValue);
          } else {
            value = String(field.defaultValue);
          }
        } else {
          // Use type-appropriate defaults when no default value is provided
          value = field.type === 'number' ? 0 : '';
        }
        
        schema[field.name] = value;
      }
    });
    
    return schema;
  };

  const jsonSchema = generateSchema(data.fields || []);
  const jsonString = JSON.stringify(jsonSchema, null, 2);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <pre className="bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-auto border min-h-[200px] sm:min-h-[300px]">
          <code className="text-gray-800 whitespace-pre-wrap break-all">
            {jsonString || '{}'}
          </code>
        </pre>
      </div>
      
      <div className="flex-shrink-0 border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
        <div className="text-xs text-gray-500 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <span className="font-medium">Fields: </span>
              <span className="text-blue-600 font-semibold">{data.fields?.length || 0}</span>
            </div>
            <div>
              <span className="font-medium">Size: </span>
              <span className="text-green-600 font-semibold">{new Blob([jsonString]).size} bytes</span>
            </div>
          </div>
          <div className="text-green-500 text-xs flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            Live Preview
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonPreview;