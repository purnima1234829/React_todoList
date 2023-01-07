import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert(" Fill the Name");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="data:image/jpeg;base64,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"
              alt="todologo"
            />
            <figcaption> Add Your Name Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Name"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
