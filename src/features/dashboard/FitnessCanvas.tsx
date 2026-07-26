'use client';

import * as React from 'react';

const points = [42, 51, 47, 65, 61, 76, 88];
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function FitnessCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [active, setActive] = React.useState(6);

  const draw = React.useCallback((selected: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    const width = rect.width;
    const height = rect.height;
    const padding = { top: 18, right: 20, bottom: 28, left: 12 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;
    const coords = points.map((value, index) => ({
      x: padding.left + (graphWidth * index) / (points.length - 1),
      y: padding.top + graphHeight - ((value - 30) / 65) * graphHeight,
    }));

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(148, 163, 184, .16)';
    ctx.lineWidth = 1;
    for (let row = 0; row < 4; row++) {
      const y = padding.top + (graphHeight * row) / 3;
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(width - padding.right, y); ctx.stroke();
    }
    const area = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    area.addColorStop(0, 'rgba(52, 211, 153, .28)'); area.addColorStop(1, 'rgba(52, 211, 153, 0)');
    ctx.beginPath(); coords.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.lineTo(coords.at(-1)!.x, height - padding.bottom); ctx.lineTo(coords[0].x, height - padding.bottom); ctx.closePath(); ctx.fillStyle = area; ctx.fill();
    ctx.beginPath(); coords.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
    coords.forEach((p, i) => {
      ctx.beginPath(); ctx.arc(p.x, p.y, i === selected ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = i === selected ? '#ecfdf5' : '#34d399'; ctx.fill();
      if (i === selected) { ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3; ctx.stroke(); }
    });
    ctx.font = '11px system-ui'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
    labels.forEach((label, i) => ctx.fillText(label, coords[i].x, height - 6));
  }, []);

  React.useEffect(() => {
    draw(active);
    const observer = new ResizeObserver(() => draw(active));
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [active, draw]);

  function choosePoint(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const index = Math.round(((event.clientX - rect.left - 12) / (rect.width - 32)) * (points.length - 1));
    setActive(Math.max(0, Math.min(points.length - 1, index)));
  }

  return (
    <div className="relative h-64 w-full">
      <canvas ref={canvasRef} onClick={choosePoint} className="h-full w-full cursor-crosshair" aria-label="Weekly training load chart. Click a day to inspect it." role="img" />
      <div className="absolute right-3 top-3 rounded-lg border border-emerald-400/20 bg-[#0a1020]/95 px-3 py-2 text-right shadow-xl">
        <p className="text-[10px] text-slate-400">{labels[active]} training load</p>
        <p className="text-sm font-bold text-emerald-300">{points[active]}%</p>
      </div>
    </div>
  );
}
