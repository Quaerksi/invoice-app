// import Head from 'next/head'
// import Image from 'next/image' 
// import Link from 'next/link'
// import styles from '../styles/Home.module.css'

import type { Invoice } from '../interfaces/invoice'
import useSWR from 'swr'
import React, { Component, ErrorInfo, ReactNode } from "react";

import ErrorBoundary from './errorBoundary'

interface IProps {

  children?: ReactNode;
}

type IState = {
  counter: number;
}

class BuggyCounter extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
    // return <>
    // <div>
    //             <button onClick={(e) => console.log(e.b.c)}>
    //             {/* <button onClick={(e) => console.log(e)}>  */}
    //             break this
    //             </button>
    //         </div></>
  }
}

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function Home() {

  // call to my api, read data from DB
  const {data, error} = useSWR<Invoice[]>('/api/allInvoices', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  // console.log(`Data: ${JSON.stringify(data)}`)

 

  return (
    <div>Hallo
        {data.map((invoice) => (
          <li key={invoice.id}>{invoice.clientName}</li>
        ))}
        <ErrorBoundary>       
            <BuggyCounter />
        </ErrorBoundary>

    </div>
  )
}
