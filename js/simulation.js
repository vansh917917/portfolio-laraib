/**
 * Interactive Systems Simulation Engine
 * Vanilla Canvas implementations:
 * 1. Kubernetes Cluster Autoscaling Simulator
 * 2. Autonomous Vehicle A* Pathfinding Grid
 */

class ClusterSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = true;
    this.trafficLoad = 45; // percentage
    this.targetPods = 6;
    this.currentPods = 6;
    this.maxPodsPerNode = 4;
    this.nodes = [];
    this.pods = [];
    this.lastScaleTime = 0;
    this.animId = null;

    this.initNodes();
    this.setupResize();
    this.loop();
  }

  setupResize() {
    const resize = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * window.devicePixelRatio || 600;
      this.canvas.height = rect.height * window.devicePixelRatio || 280;
      this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener('resize', resize);
  }

  initNodes() {
    this.recalculateTopology();
  }

  recalculateTopology() {
    // Determine needed nodes based on pod count
    const neededNodes = Math.max(2, Math.ceil(this.currentPods / this.maxPodsPerNode));
    this.nodes = [];
    for (let i = 0; i < neededNodes; i++) {
      this.nodes.push({
        id: `node-${i + 1}`,
        cpuUtil: Math.min(95, Math.max(15, this.trafficLoad + (Math.random() * 8 - 4))),
        memUtil: Math.min(90, Math.max(20, this.trafficLoad * 0.8 + 10)),
        status: 'Ready',
        podsCount: 0
      });
    }

    // Distribute pods across nodes
    this.pods = [];
    for (let p = 0; p < this.currentPods; p++) {
      const nodeIndex = p % neededNodes;
      this.nodes[nodeIndex].podsCount++;
      this.pods.push({
        id: `pod-auth-${p}`,
        nodeId: this.nodes[nodeIndex].id,
        nodeIndex: nodeIndex,
        latencyMs: (Math.random() * 4 + 1.2).toFixed(1)
      });
    }
  }

  setTrafficLoad(val) {
    this.trafficLoad = Math.max(10, Math.min(100, val));
    // Autoscaling algorithm logic based on 70% target utilization
    if (this.trafficLoad > 70) {
      this.targetPods = Math.min(16, Math.ceil(this.trafficLoad / 12));
    } else if (this.trafficLoad < 35) {
      this.targetPods = Math.max(3, Math.ceil(this.trafficLoad / 15));
    } else {
      this.targetPods = Math.max(4, Math.ceil(this.trafficLoad / 14));
    }
  }

  triggerAutoscaleStep() {
    const now = Date.now();
    if (now - this.lastScaleTime > 400) {
      if (this.currentPods < this.targetPods) {
        this.currentPods++;
        this.recalculateTopology();
        this.lastScaleTime = now;
      } else if (this.currentPods > this.targetPods) {
        this.currentPods--;
        this.recalculateTopology();
        this.lastScaleTime = now;
      }
    }
  }

  draw() {
    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = '#151c27';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw cluster nodes
    const nodeCount = this.nodes.length;
    const padding = 16;
    const availableWidth = width - padding * 2;
    const nodeWidth = Math.min(180, (availableWidth - (nodeCount - 1) * 12) / nodeCount);
    const nodeHeight = height - 50;

    this.nodes.forEach((node, i) => {
      const x = padding + i * (nodeWidth + 12);
      const y = 25;

      // Node boundary
      ctx.fillStyle = '#0f1722';
      ctx.fillRect(x, y, nodeWidth, nodeHeight);

      ctx.strokeStyle = node.cpuUtil > 80 ? '#f59e0b' : '#243042';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, nodeWidth, nodeHeight);

      // Node header
      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 11px JetBrains Mono, monospace';
      ctx.fillText(node.id, x + 10, y + 20);

      // Status indicator
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(x + nodeWidth - 14, y + 16, 4, 0, Math.PI * 2);
      ctx.fill();

      // CPU Bar
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`CPU: ${Math.round(node.cpuUtil)}%`, x + 10, y + 42);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 10, y + 48, nodeWidth - 20, 6);

      const cpuBarWidth = Math.max(2, ((nodeWidth - 20) * node.cpuUtil) / 100);
      ctx.fillStyle = node.cpuUtil > 80 ? '#f59e0b' : '#38bdf8';
      ctx.fillRect(x + 10, y + 48, cpuBarWidth, 6);

      // Pods count
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Pods: ${node.podsCount}/${this.maxPodsPerNode}`, x + 10, y + 74);

      // Render individual pods inside node
      const podAreaY = y + 84;
      for (let p = 0; p < node.podsCount; p++) {
        const py = podAreaY + p * 28;
        if (py + 24 < y + nodeHeight) {
          ctx.fillStyle = '#172233';
          ctx.fillRect(x + 10, py, nodeWidth - 20, 22);
          ctx.strokeStyle = '#2b3b52';
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 10, py, nodeWidth - 20, 22);

          // Small green pod dot
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(x + 20, py + 11, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#cbd5e1';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillText(`pod-${i + 1}-${p + 1}`, x + 28, py + 15);
        }
      }
    });

    // Update stats in UI if elements exist
    const statsLoad = document.getElementById('sim-metric-load');
    const statsPods = document.getElementById('sim-metric-pods');
    const statsNodes = document.getElementById('sim-metric-nodes');
    const statsStatus = document.getElementById('sim-metric-status');

    if (statsLoad) statsLoad.textContent = `${this.trafficLoad}%`;
    if (statsPods) statsPods.textContent = `${this.currentPods} active (${this.targetPods} desired)`;
    if (statsNodes) statsNodes.textContent = `${this.nodes.length} nodes`;
    if (statsStatus) {
      if (this.currentPods < this.targetPods) {
        statsStatus.textContent = 'Scaling Up (+1 pod)';
        statsStatus.style.color = '#f59e0b';
      } else if (this.currentPods > this.targetPods) {
        statsStatus.textContent = 'Scaling Down (-1 pod)';
        statsStatus.style.color = '#38bdf8';
      } else {
        statsStatus.textContent = 'Stable';
        statsStatus.style.color = '#10b981';
      }
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.triggerAutoscaleStep();
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    this.isRunning = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

class PathfindingSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.cols = 24;
    this.rows = 14;
    this.grid = [];
    this.start = { x: 2, y: 7 };
    this.end = { x: 21, y: 7 };
    this.path = [];
    this.visitedNodes = [];
    this.isMouseDown = false;
    this.drawMode = 'wall'; // wall or erase

    this.initGrid();
    this.setupEvents();
    this.generateDefaultObstacles();
    this.runAStar();
    this.draw();
  }

  initGrid() {
    this.grid = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) {
        row.push({
          x: c,
          y: r,
          isWall: false,
          f: 0,
          g: 0,
          h: 0,
          parent: null
        });
      }
      row.push();
      this.grid.push(row);
    }
  }

  generateDefaultObstacles() {
    // Generate organic obstacle pillars for demonstration
    for (let r = 3; r <= 10; r++) {
      if (r !== 6 && r !== 7) {
        this.grid[r][8].isWall = true;
      }
      if (r !== 4 && r !== 9) {
        this.grid[r][15].isWall = true;
      }
    }
  }

  setupEvents() {
    const getGridPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const cellW = rect.width / this.cols;
      const cellH = rect.height / this.rows;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const col = Math.floor((clientX - rect.left) / cellW);
      const row = Math.floor((clientY - rect.top) / cellH);
      return { col: Math.max(0, Math.min(this.cols - 1, col)), row: Math.max(0, Math.min(this.rows - 1, row)) };
    };

    const handleAction = (e) => {
      const { col, row } = getGridPos(e);
      if ((col === this.start.x && row === this.start.y) || (col === this.end.x && row === this.end.y)) {
        return;
      }
      this.grid[row][col].isWall = this.drawMode === 'wall';
      this.runAStar();
      this.draw();
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      const { col, row } = getGridPos(e);
      this.drawMode = this.grid[row][col].isWall ? 'erase' : 'wall';
      handleAction(e);
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isMouseDown) {
        handleAction(e);
      }
    });

    window.addEventListener('resize', () => this.draw());
  }

  heuristic(a, b) {
    // Manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  getNeighbors(node) {
    const dirs = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];
    const neighbors = [];
    dirs.forEach((d) => {
      const nx = node.x + d.x;
      const ny = node.y + d.y;
      if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
        if (!this.grid[ny][nx].isWall) {
          neighbors.push(this.grid[ny][nx]);
        }
      }
    });
    return neighbors;
  }

  runAStar() {
    const openSet = [];
    const closedSet = new Set();
    this.visitedNodes = [];
    this.path = [];

    // Reset grid metrics
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c].f = 0;
        this.grid[r][c].g = 0;
        this.grid[r][c].h = 0;
        this.grid[r][c].parent = null;
      }
    }

    const startNode = this.grid[this.start.y][this.start.x];
    const endNode = this.grid[this.end.y][this.end.x];
    openSet.push(startNode);

    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      const current = openSet.splice(lowestIndex, 1)[0];
      closedSet.add(`${current.x},${current.y}`);
      this.visitedNodes.push(current);

      if (current.x === endNode.x && current.y === endNode.y) {
        let temp = current;
        while (temp) {
          this.path.push(temp);
          temp = temp.parent;
        }
        this.path.reverse();
        break;
      }

      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (closedSet.has(`${neighbor.x},${neighbor.y}`)) {
          continue;
        }

        const tentativeG = current.g + 1;
        let newPath = false;

        if (!openSet.includes(neighbor)) {
          newPath = true;
          neighbor.h = this.heuristic(neighbor, endNode);
          openSet.push(neighbor);
        } else if (tentativeG < neighbor.g) {
          newPath = true;
        }

        if (newPath) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }

    const pathLenEl = document.getElementById('path-metric-length');
    const nodesExploredEl = document.getElementById('path-metric-nodes');
    if (pathLenEl) pathLenEl.textContent = this.path.length ? `${this.path.length} steps` : 'No path';
    if (nodesExploredEl) nodesExploredEl.textContent = `${this.visitedNodes.length} cells`;
  }

  clearWalls() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c].isWall = false;
      }
    }
    this.runAStar();
    this.draw();
  }

  randomizeWalls() {
    this.clearWalls();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if ((c === this.start.x && r === this.start.y) || (c === this.end.x && r === this.end.y)) {
          continue;
        }
        if (Math.random() < 0.22) {
          this.grid[r][c].isWall = true;
        }
      }
    }
    this.runAStar();
    this.draw();
  }

  draw() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    const ctx = this.ctx;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const cellW = rect.width / this.cols;
    const cellH = rect.height / this.rows;

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw cells
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = c * cellW;
        const y = r * cellH;
        const cell = this.grid[r][c];

        if (cell.isWall) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        } else {
          ctx.fillStyle = '#0b0f15';
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        }

        ctx.strokeStyle = '#16202e';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, cellW, cellH);
      }
    }

    // Draw visited exploration cells
    this.visitedNodes.forEach((node) => {
      if ((node.x !== this.start.x || node.y !== this.start.y) &&
          (node.x !== this.end.x || node.y !== this.end.y)) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(node.x * cellW + 1, node.y * cellH + 1, cellW - 2, cellH - 2);
      }
    });

    // Draw optimal path line
    if (this.path.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      this.path.forEach((p, idx) => {
        const cx = p.x * cellW + cellW / 2;
        const cy = p.y * cellH + cellH / 2;
        if (idx === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();
    }

    // Draw start node (Vehicle)
    const sx = this.start.x * cellW + cellW / 2;
    const sy = this.start.y * cellH + cellH / 2;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(sx, sy, Math.min(cellW, cellH) * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Draw end node (Target Goal)
    const ex = this.end.x * cellW + cellW / 2;
    const ey = this.end.y * cellH + cellH / 2;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(ex, ey, Math.min(cellW, cellH) * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.ClusterSimulator = ClusterSimulator;
window.PathfindingSimulator = PathfindingSimulator;
