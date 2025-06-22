import React from 'react';
import Icon from 'components/AppIcon';

const SpecialInstructions = ({ instructions, onChange }) => {
  const predefinedInstructions = [
    {
      id: 'remove-skin',
      label: 'Remove skin',
      description: 'Remove all skin before cutting'
    },
    {
      id: 'separate-wings',
      label: 'Separate wings',
      description: 'Keep wings separate from body'
    },
    {
      id: 'no-small-bones',
      label: 'Avoid small bones',
      description: 'Remove smaller bone pieces where possible'
    },
    {
      id: 'extra-cleaning',
      label: 'Extra cleaning',
      description: 'Additional cleaning and washing'
    }
  ];

  const handlePredefinedClick = (instruction) => {
    const currentInstructions = instructions.split('\n').filter(line => line.trim());
    const instructionText = `• ${instruction.label}: ${instruction.description}`;
    
    if (currentInstructions.includes(instructionText)) {
      // Remove if already exists
      const updated = currentInstructions.filter(line => line !== instructionText).join('\n');
      onChange(updated);
    } else {
      // Add new instruction
      const updated = [...currentInstructions, instructionText].join('\n');
      onChange(updated);
    }
  };

  const isInstructionSelected = (instruction) => {
    const instructionText = `• ${instruction.label}: ${instruction.description}`;
    return instructions.includes(instructionText);
  };

  return (
    <div className="space-y-4">
      {/* Predefined Instructions */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">
          Quick Instructions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {predefinedInstructions.map((instruction) => (
            <button
              key={instruction.id}
              onClick={() => handlePredefinedClick(instruction)}
              className={`text-left p-3 rounded-lg border transition-smooth ${
                isInstructionSelected(instruction)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-start space-x-2">
                <Icon 
                  name={isInstructionSelected(instruction) ? "CheckSquare" : "Square"} 
                  size={16} 
                  className={isInstructionSelected(instruction) ? 'text-primary' : 'text-text-tertiary'}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">
                    {instruction.label}
                  </div>
                  <div className="text-xs text-text-secondary font-caption">
                    {instruction.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Instructions */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">
          Additional Notes
        </h4>
        <textarea
          value={instructions}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add any specific cutting or preparation instructions..."
          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          rows={4}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-tertiary font-caption">
            Optional: Add specific preparation requests
          </span>
          <span className="text-xs text-text-tertiary font-data">
            {instructions.length}/500
          </span>
        </div>
      </div>

      {/* Instructions Preview */}
      {instructions.trim() && (
        <div className="p-3 bg-surface-100 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={14} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-secondary">
              Your Instructions
            </span>
          </div>
          <div className="text-sm text-text-primary font-caption whitespace-pre-line">
            {instructions}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="flex items-start space-x-2 p-3 bg-primary-50 rounded-lg">
        <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-primary-700 font-caption">
          <strong>Note:</strong> Special instructions may require additional processing time. Our butchers will follow your preferences as closely as possible while maintaining food safety standards.
        </div>
      </div>
    </div>
  );
};

export default SpecialInstructions;