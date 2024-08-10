import React, { useEffect } from "react";
import { useCustomToast } from "../hooks/useToast";

const ErrorToast = ({ message }) => {
  const { showToast } = useCustomToast();

  useEffect(() => {
    showToast(message, "error");
    const timer = setTimeout(() => {
      showToast(
        "Due to an unexpected error, please try refreshing the page.",
        "error"
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [message, showToast]);

  return null;
};

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger error UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information to an error reporting service, if needed
    console.error("GlobalErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ErrorToast
            message={this.state.errorMessage || "An unexpected error occurred"}
          />
          {/* Optionally render a fallback UI */}
        </>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
