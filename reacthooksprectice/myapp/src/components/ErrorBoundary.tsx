import React, {
  type ErrorInfo,
  type ReactNode,
} from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error: Error,
    info: ErrorInfo
  ): void {
    console.error(
      "React error:",
      error,
      info
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page.</p>
        </main>
      );
    }

    return this.props.children;
  }
}