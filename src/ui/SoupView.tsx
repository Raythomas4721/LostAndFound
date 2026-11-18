import { useMemo, useState } from 'react';
import { teaHint, type Hint } from '../engine/hints';
import { ask, availableQuestions, checkSentence, inspect, isSoupSolved, place, type SoupState } from '../engine/soup';
import { CATEGORIES, type Keyword, type Question, type Soup } from '../engine/types';
import { LineView } from './Dialogue';

interface Props {
  soup: Soup;
  state: SoupState;
  onChange: (state: SoupState) => void;
  onFinish: () => void;
}

type Feedback = { sentenceId: string; ok: boolean } | null;

export function SoupView({ soup, state, onChange, onFinish }: Props) {
  const [selected, setSelected] = useState<string>(soup.start[0]);
  const [lastAsked, setLastAsked] = useState<string | null>(null);
  const [tea, setTea] = useState<Hint | null>(null);
  const [picker, setPicker] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [surfaceOpen, setSurfaceOpen] = useState(state.asked.length === 0);
  const [seen, setSeen] = useState<Set<string>>(() => new Set(state.unlocked));

  const kw = useMemo(() => new Map(soup.keywords.map((k) => [k.id, k])), [soup]);
  const solved = isSoupSolved(soup, state);
  const questions = availableQuestions(soup, state).filter((q) => q.topic === selected);
  const highlighted = tea?.kind === 'question' ? tea.questionId : null;

  const selectKeyword = (id: string) => {
    setSelected(id);
    setSeen((s) => new Set(s).add(id));
  };

  const doAsk = (q: Question) => {
    onChange(ask(soup, state, q.id));
    setLastAsked(q.id);
    if (tea?.kind === 'question' && tea.questionId === q.id) setTea(null);
  };

  const doInspect = (hotspotId: string) => {
    onChange(inspect(soup, state, hotspotId));
    if (tea?.kind === 'inspect') setTea(null);
  };

  const doPlace = (blankId: string, keywordId: string | null) => {
    let next = place(soup, state, blankId, keywordId);
    setPicker(null);
    const sentence = soup.board.find((s) => s.blanks.some((b) => b.id === blankId))!;
    const result = checkSentence(soup, next, sentence.id);
    next = result.state;
    onChange(next);
    if (result.result !== 'incomplete') setFeedback({ sentenceId: sentence.id, ok: result.result === 'correct' });
    else setFeedback(null);
    if (tea?.kind === 'blank' && result.result === 'correct') setTea(null);
  };

  const pourTea = () => {
    const hint = teaHint(soup, state);
    onChange({ ...state, tea: state.tea + 1 });
    setTea(hint);
    if (hint.kind === 'question') selectKeyword(hint.topic);
  };

  const last = lastAsked ? soup.questions.find((q) => q.id === lastAsked) : null;

  return (
    <div className="soup">
      <section className="panel surface">
        <button type="button" className="surface-toggle" onClick={() => setSurfaceOpen((o) => !o)} aria-expanded={surfaceOpen}>
          <span className="tag">湯面</span> {soup.title}
          <span className="chev">{surfaceOpen ? '收起' : '展開'}</span>
        </button>
        {surfaceOpen && (
          <div className="surface-lines">
            {soup.surface.map((line, i) => (
              <LineView key={i} line={line} />
            ))}
          </div>
        )}
      </section>

      <div className="desk">
        <section className="panel keywords">
          <h3>線索詞</h3>
          {CATEGORIES.map((cat) => {
            const list = soup.keywords.filter((k) => k.category === cat && state.unlocked.includes(k.id));
            if (list.length === 0) return null;
            return (
              <div key={cat} className="kw-group">
                <div className="kw-cat">{cat}</div>
                <div className="kw-chips">
                  {list.map((k) => {
                    const unaskedCount = availableQuestions(soup, state).filter((q) => q.topic === k.id && !state.asked.includes(q.id)).length;
                    return (
                      <button
                        type="button"
                        key={k.id}
                        className={`chip${selected === k.id ? ' active' : ''}${seen.has(k.id) ? '' : ' fresh'}${unaskedCount === 0 ? ' spent' : ''}`}
                        onClick={() => selectKeyword(k.id)}
                      >
                        {k.label}
                        {unaskedCount > 0 && <span className="count">{unaskedCount}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <section className="panel ask">
          <h3>問溫伯：關於「{kw.get(selected)?.label}」</h3>
          {questions.length === 0 ? (
            <p className="muted">這個線索詞底下暫時沒有可以問的。</p>
          ) : (
            <ul className="questions">
              {questions.map((q) => {
                const asked = state.asked.includes(q.id);
                return (
                  <li key={q.id}>
                    <button type="button" className={`question${asked ? ' asked' : ''}${highlighted === q.id ? ' hinted' : ''}`} onClick={() => doAsk(q)} disabled={asked}>
                      <span className="q-text">{q.text}</span>
                      {asked && <ReplyBadge reply={q.reply} />}
                    </button>
                    {asked && q.say && q.id !== lastAsked && <p className="say">「{q.say}」</p>}
                  </li>
                );
              })}
            </ul>
          )}
          {last && (
            <div className="answer" key={last.id}>
              <span className="who">溫伯</span>
              <ReplyBadge reply={last.reply} big />
              {last.say && <span className="said">「{last.say}」</span>}
              {(last.unlocks ?? []).some((id) => !seen.has(id)) && (
                <span className="unlock">新線索詞：{(last.unlocks ?? []).map((id) => kw.get(id)?.label).join('、')}</span>
              )}
            </div>
          )}
        </section>

        <section className="panel evidence">
          <h3>失物</h3>
          {soup.evidence.map((e) => (
            <div key={e.id} className={`ev-card${tea?.kind === 'inspect' ? ' hinted' : ''}`}>
              <div className="ev-name">{e.name}</div>
              <p className="ev-desc">{e.description}</p>
              <div className="hotspots">
                {e.hotspots.map((h) =>
                  state.inspected.includes(h.id) ? (
                    <p key={h.id} className="hs-seen">
                      <span className="hs-name">{h.name}</span>
                      {h.label}
                    </p>
                  ) : (
                    <button type="button" key={h.id} className="hs-btn" onClick={() => doInspect(h.id)}>
                      細看{h.name}
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className="panel board">
        <div className="board-head">
          <h3>推理板：湯底</h3>
          <button type="button" className="tea" onClick={pourTea} disabled={solved}>
            🍵 跟溫伯喝杯茶{state.tea > 0 ? `（${state.tea}）` : ''}
          </button>
        </div>
        {tea && <TeaLine hint={tea} soup={soup} kw={kw} />}
        <ol className="sentences">
          {soup.board.map((s) => {
            const done = state.solved.includes(s.id);
            const fb = feedback?.sentenceId === s.id ? feedback : null;
            const parts = s.text.split(/(\{\w+\})/);
            return (
              <li key={s.id} className={`sentence${done ? ' done' : ''}${fb && !fb.ok ? ' wrong' : ''}`}>
                {parts.map((part, i) => {
                  const m = part.match(/^\{(\w+)\}$/);
                  if (!m) return <span key={i}>{part}</span>;
                  const blank = s.blanks.find((b) => b.id === m[1])!;
                  const value = state.placements[blank.id];
                  return (
                    <span key={i} className="blank-wrap">
                      <button
                        type="button"
                        className={`blank${value ? ' filled' : ''}${tea?.kind === 'blank' && tea.blankId === blank.id ? ' hinted' : ''}`}
                        disabled={done}
                        onClick={() => setPicker(picker === blank.id ? null : blank.id)}
                      >
                        {value ? kw.get(value)?.label : `〔${blank.category}〕`}
                      </button>
                      {picker === blank.id && (
                        <span className="picker" role="listbox">
                          {soup.keywords
                            .filter((k) => k.category === blank.category && state.unlocked.includes(k.id))
                            .map((k) => (
                              <button type="button" key={k.id} className="pick" onClick={() => doPlace(blank.id, k.id)}>
                                {k.label}
                              </button>
                            ))}
                          {value && (
                            <button type="button" className="pick clear" onClick={() => doPlace(blank.id, null)}>
                              清空
                            </button>
                          )}
                        </span>
                      )}
                    </span>
                  );
                })}
                {done && <span className="ok">✔</span>}
                {fb && !fb.ok && <span className="no">這句還不對</span>}
              </li>
            );
          })}
        </ol>
        {solved && (
          <div className="finish">
            <p>每一句都對了。</p>
            <button type="button" className="primary" onClick={onFinish}>
              喝完這碗湯
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ReplyBadge({ reply, big }: { reply: Question['reply']; big?: boolean }) {
  const cls = { 是: 'yes', 不是: 'no', 不重要: 'meh', 是也不是: 'both' }[reply];
  return <span className={`reply ${cls}${big ? ' big' : ''}`}>{reply}</span>;
}

function TeaLine({ hint, soup, kw }: { hint: Hint; soup: Soup; kw: Map<string, Keyword> }) {
  let text: string;
  if (hint.kind === 'inspect') text = '失物你都仔細看過了嗎？每個地方都看看。';
  else if (hint.kind === 'question') text = `要不要問問看：「${soup.questions.find((q) => q.id === hint.questionId)?.text}」`;
  else if (hint.kind === 'blank') {
    const n = soup.board.findIndex((s) => s.id === hint.sentenceId) + 1;
    text = `第 ${n} 句那一格，我會填「${kw.get(hint.keywordId)?.label}」。`;
  } else text = '都對了。喝完吧。';
  return (
    <p className="tea-line">
      <span className="who">溫伯</span>
      {text}
    </p>
  );
}
