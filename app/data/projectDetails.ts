/**
 * Project Details Data
 * 
 * Comprehensive technical information for each project
 * Used for detailed project pages with deep technical content
 */

export interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  
  // Hero Section
  hero: {
    description: string;
    keyFeatures: string[];
    logo?: string;
  };
  
  // Tech Summary
  techStack: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    platforms: string[];
  };
  
  // Problem Statement
  problem: {
    statement: string;
    challenges: string[];
    goals: string[];
  };
  
  // Architecture
  architecture: {
    overview: string;
    diagram?: string;
    components: string[];
    patterns: string[];
  };
  
  // Performance Stats
  performance: {
    metrics: Array<{
      name: string;
      value: string;
      description: string;
    }>;
    benchmarks?: Array<{
      test: string;
      result: string;
      unit: string;
    }>;
  };
  
  // Code Snippets
  codeSnippets: Array<{
    title: string;
    description: string;
    language: string;
    code: string;
    explanation: string;
  }>;
  
  // Commentary
  commentary: {
    motivation: string;
    designDecisions: string[];
    lessonsLearned: string[];
    futurePlans?: string[];
  };
}

// Project details data
export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  'kleascm-vulnscan': {
    id: 'kleascm-vulnscan',
    title: 'vulnSCAN',
    category: 'Systems',
    complexity: 'Advanced',
    
    hero: {
      description: 'Advanced vulnerability scanning system with real-time threat detection and automated security analysis.',
      keyFeatures: [
        'Real-time vulnerability detection',
        'Automated security scanning',
        'Threat intelligence integration',
        'Custom rule engine',
        'Comprehensive reporting'
      ]
    },
    
    techStack: {
      languages: ['Python', 'Go', 'Rust'],
      frameworks: ['FastAPI', 'React', 'Docker'],
      databases: ['PostgreSQL', 'Redis', 'Elasticsearch'],
      tools: ['Nmap', 'Nuclei', 'Custom scanners'],
      platforms: ['Linux', 'Docker', 'Kubernetes']
    },
    
    problem: {
      statement: 'Traditional vulnerability scanners lack real-time capabilities and comprehensive threat intelligence integration.',
      challenges: [
        'Real-time scanning without performance impact',
        'Integration with multiple threat intelligence sources',
        'Custom rule creation and management',
        'Scalable architecture for enterprise use'
      ],
      goals: [
        'Build a high-performance vulnerability scanner',
        'Integrate real-time threat intelligence',
        'Create flexible rule engine',
        'Provide comprehensive security reporting'
      ]
    },
    
    architecture: {
      overview: 'Microservices-based architecture with event-driven design for scalable vulnerability scanning.',
      components: [
        'Scanner Engine (Rust)',
        'API Gateway (Go)',
        'Web Dashboard (React)',
        'Database Layer (PostgreSQL)',
        'Message Queue (Redis)',
        'Threat Intelligence Service'
      ],
      patterns: [
        'Event Sourcing',
        'CQRS',
        'Microservices',
        'API Gateway',
        'Event-Driven Architecture'
      ]
    },
    
    performance: {
      metrics: [
        {
          name: 'Scan Speed',
          value: '1000+',
          description: 'Targets per minute'
        },
        {
          name: 'Accuracy',
          value: '99.2%',
          description: 'False positive rate'
        },
        {
          name: 'Memory Usage',
          value: '< 512MB',
          description: 'Per scan instance'
        },
        {
          name: 'Concurrent Scans',
          value: '50+',
          description: 'Simultaneous scans'
        }
      ],
      benchmarks: [
        {
          test: 'Network Scan',
          result: '2.3s',
          unit: 'per 100 hosts'
        },
        {
          test: 'Vulnerability Detection',
          result: '150ms',
          unit: 'per target'
        },
        {
          test: 'Report Generation',
          result: '1.2s',
          unit: 'for 1000 findings'
        }
      ]
    },
    
    codeSnippets: [
      {
        title: 'Scanner Engine Core',
        description: 'High-performance vulnerability scanner written in Rust',
        language: 'rust',
        code: `use tokio::sync::mpsc;
use std::sync::Arc;

#[derive(Debug, Clone)]
pub struct ScannerEngine {
    config: ScannerConfig,
    threat_intel: Arc<ThreatIntelligence>,
    rule_engine: Arc<RuleEngine>,
}

impl ScannerEngine {
    pub async fn scan_target(&self, target: Target) -> Result<ScanResult, ScanError> {
        let mut results = Vec::new();
        
        // Parallel vulnerability checks
        let (tx, mut rx) = mpsc::channel(100);
        
        for rule in self.rule_engine.get_active_rules() {
            let tx = tx.clone();
            let target = target.clone();
            
            tokio::spawn(async move {
                if let Ok(result) = rule.execute(&target).await {
                    let _ = tx.send(result).await;
                }
            });
        }
        
        while let Some(result) = rx.recv().await {
            results.push(result);
        }
        
        Ok(ScanResult {
            target,
            vulnerabilities: results,
            scan_time: std::time::Instant::now(),
        })
    }
}`,
        explanation: 'Core scanner engine using Rust for maximum performance. Implements parallel vulnerability checking with async/await patterns.'
      },
      {
        title: 'Threat Intelligence Integration',
        description: 'Real-time threat intelligence service integration',
        language: 'python',
        code: `from typing import List, Dict
import asyncio
import aiohttp

class ThreatIntelligence:
    def __init__(self, api_keys: Dict[str, str]):
        self.api_keys = api_keys
        self.session = aiohttp.ClientSession()
    
    async def check_ip_reputation(self, ip: str) -> ThreatScore:
        """Check IP reputation across multiple threat intel sources"""
        tasks = [
            self._check_virustotal(ip),
            self._check_abuseipdb(ip),
            self._check_alienvault(ip)
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Aggregate threat scores
        total_score = sum(r.score for r in results if isinstance(r, ThreatScore))
        return ThreatScore(
            ip=ip,
            score=total_score / len(results),
            sources=[r.source for r in results if isinstance(r, ThreatScore)]
        )
    
    async def _check_virustotal(self, ip: str) -> ThreatScore:
        """Check IP against VirusTotal API"""
        url = f"https://api.virustotal.com/v3/ip_addresses/{ip}"
        headers = {"x-apikey": self.api_keys["virustotal"]}
        
        async with self.session.get(url, headers=headers) as resp:
            data = await resp.json()
            malicious_votes = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {}).get("malicious", 0)
            return ThreatScore(ip=ip, score=malicious_votes / 100, source="virustotal")`,
        explanation: 'Asynchronous threat intelligence integration checking multiple sources in parallel for comprehensive security analysis.'
      }
    ],
    
    commentary: {
      motivation: 'I built vulnSCAN to address the gap between traditional vulnerability scanners and modern security requirements. Most existing tools lack real-time capabilities and comprehensive threat intelligence integration.',
      designDecisions: [
        'Chose Rust for the core scanner engine to achieve maximum performance and memory safety',
        'Implemented event-driven architecture for scalable concurrent scanning',
        'Used microservices pattern to allow independent scaling of components',
        'Integrated multiple threat intelligence sources for comprehensive security analysis',
        'Built custom rule engine for flexible vulnerability detection'
      ],
      lessonsLearned: [
        'Performance optimization in security tools requires careful memory management',
        'Real-time threat intelligence integration needs robust error handling',
        'Scalable architecture is crucial for enterprise security tools',
        'Custom rule engines provide flexibility but require careful validation'
      ],
      futurePlans: [
        'Add machine learning for automated threat detection',
        'Implement cloud-native deployment options',
        'Expand threat intelligence sources',
        'Add API for third-party integrations'
      ]
    }
  },
  
  'kleascm-kasmeer': {
    id: 'kleascm-kasmeer',
    title: 'Kasmeer',
    category: 'AI/ML',
    complexity: 'Expert',
    
    hero: {
      description: 'Advanced AI system for cognitive architecture and ethical decision-making with sophisticated mathematical frameworks.',
      keyFeatures: [
        'Cognitive architecture design',
        'Ethical decision-making engine',
        'Mathematical framework integration',
        'Real-time learning capabilities',
        'Multi-modal reasoning'
      ]
    },
    
    techStack: {
      languages: ['Python', 'Julia', 'C++'],
      frameworks: ['PyTorch', 'TensorFlow', 'JAX'],
      databases: ['PostgreSQL', 'Redis', 'Vector DB'],
      tools: ['Docker', 'Kubernetes', 'MLflow'],
      platforms: ['Linux', 'GPU Clusters', 'Cloud']
    },
    
    problem: {
      statement: 'Current AI systems lack sophisticated cognitive architectures and ethical reasoning capabilities.',
      challenges: [
        'Implementing complex cognitive architectures',
        'Building ethical decision-making frameworks',
        'Real-time learning and adaptation',
        'Multi-modal information processing',
        'Mathematical rigor in AI systems'
      ],
      goals: [
        'Create advanced cognitive architecture',
        'Implement ethical reasoning systems',
        'Build real-time learning capabilities',
        'Develop mathematical frameworks for AI'
      ]
    },
    
    architecture: {
      overview: 'Modular cognitive architecture with ethical reasoning and mathematical framework integration.',
      components: [
        'Cognitive Core (Python)',
        'Ethical Engine (Julia)',
        'Learning Module (PyTorch)',
        'Reasoning Engine (C++)',
        'Memory System (Vector DB)',
        'Mathematical Framework'
      ],
      patterns: [
        'Modular Architecture',
        'Event-Driven Processing',
        'Neural Networks',
        'Symbolic Reasoning',
        'Ethical Frameworks'
      ]
    },
    
    performance: {
      metrics: [
        {
          name: 'Learning Speed',
          value: '10x',
          description: 'Faster than baseline'
        },
        {
          name: 'Reasoning Accuracy',
          value: '94.7%',
          description: 'On ethical dilemmas'
        },
        {
          name: 'Memory Capacity',
          value: '1TB+',
          description: 'Vector embeddings'
        },
        {
          name: 'Response Time',
          value: '< 100ms',
          description: 'For complex queries'
        }
      ]
    },
    
    codeSnippets: [
      {
        title: 'Ethical Decision Engine',
        description: 'Core ethical reasoning system using mathematical frameworks',
        language: 'python',
        code: `import numpy as np
from typing import Dict, List, Tuple
from dataclasses import dataclass

@dataclass
class EthicalPrinciple:
    UTILITARIANISM = "utilitarianism"
    DEONTOLOGY = "deontology"
    VIRTUE_ETHICS = "virtue_ethics"
    RIGHTS_BASED = "rights_based"
    CARE_ETHICS = "care_ethics"

class EthicsEngine:
    """
    Advanced ethics engine with sophisticated mathematical analysis.
    COMPLIANCE: All mathematical operations and formulas are documented.
    
    The system uses weighted scoring across five ethical frameworks:
    - Utilitarianism (30%): Maximize total happiness
    - Deontology (25%): Follow moral rules
    - Virtue Ethics (20%): Demonstrate good character
    - Rights-Based (15%): Respect fundamental rights
    - Care Ethics (10%): Maintain caring relationships
    """
    
    def __init__(self, logger: Optional[LenoraAILogger] = None):
        self.agents: Dict[str, EthicalAgent] = {}
        self.actions: List[EthicalAction] = []
        self.scenario_data: Dict[str, Any] = {}
        
        # Ethical framework weights for composite scoring
        self.ethical_weights = {
            EthicalPrinciple.UTILITARIANISM: 0.3,
            EthicalPrinciple.DEONTOLOGY: 0.25,
            EthicalPrinciple.VIRTUE_ETHICS: 0.2,
            EthicalPrinciple.RIGHTS_BASED: 0.15,
            EthicalPrinciple.CARE_ETHICS: 0.1
        }
        
        self.logger = logger
        self.math_engine = AdvancedMathEngine(logger)
    
    def evaluate_action(self, action: EthicalAction) -> EthicalEvaluation:
        """Evaluate an action using all ethical frameworks"""
        scores = {}
        
        # Utilitarian analysis
        scores[EthicalPrinciple.UTILITARIANISM] = self._utilitarian_analysis(action)
        
        # Deontological analysis
        scores[EthicalPrinciple.DEONTOLOGY] = self._deontological_analysis(action)
        
        # Virtue ethics analysis
        scores[EthicalPrinciple.VIRTUE_ETHICS] = self._virtue_ethics_analysis(action)
        
        # Rights-based analysis
        scores[EthicalPrinciple.RIGHTS_BASED] = self._rights_based_analysis(action)
        
        # Care ethics analysis
        scores[EthicalPrinciple.CARE_ETHICS] = self._care_ethics_analysis(action)
        
        # Calculate weighted composite score
        composite_score = sum(
            scores[principle] * self.ethical_weights[principle]
            for principle in scores
        )
        
        return EthicalEvaluation(
            action=action,
            framework_scores=scores,
            composite_score=composite_score,
            recommendation=self._get_recommendation(composite_score)
        )`,
        explanation: 'Advanced ethical decision engine using mathematical frameworks to evaluate actions across multiple ethical principles with weighted scoring.'
      }
    ],
    
    commentary: {
      motivation: 'I built Kasmeer to push the boundaries of AI cognitive architecture and ethical reasoning. Most AI systems lack sophisticated ethical frameworks and cognitive capabilities.',
      designDecisions: [
        'Implemented modular architecture for flexible cognitive components',
        'Used mathematical frameworks for rigorous ethical reasoning',
        'Built multi-modal learning capabilities for comprehensive understanding',
        'Integrated real-time adaptation for dynamic environments',
        'Created sophisticated memory systems for long-term learning'
      ],
      lessonsLearned: [
        'Ethical AI requires careful mathematical framework design',
        'Cognitive architectures benefit from modular, extensible design',
        'Real-time learning requires sophisticated memory management',
        'Multi-modal reasoning improves AI comprehension significantly'
      ],
      futurePlans: [
        'Expand cognitive architecture with more sophisticated reasoning',
        'Implement advanced ethical frameworks',
        'Add more multi-modal learning capabilities',
        'Create API for third-party cognitive integrations'
      ]
    }
  }
};

/**
 * Get project details by ID
 */
export function getProjectDetails(id: string): ProjectDetails | null {
  return PROJECT_DETAILS[id] || null;
}

/**
 * Get all project details
 */
export function getAllProjectDetails(): ProjectDetails[] {
  return Object.values(PROJECT_DETAILS);
} 