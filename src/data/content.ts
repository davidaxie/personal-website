import type { SiteContent } from './types';

export const siteContent: SiteContent = {
  identity: {
    name: 'David Xie',
    tagline: 'Builder, Trader, Creator',
    bio: "I'm a Georgetown undergrad building at the intersection of finance, technology, and entrepreneurship. I develop algorithmic trading systems at Clockwork Group, co-founded Ambees.io — an edtech startup with five university partners — and produce music that's crossed a million streams independently. This year I was selected for the Citadel Associates Program and FTI's IMPACT Leadership Program, while continuing to ship code, close deals, and chase new ideas. D.C. is home base, but you'll find me anywhere there's a hard problem worth solving.",
  },

  currently: [
    { label: 'Building', value: 'Trading algos at Clockwork' },
    { label: 'Listening to', value: 'A lot of house music' },
    { label: 'Reading', value: 'Market Wizards' },
    { label: 'Obsessing over', value: 'Precious metals volatility' },
  ],

  skills: [
    {
      category: 'Code',
      skills: [
        { name: 'Python', description: 'My Swiss army knife — trading algos, data pipelines, anything quantitative' },
        { name: 'JavaScript', description: 'Full-stack web apps, React frontends, the startup glue' },
        { name: 'PineScript', description: 'TradingView strategy scripting for live market signals' },
        { name: 'SQL', description: 'Wrangling financial datasets and building research queries' },
      ],
    },
    {
      category: 'Finance',
      skills: [
        { name: 'Bloomberg Terminal', description: 'My second home for market data and analysis' },
        { name: 'Financial Modeling', description: 'DCFs, LBOs, comps — the full toolkit' },
        { name: 'Equity Research', description: 'Deep dives into defense, aerospace, and digital assets' },
        { name: 'Due Diligence', description: 'Tearing apart deals to find what matters' },
      ],
    },
    {
      category: 'Creative',
      skills: [
        { name: 'Ableton Live', description: 'Where the million streams started' },
        { name: 'Photoshop', description: 'Album art, pitch decks, anything visual' },
        { name: 'Product Design', description: 'Turning messy ideas into things people actually use' },
      ],
    },
  ],

  work: [
    {
      company: 'Clockwork Group',
      role: 'Algorithmic Trader & Developer',
      period: 'Jan 2026 – Present',
      description: "I joined Clockwork to figure out if I could beat the market with code. Turns out, with the right mentor and enough late nights, you can. I'm building time-based price movement strategies for precious metals — gold, platinum, zinc — under a former hedge fund manager who doesn't let bad logic slide. The craziest part? I helped brand and commercialize our proprietary algos, which contributed to a seven-figure outcome.",
      highlight: 'Contributed to seven-figure algo commercialization',
      technologies: ['Python', 'PineScript', 'Quantitative Trading'],
    },
    {
      company: 'Tungsten Partners',
      role: 'Real Estate Investment Analyst',
      period: 'Sep – Dec 2025',
      description: "Real estate was my crash course in how big money actually moves. I prepped research packets for the CEO, dug into a Philadelphia hotel acquisition (zoning law rabbit holes are wild), and stress-tested a Manhattan retail conversion against the firm's feasibility framework. Every week felt like a masterclass in asking the right questions about a deal.",
      highlight: 'Evaluated multi-million dollar acquisitions',
      technologies: ['Real Estate', 'Due Diligence', 'Zoning Analysis'],
    },
    {
      company: 'Sterling Business Capital',
      role: 'Investment Banking Analyst',
      period: 'Jun – Sep 2025',
      description: "My first real taste of M&A. I ran valuation and diligence on a ~$4M sell-side mandate for a consumer fragrance business — the kind of work where you're reading through years of financials to tell a story about what a company is actually worth. I also managed the CRM to track how investors were engaging with our materials. It taught me that deals are won on preparation, not just pitch.",
      highlight: 'Led diligence on $4M M&A mandate',
      technologies: ['M&A', 'Valuation', 'Financial Analysis'],
    },
    {
      company: 'Cedar Oak Capital',
      role: 'Private Equity Analyst',
      period: 'Apr – Jun 2025',
      description: "Worked within the consumer retail group on a tight 10-person team. My job was outreach — finding companies worth talking to, assessing consulting opportunities, and helping build relationships with management teams. It was a lesson in how PE firms think about value creation from the inside.",
      highlight: 'Consumer retail deal sourcing & outreach',
      technologies: ['Private Equity', 'Consumer Retail'],
    },
  ],

  projects: [
    {
      name: 'Ambees.io',
      description: 'An edtech platform that helps undergrads visualize career paths by mapping courses, clubs, and alumni data to real outcomes.',
      story: "We built Ambees because every freshman we knew was lost. Including us. The career center gives you a pamphlet; we wanted to give you a map. I pulled together ~5 engineers from Stanford and UC Berkeley, and we built something that actually shows you: if you take these classes, join these clubs, you're likely headed here. We hit post-revenue traction with five U.S. partner schools, which still feels surreal.",
      impact: '5 partner schools, post-revenue',
      technologies: ['EdTech', 'Full-Stack', 'Product Strategy'],
      url: 'https://ambees.io',
    },
    {
      name: 'Algorithmic Trading Systems',
      description: 'Quantitative strategies for precious metals using time-based price movement models.',
      story: "This started as a curiosity — can you actually predict where gold is going to move based on time patterns? Turns out there are real edges hiding in the noise. I built and backtested strategies in Python and PineScript, iterating constantly with my mentor at Clockwork. The algorithms went from experiments to commercially viable products.",
      impact: 'Seven-figure commercialization',
      technologies: ['Python', 'PineScript', 'Quantitative Finance'],
    },
    {
      name: 'Georgetown A&D Investment Fund',
      description: 'Student-run fund focused on aerospace, defense, and digital assets.',
      story: "I went deep on three tickers: BITW, DIME, and Honeywell. Each one was a different thesis — digital-asset adoption, defense spending cycles, aerospace recovery. The best part was defending these in front of the fund. Nothing sharpens your thinking like having 20 people try to poke holes in your valuation.",
      impact: 'Multi-sector equity research',
      technologies: ['Equity Research', 'DCF Modeling', 'Sector Analysis'],
    },
    {
      name: 'HoyaHacks',
      description: "Georgetown's flagship hackathon — 72 hours of building something from nothing.",
      story: "The 72 hours at HoyaHacks changed how I think about building. No planning docs, no sprints — just ship. We earned 3rd place overall and a track category win, but the real win was learning I could go from zero to demo in a weekend.",
      impact: '3rd Overall & Track Winner',
      technologies: ['Hackathon', 'Rapid Prototyping', 'Full-Stack'],
      image: '/memories/boston/hackathon.jpg',
    },
  ],

  interests: [
    {
      name: 'Music Production',
      headline: '1M+ Streams',
      stat: '1,000,000+',
      description: "It started with a cracked copy of FL Studio in high school and turned into something real. I produce in Ableton now — mostly electronic and hip-hop beats. Crossing a million streams as an independent producer taught me more about marketing, iteration, and taste than any class ever could.",
    },
    {
      name: 'Club Squash',
      headline: 'D1 Competitor',
      stat: 'D1',
      description: "I play on Georgetown's D1 club squash team. There's something about a sport where you're trapped in a glass box with someone trying to outthink you that just clicks with my brain.",
    },
    {
      name: 'Drums',
      headline: 'Band Member',
      description: "I play drums in a band. Rhythm is the foundation of everything — music, trading, life. Being the drummer means you set the tempo and everyone else follows.",
    },
    {
      name: 'Formula 1',
      headline: 'McLaren Fan',
      description: "The intersection of engineering, strategy, and speed. I've been a McLaren fan since I first understood what a pit strategy was. F1 is the closest thing to algorithmic trading on four wheels.",
    },
    {
      name: 'Celtics',
      headline: 'Banner 18',
      description: "Boston basketball, born and raised. Banner 18 and counting. There's no better feeling than watching a championship team that plays the right way.",
    },
    {
      name: 'YC Podcasts',
      headline: 'Startup Nerd',
      description: "I absorb Y Combinator content like it's oxygen. Founders talking about the worst days of building a company is somehow the most motivating thing I've ever heard.",
    },
  ],

  achievements: [
    {
      title: 'Citadel Associates Program',
      year: '2026',
      description: "Selected for Citadel's exclusive Associates Program. An opportunity to learn from one of the most quantitative-driven firms in the world — the kind of environment where rigor and speed define everything.",
    },
    {
      title: 'FTI IMPACT Leadership Consulting Program',
      year: '2026',
      description: "Admitted to FTI Consulting's IMPACT program, a selective leadership development experience focused on strategic consulting. Another lens for understanding how complex problems get solved at scale.",
    },
    {
      title: 'Seven-Figure Algorithm Commercialization',
      year: '2026',
      description: "Led branding and pitch efforts at Clockwork Group that helped turn proprietary trading algorithms into a commercially viable product. Seeing something I helped build generate real revenue was a defining moment.",
    },
    {
      title: '1M+ Streams as Music Producer',
      year: '2024',
      description: "Crossed one million streams across platforms as an independent producer. No label, no manager — just uploading beats and learning what resonates. Taught me everything about distribution and finding an audience.",
    },
    {
      title: 'HoyaHacks — 3rd Overall & Track Winner',
      year: '2025',
      description: "72 hours of building at Georgetown's premier hackathon. Our team placed 3rd overall and won a track category. The adrenaline of shipping under pressure is addictive.",
    },
    {
      title: 'Nomura Summit Series',
      year: '2025',
      description: "Selected for Nomura's exclusive professional summit. Being in a room with that caliber of people made me realize how much bigger the world of finance is than I thought.",
    },
    {
      title: 'Ambees.io — 5 Partner Schools',
      year: '2025',
      description: "Grew our edtech platform to post-revenue traction with five U.S. university partners. Going from 'just an idea' to schools actually paying us was the hardest and best thing I've done.",
    },
    {
      title: 'CalHacks & UChicago Trading Competition',
      year: '2025',
      description: "Competed against some of the best technical minds at CalHacks and tested my trading instincts at UChicago's trading competition. Both humbling and energizing.",
    },
  ],

  contact: {
    email: 'mrdxdavidxie@gmail.com',
    github: 'https://github.com/davidaxie',
    linkedin: 'https://www.linkedin.com/in/davidctxie/',
    twitter: 'https://twitter.com/David_A_Xie',
    instagram: 'https://instagram.com/_davidaxie_',
    website: 'https://ambees.io',
  },
};
