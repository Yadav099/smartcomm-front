import React from "react";
import "./main.scss";

//text box interface
interface ITextBox {
  placeHolder: string;
  updater: (data: string) => void;
}

//Text box component
export const TextBox = (prop: ITextBox) => {
  //internal updater function to update data
  const internalUpdater = (event: any) => {
    prop.updater(event.target.value);
  };

  return (
    <div className="loginBoxWrapper">
      <label className="loginLable">{prop.placeHolder} :</label>
      <input
        className="TextBox"
        type="text"
        placeholder={prop.placeHolder}
        onChange={value => internalUpdater(value)}
      />
    </div>
  );
};
