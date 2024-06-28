import React from 'react'

type Props = {
	label:string;
	value:string;
	setValue:React.Dispatch<React.SetStateAction<string>>;
}

const LabelInput = (props: Props) => {
	return (
		<div className="label-input">
		<label className="label">{props.label}</label>
		<input
			className="input"
			placeholder="入力してください"
			value={props.value}
			onChange={(e) => props.setValue(e.target.value)}
		></input>
	</div>
)
}

export default LabelInput