// 檢查每一碗湯解不解得開。用法：npm run validate
import { NIGHTS } from '../src/content/nights';
import { validateNights } from '../src/engine/validate';

const { reports, issues } = validateNights(NIGHTS);

for (const [i, r] of reports.entries()) {
  const soup = NIGHTS[i].soup;
  const label = (id: string) => soup.questions.find((q) => q.id === id)?.text ?? id;
  const head = `第${NIGHTS[i].n}晚「${r.title}」`;
  if (r.minQuestions === null) {
    console.log(`${head}：✘ 拿不齊推理板的答案`);
  } else {
    console.log(`${head}：最少要問 ${r.minQuestions} 題`);
    r.path.forEach((id, k) => console.log(`  ${k + 1}. ${label(id)}`));
  }
}

const errors = issues.filter((x) => x.level === 'error');
const warns = issues.filter((x) => x.level === 'warn');
for (const x of warns) console.log(`⚠ [${x.where}] ${x.message}`);
for (const x of errors) console.log(`✘ [${x.where}] ${x.message}`);

console.log(`\n${NIGHTS.length} 晚，${errors.length} 個錯誤，${warns.length} 個警告`);
if (errors.length > 0) process.exit(1);
