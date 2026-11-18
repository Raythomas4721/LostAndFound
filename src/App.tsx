import { NIGHTS } from './content/nights';
import { minQuestions } from './engine/solver';

// M0 的佔位畫面：只顯示第一晚的湯面，確認內容和引擎接得起來。
// 真正的櫃台畫面在 M1 做。
export function App() {
  const night = NIGHTS[0];
  const best = minQuestions(night.soup);
  return (
    <main className="placeholder">
      <p className="eyebrow">霧埔站的最後一週</p>
      <h1>失物招領處</h1>
      <section className="surface">
        <h2>
          {night.title}・{night.soup.title}
        </h2>
        {night.soup.surface.map((line, i) => (
          <p key={i} className={line.who ? 'line' : 'line narration'}>
            {line.who && <span className="who">{line.who}</span>}
            {line.text}
          </p>
        ))}
      </section>
      <p className="note">
        試玩版製作中。這碗湯有 {night.soup.questions.length} 個問題，最少要問 {best?.count ?? '?'} 題才喝得完。
      </p>
    </main>
  );
}
