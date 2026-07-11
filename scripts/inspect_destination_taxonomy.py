from pathlib import Path

path = Path('DESTINATION TAXONOMY.docx.md')
text = path.read_text(encoding='utf-8', errors='replace')
lines = text.splitlines()
for i in range(1695, 1766):
    if i - 1 < len(lines):
        print(f'{i}: {lines[i-1]}')
print('---')
for i in range(4655, 4875):
    if i - 1 < len(lines):
        print(f'{i}: {lines[i-1]}')
