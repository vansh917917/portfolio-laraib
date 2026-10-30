/**
 * Architecture Blueprint Explorer
 * Interactive architectural schematics for key engineering systems.
 */

const BLUEPRINT_DATA = {
  kubernetes: {
    title: 'Kubernetes Custom Autoscaler Topology',
    company: 'Kubernetes (CNCF)',
    metric: '30% Cluster Efficiency Gain',
    summary: 'Custom controller monitoring high-load cluster telemetry, dynamically adjusting pod replicas and node provisioning to prevent resource over-allocation.',
    nodes: [
      { id: 'step-1', title: 'Metrics Pipeline', tech: 'Prometheus / cAdvisor', desc: 'Continuous sampling of CPU, memory, and network queue depth across all cluster nodes at sub-second intervals.' },
      { id: 'step-2', title: 'Custom Controller', tech: 'Go / client-go', desc: 'Evaluates dynamic traffic volatility against predictive sliding windows rather than naive reactive thresholds.' },
      { id: 'step-3', title: 'Horizontal Pod Autoscaler', tech: 'K8s HPA API', desc: 'Issues declarative replica adjustments to Deployments and StatefulSets without restart latencies.' },
      { id: 'step-4', title: 'Node Provisioner', tech: 'Cluster Autoscaler', desc: 'Condenses under-utilized nodes and requests cloud compute instances during sudden spike windows.' }
    ],
    svg: `
      <svg viewBox="0 0 760 140" class="blueprint-svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <!-- Connector lines -->
        <line x1="160" y1="70" x2="220" y2="70" stroke="url(#lineGrad)" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="360" y1="70" x2="420" y2="70" stroke="url(#lineGrad)" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="560" y1="70" x2="620" y2="70" stroke="url(#lineGrad)" stroke-width="2" stroke-dasharray="4 4" />

        <!-- Nodes -->
        <g class="bp-node" transform="translate(20, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#243042" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">01. Telemetry</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Prometheus / cAdvisor</text>
        </g>

        <g class="bp-node" transform="translate(220, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">02. Controller</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Custom Autoscaler</text>
        </g>

        <g class="bp-node" transform="translate(420, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#243042" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">03. Replica Scale</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">HPA Workloads</text>
        </g>

        <g class="bp-node" transform="translate(620, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#10b981" stroke-width="1.5"/>
          <text x="70" y="36" fill="#10b981" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">04. Node Pool</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Compute Instances</text>
        </g>
      </svg>
    `
  },
  tesla: {
    title: 'Tesla Fleet Telemetry and Simulation Pipeline',
    company: 'Tesla',
    metric: '50TB+ Daily Sensor Streams',
    summary: 'Distributed ingestion and transformation architecture feeding real-world driving edge cases into deep reinforcement learning simulations.',
    nodes: [
      { id: 'step-1', title: 'Vehicle Sensor Bus', tech: 'CAN Bus / Cameras', desc: 'Raw telemetry streams capturing steering torque, acceleration vectors, and disengagement flags.' },
      { id: 'step-2', title: 'Distributed ETL', tech: 'Apache Spark', desc: 'Filters, deduplicates, and vectorizes 50TB+ daily sensor streams across distributed clusters.' },
      { id: 'step-3', title: 'Scenario Generator', tech: 'Unity 3D / Python', desc: 'Re-synthesizes rare edge cases in synthetic virtual worlds for closed-loop safety regression.' },
      { id: 'step-4', title: 'Deep RL Agent', tech: 'PyTorch / RLlib', desc: 'Evaluates policy models with 25% higher decision accuracy in critical maneuvers.' }
    ],
    svg: `
      <svg viewBox="0 0 760 140" class="blueprint-svg">
        <line x1="160" y1="70" x2="220" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="360" y1="70" x2="420" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="560" y1="70" x2="620" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />

        <g class="bp-node" transform="translate(20, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#243042" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">01. Ingestion</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">50TB+ Fleet Sensors</text>
        </g>
        <g class="bp-node" transform="translate(220, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">02. Spark ETL</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Feature Engineering</text>
        </g>
        <g class="bp-node" transform="translate(420, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#243042" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">03. Simulation</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Unity 3D Synthetic</text>
        </g>
        <g class="bp-node" transform="translate(620, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#10b981" stroke-width="1.5"/>
          <text x="70" y="36" fill="#10b981" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">04. RL Decision</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Policy Control</text>
        </g>
      </svg>
    `
  },
  aws: {
    title: 'AWS Serverless Anomaly Detection Engine',
    company: 'Amazon Web Services',
    metric: '97% Precision at Petabyte Scale',
    summary: 'Serverless machine learning anomaly detector filtering false alarms in cloud infrastructure metrics.',
    nodes: [
      { id: 'step-1', title: 'CloudWatch Logs', tech: 'CloudWatch Stream', desc: 'Real-time telemetry streams from serverless services and global container hosts.' },
      { id: 'step-2', title: 'Automated Pipeline', tech: 'AWS Glue / Redshift', desc: 'Petabyte data aggregation reducing human intervention by 85%.' },
      { id: 'step-3', title: 'ML Inference', tech: 'AWS SageMaker', desc: 'Optimized hyperparameter tuning framework with 40% faster convergence.' },
      { id: 'step-4', title: 'Alert Dispatch', tech: 'EventBridge / SNS', desc: 'High-confidence alerts routed directly to on-call engineers with zero latency.' }
    ],
    svg: `
      <svg viewBox="0 0 760 140" class="blueprint-svg">
        <line x1="160" y1="70" x2="220" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="360" y1="70" x2="420" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="560" y1="70" x2="620" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />

        <g class="bp-node" transform="translate(20, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#243042" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">01. CloudWatch</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Metric Streams</text>
        </g>
        <g class="bp-node" transform="translate(220, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">02. Glue &amp; Redshift</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Petabyte Ingest</text>
        </g>
        <g class="bp-node" transform="translate(420, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#243042" stroke-width="1.5"/>
          <text x="70" y="36" fill="#38bdf8" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">03. SageMaker</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">Model Inference</text>
        </g>
        <g class="bp-node" transform="translate(620, 30)">
          <rect width="140" height="80" rx="4" fill="#141c27" stroke="#10b981" stroke-width="1.5"/>
          <text x="70" y="36" fill="#10b981" font-family="JetBrains Mono" font-size="11" text-anchor="middle" font-weight="600">04. SNS Dispatch</text>
          <text x="70" y="56" fill="#94a3b8" font-family="Plus Jakarta Sans" font-size="10" text-anchor="middle">97% Precision</text>
        </g>
      </svg>
    `
  }
};

