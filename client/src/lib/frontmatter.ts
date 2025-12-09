/**
 * Simple frontmatter parser for browser environments
 * Replaces gray-matter which relies on Node.js Buffer
 */

export interface FrontmatterResult {
  data: Record<string, any>;
  content: string;
}

export function parseFrontmatter(text: string): FrontmatterResult {
  const pattern = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/;
  const match = text.match(pattern);

  if (!match) {
    return {
      data: {},
      content: text
    };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  // Simple YAML parser (key: value)
  // Handles strings with quotes, arrays in [a, b] format, and basic types
  yamlBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle arrays like ["a", "b"]
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent.split(',').map(item => {
        item = item.trim();
        if ((item.startsWith('"') && item.endsWith('"')) || 
            (item.startsWith("'") && item.endsWith("'"))) {
          return item.slice(1, -1);
        }
        return item;
      }).filter(item => item.length > 0);
    } else {
      // Try to parse numbers
      const numValue = Number(value);
      if (!isNaN(numValue) && value !== '') {
        data[key] = numValue;
      } else {
        data[key] = value;
      }
    }
  });

  return {
    data,
    content: content.trim()
  };
}
