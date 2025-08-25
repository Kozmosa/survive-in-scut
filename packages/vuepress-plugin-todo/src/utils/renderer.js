/**
 * 生成TODO项的Markdown内容
 * @param {Array} todoList - TODO项列表
 * @param {string} sourceDir - 源目录路径
 * @returns {string} 生成的Markdown内容
 */
export function generateTodoMarkdown(todoList, sourceDir) {
  // 按文件分组
  const todosByFile = {};
  todoList.forEach(item => {
    if (!todosByFile[item.file]) {
      todosByFile[item.file] = [];
    }
    todosByFile[item.file].push(item);
  });
  
  // 生成Markdown内容
  const todoContent = [
    '---',
    'sidebar: auto',
    'title: 待办事项汇总',
    '---',
    '',
    '# 待办事项汇总',
    '',
    `> 最后更新时间: ${new Date().toISOString().replace('T', ' ').substr(0, 19)}`,
    '',
    `共找到 ${todoList.length} 个 todo 项`,
    '',
  ];
  
  // 按文件添加TODO项
  Object.entries(todosByFile).forEach(([file, items]) => {
    todoContent.push(`## ${file}`);
    todoContent.push('');
    
    items.forEach(item => {
      const linkPath = file.replace(/\\/g, '/');
      todoContent.push(`- **第 ${item.line} 行**: ${item.text}`);
      todoContent.push(`  - [查看源文件](/${linkPath})`);
    });
    
    todoContent.push('');
  });
  
  return todoContent.join('\n');
}