class BlueprintViewer {
  constructor() {
    this.modal = document.getElementById('blueprint-modal');
    this.titleEl = document.getElementById('bp-modal-title');
    this.companyEl = document.getElementById('bp-modal-company');
    this.metricEl = document.getElementById('bp-modal-metric');
    this.summaryEl = document.getElementById('bp-modal-summary');
    this.svgContainer = document.getElementById('bp-modal-svg');
    this.nodesContainer = document.getElementById('bp-modal-nodes');
    this.isOpen = false;

    this.initEvents();
  }

  initEvents() {
    if (!this.modal) return;

    // Triggers
    const triggers = document.querySelectorAll('[data-blueprint]');
    triggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-blueprint');
        this.open(key);
      });
    });

    // Close button
    const closeBtn = document.getElementById('bp-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Modal background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Escape listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(key) {
    const data = BLUEPRINT_DATA[key];
    if (!data || !this.modal) return;

    this.titleEl.textContent = data.title;
    this.companyEl.textContent = data.company;
    this.metricEl.textContent = data.metric;
    this.summaryEl.textContent = data.summary;
    this.svgContainer.innerHTML = data.svg;

    // Render node cards
    this.nodesContainer.innerHTML = data.nodes
      .map(
        (node) => `
        <div class="bp-detail-card">
          <div class="bp-detail-header">
            <span class="bp-detail-step">${node.title}</span>
            <span class="bp-detail-tech">${node.tech}</span>
          </div>
          <p class="bp-detail-desc">${node.desc}</p>
        </div>
      `
      )
      .join('');

    this.modal.classList.add('active');
    this.isOpen = true;
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.isOpen = false;
  }
}

window.BlueprintViewer = BlueprintViewer;
