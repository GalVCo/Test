import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import resourceListMock from './data.json';

interface ResourceInterface {
  resource: string
  category: string,
  creation_date: number,
  errors: number
}

const timout = async (msdealy: number) => {

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(true);
    }, msdealy);
  })
} // complete;

function App() {

  const [resourceList, setResourceList] = useState<ResourceInterface[]>([]);
  const [resourceItem, setResourceItem] = useState<ResourceInterface | undefined>();
  const [totalErrors, setTotalErrors] = useState(0);
useEffect(() => {
  setTotalErrors(calculateTotalErrors(resourceListMock as any));
  fetchResourceList();
}, [])

const fetchResourceList = async () => {
  await timout(3000)
  setResourceList(resourceListMock as any);
}

const calculateTotalErrors = (currentResourceList: ResourceInterface[]) => {
  let counter = 0;
  currentResourceList.forEach(resource => {
    counter += resource.errors;
  })

  return counter;
}
const handleRowClick = (resource: string, creation_date: number) =>  {

const element = resourceList.find(r => r.resource === resource && r.creation_date === creation_date);

setResourceItem(element);
}
  return (
    <div className="resource-list">
      <div>TOTAL ERRORS: {totalErrors}</div>
        {resourceList.map( (resource, index) => {
          const key = `${resource.resource}-${resource.creation_date}`;
              return <div onClick={() => handleRowClick(resource.resource, resource.creation_date)} key={key} className='resource-item'>
                  <div className='resource-item-column'>{resource.resource}</div>
                  <div className='resource-item-column'>{resource.category}</div>
                  <div className='resource-item-column'>{resource.creation_date}</div>
                  <div className='resource-item-column'>{resource.errors}</div>
              </div>;
          })
        }

        <div>
          {resourceItem && resourceItem?.category}
        </div>

    </div>
  );
}

export default App;
