import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError:Boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error:Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true}
  }

  componentDidCatch(error:Error, errorInfo:ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      console.log('Hallo3')
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary

// class ErrorBoundary extends Component<Props, State> {
 
//   constructor(props:Props) {
//     super(props);
//     this.state = {  error: '', errorInfo: ''  };
//   }
 

//   static getDerivedStateFromError=(error:String, errorInfo:String) => {
//     // Update state so the next render will show the fallback UI.
//     this.setState({
//         error: error,
//         errorInfo: errorInfo
//     });
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.log('Second time')
//     console.error("Uncaught error:", error, errorInfo);
//   }

//   render() {
//     console.log('Third time');
    
//     if (this.state.hasError) {
//       return <h1>Sorry.. there was an error</h1>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;