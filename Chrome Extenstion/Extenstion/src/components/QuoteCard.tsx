import { Quote } from 'lucide-react';

export function QuoteCard({ quote }: { quote: string }) {
  return <section className="quote-card"><Quote size={19} /><p>{quote}</p></section>;
}
