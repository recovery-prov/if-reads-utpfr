import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t border-border/50 mt-16 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-serif text-lg text-foreground">ifReads</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; 2026 ifReads. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
