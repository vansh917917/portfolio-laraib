/**
 * Main Application Orchestrator
 * Coordinates simulations, terminal console, blueprints, and UI state.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Telemetry Clock and Dynamic Latency Ticker
  const clockEl = document.getElementById('telemetry-clock');
  const latencyEl = document.getElementById('telemetry-latency');

  const updateTelemetry = () => {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toTimeString().split(' ')[0] + ' UTC';
    }
    if (latencyEl && Math.random() < 0.25) {
      latencyEl.textContent = (Math.random() * 1.8 + 1.6).toFixed(1) + 'ms';
    }
  };
  setInterval(updateTelemetry, 1000);
  updateTelemetry();

  // 2. Mobile Nav Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });

    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
      });
    });
  }

  // 3. Initialize Interactive Simulators
  let clusterSim = null;
  let pathfindingSim = null;

  try {
    if (window.ClusterSimulator) {
      clusterSim = new window.ClusterSimulator('k8s-canvas');
      window.clusterSimInstance = clusterSim;
    }
    if (window.PathfindingSimulator) {
      pathfindingSim = new window.PathfindingSimulator('astar-canvas');
      window.pathfindingSimInstance = pathfindingSim;
    }
  } catch (err) {
    console.error('Simulation initialization failed:', err);
  }

  // Simulator Tab Switching
  const tabBtnK8s = document.getElementById('tab-btn-k8s');
  const tabBtnAstar = document.getElementById('tab-btn-astar');
  const panelK8s = document.getElementById('sim-panel-k8s');
  const panelAstar = document.getElementById('sim-panel-astar');

  if (tabBtnK8s && tabBtnAstar) {
    tabBtnK8s.addEventListener('click', () => {
      tabBtnK8s.classList.add('active');
      tabBtnAstar.classList.remove('active');
      panelK8s.classList.add('active');
      panelAstar.classList.remove('active');
      if (clusterSim) clusterSim.setupResize();
    });

    tabBtnAstar.addEventListener('click', () => {
      tabBtnAstar.classList.add('active');
      tabBtnK8s.classList.remove('active');
      panelAstar.classList.add('active');
      panelK8s.classList.remove('active');
      if (pathfindingSim) pathfindingSim.draw();
    });
  }

  // Kubernetes Simulator Controls
  const trafficSlider = document.getElementById('k8s-traffic-slider');
  const sliderLabel = document.getElementById('slider-val-label');
  const btnSpike = document.getElementById('btn-spike-traffic');
  const btnThrottle = document.getElementById('btn-throttle-traffic');
  const btnReset = document.getElementById('btn-reset-cluster');

  if (trafficSlider && clusterSim) {
    trafficSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      sliderLabel.textContent = `${val}%`;
      clusterSim.setTrafficLoad(val);
    });
  }

  if (btnSpike && clusterSim) {
    btnSpike.addEventListener('click', () => {
      trafficSlider.value = 90;
      sliderLabel.textContent = '90%';
      clusterSim.setTrafficLoad(90);
    });
  }

  if (btnThrottle && clusterSim) {
    btnThrottle.addEventListener('click', () => {
      trafficSlider.value = 20;
      sliderLabel.textContent = '20%';
      clusterSim.setTrafficLoad(20);
    });
  }

  if (btnReset && clusterSim) {
    btnReset.addEventListener('click', () => {
      trafficSlider.value = 45;
      sliderLabel.textContent = '45%';
      clusterSim.setTrafficLoad(45);
    });
  }

  // A* Pathfinding Controls
  const btnRunAstar = document.getElementById('btn-run-astar');
  const btnRandomWalls = document.getElementById('btn-random-walls');
  const btnClearWalls = document.getElementById('btn-clear-walls');

  if (btnRunAstar && pathfindingSim) {
    btnRunAstar.addEventListener('click', () => {
      pathfindingSim.runAStar();
      pathfindingSim.draw();
    });
  }

  if (btnRandomWalls && pathfindingSim) {
    btnRandomWalls.addEventListener('click', () => {
      pathfindingSim.randomizeWalls();
    });
  }

  if (btnClearWalls && pathfindingSim) {
    btnClearWalls.addEventListener('click', () => {
      pathfindingSim.clearWalls();
    });
  }

  // 4. Initialize Interactive Terminal
  let terminal = null;
  if (window.InteractiveTerminal) {
    terminal = new window.InteractiveTerminal();
    const openBtn = document.getElementById('terminal-open-btn');
    if (openBtn) {
      openBtn.addEventListener('click', () => terminal.open());
    }
  }

  // 5. Initialize Architecture Blueprint Viewer
  if (window.BlueprintViewer) {
    new window.BlueprintViewer();
  }

  // 6. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Copy Email
  const copyBtn = document.getElementById('copy-email-btn');
  const copyStatus = document.getElementById('copy-status');
  const emailText = 'laraibaishah123@gmail.com';

  if (copyBtn && copyStatus) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText);
        copyStatus.textContent = 'Copied to clipboard!';
        setTimeout(() => {
          copyStatus.textContent = '';
        }, 3000);
      } catch (err) {
        copyStatus.textContent = 'Email: ' + emailText;
      }
    });
  }
});
