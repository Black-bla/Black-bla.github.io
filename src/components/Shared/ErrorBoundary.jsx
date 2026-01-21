import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Could send to monitoring here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', color: '#fff', zIndex: 9999 }}>
          <div style={{ maxWidth: 800, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Application error</h2>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#ff8b8b' }}>{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
