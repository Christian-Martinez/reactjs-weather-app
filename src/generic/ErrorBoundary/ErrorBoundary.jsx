import React, { PureComponent } from 'react';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  /* si hay un error react invoca a esta funcion */
  // this.setState(getDerivedStateFromError(error))
  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.log('ErrorInfo', error, errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return <h1>Hubo un error</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
