import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorType: 'webgl' | 'audio' | 'general' | null;
}

/**
 * Error Boundary Component
 *
 * Catches and handles errors in the component tree, with special handling
 * for WebGL and Audio context errors common in the visualizer.
 *
 * @example
 * <ErrorBoundary>
 *   <AudioVisualizerDemo />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Classify the error type
    const errorType = ErrorBoundary.classifyError(error);

    return {
      hasError: true,
      error,
      errorType,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      errorInfo,
    });

    // Log to external service in production (e.g., Sentry)
    if (import.meta.env.PROD) {
      this.logErrorToService(error, errorInfo);
    }
  }

  /**
   * Classify error type for better error messages
   */
  static classifyError(error: Error): 'webgl' | 'audio' | 'general' {
    const message = error.message.toLowerCase();
    const name = error.name.toLowerCase();

    // WebGL errors
    if (
      message.includes('webgl') ||
      message.includes('context lost') ||
      message.includes('gpu') ||
      name.includes('webgl')
    ) {
      return 'webgl';
    }

    // Audio errors
    if (
      message.includes('audio') ||
      message.includes('microphone') ||
      message.includes('mediadevices') ||
      name.includes('notallowederror') ||
      name.includes('notfounderror')
    ) {
      return 'audio';
    }

    return 'general';
  }

  /**
   * Log error to external monitoring service
   */
  private logErrorToService(error: Error, errorInfo: ErrorInfo): void {
    // TODO: Implement error logging service (e.g., Sentry, LogRocket)
    // Example:
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });
    console.log('Error logged to service:', error, errorInfo);
  }

  /**
   * Reset error boundary and retry
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: null,
    });
  };

  /**
   * Reload the entire page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  /**
   * Get error-specific guidance
   */
  getErrorGuidance(): {
    title: string;
    message: string;
    actions: Array<{ label: string; onClick: () => void }>;
  } {
    const { errorType, error } = this.state;

    switch (errorType) {
      case 'webgl':
        return {
          title: 'WebGL Error',
          message:
            'Your browser or GPU encountered an error while rendering the visualization. This can happen due to GPU driver issues, insufficient GPU memory, or browser limitations.',
          actions: [
            {
              label: 'Reload Page',
              onClick: this.handleReload,
            },
            {
              label: 'Try Again',
              onClick: this.handleReset,
            },
          ],
        };

      case 'audio':
        return {
          title: 'Audio Error',
          message:
            error?.name === 'NotAllowedError'
              ? 'Microphone access was denied. Please enable microphone permissions in your browser settings and try again.'
              : 'An error occurred while accessing audio. This could be due to device permissions, another application using the audio device, or browser limitations.',
          actions: [
            {
              label: 'Try Again',
              onClick: this.handleReset,
            },
            {
              label: 'Reload Page',
              onClick: this.handleReload,
            },
          ],
        };

      default:
        return {
          title: 'Something Went Wrong',
          message:
            'An unexpected error occurred in the audio visualizer. You can try reloading the page or continuing without the affected feature.',
          actions: [
            {
              label: 'Reload Page',
              onClick: this.handleReload,
            },
            {
              label: 'Try Again',
              onClick: this.handleReset,
            },
          ],
        };
    }
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.handleReset);
      }

      // Default error UI
      const guidance = this.getErrorGuidance();

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            backgroundColor: '#000000',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            {/* Error Icon */}
            <div
              style={{
                fontSize: '4rem',
                marginBottom: '1rem',
              }}
            >
              ⚠️
            </div>

            {/* Error Title */}
            <h1
              style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                color: '#ff6b6b',
              }}
            >
              {guidance.title}
            </h1>

            {/* Error Message */}
            <p
              style={{
                fontSize: '1rem',
                marginBottom: '2rem',
                lineHeight: '1.6',
                color: '#cccccc',
              }}
            >
              {guidance.message}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {guidance.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: index === 0 ? '#6324f8' : '#333333',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index === 0 ? '#7d3fff' : '#444444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index === 0 ? '#6324f8' : '#333333';
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Technical Details (Development Only) */}
            {import.meta.env.DEV && (
              <details
                style={{
                  marginTop: '2rem',
                  textAlign: 'left',
                  padding: '1rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #333333',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#888888',
                    marginBottom: '0.5rem',
                  }}
                >
                  Technical Details (Dev Mode)
                </summary>
                <pre
                  style={{
                    fontSize: '0.75rem',
                    color: '#ff6b6b',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                >
                  {error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

/**
 * Hook-based Error Boundary wrapper
 * For functional components that need error boundary protection
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: (error: Error, reset: () => void) => ReactNode
): React.ComponentType<P> {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
}

export default ErrorBoundary;
