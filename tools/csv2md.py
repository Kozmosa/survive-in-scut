import csv
import argparse
from pathlib import Path
import chardet
import sys

def detect_encoding(file_path: Path) -> str:
    """检测文件编码"""
    with open(file_path, 'rb') as file:
        raw_data = file.read(1024 * 10)  # 读取前10KB进行检测
    
    result = chardet.detect(raw_data)
    return result['encoding']

def csv_to_markdown(csv_path: Path, delimiter: str = ',', quotechar: str = '"', encoding: str = 'auto') -> str:
    """将CSV文件转换为Markdown表格"""
    # 自动检测编码
    if encoding.lower() == 'auto':
        detected_encoding = detect_encoding(csv_path)
        print(f"自动检测编码: {detected_encoding}")
        encoding = detected_encoding or 'utf-8'
    
    try:
        with open(csv_path, 'r', encoding=encoding) as file:
            reader = csv.reader(file, delimiter=delimiter, quotechar=quotechar)
            rows = list(reader)
    except UnicodeDecodeError:
        # 编码检测失败，尝试常见编码
        fallback_encodings = ['gbk', 'gb2312', 'utf-8-sig', 'latin-1']
        for enc in fallback_encodings:
            try:
                print(f"尝试备选编码: {enc}")
                with open(csv_path, 'r', encoding=enc) as file:
                    reader = csv.reader(file, delimiter=delimiter, quotechar=quotechar)
                    rows = list(reader)
                encoding = enc
                print(f"成功使用编码: {enc}")
                break
            except UnicodeDecodeError:
                continue
        else:
            raise Exception("无法确定文件编码，请手动指定")
    
    if not rows:
        return ""
    
    # 转义管道符号和反斜杠
    escaped_rows = []
    for row in rows:
        escaped_row = [cell.replace('|', '\\|').replace('\\', '\\\\') for cell in row]
        escaped_rows.append(escaped_row)
    
    # 计算每列的最大宽度
    max_widths = [max(len(cell) for cell in col) for col in zip(*escaped_rows)]
    
    # 生成表头分隔行
    header = escaped_rows[0]
    separator = ['-' * (width + 2) for width in max_widths]
    
    # 生成Markdown表格
    markdown = []
    markdown.append('| ' + ' | '.join(f"{cell:^{max_widths[i]}}" for i, cell in enumerate(header)) + ' |')
    markdown.append('| ' + ' | '.join(separator) + ' |')
    
    for row in escaped_rows[1:]:
        markdown.append('| ' + ' | '.join(f"{cell:<{max_widths[i]}}" for i, cell in enumerate(row)) + ' |')
    
    return '\n'.join(markdown)

def main():
    parser = argparse.ArgumentParser(description='将CSV文件转换为Markdown表格')
    parser.add_argument('input', type=Path, help='输入CSV文件路径')
    parser.add_argument('-o', '--output', type=Path, help='输出Markdown文件路径，不指定则打印到控制台')
    parser.add_argument('-d', '--delimiter', type=str, default=',', help='CSV分隔符，默认为逗号')
    parser.add_argument('-q', '--quotechar', type=str, default='"', help='CSV引用字符，默认为双引号')
    parser.add_argument('-e', '--encoding', type=str, default='auto', help='文件编码，默认为自动检测')
    
    args = parser.parse_args()
    
    try:
        markdown_table = csv_to_markdown(args.input, args.delimiter, args.quotechar, args.encoding)
        
        if args.output:
            # 确保输出文件以UTF-8编码保存
            with open(args.output, 'w', encoding='utf-8', newline='') as file:
                file.write(markdown_table)
            print(f"Markdown表格已保存到 {args.output} (UTF-8编码)")
        else:
            # 控制台输出时根据系统设置处理编码
            if sys.stdout.encoding.lower().startswith('utf'):
                print(markdown_table)
            else:
                # 如果控制台不支持UTF-8，转换为兼容编码
                print(markdown_table.encode('utf-8', errors='replace').decode(sys.stdout.encoding, errors='replace'))
    
    except FileNotFoundError:
        print(f"错误：找不到文件 {args.input}")
    except UnicodeDecodeError as e:
        print(f"编码错误：无法解码文件。请尝试使用以下命令指定编码：")
        print(f"  python csv_to_markdown.py {args.input} -e gbk")
        print(f"  python csv_to_markdown.py {args.input} -e gb2312")
    except Exception as e:
        print(f"发生错误：{e}")

if __name__ == "__main__":
    main()