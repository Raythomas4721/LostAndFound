// 檢查每一本湯本：每一碗湯解不解得開、每個結局走不走得到。用法：npm run validate
import { STORIES } from '../src/content/stories';
import { validateNights } from '../src/engine/validate';

let totalErrors = 0;
let totalWarns = 0;

for (const story of STORIES) {
  const { nights, endings, epilogues, voice } = story;
  console.log(`\n══ 《${story.title}》（${story.genre}，${nights.length} ${voice.unit}）══`);
  const { reports, issues, endingCounts } = validateNights(nights, endings, epilogues);

  for (const r of reports) {
    const night = nights.find((n) => n.soup?.id === r.soupId)!;
    const label = (id: string) => night.soup!.questions.find((q) => q.id === id)?.text ?? id;
    const head = `${night.title}「${r.title}」${night.soup!.kind === 'big' ? '（大湯，算上前幾晚給的線索詞）' : ''}`;
    if (r.minQuestions === null) {
      console.log(`${head}：✘ 拿不齊推理板的答案`);
    } else {
      console.log(`${head}：最少要問 ${r.minQuestions} 題`);
      r.path.forEach((id, k) => console.log(`  ${k + 1}. ${label(id)}`));
    }
  }

  const total = Object.values(endingCounts).reduce((a, b) => a + b, 0);
  console.log(`\n所有選法共 ${total} 種，結局分布：`);
  for (const e of endings) console.log(`  ${e.title}：${endingCounts[e.id]} 種（${((endingCounts[e.id] / total) * 100).toFixed(0)}%）`);

  const errors = issues.filter((x) => x.level === 'error');
  const warns = issues.filter((x) => x.level === 'warn');
  for (const x of warns) console.log(`⚠ [${x.where}] ${x.message}`);
  for (const x of errors) console.log(`✘ [${x.where}] ${x.message}`);
  totalErrors += errors.length;
  totalWarns += warns.length;
}

console.log(`\n${STORIES.length} 本湯本，${totalErrors} 個錯誤，${totalWarns} 個警告`);
if (totalErrors > 0) process.exit(1);
