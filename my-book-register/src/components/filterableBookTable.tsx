import { useState } from 'react';
import { BookItemModel } from '../models';
import BookTable from './bookTable';
import LabelInput from './LabelInput';

interface Props {
  books: BookItemModel[];
  onClickDelete: (id: string) => void;
  onClickLendingSwitch: (id: string) => void;
}

const FilterableBookTable = ({
  books,
  onClickDelete,
  onClickLendingSwitch,
}: Props) => {
  const [filterText, setFilterText] = useState('');

  return (
    <>
      <LabelInput label="filter" value={filterText} setValue={setFilterText} />
      <div className="filterable-book-table">
        <BookTable
          bookItems={books.filter(
            (x) => !filterText || x.name.includes(filterText),
          )}
          onClickDelete={onClickDelete}
          onClickLendingSwitch={onClickLendingSwitch}
        />
      </div>
    </>
  );
};
export default FilterableBookTable;
