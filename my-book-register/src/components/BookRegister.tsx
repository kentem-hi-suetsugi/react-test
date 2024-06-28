import React from 'react';
import LabelInput from './LabelInput';

type Props = {
	handleClickBtn:()=>void;
	isbn:string;
	setIsbn:React.Dispatch<React.SetStateAction<string>>;
};

const BookRegister = (props: Props) => {
  return (
    <div className="book-register">
			<LabelInput label='ISBNコード' value={props.isbn} setValue={props.setIsbn}/>
      <button className="button" onClick={props.handleClickBtn}>
        書籍登録
      </button>
    </div>
  );
};

export default BookRegister;
