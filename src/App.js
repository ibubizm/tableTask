import { Table } from './components/table'
import { Info } from './components/info'
import { FilterByState } from './components/filterBy';
import './ass.scss'
import { Search } from './components/search';
import { Pagination } from './components/pageination/pagination'

function App() {
  return (
    <div className="App">
      <Pagination />
      <div className="filter-bar">
        <Search />
        <FilterByState />
      </div>
      <Table />
      <Info />
    </div>
  );
}

export default App;
