export function initTabs() {
  const tabs = document.querySelectorAll('#dl-tabs .tab');
  tabs.forEach((t) =>
    t.addEventListener('click', () => {
      tabs.forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
      document.getElementById('tab-' + t.dataset.tab).classList.add('active');
    }),
  );
}
