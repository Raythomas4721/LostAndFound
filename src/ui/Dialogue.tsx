import { useEffect, useRef, useState } from 'react';
import type { Line } from '../engine/types';

interface Props {
  heading?: string;
  lines: readonly Line[];
  doneLabel?: string;
  onDone: () => void;
  footer?: React.ReactNode;
}

/** 一句一句往下播的對話框。點「繼續」看下一句，最後一句之後才能結束。 */
export function Dialogue({ heading, lines, doneLabel = '繼續', onDone, footer }: Props) {
  const [shown, setShown] = useState(Math.min(1, lines.length));
  const endRef = useRef<HTMLDivElement>(null);
  const finished = shown >= lines.length;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [shown]);

  const next = () => (finished ? onDone() : setShown((n) => n + 1));

  return (
    <section className="dialogue panel">
      {heading && <h2 className="dialogue-heading">{heading}</h2>}
      <div className="dialogue-lines" onClick={() => !finished && next()}>
        {lines.slice(0, shown).map((line, i) => (
          <LineView key={i} line={line} />
        ))}
        <div ref={endRef} />
      </div>
      {finished && footer}
      <div className="dialogue-actions">
        {!finished && (
          <button type="button" className="ghost" onClick={() => setShown(lines.length)}>
            全部顯示
          </button>
        )}
        <button type="button" className="primary" onClick={next} autoFocus>
          {finished ? doneLabel : '▼'}
        </button>
      </div>
    </section>
  );
}

export function LineView({ line }: { line: Line }) {
  return line.who ? (
    <p className="line">
      <span className="who">{line.who}</span>
      <span className="said">{line.text}</span>
    </p>
  ) : (
    <p className="line narration">{line.text}</p>
  );
}
