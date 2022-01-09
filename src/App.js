import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from './context/GlobalState';
const Form =  React.lazy(()=> import('./components/Form'));
const List =  React.lazy(()=> import('./components/List'));


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <GlobalProvider>

        <div className="container mt-3">
          <div className='row'>
            <div className='col-md-4 col-sm-12'>
              <Form />
            </div>
            <div className='col-md-8 col-sm-12'>
              <List />
            </div>
          </div>
        </div>
      </GlobalProvider>
    </Suspense>
  );
}

export default App;
