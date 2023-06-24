import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect } from 'react';
import Calendar from './components/Calendar';
import AppNavbar from './components/AppNavbar';

function App() {
  useEffect(() => {
    document.title = "Dynamic Calendar";
  })

  return (
    <Fragment>
      <AppNavbar/>
      <main className="mx-5 px-5">
        <Calendar/>
      </main>
    </Fragment>
  );
}

export default App;
