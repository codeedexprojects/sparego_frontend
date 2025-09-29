import React from 'react';
import { Zap, Shield, Droplets, Gauge, Settings, Clock, Star } from 'lucide-react';

const SpecificationsSection = ({ product }) => {
  const defaultSpecs = [
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for performance",
      color: "red"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Meets industry standards",
      color: "orange"
    },
    {
      icon: Settings,
      title: "Compatible Design",
      description: "Fits multiple vehicle models",
      color: "purple"
    }
  ];

  const getIconColor = (color) => {
    const colors = {
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600' }
    };
    return colors[color] || colors.red;
  };

  // Safe function to get section name
  const getSectionName = () => {
    if (!product?.section) return 'N/A';
    if (typeof product.section === 'string') return product.section;
    if (product.section?.name) return product.section.name;
    return 'N/A';
  };

  const renderSpecifications = () => {
    if (product?.specifications && product.specifications.length > 0) {
      return product.specifications.map((spec, index) => {
        // Ensure spec is a string, not an object
        const specText = typeof spec === 'string' ? spec : JSON.stringify(spec);
        
        const iconOptions = [Zap, Shield, Droplets, Gauge, Settings, Clock, Star];
        const colorOptions = ['red', 'orange', 'blue', 'green', 'purple', 'teal'];
        
        const IconComponent = iconOptions[index % iconOptions.length];
        const colorScheme = getIconColor(colorOptions[index % colorOptions.length]);

        return (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${colorScheme.bg} rounded-full flex items-center justify-center`}>
              <IconComponent className={`w-4 h-4 ${colorScheme.text}`} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{specText}</h3>
              <p className="text-sm text-gray-600">Feature</p>
            </div>
          </div>
        );
      });
    }

    // Use default specifications if none provided
    return defaultSpecs.map((spec, index) => {
      const IconComponent = spec.icon;
      const colorScheme = getIconColor(spec.color);

      return (
        <div key={index} className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${colorScheme.bg} rounded-full flex items-center justify-center`}>
            <IconComponent className={`w-4 h-4 ${colorScheme.text}`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{spec.title}</h3>
            <p className="text-sm text-gray-600">{spec.description}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {renderSpecifications().slice(0, Math.ceil(renderSpecifications().length / 2))}
        </div>
        <div className="space-y-4">
          {renderSpecifications().slice(Math.ceil(renderSpecifications().length / 2))}
        </div>
      </div>
      
      {/* Additional product information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {product?.vehicleType && (
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="font-medium text-gray-900">Vehicle Type</div>
              <div className="text-gray-600">{product.vehicleType}</div>
            </div>
          )}
          {product?.section && (
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="font-medium text-gray-900">Section</div>
              <div className="text-gray-600">{getSectionName()}</div>
            </div>
          )}
          {product?.partNumber && (
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="font-medium text-gray-900">Part Number</div>
              <div className="text-gray-600">{product.partNumber}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;