// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro não tratado:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado.</h1>
            <p className="text-gray-600 mb-4">
              Ocorreu um erro na aplicação. Por favor, verifique o console do navegador para mais detalhes.
            </p>
            {this.state.error && (
              <details className="mt-4 bg-gray-100 p-4 rounded text-left">
                <summary className="font-semibold text-gray-700 cursor-pointer">
                  Detalhes do erro
                </summary>
                <pre className="mt-2 text-sm text-red-500 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
                <pre className="mt-2 text-xs text-gray-500 whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;