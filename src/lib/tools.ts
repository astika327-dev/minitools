// src/lib/tools.ts
import {
  Calculator,
  Ruler,
  CalendarDays,
  Pilcrow,
  Text,
  KeyRound,
  QrCode,
  CaseSensitive,
  FileText,
  GitCompareArrows,
  Regex,
  Coins,
  Percent,
  CalculatorIcon,
  Landmark,
  Link,
  Binary,
  Braces,
  Hash,
  Fingerprint,
  SquareCode,
  Clock,
  Palette,
  Pipette,
  Image,
  FileImage,
  Globe,
  Newspaper,
  ShieldCheck,
  TimerOff,
  Scale,
  ScanSearch,
  ShieldHalf,
  Network,
  MessageSquare,
  Key,
  GlobeLock
} from "lucide-svelte";

export type Tool = {
  href: string;
  title: string;
  description: string;
  icon: any;
};

export type ToolGroup = {
  slug: string;
  title: string;
  tools: Tool[];
};

export const toolGroups: ToolGroup[] = [
  {
    slug: "calculations",
    title: "Calculations & Conversions",
    tools: [
      {
        href: "/tools/calculator",
        title: "Calculator",
        description: "A simple calculator for your daily needs.",
        icon: Calculator,
      },
      {
        href: "/tools/unit-converter",
        title: "Unit Converter",
        description: "Convert between different units of measurement.",
        icon: Ruler,
      },
      {
        href: "/tools/date-calculator",
        title: "Date Calculator",
        description: "Calculate the duration between two dates.",
        icon: CalendarDays,
      },
    ],
  },
  {
    slug: "text-content",
    title: "Text & Content",
    tools: [
      {
        href: "/tools/word-counter",
        title: "Word Counter",
        description: "Count words and characters in your text.",
        icon: Pilcrow,
      },
      {
        href: "/tools/markdown-editor",
        title: "Markdown Editor",
        description: "A simple markdown editor with live preview.",
        icon: Text,
      },
      {
        href: "/tools/case-converter",
        title: "Case Converter",
        description: "Convert text between different letter cases.",
        icon: CaseSensitive,
      },
      {
        href: "/tools/lorem-ipsum-generator",
        title: "Lorem Ipsum Generator",
        description: "Generate placeholder text for your designs.",
        icon: FileText,
      },
      {
        href: "/tools/diff-checker",
        title: "Diff Checker",
        description: "Compare two texts to find the differences.",
        icon: GitCompareArrows,
      },
      {
        href: "/tools/regex-tester",
        title: "Regex Tester",
        description: "Test and validate regular expressions.",
        icon: Regex,
      },
    ],
  },
  {
    slug: "web-security",
    title: "Web & Security Utilities",
    tools: [
      {
        href: "/tools/password-generator",
        title: "Password Generator",
        description: "Generate strong and secure passwords.",
        icon: KeyRound,
      },
      {
        href: "/tools/qr-code-generator",
        title: "QR Code Generator",
        description: "Create QR codes from text or URLs.",
        icon: QrCode,
      },
      {
        href: "/tools/url-encoder-decoder",
        title: "URL Encoder/Decoder",
        description: "Encode or decode URLs and strings.",
        icon: Link,
      },
      {
        href: "/tools/base64-encoder-decoder",
        title: "Base64 Encoder/Decoder",
        description: "Encode or decode strings to Base64.",
        icon: Binary,
      },
      {
        href: "/tools/json-formatter",
        title: "JSON Formatter",
        description: "Format and validate JSON data.",
        icon: Braces,
      },
      {
        href: "/tools/hash-generator",
        title: "Hash Generator",
        description: "Generate hashes (MD5, SHA-1, etc.).",
        icon: Hash,
      },
      {
        href: "/tools/uuid-generator",
        title: "UUID Generator",
        description: "Generate universally unique identifiers.",
        icon: Fingerprint,
      },
      {
        href: "/tools/jwt-decoder",
        title: "JWT Decoder",
        description: "Decode and inspect JSON Web Tokens.",
        icon: SquareCode,
      },
      {
        href: "/tools/unix-timestamp-converter",
        title: "UNIX Timestamp Converter",
        description: "Convert timestamps to human-readable dates.",
        icon: Clock,
      },
      {
        href: "/tools/sri-hash-generator",
        title: "SRI Hash Generator",
        description: "Generate Subresource Integrity hashes for external files.",
        icon: ShieldHalf,
      },
      {
        href: "/tools/webrtc-leak-tester",
        title: "WebRTC Leak Tester",
        description: "Check for IP leaks via WebRTC connections.",
        icon: GlobeLock,
      },
      {
        href: "/tools/cors-debugger",
        title: "CORS Simulator & Debugger",
        description: "Simulate and debug complex Cross-Origin requests.",
        icon: Network,
      },
      {
        href: "/tools/websocket-client",
        title: "Interactive WebSocket Client",
        description: "Connect to and test WebSocket servers in real-time.",
        icon: MessageSquare,
      },
      {
        href: "/tools/advanced-jwt-debugger",
        title: "Advanced JWT Debugger",
        description: "Verify signatures and analyze JWT vulnerabilities.",
        icon: Key,
      },
    ],
  },
  {
    slug: "financial-health",
    title: "Financial & Health Calculators",
    tools: [
      {
        href: "/tools/tip-calculator",
        title: "Tip Calculator",
        description: "Calculate tips for services quickly.",
        icon: Coins,
      },
      {
        href: "/tools/percentage-calculator",
        title: "Percentage Calculator",
        description: "Calculate percentages for various scenarios.",
        icon: Percent,
      },
      {
        href: "/tools/bmi-calculator",
        title: "BMI Calculator",
        description: "Calculate your Body Mass Index.",
        icon: CalculatorIcon,
      },
      {
        href: "/tools/loan-calculator",
        title: "Loan Calculator",
        description: "Estimate loan payments and amortization.",
        icon: Landmark,
      },
    ],
  },
  {
    slug: "color-design",
    title: "Color & Design Tools",
    tools: [
      {
        href: "/tools/color-picker-converter",
        title: "Color Picker & Converter",
        description: "Pick a color and convert it to any format.",
        icon: Pipette,
      },
      {
        href: "/tools/color-palette-generator",
        title: "Color Palette Generator",
        description: "Generate beautiful color palettes.",
        icon: Palette,
      },
    ],
  },
  {
    slug: "image-utilities",
    title: "Image Utilities",
    tools: [
      {
        href: "/tools/image-to-base64",
        title: "Image to Base64",
        description: "Convert images to Base64 data URLs.",
        icon: FileImage,
      },
      {
        href: "/tools/image-compressor",
        title: "Image Compressor",
        description: "Compress JPEG and PNG images in your browser.",
        icon: Image,
      },
    ],
  },
  {
    slug: "time-utilities",
    title: "Time Utilities",
    tools: [
      {
        href: "/tools/time-zone-converter",
        title: "Time Zone Converter",
        description: "Convert times between different time zones.",
        icon: Globe,
      },
    ],
  },
  {
    slug: "ai-ethics-productivity",
    title: "AI, Ethics & Productivity",
    tools: [
      {
        href: "/tools/misinformation-analyzer",
        title: "Penganalisis Berita & Misinformasi",
        description: "Analisis URL berita untuk mendeteksi bias dan misinformasi.",
        icon: Newspaper,
      },
      {
        href: "/tools/ai-code-scanner",
        title: "Pemindai Kerentanan Kode AI",
        description: "Pindai kode untuk kerentanan keamanan menggunakan AI.",
        icon: ShieldCheck,
      },
      {
        href: "/tools/digital-detox-planner",
        title: "Perencana Detoks Digital",
        description: "Rencanakan dan lacak waktu istirahat dari layar.",
        icon: TimerOff,
      },
      {
        href: "/tools/ethical-decision-framework",
        title: "Kerangka Keputusan Etis",
        description: "Panduan interaktif untuk mengevaluasi dampak etis produk.",
        icon: Scale,
      },
      {
        href: "/tools/ai-watermark-checker",
        title: "Pemeriksa Tanda Air Konten AI",
        description: "Deteksi tanda air atau pola konten buatan AI.",
        icon: ScanSearch,
      },
    ],
  },
];
