import { Table } from './components/table/table'
import { Info } from './components/info/info'
import { FilterByState } from './components/filter/filterBy';
import './ass.scss'
import { Search } from './components/filter/search';
import { Pagination } from './components/pageination/pagination'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setAllStates, setAllItems } from './redux/actions/actions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

function App() {
  const [listObj, setListObj] = useState([])
  const { allItems } = useSelector(({ ItemReducer }) => ItemReducer)

  const [searchValue, setSearchValue] = useState('')

  const [currentState, setCurrentState] = useState('all')

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const dispatch = useDispatch()

  useEffect(() => {
    let set = new Set()
    const fetchList = async () => {
      await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
        .then(({ data }) => {
          dispatch(setAllItems(data))
          setListObj(data)
          data.forEach(i => {
            set.add(i.adress.state)
          })
          const arr = Array.from(set)
          dispatch(setAllStates(arr))
        })
    }
    fetchList()
  }, [])

  const searchByName = (search) => {
    setCurrentState('all')
    if (search === '') {
      setListObj(allItems)
    }
    else {
      const lower = search.toLowerCase()
      const biggest = lower[0].toUpperCase() + lower.slice(1)

      const newObj = allItems.filter(i => i.firstName === biggest)
      setListObj(newObj)
    }
  }

  const reset = () => {
    setListObj(allItems)
    setSearchValue('')
    setCurrentState('all')
  }

  const filterState = (currentState) => {
    const newObj = allItems.filter(i => i.adress.state === currentState)
    setListObj(newObj)
    setCurrentPage(1)
  }



  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = listObj.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <div className="App">
      <div className="filter-bar">
        <Search
          searchByName={searchByName}
          reset={reset}
          searchValue={searchValue}
          setSearchValue={setSearchValue} />
        <FilterByState
          currentState={currentState}
          setCurrentState={setCurrentState}
          filterState={filterState} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={listObj.length} />
      <Table currentItems={currentItems} setListObj={setListObj} listObj={listObj} />
      <Info />
    </div>
  );
}

export default App;
