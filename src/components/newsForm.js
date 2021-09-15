import React,{useState,useEffect} from "react"
import {projectFirestore,projectStorage} from "../db"


const NewsForm =(props)=>{
  
  const initialState = {
    title: "",
    description: "",
    link: "",
    catégorie:""

  };
  const [values, setValues] = useState(initialState);
  const [image,setImage]=useState(null)

  const handelChange=e=>{
if(e.target.files[0]){
setImage(e.target.files[0])
}
  }
  const handelUpload=()=>{
const uploadTask=projectStorage.ref(`images/${image.name}`).put(image)
  uploadTask.on("state_changed",snapshot=>{},
  error=>{
    console.log(error);
  },
  ()=>{
    projectStorage
    .ref("images")
    .child(image.name)
    .getDownloadURL()
    .then(url=>{ console.log(url)})
  });
 } 




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    
    props.addOrEditNews(values);
    setValues({ ...initialState });
         };
         const getNewsById = async (id) => {
          const doc = await projectFirestore.collection("news").doc(id).get();
          setValues({ ...doc.data() });
        };
        useEffect(() => {
          if (props.currentId === "") {
            setValues({ ...initialState });
          } else {
            getNewsById(props.currentId);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.currentId]);
      
   return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
       <div>
      <input type="file" onChange={handelChange}/>
      <button onClick={handelUpload}>Upload</button>
      </div>
      <br/>
    <div className="form-group input-group">
     
      
      <div className="input-group-text bg-light">
        
        <i className="material-icons">insert_link</i>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="link"
        value={values.link}
        name="title"
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group input-group">
      <div className="input-group-text bg-light">
        <i className="material-icons">create</i>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="title"
        value={values.title}
        name="title"
        onChange={handleInputChange}
      />
      <input
        type="text"
        value={values.catégorie}
        name="catégorie"
        placeholder="catégorie"
        className="form-control"
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-group">
      <textarea
        rows="3"
        className="form-control"
        placeholder="Write a Description"
        name="description"
        value={values.description}
        onChange={handleInputChange}
      ></textarea>
    </div>

    <button className="btn btn-primary btn-block">
      {props.currentId === "" ? "Save" : "Update"}
    </button>
  </form>
   )
}
export default NewsForm