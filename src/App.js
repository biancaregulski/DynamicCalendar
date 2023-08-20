import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect } from 'react';
import CalendarComponent from './components/CalendarComponent';
import AppNavbar from './components/AppNavbar';

function App() {
  useEffect(() => {
    document.title = "Dynamic Calendar";
  })

  return (
    <Fragment>
      <AppNavbar/>
      <main className="mx-5 px-5">
        <CalendarComponent/>
      </main>
    </Fragment>
  );
}

export default App;
