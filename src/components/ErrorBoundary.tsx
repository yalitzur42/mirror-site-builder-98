import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground" dir="rtl">
            <div className="text-center space-y-4 p-8">
              <h1 className="text-3xl font-bold">משהו השתבש 😕</h1>
              <p className="opacity-70">אירעה שגיאה בלתי צפויה.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl bg-background text-foreground font-bold hover:opacity-90 transition"
              >
                רענון הדף
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
