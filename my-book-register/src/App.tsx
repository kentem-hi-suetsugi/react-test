import { useState } from 'react';
import './App.css';
import FilterableBookTable from './components/filterableBookTable';
import { BookItemModel } from './models';
import BookRegister from './components/BookRegister';

function App() {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState<BookItemModel[]>([]);

  const handleClickButton = (): void => {
    //第４問　コピペしたときに含まれるハイフンとかをなくしたい
    let formatIsbn=[...isbn].join("");
    formatIsbn=formatIsbn.replace("-", "");
    for(let i=0;i<isbn.length;i++){
      if(Number.isNaN(Number(isbn[i]))){
        formatIsbn=formatIsbn.replace(isbn[i],"");
      }
    }
    // console.log(formatIsbn);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${formatIsbn}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.totalItems === 0) {
          alert('登録されていない ISBN コードです。');
          return;
        }
        onPostCompleted({
          name: data.items[0].volumeInfo.title,
          isOnLoan: false,
        });
      });
  };

  const onPostCompleted = (postedItem: Omit<BookItemModel, 'id'>): void => {
    setBooks((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        ...postedItem,
      },
    ]);
  };

  return (
    <div className="App">
      {/* 第1問：コンポーネントに分割 ↓ ↓ ↓ ↓ ↓ */}
      <BookRegister
        handleClickBtn={handleClickButton}
        isbn={isbn}
        setIsbn={setIsbn}
      />
      {/* 第1問：コンポーネントに分割 ↑ ↑ ↑ ↑ ↑ ↑ */}
      <hr />
      <FilterableBookTable
        books={books}
        onClickDelete={(id) => {
          {
            /* 第2問：貸出 or 返却 or 削除の処理を追加 */
          }
          const updateList = books.filter((book) => book.id !== id);
          setBooks(updateList);
        }}
        onClickLendingSwitch={(id) => {
          {
            /* 第2問：貸出 or 返却 or 削除の処理を追加 */
          }
          const updateList = books.map((book) => {
            if ((book.id !== id)) {
              return book;
            }
            return { ...book, isOnLoan: !book.isOnLoan };
          });
          setBooks(updateList);
        }}
      />
    </div>
  );
}

export default App;
