const Charts = (function () {
  function drawRadar(canvas, labels, values, options = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = options.size || 280;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size / 2 - 40;
    const n = labels.length;
    const angleStep = (Math.PI * 2) / n;
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = '#e2e8f0';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (let level = 1; level <= 5; level++) {
      ctx.beginPath();
      const r = (maxR * level) / 5;
      for (let i = 0; i <= n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
      ctx.stroke();
      ctx.fillText(labels[i], cx + (maxR + 22) * Math.cos(angle), cy + (maxR + 22) * Math.sin(angle) + 4);
    }
    ctx.beginPath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = idx * angleStep - Math.PI / 2;
      const r = maxR * ((values[idx] || 50) / 100);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawBars(container, items) {
    container.innerHTML = '';
    items.forEach(({ label, value, color }) => {
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `<span class="bar-label">${label}</span><div class="bar-track"><div class="bar-fill" style="width:${value}%;background:${color || '#6366f1'}"></div></div><span class="bar-value">${value}%</span>`;
      container.appendChild(row);
    });
  }

  return { drawRadar, drawBars };
})();
