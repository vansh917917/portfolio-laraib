/**
 * Interactive Terminal & Command Palette
 * Triggered via Ctrl+K, Cmd+K, or the UI Terminal button.
 */

class InteractiveTerminal {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = -1;
    this.isOpen = false;

    this.initEvents();
  }

  initEvents() {
    if (!this.modal || !this.input) return;

    // Hotkey listener for Ctrl+K, Cmd+K, and Escape
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close button
    const closeBtn = document.getElementById('terminal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Modal background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Input command handling
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    // Quick command buttons
    const quickChips = document.querySelectorAll('.term-quick-chip');
    quickChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          this.execute(cmd);
          this.input.focus();
        }
      });
    });
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    this.isOpen = true;
    setTimeout(() => this.input.focus(), 50);
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  appendLine(html, type = 'normal') {
    const line = document.createElement('div');
    line.className = `term-line term-line-${type}`;
    line.innerHTML = html;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  execute(rawCmd) {
    this.appendLine(`<span class="term-prompt">&gt;</span> <span class="term-echo">${this.escapeHtml(rawCmd)}</span>`, 'cmd');
    const parts = rawCmd.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        this.appendLine(`
Available commands:
  help              Display this command list
  cat resume        Print complete resume summary
  experience        Display engineering track record (Kubernetes, Tesla, AWS)
  projects          List all engineering projects
  skills            View languages, cloud, ML, and databases
  benchmark         Run a mock distributed system latency test
  scale &lt;load&gt;      Set cluster simulator load (e.g. scale 85)
  contact           Print contact and social links
  clear             Clear terminal screen
  download          Open resume PDF
  exit              Close this terminal
        `, 'info');
        break;

      case 'cat':
        if (args[0] === 'resume' || args[0] === 'resume.json') {
          this.appendLine(`
=== MUHAMMAD LARAIB JAMAL ===
B.E. Computer Science & Engineering | National Institute of Engineering, Mysore
CGPA: 9.7 | Track: Distributed Systems, Cloud-Native, Autonomous AI
Experience:
  - Principal Contributor @ Kubernetes (CNCF) (Sept 2024 - Present)
  - Junior Developer Intern @ Tesla (Summer 2023)
  - Machine Learning Engineer Intern @ AWS (Sept 2023 - Dec 2023)
Impact:
  - 30% Kubernetes cluster efficiency boost via autoscaling algorithm
  - 50TB+ daily fleet data processing pipeline at Tesla
  - 97% anomaly detection precision on AWS CloudWatch
Contact: laraibaishah123@gmail.com | +91 9120888968 | Prayagraj, India
          `, 'success');
        } else {
          this.appendLine(`cat: file not found: ${this.escapeHtml(args.join(' '))}. Try 'cat resume'`, 'error');
        }
        break;

      case 'experience':
        this.appendLine(`
[1] Principal Contributor | Kubernetes (CNCF) (Sep 2024 - Present)
    * Led new autoscaling algorithm, improving cluster efficiency by 30%
    * Contributed to core networking enhancements
    * Presented at KubeCon on container orchestration

[2] Junior Developer Intern | Tesla, Palo Alto, CA (Summer 2023)
    * Built autonomous vehicle simulation platform testing edge cases
    * Integrated deep reinforcement learning with vehicle control (25% accuracy gain)
    * Processed 50TB+ daily fleet sensor data via Apache Spark

[3] Machine Learning Engineer Intern | AWS, Seattle, WA (Sep 2023 - Dec 2023)
    * Serverless AI anomaly detection for AWS CloudWatch (97% precision)
    * Automated petabyte pipeline with AWS Glue & Redshift
    * Recipient of AWS Rising Star Award
        `, 'info');
        break;

      case 'projects':
        this.appendLine(`
Selected Projects:
  1. Self-Driving Car Simulation (Unity, Python, CNN, A* path planning)
  2. Autonomous Delivery Drone System (ROS, Python, LiDAR point cloud)
  3. Real-Time Fraud Detection System (TensorFlow, PySpark, AWS microservices)
  4. AI Personal Assistant (Voice/Chat, GPT NLP, React Native, Flask)
  5. Blockchain Voting System (Solidity, Ethereum, cryptographic auditability)
  6. AI-Driven Resume Reviewer (Elasticsearch, OpenAI API, AWS, React)
        `, 'info');
        break;

      case 'skills':
        this.appendLine(`
Languages:       Python, Go/Rust, C++, Java, JavaScript, SQL, HTML/CSS, PHP
Systems/Cloud:   Kubernetes, Docker, AWS (SageMaker, Glue, Redshift), Azure, CI/CD
Machine Learning: TensorFlow, PyTorch, Deep RL, Keras, HuggingFace, Scikit-Learn
Data Stores:     Apache Spark, PostgreSQL, MongoDB, Redis, Elasticsearch
        `, 'info');
        break;

      case 'scale':
        const loadVal = parseInt(args[0], 10);
        if (!isNaN(loadVal) && loadVal >= 10 && loadVal <= 100) {
          if (window.clusterSimInstance) {
            window.clusterSimInstance.setTrafficLoad(loadVal);
            this.appendLine(`Cluster simulator traffic load adjusted to ${loadVal}%. Watch node topology adapt!`, 'success');
          } else {
            this.appendLine(`Simulator is not initialized yet.`, 'error');
          }
        } else {
          this.appendLine(`Usage: scale &lt;10-100&gt; (example: scale 85)`, 'error');
        }
        break;

      case 'benchmark':
        this.appendLine(`Running synthetic cluster latency and throughput benchmark...`, 'info');
        setTimeout(() => {
          this.appendLine(`  [OK] Metrics Server: 1,420 rps | P50: 1.1ms | P99: 3.4ms`, 'success');
        }, 300);
        setTimeout(() => {
          this.appendLine(`  [OK] Ingress Gateway: 14,800 rps | Loss: 0.00% | CPU: 42%`, 'success');
        }, 600);
        setTimeout(() => {
          this.appendLine(`  [OK] Anomaly Detector: 97.2% precision | Inference: 8.4ms`, 'success');
          this.appendLine(`Benchmark passed with zero dropped packets.`, 'success');
        }, 900);
        break;

      case 'contact':
        this.appendLine(`
Email:    laraibaishah123@gmail.com
Phone:    +91 9120888968
Location: Prayagraj, India
GitHub:   https://github.com/vansh917917
LinkedIn: https://linkedin.com/in/laraib-jamal
        `, 'info');
        break;

      case 'download':
        window.open('laraib cv.pdf', '_blank');
        this.appendLine(`Opening resume PDF in new window...`, 'success');
        break;

      case 'clear':
        this.output.innerHTML = '';
        break;

      case 'exit':
      case 'quit':
        this.close();
        break;

      default:
        this.appendLine(`Command not recognized: '${this.escapeHtml(cmd)}'. Type 'help' to inspect commands.`, 'error');
        break;
    }
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

window.InteractiveTerminal = InteractiveTerminal;
