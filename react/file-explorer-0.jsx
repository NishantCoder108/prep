import { MdExpandLess, MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from 'react';

const FileAndFolder = ({ data ,setData, idCounter, setIdCounter}) => {
  const [isExpanded, setIsExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ parentId: null, isFolder: false });
  const [inputValue, setInputValue] = useState("");

  const handleExpanded = (id) => {
    setIsExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  const handleAddNode = (id, isFolder) => {
    setShowModal(prev => !prev)
    setModalInfo({
      parentId: id,
      isFolder
    })


  }

  const handleModalSubmit = () => {
    const { parentId, isFolder } = modalInfo;

    const name = inputValue.trim();
    if (!name) return;

    const newItem = {
      id: idCounter,
      name,
      isFolder,
      ...(isFolder ? {children : []}: {}),

    }
    const updateTree = (nodes) => nodes.map(node => {
      if (node.id === parentId && node.isFolder) {
        return { ...node, children: [...(node.children || []), newItem] }
      }
      if (node.children) {
        return { ...node, children: updateTree(node.children) }
      }
      return node;
    });

    setData( prevTree => updateTree(prevTree));
    setShowModal(false);
    setInputValue("")
    setIdCounter(prev => prev + 1)
   
  }

  const handleRemoveNode = (itemId) => {
    const updateTree = (nodes) => {
      return nodes
        .filter(node => node.id !== itemId) 
        .map(node => {                      
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };

    setData(prevTree => updateTree(prevTree));
  };
  return (
    <div className="file-folder-main">
      {data.map((item, idx) => (
        <div key={idx} className="dir-container"  >
          <span
            onClick={() => handleExpanded(item.id)}>
            {item.isFolder && (!isExpanded[item.id] ? <MdExpandMore className="icon" /> : <MdExpandLess className="icon" />)}
          </span>
          <span > {item.name}</span>
          <span data-testid={`add-folder-${item.id}`} onClick={() => handleAddNode(item.id, true)} >
            {item.isFolder && <FiFolderPlus className="icon" />}
          </span>
          <span data-testid={`add-file-${item.id}`} onClick={() => handleAddNode(item.id, false)} >
            {item.isFolder && <AiOutlineFileAdd className="icon" />}
          </span>

          <span data-testid="delete" onClick={() => handleRemoveNode(item.id)} >
            { <MdDeleteOutline className="icon" />}
          </span>
          {isExpanded[item.id] &&
            item.isFolder &&
            <FileAndFolder data={item.children} setData={setData} setIdCounter={setIdCounter} idCounter={idCounter} />
          }
        </div>


      ))}
      {showModal && (
        <div className="modal">
           <h1>Enter {modalInfo.isFolder ? "folder" : "file"} name</h1>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}  autoFocus/>
          <button data-testid="add" onClick={handleModalSubmit}>Add</button>
          <button data-testid="cancel" onClick= {() => setShowModal(false) }>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FileAndFolder;
