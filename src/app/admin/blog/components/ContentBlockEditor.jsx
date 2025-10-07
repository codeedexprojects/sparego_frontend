"use client";
import { useState } from 'react';

export default function ContentBlockEditor({ contentBlocks, setContentBlocks, disabled = false }) {
  const addContentBlock = (type) => {
    const newBlock = {
      id: Date.now() + Math.random(), // More unique ID
      type: type,
      text: '',
      count: contentBlocks.length + 1
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (id, text) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id ? { ...block, text } : block
    ));
  };

  const removeContentBlock = (id) => {
    const filtered = contentBlocks.filter(block => block.id !== id);
    const reordered = filtered.map((block, index) => ({
      ...block,
      count: index + 1
    }));
    setContentBlocks(reordered);
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...contentBlocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      const reordered = newBlocks.map((block, idx) => ({
        ...block,
        count: idx + 1
      }));
      setContentBlocks(reordered);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="block text-sm font-semibold text-gray-900">Content Blocks</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addContentBlock('heading')}
            disabled={disabled}
            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            + Heading
          </button>
          <button
            type="button"
            onClick={() => addContentBlock('paragraph')}
            disabled={disabled}
            className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            + Paragraph
          </button>
        </div>
      </div>

      <div className="space-y-3 border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[200px]">
        {contentBlocks.length === 0 ? (
          <div key="no-content-message" className="text-center py-8 text-gray-500">
            <p>No content blocks yet. Click the buttons above to add content.</p>
          </div>
        ) : (
          contentBlocks.map((block, index) => (
            <div key={`content-block-${block.id}`} className="bg-white border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    block.type === 'heading' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {block.type === 'heading' ? 'H' : 'P'} {block.count}
                  </span>
                  <span className="text-sm font-medium text-gray-700 capitalize">{block.type}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, 'up')}
                    disabled={index === 0 || disabled}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, 'down')}
                    disabled={index === contentBlocks.length - 1 || disabled}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeContentBlock(block.id)}
                    disabled={disabled}
                    className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              {block.type === 'heading' ? (
                <input
                  type="text"
                  value={block.text}
                  onChange={(e) => updateContentBlock(block.id, e.target.value)}
                  placeholder="Enter heading text"
                  required
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              ) : (
                <textarea
                  value={block.text}
                  onChange={(e) => updateContentBlock(block.id, e.target.value)}
                  placeholder="Enter paragraph text"
                  required
                  rows={4}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}