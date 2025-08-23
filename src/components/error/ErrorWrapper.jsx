import ErrorFallback from "./Error";
const ErrorBoundaryWrapper = ({ children }) => {
  return <ErrorFallback onReset={() => window.location.reload()}>{children}</ErrorFallback>;
};

export default ErrorBoundaryWrapper;
