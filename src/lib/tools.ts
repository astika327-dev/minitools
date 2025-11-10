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
  Landmark
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
];
